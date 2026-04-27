import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ─── Helpers ────────────────────────────────────────────────────────────────

function makePublicCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function makeUserCtx(overrides?: Partial<NonNullable<TrpcContext["user"]>>): TrpcContext {
  return {
    user: {
      id: 42,
      openId: "test-user-openid",
      email: "user@example.com",
      name: "Test User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
      ...overrides,
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

// ─── Mock DB and notification helpers ───────────────────────────────────────

vi.mock("./db", () => ({
  createConsultation: vi.fn().mockResolvedValue(undefined),
  getConsultations: vi.fn().mockResolvedValue([]),
  saveChatMessage: vi.fn().mockResolvedValue(undefined),
  getChatHistory: vi.fn().mockResolvedValue([]),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [
      {
        message: {
          content: "Based on your income of $150K, you should consider a Backdoor Roth IRA since you exceed the direct contribution income limit of $165,000 for single filers in 2025.",
        },
      },
    ],
  }),
}));

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("auth.logout", () => {
  it("clears session cookie and returns success", async () => {
    const ctx = makeUserCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
  });

  it("works for unauthenticated users too", async () => {
    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
  });
});

describe("auth.me", () => {
  it("returns null for unauthenticated users", async () => {
    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("returns user object for authenticated users", async () => {
    const ctx = makeUserCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).not.toBeNull();
    expect(result?.email).toBe("user@example.com");
    expect(result?.name).toBe("Test User");
  });
});

describe("consultation.submit", () => {
  it("accepts a valid consultation submission", async () => {
    const { createConsultation } = await import("./db");
    const { notifyOwner } = await import("./_core/notification");

    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.consultation.submit({
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1-555-123-4567",
      financialGoals: "I want to optimize my 401k contributions and understand the Backdoor Roth IRA strategy for my $150K income.",
      preferredTime: "Weekday evenings",
    });

    expect(result).toEqual({ success: true });
    expect(createConsultation).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Jane Smith",
        email: "jane@example.com",
        financialGoals: expect.stringContaining("401k"),
      })
    );
    expect(notifyOwner).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining("Jane Smith"),
        content: expect.stringContaining("jane@example.com"),
      })
    );
  });

  it("rejects submission with invalid email", async () => {
    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.consultation.submit({
        name: "Jane Smith",
        email: "not-an-email",
        financialGoals: "I want to optimize my retirement savings.",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with too-short financial goals", async () => {
    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.consultation.submit({
        name: "Jane Smith",
        email: "jane@example.com",
        financialGoals: "short",
      })
    ).rejects.toThrow();
  });

  it("notifies owner with name and contact info", async () => {
    const { notifyOwner } = await import("./_core/notification");
    vi.mocked(notifyOwner).mockClear();

    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);

    await caller.consultation.submit({
      name: "Michael Chen",
      email: "michael.chen@example.com",
      phone: "+1-212-555-9999",
      financialGoals: "I need help with NY state tax optimization and my 401k allocation strategy.",
    });

    expect(notifyOwner).toHaveBeenCalledTimes(1);
    const call = vi.mocked(notifyOwner).mock.calls[0]![0];
    expect(call.title).toContain("Michael Chen");
    expect(call.content).toContain("michael.chen@example.com");
    expect(call.content).toContain("+1-212-555-9999");
    expect(call.content).toContain("NY state tax");
  });
});

describe("consultation.list (admin only)", () => {
  it("throws FORBIDDEN for regular users", async () => {
    const ctx = makeUserCtx({ role: "user" });
    const caller = appRouter.createCaller(ctx);
    await expect(caller.consultation.list()).rejects.toThrow("FORBIDDEN");
  });

  it("returns list for admin users", async () => {
    const ctx = makeUserCtx({ role: "admin" });
    const caller = appRouter.createCaller(ctx);
    const result = await caller.consultation.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("chat.ask", () => {
  it("requires authentication", async () => {
    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.chat.ask({ message: "Should I use Roth or Traditional IRA?" })
    ).rejects.toThrow();
  });

  it("returns AI response for authenticated users", async () => {
    const ctx = makeUserCtx();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.ask({
      message: "I earn $150K/year — should I choose Roth or Traditional IRA?",
    });

    expect(result).toHaveProperty("content");
    expect(typeof result.content).toBe("string");
    expect(result.content.length).toBeGreaterThan(10);
  });

  it("includes conversation history in context", async () => {
    const { invokeLLM } = await import("./_core/llm");
    vi.mocked(invokeLLM).mockClear();

    const ctx = makeUserCtx();
    const caller = appRouter.createCaller(ctx);

    await caller.chat.ask({
      message: "What about the pro-rata rule?",
      history: [
        { role: "user", content: "What is a Backdoor Roth IRA?" },
        { role: "assistant", content: "A Backdoor Roth IRA is a strategy for high earners..." },
      ],
    });

    expect(invokeLLM).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: expect.arrayContaining([
          expect.objectContaining({ role: "user", content: "What is a Backdoor Roth IRA?" }),
          expect.objectContaining({ role: "assistant", content: expect.stringContaining("Backdoor") }),
          expect.objectContaining({ role: "user", content: "What about the pro-rata rule?" }),
        ]),
      })
    );
  });

  it("rejects empty messages", async () => {
    const ctx = makeUserCtx();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.chat.ask({ message: "" })
    ).rejects.toThrow();
  });

  it("rejects messages over 2000 characters", async () => {
    const ctx = makeUserCtx();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.chat.ask({ message: "a".repeat(2001) })
    ).rejects.toThrow();
  });
});

describe("chat.history", () => {
  it("requires authentication", async () => {
    const ctx = makePublicCtx();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.chat.history()).rejects.toThrow();
  });

  it("returns history for authenticated users", async () => {
    const ctx = makeUserCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.chat.history();
    expect(Array.isArray(result)).toBe(true);
  });
});
