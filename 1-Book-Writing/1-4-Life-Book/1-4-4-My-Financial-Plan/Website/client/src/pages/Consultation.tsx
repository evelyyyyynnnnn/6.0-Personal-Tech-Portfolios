import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  CheckCircle, Calendar, Shield, Award, Users, Star,
  MessageSquare, TrendingUp, FileText, Zap, Lock
} from "lucide-react";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";

const SERVICES = [
  {
    icon: TrendingUp,
    title: "Retirement Planning",
    desc: "Comprehensive 401(k), IRA, and Roth strategy tailored to your income, age, and goals.",
    price: "$299",
    duration: "90 min",
  },
  {
    icon: FileText,
    title: "Tax Optimization Review",
    desc: "AGI reduction strategies, state tax analysis (NY/NJ/CA), and filing optimization.",
    price: "$249",
    duration: "60 min",
  },
  {
    icon: Shield,
    title: "Asset Allocation Strategy",
    desc: "Risk-based portfolio construction with market scenario analysis and rebalancing plan.",
    price: "$199",
    duration: "60 min",
  },
  {
    icon: Zap,
    title: "Benefits Optimization",
    desc: "Maximize your 401(k) match, understand vesting, and unlock Mega Backdoor Roth.",
    price: "$149",
    duration: "45 min",
  },
];

const MEMBERSHIP_TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    color: "border-border/50",
    badgeColor: "bg-secondary text-muted-foreground",
    features: [
      "401(k) Calculator",
      "Traditional IRA Calculator",
      "Roth IRA Calculator",
      "Backdoor Roth Tutorial",
      "Basic Asset Allocation",
      "State Tax Comparison",
    ],
    locked: [],
    cta: "Get Started Free",
    ctaStyle: "border border-border/50 text-foreground hover:bg-secondary",
  },
  {
    name: "Premium",
    price: "$29",
    period: "per month",
    color: "border-primary/50 shadow-lg shadow-primary/10",
    badgeColor: "gradient-gold text-background",
    popular: true,
    features: [
      "Everything in Free",
      "AI Financial Advisor (unlimited)",
      "Personalized Retirement Planner",
      "Tax Optimization Engine",
      "Tax-Loss Harvesting Simulator",
      "Company Benefits Optimizer",
      "Mega Backdoor Roth Guide",
      "Priority email support",
    ],
    locked: [],
    cta: "Start Premium",
    ctaStyle: "gradient-gold text-background font-bold",
  },
  {
    name: "Advisory",
    price: "$99",
    period: "per month",
    color: "border-chart-1/30",
    badgeColor: "bg-chart-1/20 text-chart-1 border border-chart-1/30",
    features: [
      "Everything in Premium",
      "1 consultation/month (60 min)",
      "Personalized tax strategy report",
      "Portfolio review & rebalancing",
      "Direct advisor access",
      "Annual tax planning session",
    ],
    locked: [],
    cta: "Start Advisory",
    ctaStyle: "bg-chart-1/20 text-chart-1 border border-chart-1/30 hover:bg-chart-1/30",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah L.",
    role: "Software Engineer, NYC",
    content: "The backdoor Roth tutorial alone saved me thousands. I had no idea I was eligible — now I'm contributing $7,000/year tax-free.",
    stars: 5,
  },
  {
    name: "Michael T.",
    role: "Finance Manager, NJ",
    content: "The state tax comparison showed me I could save $8,000/year by optimizing my 401(k) contributions. The ROI on this service is incredible.",
    stars: 5,
  },
  {
    name: "Jennifer W.",
    role: "Marketing Director, CA",
    content: "After the consultation, my portfolio returned 30% in 3 months. The asset allocation advice was spot-on for the market conditions.",
    stars: 5,
    highlight: true,
  },
];

