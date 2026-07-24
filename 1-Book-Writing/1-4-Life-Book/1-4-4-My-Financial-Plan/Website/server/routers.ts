import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { createConsultation, getConsultations, saveChatMessage, getChatHistory } from "./db";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  consultation: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        financialGoals: z.string().min(10),
        preferredTime: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await createConsultation({
          userId: ctx.user?.id ?? null,
          name: input.name,
          email: input.email,
          phone: input.phone ?? null,
          financialGoals: input.financialGoals,
          preferredTime: input.preferredTime ?? null,
        });

        // Notify owner
        const notifContent = `
New consultation request received:

**Name:** ${input.name}
**Email:** ${input.email}
**Phone:** ${input.phone || "Not provided"}
**Preferred Time:** ${input.preferredTime || "Flexible"}

**Financial Goals:**
${input.financialGoals}
        `.trim();

        await notifyOwner({
          title: `New Consultation Request from ${input.name}`,
          content: notifContent,
        });

        return { success: true };
      }),

    list: adminProcedure.query(async () => {
      return getConsultations();
    }),
  }),

  chat: router({
    ask: protectedProcedure
      .input(z.object({
        message: z.string().min(1).max(2000),
        history: z.array(z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string(),
        })).optional().default([]),
      }))
      .mutation(async ({ input, ctx }) => {
        const systemPrompt = `You are WealthWise Pro's AI financial advisor — a sophisticated assistant built on the expertise of CFA (Chartered Financial Analyst) and FRM (Financial Risk Manager) certified professionals with extensive experience at top financial institutions including BlackRock.

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
- NY state income tax: up to 10.9% for high earners
- NJ state income tax: up to 10.75%
- CA state income tax: up to 13.3%

Always:
1. Give specific, actionable advice with numbers
2. Acknowledge tax complexity and recommend consulting a licensed professional for final decisions
3. Use clear formatting with headers and bullet points
4. Flag when income limits affect strategy eligibility

IMPORTANT DISCLAIMER: This is educational information only, not personalized investment advice. Always consult a licensed financial advisor before making investment decisions.`;

        const messages = [
          { role: "system" as const, content: systemPrompt },
          ...input.history.map(h => ({ role: h.role as "user" | "assistant", content: h.content })),
          { role: "user" as const, content: input.message },
        ];

        const response = await invokeLLM({ messages });
        const rawContent = response.choices[0]?.message?.content;
        const assistantContent = typeof rawContent === 'string' ? rawContent : "I apologize, I couldn't generate a response. Please try again.";

        // Save to DB
        await saveChatMessage({ userId: ctx.user.id, role: "user", content: input.message });
        await saveChatMessage({ userId: ctx.user.id, role: "assistant", content: assistantContent });

        return { content: assistantContent };
      }),

    history: protectedProcedure.query(async ({ ctx }) => {
      const messages = await getChatHistory(ctx.user.id, 50);
      return messages.reverse();
    }),
  }),
});

export type AppRouter = typeof appRouter;
