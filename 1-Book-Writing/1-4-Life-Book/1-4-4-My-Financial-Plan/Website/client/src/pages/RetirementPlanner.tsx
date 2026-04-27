import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { TrendingUp, Target, DollarSign, Calendar, CheckCircle, AlertCircle } from "lucide-react";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}
function formatK(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return formatCurrency(n);
}

const RISK_PROFILES = {
  conservative: { stocks: 30, bonds: 60, cash: 10, return: 5, label: "Conservative", color: "text-chart-2" },
  balanced: { stocks: 60, bonds: 35, cash: 5, return: 7, label: "Balanced", color: "text-chart-1" },
  aggressive: { stocks: 85, bonds: 12, cash: 3, return: 9, label: "Aggressive", color: "text-chart-5" },
};

const CHART_COLORS = ["oklch(0.72 0.18 45)", "oklch(0.65 0.15 180)", "oklch(0.70 0.15 130)"];

export default function RetirementPlanner() {
  const [age, setAge] = useState(32);
  const [retireAge, setRetireAge] = useState(65);
  const [income, setIncome] = useState(120000);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [companyMatch, setCompanyMatch] = useState(50);
  const [matchUpTo, setMatchUpTo] = useState(6);
  const [risk, setRisk] = useState<"conservative" | "balanced" | "aggressive">("balanced");
  const [desiredMonthly, setDesiredMonthly] = useState(8000);
  const [generated, setGenerated] = useState(false);

  const profile = RISK_PROFILES[risk];
  const years = retireAge - age;

  const results = useMemo(() => {
    if (!generated) return null;

    const annualReturn = profile.return / 100;
    const k401Limit = age >= 50 ? 31000 : 23500;
    const iraLimit = age >= 50 ? 8000 : 7000;

    // Optimal allocation strategy
    const employerMatch = income * (matchUpTo / 100) * (companyMatch / 100);
    const k401Contrib = Math.min(income * 0.15, k401Limit); // 15% of income up to limit
    const rothEligible = income <= 165000;
    const iraContrib = rothEligible ? iraLimit : 0;
    const backdoorRoth = !rothEligible ? iraLimit : 0;
    const taxableContrib = Math.max(0, income * 0.20 - k401Contrib - iraContrib - backdoorRoth);

    const totalAnnual = k401Contrib + employerMatch + iraContrib + backdoorRoth + taxableContrib;

    // Projection
    const projectedBalance = currentSavings * Math.pow(1 + annualReturn, years) +
      totalAnnual * ((Math.pow(1 + annualReturn, years) - 1) / annualReturn);

    // Monthly cash flow in retirement (4% rule)
    const monthlyFromPortfolio = (projectedBalance * 0.04) / 12;
    const socialSecurity = income * 0.35 / 12; // rough estimate
    const totalMonthly = monthlyFromPortfolio + socialSecurity;

    const onTrack = totalMonthly >= desiredMonthly;

    // Year-by-year projection
    const chartData = [];
    for (let y = 0; y <= years; y += Math.max(1, Math.floor(years / 20))) {
      const bal = currentSavings * Math.pow(1 + annualReturn, y) +
        totalAnnual * ((Math.pow(1 + annualReturn, y) - 1) / annualReturn);
      chartData.push({ year: age + y, Balance: Math.round(bal) });
    }

    // Allocation breakdown
    const allocationData = [
      { name: "401(k)", value: Math.round(k401Contrib + employerMatch), color: CHART_COLORS[0] },
      { name: "IRA / Backdoor Roth", value: Math.round(iraContrib + backdoorRoth), color: CHART_COLORS[1] },
      { name: "Taxable Brokerage", value: Math.round(taxableContrib), color: CHART_COLORS[2] },
    ].filter(d => d.value > 0);

    return {
      k401Contrib, employerMatch, iraContrib, backdoorRoth, taxableContrib,
      totalAnnual, projectedBalance, monthlyFromPortfolio, socialSecurity,
      totalMonthly, onTrack, chartData, allocationData, rothEligible,
    };
  }, [generated, age, retireAge, income, currentSavings, companyMatch, matchUpTo, risk, desiredMonthly, profile, years]);

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container py-10">
        <div className="mb-10">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Retirement Planner</div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">Personalized Retirement Plan</h1>
          <p className="text-muted-foreground max-w-2xl">
            Enter your financial profile and get a customized allocation strategy, retirement projection,
            and monthly cash flow breakdown — built on CFA-level analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border/50 sticky top-24">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">Current Age</Label>
                    <Input type="number" value={age} onChange={e => setAge(Number(e.target.value))} min={20} max={64} className="mt-1.5 bg-input border-border/60 h-9" />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">Retire At</Label>
                    <Input type="number" value={retireAge} onChange={e => setRetireAge(Number(e.target.value))} min={55} max={75} className="mt-1.5 bg-input border-border/60 h-9" />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Annual Income</Label>
                  <Input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} className="mt-1.5 bg-input border-border/60 h-9" />
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Current Retirement Savings</Label>
                  <Input type="number" value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))} className="mt-1.5 bg-input border-border/60 h-9" />
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Company Match: {companyMatch}% up to {matchUpTo}%</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <Slider value={[companyMatch]} onValueChange={([v]) => setCompanyMatch(v)} min={0} max={100} step={25} />
                      <div className="text-xs text-muted-foreground mt-1">{companyMatch}%</div>
                    </div>
                    <div>
                      <Slider value={[matchUpTo]} onValueChange={([v]) => setMatchUpTo(v)} min={1} max={10} step={1} />
                      <div className="text-xs text-muted-foreground mt-1">{matchUpTo}% of salary</div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Risk Tolerance</Label>
                  <div className="flex gap-1.5 mt-2">
                    {(["conservative", "balanced", "aggressive"] as const).map(r => (
                      <button
                        key={r}
                        onClick={() => setRisk(r)}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors border capitalize ${risk === r ? "bg-primary/20 border-primary/50 text-primary" : "border-border/50 text-muted-foreground hover:bg-secondary"}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Desired Monthly Retirement Income</Label>
                  <Input type="number" value={desiredMonthly} onChange={e => setDesiredMonthly(Number(e.target.value))} className="mt-1.5 bg-input border-border/60 h-9" />
                </div>

                <Button
                  onClick={() => setGenerated(true)}
                  className="w-full gradient-gold text-background font-bold hover:opacity-90"
                >
                  Generate My Plan
                  <TrendingUp className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {!results ? (
              <div className="flex flex-col items-center justify-center h-80 rounded-2xl border border-dashed border-border/50 text-center">
                <Target className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Fill in your profile and click "Generate My Plan" to see your personalized retirement strategy.</p>
              </div>
            ) : (
              <>
                {/* Status Banner */}
                <div className={`rounded-2xl p-6 border ${results.onTrack ? "border-chart-4/30 bg-chart-4/10" : "border-chart-1/30 bg-chart-1/10"}`}>
                  <div className="flex items-start gap-4">
                    {results.onTrack
                      ? <CheckCircle className="w-8 h-8 text-chart-4 flex-shrink-0" />
                      : <AlertCircle className="w-8 h-8 text-chart-1 flex-shrink-0" />
                    }
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-1">
                        {results.onTrack ? "You're On Track!" : "Adjustment Needed"}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {results.onTrack
                          ? `Your projected retirement income of ${formatCurrency(results.totalMonthly)}/month exceeds your goal of ${formatCurrency(desiredMonthly)}/month.`
                          : `Your projected income of ${formatCurrency(results.totalMonthly)}/month is below your goal of ${formatCurrency(desiredMonthly)}/month. Consider increasing contributions or adjusting your timeline.`
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Projected Balance", value: formatK(results.projectedBalance), color: "text-primary", icon: DollarSign },
                    { label: "Monthly Income", value: formatCurrency(results.totalMonthly), color: "text-chart-4", icon: Calendar },
                    { label: "Annual Savings", value: formatCurrency(results.totalAnnual), color: "text-chart-1", icon: TrendingUp },
                    { label: "Years to Retire", value: `${retireAge - age}`, color: "text-chart-2", icon: Target },
                  ].map(item => (
                    <div key={item.label} className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                      <item.icon className="w-4 h-4 text-muted-foreground mb-2" />
                      <div className={`font-display text-xl font-bold ${item.color}`}>{item.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recommended Allocation */}
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold text-foreground">Recommended Annual Contribution Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        {[
                          { label: "Your 401(k) Contribution", value: results.k401Contrib, note: "Pre-tax, reduces taxable income" },
                          { label: "Employer Match", value: results.employerMatch, note: "Free money — always maximize!" },
                          { label: results.rothEligible ? "Roth IRA" : "Backdoor Roth IRA", value: results.iraContrib + results.backdoorRoth, note: results.rothEligible ? "Tax-free growth" : "Via non-deductible Traditional IRA" },
                          { label: "Taxable Brokerage", value: results.taxableContrib, note: "Flexible, no contribution limits" },
                        ].map(item => (
                          <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50">
                            <div>
                              <div className="text-sm font-medium text-foreground">{item.label}</div>
                              <div className="text-xs text-muted-foreground">{item.note}</div>
                            </div>
                            <div className="text-sm font-bold text-primary">{formatCurrency(item.value)}</div>
                          </div>
                        ))}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30">
                          <div className="text-sm font-bold text-foreground">Total Annual Savings</div>
                          <div className="text-sm font-bold text-primary">{formatCurrency(results.totalAnnual)}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Savings Distribution</div>
                        <ResponsiveContainer width="100%" height={180}>
                          <PieChart>
                            <Pie data={results.allocationData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                              {results.allocationData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{ background: "oklch(0.13 0.018 240)", border: "1px solid oklch(0.22 0.02 240)", borderRadius: "8px" }}
                              formatter={(v: number) => formatCurrency(v)}
                            />
                            <Legend formatter={(v) => <span style={{ color: "oklch(0.60 0.01 240)", fontSize: "12px" }}>{v}</span>} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Growth Chart */}
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold text-foreground flex items-center justify-between">
                      Portfolio Growth Projection
                      <Badge className="bg-primary/15 text-primary border-primary/30 text-xs">
                        {profile.return}% annual return ({profile.label})
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={results.chartData}>
                        <defs>
                          <linearGradient id="planGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="oklch(0.72 0.18 45)" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="oklch(0.72 0.18 45)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.02 240)" />
                        <XAxis dataKey="year" tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
                        <YAxis tickFormatter={v => formatK(v)} tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
                        <Tooltip
                          contentStyle={{ background: "oklch(0.13 0.018 240)", border: "1px solid oklch(0.22 0.02 240)", borderRadius: "8px" }}
                          formatter={(v: number) => formatCurrency(v)}
                        />
                        <Area type="monotone" dataKey="Balance" stroke="oklch(0.72 0.18 45)" fill="url(#planGrad)" strokeWidth={2.5} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Monthly Cash Flow */}
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold text-foreground">Retirement Monthly Cash Flow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { label: "Portfolio Withdrawals (4% rule)", value: results.monthlyFromPortfolio, color: "bg-chart-1" },
                        { label: "Estimated Social Security", value: results.socialSecurity, color: "bg-chart-2" },
                      ].map(item => (
                        <div key={item.label}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">{item.label}</span>
                            <span className="font-medium text-foreground">{formatCurrency(item.value)}/mo</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full">
                            <div
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${Math.min(100, (item.value / results.totalMonthly) * 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-3 border-t border-border/50">
                        <span className="font-semibold text-foreground">Total Monthly Income</span>
                        <span className="font-display text-xl font-bold text-primary">{formatCurrency(results.totalMonthly)}/mo</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 bg-secondary/30 border border-border/50 rounded-xl p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Disclaimer:</strong> Projections are based on simplified assumptions including constant returns and contributions.
            Actual results will vary. Social Security estimates are rough approximations. This is for educational purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
