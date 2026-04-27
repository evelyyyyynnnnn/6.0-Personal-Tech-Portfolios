import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import {
  Calculator, TrendingUp, Shield, Brain, Building2, BarChart3,
  Award, Star, ChevronRight, CheckCircle, ArrowRight, Users,
  FileText, Zap, DollarSign, MapPin
} from "lucide-react";

const FEATURES = [
  {
    icon: Calculator,
    title: "Retirement Calculators",
    desc: "401(k), Traditional IRA, Roth IRA, and Backdoor Roth with real 2025 IRS limits and visual projections.",
    href: "/calculators",
    color: "text-chart-1",
    bg: "bg-chart-1/10",
    border: "border-chart-1/20",
  },
  {
    icon: TrendingUp,
    title: "Retirement Planner",
    desc: "Input your age, income, and risk tolerance. Get a personalized allocation strategy and retirement projection.",
    href: "/planner",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: FileText,
    title: "Tax Optimization Engine",
    desc: "Traditional vs Roth comparison, tax-loss harvesting, NY/NJ/CA state analysis, and withdrawal strategy.",
    href: "/tax",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
    border: "border-chart-4/20",
  },
  {
    icon: BarChart3,
    title: "Asset Allocation Advisor",
    desc: "Age-based models, risk profiles (conservative/balanced/aggressive), and market scenario simulations.",
    href: "/allocation",
    color: "text-chart-2",
    bg: "bg-chart-2/10",
    border: "border-chart-2/20",
  },
  {
    icon: Building2,
    title: "Benefits Optimizer",
    desc: "Maximize 401(k) match, understand vesting schedules, and unlock the Mega Backdoor Roth strategy.",
    href: "/benefits",
    color: "text-chart-5",
    bg: "bg-chart-5/10",
    border: "border-chart-5/20",
  },
  {
    icon: Brain,
    title: "AI Financial Advisor",
    desc: "Ask anything — Roth vs Traditional, state taxes, withdrawal order — powered by CFA/FRM expertise.",
    href: "/ai-advisor",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
];

const EDUCATION_ITEMS = [
  { num: "01", title: "What is a 401(k)?", desc: "Pre-tax employer-sponsored retirement savings with employer match and 2025 limit of $23,500.", href: "/calculators" },
  { num: "02", title: "What is a Roth IRA?", desc: "After-tax contributions with completely tax-free growth and withdrawals in retirement.", href: "/calculators" },
  { num: "03", title: "Backdoor Roth Tutorial", desc: "How high earners above the $165K income limit can still contribute to a Roth IRA.", href: "/calculators" },
  { num: "04", title: "Tax Filing Guide", desc: "Avoid common pitfalls: AGI calculation, deductibility phase-outs, and Form 8606 for IRA basis.", href: "/tax" },
];

const STATS = [
  { value: "$2.3M+", label: "Avg. projected retirement savings optimized" },
  { value: "30%", label: "Client portfolio return in 3 months*" },
  { value: "10+", label: "Years of financial industry experience" },
  { value: "NY/NJ/CA", label: "Multi-state tax optimization coverage" },
];

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-chart-1/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
        </div>

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Credential badges */}
            <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
              <Badge className="bg-primary/15 text-primary border border-primary/30 px-4 py-1.5 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 mr-1.5" />
                CFA — Chartered Financial Analyst
              </Badge>
              <Badge className="bg-chart-1/15 text-chart-1 border border-chart-1/30 px-4 py-1.5 text-xs font-semibold">
                <Shield className="w-3.5 h-3.5 mr-1.5" />
                FRM — Financial Risk Manager
              </Badge>
            </div>

            <h1 className="font-display text-6xl sm:text-7xl font-bold text-foreground leading-tight mb-6">
              Smart Money for
              <span className="block text-primary">
                Office Workers
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Built by CFA and FRM certified professionals with 10+ years on Wall Street.
              Master your 401(k), IRA, taxes, and retirement — the way financial insiders do it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/calculators">
                <Button className="gradient-gold text-background font-bold px-8 py-3 text-base h-auto">
                  Try Free Calculators
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/consultation">
                <Button variant="outline" className="border-border/60 text-foreground px-8 py-3 text-base h-auto hover:bg-secondary">
                  Book a Consultation
                </Button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {STATS.map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-secondary/20">
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Platform Features</div>
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Everything You Need to Win Financially
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From calculators to AI-powered advice — all the tools a savvy office worker needs to build wealth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(feature => (
              <Link key={feature.title} href={feature.href}>
                <div className={`group glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 cursor-pointer h-full`}>
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{feature.desc}</p>
                  <div className={`flex items-center gap-1 text-xs font-semibold ${feature.color}`}>
                    Explore <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Education Library */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Education Library</div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-4">
                Learn What Your HR Never Told You
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our education library covers the financial topics that matter most to office workers —
                from understanding your first 401(k) to advanced tax optimization strategies used by high earners.
              </p>
              <Link href="/calculators">
                <Button className="gradient-gold text-background font-bold">
                  Explore Education Library
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {EDUCATION_ITEMS.map(item => (
                <Link key={item.num} href={item.href}>
                  <div className="flex gap-4 p-5 rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:bg-secondary/30 transition-all cursor-pointer group">
                    <div className="font-display text-2xl font-bold text-primary/30 group-hover:text-primary/60 transition-colors flex-shrink-0 w-8">{item.num}</div>
                    <div>
                      <div className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1 ml-auto" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-20 bg-secondary/20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Client Success</div>
              <h2 className="font-display text-4xl font-bold text-foreground">Real Results from Real Clients</h2>
            </div>

            <div className="glass-card rounded-2xl p-8 border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
                </div>
                <blockquote className="font-display text-2xl text-foreground leading-relaxed mb-6">
                  "The asset allocation advice completely changed how I think about my portfolio.
                  Following the recommended strategy, my portfolio achieved a <span className="text-primary font-bold">30% return in just 3 months</span>.
                  The combination of market timing, liquidity analysis, and risk management was exactly what I needed."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Jennifer W.</div>
                    <div className="text-sm text-muted-foreground">Marketing Director, California</div>
                  </div>
                  <Badge className="ml-auto gradient-gold text-background font-bold">+30% in 3 months</Badge>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              * Past performance is not indicative of future results. The 30% return is a specific client outcome and not a typical result.
              All investments involve risk. This is not investment advice.
            </p>
          </div>
        </div>
      </section>

      {/* Why Us / Credentials */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Our Credentials</div>
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Built by Financial Professionals
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Not just another fintech app — WealthWise Pro is built by certified professionals
              who have worked in the financial industry for over a decade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Award,
                title: "CFA Designation",
                subtitle: "Chartered Financial Analyst",
                desc: "The gold standard in investment analysis and portfolio management. Covers equity, fixed income, derivatives, and alternative investments.",
                color: "text-primary",
                bg: "bg-primary/10",
                border: "border-primary/20",
              },
              {
                icon: Shield,
                title: "FRM Designation",
                subtitle: "Financial Risk Manager",
                desc: "Expert in market risk, credit risk, operational risk, and risk management in investment management — essential for protecting your portfolio.",
                color: "text-chart-1",
                bg: "bg-chart-1/10",
                border: "border-chart-1/20",
              },
              {
                icon: Zap,
                title: "Computer Science",
                subtitle: "Professional CS Certification",
                desc: "Our technical co-founder brings deep expertise in financial modeling, data analysis, and building the quantitative tools that power this platform.",
                color: "text-chart-2",
                bg: "bg-chart-2/10",
                border: "border-chart-2/20",
              },
            ].map(item => (
              <div key={item.title} className="glass-card rounded-2xl p-6 text-center">
                <div className={`w-14 h-14 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <div className={`font-display text-xl font-bold ${item.color} mb-1`}>{item.title}</div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{item.subtitle}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* State Tax Callout */}
      <section className="py-16 bg-secondary/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <div className="text-xs font-semibold text-primary uppercase tracking-widest">Multi-State Coverage</div>
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              NY, NJ, and CA — The Highest-Tax States
            </h2>
            <p className="text-muted-foreground mb-8">
              Living in New York, New Jersey, or California means you face some of the highest combined tax burdens in the nation.
              Our tax engine specifically models these states' complex tax codes to help you optimize your take-home pay.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { state: "New York", rate: "up to 10.9%", note: "+ NYC 3.876%" },
                { state: "New Jersey", rate: "up to 10.75%", note: "No city income tax" },
                { state: "California", rate: "up to 13.3%", note: "+ 1.1% SDI" },
              ].map(item => (
                <div key={item.state} className="glass-card rounded-xl p-4">
                  <div className="font-semibold text-foreground mb-1">{item.state}</div>
                  <div className="font-display text-xl font-bold text-primary">{item.rate}</div>
                  <div className="text-xs text-muted-foreground">{item.note}</div>
                </div>
              ))}
            </div>
            <Link href="/tax">
              <Button className="gradient-gold text-background font-bold">
                Analyze My State Taxes
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-5xl font-bold text-foreground mb-6">
              Start Optimizing Your
              <span className="block text-primary">Financial Future Today</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Join thousands of office workers who are finally taking control of their 401(k), taxes, and retirement.
              Free tools available now — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculators">
                <Button className="gradient-gold text-background font-bold px-10 py-4 text-base h-auto">
                  Start for Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/consultation">
                <Button variant="outline" className="border-border/60 text-foreground px-10 py-4 text-base h-auto hover:bg-secondary">
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <footer className="border-t border-border/50 py-8 bg-secondary/20">
        <div className="container">
          <p className="text-xs text-muted-foreground text-center leading-relaxed max-w-4xl mx-auto">
            <strong className="text-foreground">Disclaimer:</strong> WealthWise Pro is an educational platform and does not constitute personalized investment, tax, or legal advice.
            CFA® and Chartered Financial Analyst® are registered trademarks owned by CFA Institute. FRM® is a registered trademark of the Global Association of Risk Professionals.
            All calculators use 2025 IRS guidelines and simplified assumptions. Past performance is not indicative of future results.
            The 30% return referenced is a specific client outcome and not a typical result. Always consult a licensed financial advisor before making investment decisions.
          </p>
        </div>
      </footer>
    </div>
  );
}
