import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Streamdown } from "streamdown";
import { Send, Bot, User, Sparkles, Lock, RefreshCw, Info } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "I earn $150K/year — should I choose Roth or Traditional IRA?",
  "I'm in NJ, how much state tax will I pay on $120K income?",
  "What is the Backdoor Roth IRA and how do I do it?",
  "How does the 401(k) employer match work?",
  "What's the optimal withdrawal order in retirement?",
  "I'm 35 — what asset allocation should I have?",
  "What is tax-loss harvesting and when should I use it?",
  "How does the pro-rata rule affect my Backdoor Roth?",
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  );
}

export default function AIAdvisor() {
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const { data: history } = trpc.chat.history.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (history && history.length > 0 && messages.length === 0) {
      setMessages(history.map(m => ({
        role: m.role as "user" | "assistant",
        content: m.content,
        timestamp: new Date(m.createdAt),
      })));
    }
  }, [history]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent, isLoading]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setStreamingContent("");

    // Build history for context (last 10 messages)
    const historyForApi = messages.slice(-10).map(m => ({
      role: m.role,
      content: m.content,
    }));

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText, history: historyForApi }),
        signal: controller.signal,
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Please sign in to use the AI advisor.");
        } else {
          toast.error("Failed to get response. Please try again.");
        }
        setMessages(prev => prev.filter(m => m !== userMessage));
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let fullContent = "";

      setIsLoading(false); // Stop typing indicator, start streaming

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (!data) continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              toast.error(parsed.error);
              break;
            }
            if (parsed.done) continue;
            if (parsed.token) {
              fullContent += parsed.token;
              setStreamingContent(fullContent);
            }
          } catch {
            // skip malformed lines
          }
        }
      }

      if (fullContent) {
        setStreamingContent("");
        setMessages(prev => [...prev, {
          role: "assistant",
          content: fullContent,
          timestamp: new Date(),
        }]);
      }

    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") return;
      toast.error("Connection error. Please try again.");
      setMessages(prev => prev.filter(m => m !== userMessage));
    } finally {
      setIsLoading(false);
      setStreamingContent("");
      abortRef.current = null;
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setStreamingContent("");
    setIsLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-20">
        <div className="container py-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl gradient-gold flex items-center justify-center mx-auto mb-6">
              <Bot className="w-10 h-10 text-background" />
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">AI Financial Advisor</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Get instant answers to your financial questions from our CFA and FRM-certified AI advisor.
              Sign in to start your personalized financial conversation.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8 text-left">
              {SUGGESTED_QUESTIONS.slice(0, 4).map(q => (
                <div key={q} className="p-4 rounded-xl border border-border/50 bg-secondary/30">
                  <p className="text-sm text-muted-foreground">"{q}"</p>
                </div>
              ))}
            </div>
            <a href={getLoginUrl()}>
              <Button className="gradient-gold text-background font-bold px-8 py-3 text-base">
                <Lock className="mr-2 w-4 h-4" />
                Sign In to Ask the AI Advisor
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">AI Financial Advisor</div>
              <h1 className="font-display text-3xl font-bold text-foreground">Ask Anything</h1>
              <p className="text-muted-foreground text-sm mt-1">Powered by CFA + FRM expertise • 2025 tax law • Real-time streaming</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-chart-4/15 text-chart-4 border-chart-4/30 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-chart-4 mr-1.5 animate-pulse inline-block" />
                Online
              </Badge>
              {messages.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearChat} className="text-xs">
                  <RefreshCw className="w-3 h-3 mr-1.5" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <Card className="bg-card border-border/50 mb-4">
            <CardContent className="p-0">
              <div className="h-[500px] overflow-y-auto p-6 space-y-6">
                {messages.length === 0 && !isLoading && !streamingContent && (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center mb-4">
                      <Sparkles className="w-8 h-8 text-background" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">How can I help you today?</h3>
                    <p className="text-muted-foreground text-sm mb-6 max-w-md">
                      Ask me anything about 401(k), IRA, taxes, asset allocation, or retirement planning.
                      I'm trained on CFA and FRM-level financial knowledge with 2025 IRS rules.
                    </p>
                    <div className="grid grid-cols-2 gap-2 w-full max-w-lg">
                      {SUGGESTED_QUESTIONS.slice(0, 6).map(q => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="text-left p-3 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/60 hover:border-primary/30 transition-all text-xs text-muted-foreground hover:text-foreground"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((message, i) => (
                  <div key={i} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-xl gradient-gold flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-background" />
                      </div>
                    )}
                    <div className={`max-w-[80%] ${message.role === "user" ? "order-first" : ""}`}>
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-secondary/50 border border-border/50"
                      }`}>
                        {message.role === "assistant" ? (
                          <div className="text-sm text-foreground prose-sm max-w-none">
                            <Streamdown>{message.content}</Streamdown>
                          </div>
                        ) : (
                          <p className="text-sm">{message.content}</p>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 px-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-xl bg-secondary border border-border/50 flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Real streaming message */}
                {streamingContent && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-xl gradient-gold flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-background" />
                    </div>
                    <div className="max-w-[80%]">
                      <div className="rounded-2xl px-4 py-3 bg-secondary/50 border border-border/50">
                        <div className="text-sm text-foreground prose-sm max-w-none">
                          <Streamdown>{streamingContent}</Streamdown>
                          <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loading indicator (before first token arrives) */}
                {isLoading && !streamingContent && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-xl gradient-gold flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-background" />
                    </div>
                    <div className="rounded-2xl bg-secondary/50 border border-border/50">
                      <TypingIndicator />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </CardContent>
          </Card>

          {/* Input Area */}
          <div className="flex gap-3">
            <Input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about 401(k), IRA, taxes, retirement planning..."
              className="bg-input border-border/60 h-12 text-sm"
              disabled={isLoading || !!streamingContent}
            />
            <Button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading || !!streamingContent}
              className="gradient-gold text-background font-bold h-12 px-5 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Disclaimer */}
          <Alert className="mt-4 border-border/30 bg-secondary/20">
            <Info className="w-3.5 h-3.5 text-muted-foreground" />
            <AlertDescription className="text-xs text-muted-foreground">
              <strong className="text-foreground">Educational purposes only.</strong> This AI advisor provides general financial information based on CFA and FRM expertise.
              It does not constitute personalized investment, tax, or legal advice. Always consult a licensed professional before making financial decisions.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