export default function Consultation() {
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", financialGoals: "", preferredTime: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.consultation.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Consultation request submitted! We'll contact you within 24 hours.");
    },
    onError: (err) => {
      toast.error("Failed to submit. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.financialGoals) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submitMutation.mutate(form);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container py-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Plans & Consultation</div>
          <h1 className="font-display text-5xl font-bold text-foreground mb-4">
            Expert Financial Guidance
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From free calculators to 1-on-1 advisory sessions with CFA and FRM certified professionals
            who have helped clients achieve exceptional returns.
          </p>
        </div>

        {/* Credentials Banner */}
        <div className="glass-card rounded-2xl p-6 mb-12 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-bold text-foreground text-sm">CFA Certified</div>
              <div className="text-xs text-muted-foreground">Chartered Financial Analyst</div>
            </div>
          </div>
          <div className="w-px h-10 bg-border/50 hidden sm:block" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-chart-1/20 border border-chart-1/30 flex items-center justify-center">
              <Shield className="w-5 h-5 text-chart-1" />
            </div>
            <div>
              <div className="font-bold text-foreground text-sm">FRM Certified</div>
              <div className="text-xs text-muted-foreground">Financial Risk Manager</div>
            </div>
          </div>
          <div className="w-px h-10 bg-border/50 hidden sm:block" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-chart-4/20 border border-chart-4/30 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-chart-4" />
            </div>
            <div>
              <div className="font-bold text-foreground text-sm">+30% in 3 Months</div>
              <div className="text-xs text-muted-foreground">Client success story</div>
            </div>
          </div>
          <div className="w-px h-10 bg-border/50 hidden sm:block" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-chart-2/20 border border-chart-2/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <div className="font-bold text-foreground text-sm">10+ Years</div>
              <div className="text-xs text-muted-foreground">Financial industry experience</div>
            </div>
          </div>
        </div>

        {/* Membership Tiers */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {MEMBERSHIP_TIERS.map(tier => (
              <div key={tier.name} className={`relative rounded-2xl border p-6 bg-card ${tier.color} ${tier.popular ? "scale-[1.02]" : ""}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="gradient-gold text-background font-bold px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <div className="mb-6">
                  <Badge className={`${tier.badgeColor} text-xs mb-3`}>{tier.name}</Badge>
                  <div className="font-display text-4xl font-bold text-foreground">{tier.price}</div>
                  <div className="text-muted-foreground text-sm">{tier.period}</div>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-chart-4 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${tier.ctaStyle}`} onClick={() => toast.info("Membership coming soon! Book a consultation to get started.")}>
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Services */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-3">1-on-1 Consultation Services</h2>
          <p className="text-muted-foreground text-center mb-8">Individual sessions with our CFA and FRM certified advisors</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map(service => (
              <div key={service.title} className="glass-card rounded-2xl p-5 hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center mb-4">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{service.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-primary">{service.price}</span>
                  <Badge className="bg-secondary text-muted-foreground border-border/50 text-xs">{service.duration}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">Client Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className={`rounded-2xl p-6 border ${t.highlight ? "border-primary/30 bg-primary/5" : "border-border/50 bg-card"}`}>
                {t.highlight && (
                  <Badge className="gradient-gold text-background text-xs mb-3">Featured Success</Badge>
                )}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">"{t.content}"</p>
                <div>
                  <div className="font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            * Past performance is not indicative of future results. Individual results may vary.
            The 30% return referenced is a specific client outcome and not a typical result.
          </p>
        </div>

        {/* Consultation Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-3">Book a Consultation</h2>
          <p className="text-muted-foreground text-center mb-8">
            Fill out the form below and our team will reach out within 24 hours to schedule your session.
          </p>

          {submitted ? (
            <div className="text-center py-12 rounded-2xl border border-chart-4/30 bg-chart-4/10">
              <CheckCircle className="w-16 h-16 text-chart-4 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Request Received!</h3>
              <p className="text-muted-foreground">
                Thank you for reaching out. Our CFA/FRM certified advisor will contact you within 24 hours
                to schedule your personalized consultation.
              </p>
            </div>
          ) : (
            <Card className="bg-card border-border/50">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Full Name *</Label>
                      <Input
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Jane Smith"
                        className="mt-1.5 bg-input border-border/60"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Email Address *</Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="jane@example.com"
                        className="mt-1.5 bg-input border-border/60"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Phone Number</Label>
                      <Input
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="+1 (555) 000-0000"
                        className="mt-1.5 bg-input border-border/60"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Preferred Time</Label>
                      <Input
                        value={form.preferredTime}
                        onChange={e => setForm(f => ({ ...f, preferredTime: e.target.value }))}
                        placeholder="e.g., Weekday evenings"
                        className="mt-1.5 bg-input border-border/60"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground">Financial Goals & Questions *</Label>
                    <Textarea
                      value={form.financialGoals}
                      onChange={e => setForm(f => ({ ...f, financialGoals: e.target.value }))}
                      placeholder="Please describe your financial situation and what you'd like to discuss. For example: 'I earn $150K in NYC, have a 401(k) with 50% match, and want to optimize my tax strategy and retirement savings...'"
                      className="mt-1.5 bg-input border-border/60 min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="w-full gradient-gold text-background font-bold py-3"
                  >
                    {submitMutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Request Consultation
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting, you agree to be contacted by our team. Your information is kept confidential.
                  </p>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 bg-secondary/30 border border-border/50 rounded-xl p-6">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-muted-foreground" />
            Important Legal Disclaimer
          </h4>
          <div className="text-xs text-muted-foreground leading-relaxed space-y-2">
            <p>WealthWise Pro and its advisors are not registered investment advisors (RIA) and do not provide personalized investment advice as defined by the Investment Advisers Act of 1940. All content, calculators, and consultation services are for educational and informational purposes only.</p>
            <p>The 30% return referenced in client testimonials represents a specific client outcome achieved through asset allocation recommendations and is not a guarantee or typical result. Past performance is not indicative of future results. All investments involve risk, including the possible loss of principal.</p>
            <p>Tax information is based on 2025 IRS guidelines and general principles. Individual tax situations vary significantly. Always consult a licensed CPA, tax attorney, or registered investment advisor before making financial decisions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
