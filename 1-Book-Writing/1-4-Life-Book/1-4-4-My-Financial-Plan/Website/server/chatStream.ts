/**
 * Server-sent events (SSE) streaming endpoint for the AI chat advisor.
 * Streams tokens progressively from the LLM to the client.
 */
import type { Express, Request, Response } from "express";
import { ENV } from "./_core/env";
import { saveChatMessage, getChatHistory } from "./db";
import { sdk } from "./_core/sdk";

const FINANCIAL_SYSTEM_PROMPT = `You are WealthWise Pro's AI financial advisor — a sophisticated assistant built on the expertise of CFA (Chartered Financial Analyst) and FRM (Financial Risk Manager) certified professionals with extensive experience at top financial institutions including BlackRock.

Your expertise covers:
- 401(k), Traditional IRA, Roth IRA, and Backdoor Roth IRA strategies
- Tax optimization for high-income earners (federal + state: NY, NJ, CA)
- AGI/MAGI calculation and contribution limit phase-outs
- Asset allocation by age and risk tolerance
- Tax-loss harvesting strategies
- Retirement withdrawal sequencing
- Company benefits optimization (vesting schedules, mega backdoor Roth)
- Buy vs. rent analysis

Key facts to apply:
- 2025 401(k) contribution limit: $23,500 (under 50), $31,000 (50+)
- 2025 IRA limit: $7,000 (under 50), $8,000 (50+)
- 2025 Roth IRA phase-out: $150,000–$165,000 (single), $236,000–$246,000 (married)
- Traditional IRA deductibility phase-out (covered by workplace plan, single): $79,000–$89,000
- NY state income tax: up to 10.9% for high earners; NYC adds up to 3.876%
- NJ state income tax: up to 10.75%
- CA state income tax: up to 13.3%; SDI 1.1%

Always:
1. Give specific, actionable advice with numbers
2. Acknowledge tax complexity and recommend consulting a licensed professional for final decisions
3. Use clear formatting with headers and bullet points
4. Flag when income limits affect strategy eligibility

IMPORTANT DISCLAIMER: This is educational information only, not personalized investment advice. Always consult a licensed financial advisor before making investment decisions.`;

function resolveApiUrl() {
  return ENV.forgeApiUrl && ENV.forgeApiUrl.trim().length > 0
    ? `${ENV.forgeApiUrl.replace(/\/$/, "")}/v1/chat/completions`
    : "https://forge.manus.im/v1/chat/completions";
}

export function registerChatStreamRoute(app: Express) {
  app.post("/api/chat/stream", async (req: Request, res: Response) => {
    // Authenticate
    let userId: number | null = null;
    try {
      const user = await sdk.authenticateRequest(req);
      if (user) userId = user.id;
    } catch {
      // unauthenticated
    }

    if (!userId) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const { message, history = [] } = req.body as {
      message: string;
      history?: Array<{ role: "user" | "assistant"; content: string }>;
    };

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    if (message.length > 2000) {
      res.status(400).json({ error: "Message too long" });
      return;
    }

    // Set up SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();

    const messages = [
      { role: "system" as const, content: FINANCIAL_SYSTEM_PROMPT },
      ...history.slice(-10).map(h => ({ role: h.role, content: h.content })),
      { role: "user" as const, content: message },
    ];

    let fullContent = "";

    try {
      const response = await fetch(resolveApiUrl(), {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${ENV.forgeApiKey}`,
        },
        body: JSON.stringify({
          model: "gemini-2.5-flash",
          messages,
          stream: true,
          max_tokens: 4096,
        }),
      });

      if (!response.ok || !response.body) {
        const errorText = await response.text().catch(() => "Unknown error");
        res.write(`data: ${JSON.stringify({ error: `LLM error: ${response.status}` })}\n\n`);
        res.end();
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") {
            res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
            continue;
          }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed?.choices?.[0]?.delta?.content;
            if (delta) {
              fullContent += delta;
              res.write(`data: ${JSON.stringify({ token: delta })}\n\n`);
            }
          } catch {
            // skip malformed SSE lines
          }
        }
      }

      // Save to DB after streaming completes
      if (fullContent) {
        await saveChatMessage({ userId, role: "user", content: message }).catch(console.error);
        await saveChatMessage({ userId, role: "assistant", content: fullContent }).catch(console.error);
      }

    } catch (err) {
      console.error("[ChatStream] Error:", err);
      res.write(`data: ${JSON.stringify({ error: "Streaming failed" })}\n\n`);
    }

    res.end();
  });
}
