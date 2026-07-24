import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";
import { Calculator, Info, CheckCircle, AlertCircle, TrendingUp, BookOpen, ChevronDown, ChevronUp } from "lucide-react";

// 2025 limits
const LIMITS_2025 = {
  k401_under50: 23500,
  k401_over50: 31000,
  ira_under50: 7000,
  ira_over50: 8000,
  rothPhaseoutSingle_start: 150000,
  rothPhaseoutSingle_end: 165000,
  rothPhaseoutMFJ_start: 236000,
  rothPhaseoutMFJ_end: 246000,
  traditionalIRAPhaseout_single_start: 79000,
  traditionalIRAPhaseout_single_end: 89000,
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function formatK(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return formatCurrency(n);
}

function compoundGrowth(annual: number, rate: number, years: number): number {
  return annual * ((Math.pow(1 + rate, years) - 1) / rate);
}

// ─── 401(k) Calculator ─────────────────────────────────────────────────────
function K401Calculator() {
  const [salary, setSalary] = useState(100000);
  const [contribPct, setContribPct] = useState(10);
  const [matchPct, setMatchPct] = useState(50);
  const [matchUpTo, setMatchUpTo] = useState(6);
  const [age, setAge] = useState(30);
  const [returnRate, setReturnRate] = useState(7);
  const [showEdu, setShowEdu] = useState(false);

  const retireAge = 65;
  const years = retireAge - age;
  const isOver50 = age >= 50;
  const limit = isOver50 ? LIMITS_2025.k401_over50 : LIMITS_2025.k401_under50;

  const yourContrib = Math.min(salary * (contribPct / 100), limit);
  const employerMatch = salary * Math.min(contribPct / 100, matchUpTo / 100) * (matchPct / 100);
  const totalAnnual = yourContrib + employerMatch;
  const federalTaxSavings = yourContrib * 0.22; // approx 22% bracket

  const projectedBalance = compoundGrowth(totalAnnual, returnRate / 100, years);

  const chartData = useMemo(() => {
    const data = [];
    for (let y = 0; y <= years; y += Math.max(1, Math.floor(years / 20))) {
      const yours = compoundGrowth(yourContrib, returnRate / 100, y);
      const employer = compoundGrowth(employerMatch, returnRate / 100, y);
      data.push({
        year: age + y,
        "Your Contributions": Math.round(yours),
        "Employer Match": Math.round(employer),
        Total: Math.round(yours + employer),
      });
    }
    return data;
  }, [yourContrib, employerMatch, returnRate, years, age]);

  const contribWarning = yourContrib >= limit;

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <Label className="text-sm font-medium text-foreground">Annual Salary</Label>
            <div className="mt-2 flex items-center gap-3">
              <Input
                type="number"
                value={salary}
                onChange={e => setSalary(Number(e.target.value))}
                className="bg-input border-border/60"
              />
              <span className="text-muted-foreground text-sm w-20">{formatCurrency(salary)}</span>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground">Your Contribution: {contribPct}%</Label>
            <Slider
              value={[contribPct]}
              onValueChange={([v]) => setContribPct(v)}
              min={1} max={30} step={1}
              className="mt-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1%</span><span>Annual: {formatCurrency(yourContrib)}</span><span>30%</span>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground">Employer Match: {matchPct}% up to {matchUpTo}% of salary</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <Label className="text-xs text-muted-foreground">Match %</Label>
                <Slider value={[matchPct]} onValueChange={([v]) => setMatchPct(v)} min={0} max={100} step={25} className="mt-2" />
                <div className="text-xs text-muted-foreground mt-1">{matchPct}%</div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Up to % of salary</Label>
                <Slider value={[matchUpTo]} onValueChange={([v]) => setMatchUpTo(v)} min={1} max={10} step={1} className="mt-2" />
                <div className="text-xs text-muted-foreground mt-1">{matchUpTo}%</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-medium text-foreground">Current Age</Label>
              <Input type="number" value={age} onChange={e => setAge(Number(e.target.value))} min={18} max={64} className="mt-2 bg-input border-border/60" />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">Expected Return: {returnRate}%</Label>
              <Slider value={[returnRate]} onValueChange={([v]) => setReturnRate(v)} min={3} max={12} step={0.5} className="mt-3" />
            </div>
          </div>

          {contribWarning && (
            <Alert className="border-primary/30 bg-primary/10">
              <AlertCircle className="w-4 h-4 text-primary" />
              <AlertDescription className="text-sm text-foreground">
                You've hit the 2025 IRS limit of {formatCurrency(limit)}. Consider a taxable brokerage or Mega Backdoor Roth.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Your Annual Contribution", value: formatCurrency(yourContrib), color: "text-chart-1" },
              { label: "Employer Match", value: formatCurrency(employerMatch), color: "text-chart-2" },
              { label: "Federal Tax Savings", value: formatCurrency(federalTaxSavings), color: "text-chart-4" },
              { label: `Projected at 65`, value: formatK(projectedBalance), color: "text-primary" },
            ].map(item => (
              <div key={item.label} className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                <div className={`font-display text-xl font-bold ${item.color}`}>{item.value}</div>
              </div>
            ))}
          </div>

          <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
            <div className="text-xs text-muted-foreground mb-1">2025 Contribution Limit</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-secondary rounded-full h-2">
                <div
                  className="gradient-gold h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (yourContrib / limit) * 100)}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{Math.round((yourContrib / limit) * 100)}%</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {formatCurrency(yourContrib)} / {formatCurrency(limit)} {isOver50 ? "(50+ catch-up)" : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
        <h4 className="text-sm font-semibold text-foreground mb-4">Portfolio Growth Projection</h4>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.72 0.18 45)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.72 0.18 45)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.65 0.15 180)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.65 0.15 180)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.02 240)" />
            <XAxis dataKey="year" tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
            <YAxis tickFormatter={v => formatK(v)} tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: "oklch(0.13 0.018 240)", border: "1px solid oklch(0.22 0.02 240)", borderRadius: "8px" }}
              labelStyle={{ color: "oklch(0.96 0.005 240)" }}
              formatter={(v: number) => formatCurrency(v)}
            />
            <Area type="monotone" dataKey="Your Contributions" stroke="oklch(0.72 0.18 45)" fill="url(#grad1)" strokeWidth={2} />
            <Area type="monotone" dataKey="Employer Match" stroke="oklch(0.65 0.15 180)" fill="url(#grad2)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Education */}
      <div className="border border-border/50 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowEdu(!showEdu)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground">What is a 401(k)?</span>
          </div>
          {showEdu ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {showEdu && (
          <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>A <strong className="text-foreground">401(k)</strong> is an employer-sponsored retirement savings plan that allows you to contribute pre-tax dollars, reducing your taxable income today. Your money grows tax-deferred until withdrawal in retirement.</p>
            <p><strong className="text-foreground">Key advantages:</strong> Employer match is essentially free money — always contribute at least enough to capture the full match. The 2025 limit is $23,500 ($31,000 if age 50+).</p>
            <p><strong className="text-foreground">Tax impact:</strong> If you're in the 22% bracket and contribute $10,000, you save $2,200 in federal taxes this year. The trade-off is paying taxes on withdrawals in retirement.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Traditional IRA Calculator ────────────────────────────────────────────
function TraditionalIRACalculator() {
  const [income, setIncome] = useState(80000);
  const [age, setAge] = useState(35);
  const [filingStatus, setFilingStatus] = useState<"single" | "mfj">("single");
  const [hasPlan, setHasPlan] = useState(true);
  const [returnRate, setReturnRate] = useState(7);
  const [showEdu, setShowEdu] = useState(false);

  const isOver50 = age >= 50;
  const limit = isOver50 ? LIMITS_2025.ira_over50 : LIMITS_2025.ira_under50;
  const years = 65 - age;

  // Deductibility
  let deductible = limit;
  let deductibilityNote = "Fully deductible";
  let deductibilityColor = "text-chart-4";

  if (hasPlan) {
    const start = filingStatus === "single" ? LIMITS_2025.traditionalIRAPhaseout_single_start : 126000;
    const end = filingStatus === "single" ? LIMITS_2025.traditionalIRAPhaseout_single_end : 146000;
    if (income >= end) {
      deductible = 0;
      deductibilityNote = "Not deductible (consider Backdoor Roth)";
      deductibilityColor = "text-destructive";
    } else if (income > start) {
      const ratio = 1 - (income - start) / (end - start);
      deductible = Math.round(limit * ratio / 10) * 10;
      deductibilityNote = `Partially deductible (${Math.round(ratio * 100)}%)`;
      deductibilityColor = "text-chart-1";
    }
  }

  const taxSavings = deductible * 0.22;
  const projected = compoundGrowth(limit, returnRate / 100, years);

  const chartData = useMemo(() => {
    return Array.from({ length: Math.floor(years / 5) + 1 }, (_, i) => {
      const y = i * 5;
      return {
        year: age + y,
        Balance: Math.round(compoundGrowth(limit, returnRate / 100, y)),
      };
    });
  }, [limit, returnRate, years, age]);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-medium text-foreground">Annual Income (MAGI)</Label>
              <Input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} className="mt-2 bg-input border-border/60" />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">Current Age</Label>
              <Input type="number" value={age} onChange={e => setAge(Number(e.target.value))} min={18} max={64} className="mt-2 bg-input border-border/60" />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground">Filing Status</Label>
            <div className="flex gap-2 mt-2">
              {(["single", "mfj"] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setFilingStatus(s)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors border ${
                    filingStatus === s ? "bg-primary/20 border-primary/50 text-primary" : "border-border/50 text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {s === "single" ? "Single" : "Married Filing Jointly"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground">Covered by workplace plan?</Label>
            <div className="flex gap-2 mt-2">
              {[true, false].map(v => (
                <button
                  key={String(v)}
                  onClick={() => setHasPlan(v)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors border ${
                    hasPlan === v ? "bg-primary/20 border-primary/50 text-primary" : "border-border/50 text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {v ? "Yes (has 401k)" : "No"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground">Expected Return: {returnRate}%</Label>
            <Slider value={[returnRate]} onValueChange={([v]) => setReturnRate(v)} min={3} max={12} step={0.5} className="mt-3" />
          </div>
        </div>

        <div className="space-y-4">
          <div className={`rounded-xl p-4 border ${deductible === limit ? "border-chart-4/30 bg-chart-4/10" : deductible === 0 ? "border-destructive/30 bg-destructive/10" : "border-chart-1/30 bg-chart-1/10"}`}>
            <div className="text-xs text-muted-foreground mb-1">Deductibility Status</div>
            <div className={`font-semibold text-sm ${deductibilityColor}`}>{deductibilityNote}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Deductible amount: {formatCurrency(deductible)} of {formatCurrency(limit)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Annual Contribution", value: formatCurrency(limit), color: "text-chart-1" },
              { label: "Tax Savings This Year", value: formatCurrency(taxSavings), color: "text-chart-4" },
              { label: "Years to Grow", value: `${years} years`, color: "text-chart-2" },
              { label: "Projected at 65", value: formatK(projected), color: "text-primary" },
            ].map(item => (
              <div key={item.label} className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                <div className={`font-display text-xl font-bold ${item.color}`}>{item.value}</div>
              </div>
            ))}
          </div>

          {deductible === 0 && (
            <Alert className="border-chart-1/30 bg-chart-1/10">
              <Info className="w-4 h-4 text-chart-1" />
              <AlertDescription className="text-sm text-foreground">
                Your income exceeds the deductibility limit. Consider a <strong>Backdoor Roth IRA</strong> — contribute to a non-deductible Traditional IRA, then convert to Roth.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
        <h4 className="text-sm font-semibold text-foreground mb-4">IRA Balance Projection to Age 65</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.02 240)" />
            <XAxis dataKey="year" tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
            <YAxis tickFormatter={v => formatK(v)} tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: "oklch(0.13 0.018 240)", border: "1px solid oklch(0.22 0.02 240)", borderRadius: "8px" }}
              formatter={(v: number) => formatCurrency(v)}
            />
            <Bar dataKey="Balance" fill="oklch(0.65 0.15 180)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border border-border/50 rounded-xl overflow-hidden">
        <button onClick={() => setShowEdu(!showEdu)} className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground">What is a Traditional IRA?</span>
          </div>
          {showEdu ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {showEdu && (
          <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>A <strong className="text-foreground">Traditional IRA</strong> allows pre-tax contributions (if deductible), reducing your taxable income now. Growth is tax-deferred, and you pay taxes on withdrawals in retirement.</p>
            <p><strong className="text-foreground">Deductibility depends on:</strong> Whether you or your spouse are covered by a workplace retirement plan, and your MAGI. If you have a 401(k) and earn over $89,000 (single) or $146,000 (MFJ), your contribution is not deductible.</p>
            <p><strong className="text-foreground">Key rule:</strong> Even non-deductible contributions grow tax-deferred. Track your basis to avoid double taxation on withdrawal.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Roth IRA Calculator ────────────────────────────────────────────────────
function RothIRACalculator() {
  const [income, setIncome] = useState(120000);
  const [age, setAge] = useState(30);
  const [filingStatus, setFilingStatus] = useState<"single" | "mfj">("single");
  const [returnRate, setReturnRate] = useState(7);
  const [showEdu, setShowEdu] = useState(false);

  const isOver50 = age >= 50;
  const limit = isOver50 ? LIMITS_2025.ira_over50 : LIMITS_2025.ira_under50;
  const years = 65 - age;

  const phaseStart = filingStatus === "single" ? LIMITS_2025.rothPhaseoutSingle_start : LIMITS_2025.rothPhaseoutMFJ_start;
  const phaseEnd = filingStatus === "single" ? LIMITS_2025.rothPhaseoutSingle_end : LIMITS_2025.rothPhaseoutMFJ_end;

  let eligibleContrib = limit;
  let eligibilityNote = "Fully eligible";
  let eligibilityColor = "text-chart-4";

  if (income >= phaseEnd) {
    eligibleContrib = 0;
    eligibilityNote = "Ineligible — consider Backdoor Roth";
    eligibilityColor = "text-destructive";
  } else if (income > phaseStart) {
    const ratio = 1 - (income - phaseStart) / (phaseEnd - phaseStart);
    eligibleContrib = Math.max(200, Math.round(limit * ratio / 10) * 10);
    eligibilityNote = `Partial contribution: ${formatCurrency(eligibleContrib)}`;
    eligibilityColor = "text-chart-1";
  }

  const projected = compoundGrowth(eligibleContrib, returnRate / 100, years);
  const taxFreeGrowth = projected - eligibleContrib * years;

  const chartData = useMemo(() => {
    const data = [];
    for (let y = 0; y <= years; y += Math.max(1, Math.floor(years / 15))) {
      const bal = compoundGrowth(eligibleContrib, returnRate / 100, y);
      const contributions = eligibleContrib * y;
      data.push({
        year: age + y,
        "Tax-Free Growth": Math.round(Math.max(0, bal - contributions)),
        "Your Contributions": Math.round(contributions),
      });
    }
    return data;
  }, [eligibleContrib, returnRate, years, age]);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-medium text-foreground">Annual Income (MAGI)</Label>
              <Input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} className="mt-2 bg-input border-border/60" />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">Current Age</Label>
              <Input type="number" value={age} onChange={e => setAge(Number(e.target.value))} min={18} max={64} className="mt-2 bg-input border-border/60" />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground">Filing Status</Label>
            <div className="flex gap-2 mt-2">
              {(["single", "mfj"] as const).map(s => (
                <button key={s} onClick={() => setFilingStatus(s)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors border ${filingStatus === s ? "bg-primary/20 border-primary/50 text-primary" : "border-border/50 text-muted-foreground hover:bg-secondary"}`}>
                  {s === "single" ? "Single" : "Married Filing Jointly"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground">Expected Return: {returnRate}%</Label>
            <Slider value={[returnRate]} onValueChange={([v]) => setReturnRate(v)} min={3} max={12} step={0.5} className="mt-3" />
          </div>

          <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">2025 Phase-Out Range</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Phase-out starts:</span><span className="text-foreground font-medium">{formatCurrency(phaseStart)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Phase-out ends:</span><span className="text-foreground font-medium">{formatCurrency(phaseEnd)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Your income:</span><span className={`font-medium ${eligibilityColor}`}>{formatCurrency(income)}</span></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`rounded-xl p-4 border ${eligibleContrib === limit ? "border-chart-4/30 bg-chart-4/10" : eligibleContrib === 0 ? "border-destructive/30 bg-destructive/10" : "border-chart-1/30 bg-chart-1/10"}`}>
            <div className="text-xs text-muted-foreground mb-1">Eligibility Status</div>
            <div className={`font-semibold ${eligibilityColor}`}>{eligibilityNote}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Annual Contribution", value: formatCurrency(eligibleContrib), color: "text-chart-1" },
              { label: "Tax-Free Growth", value: formatK(taxFreeGrowth), color: "text-chart-4" },
              { label: "Years to Grow", value: `${years} years`, color: "text-chart-2" },
              { label: "Tax-Free Balance at 65", value: formatK(projected), color: "text-primary" },
            ].map(item => (
              <div key={item.label} className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                <div className={`font-display text-xl font-bold ${item.color}`}>{item.value}</div>
              </div>
            ))}
          </div>

          {eligibleContrib === 0 && (
            <Alert className="border-primary/30 bg-primary/10">
              <Info className="w-4 h-4 text-primary" />
              <AlertDescription className="text-sm text-foreground">
                You exceed the Roth IRA income limit. Use the <strong>Backdoor Roth</strong> tab — contribute to a non-deductible Traditional IRA and convert it to Roth.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
        <h4 className="text-sm font-semibold text-foreground mb-4">Tax-Free Growth Projection</h4>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="rothGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.72 0.18 45)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="oklch(0.72 0.18 45)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="rothGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.70 0.15 130)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.70 0.15 130)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.02 240)" />
            <XAxis dataKey="year" tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
            <YAxis tickFormatter={v => formatK(v)} tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "oklch(0.13 0.018 240)", border: "1px solid oklch(0.22 0.02 240)", borderRadius: "8px" }} formatter={(v: number) => formatCurrency(v)} />
            <Legend />
            <Area type="monotone" dataKey="Your Contributions" stroke="oklch(0.70 0.15 130)" fill="url(#rothGrad2)" strokeWidth={2} />
            <Area type="monotone" dataKey="Tax-Free Growth" stroke="oklch(0.72 0.18 45)" fill="url(#rothGrad1)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="border border-border/50 rounded-xl overflow-hidden">
        <button onClick={() => setShowEdu(!showEdu)} className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors">
          <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-primary" /><span className="font-medium text-foreground">What is a Roth IRA?</span></div>
          {showEdu ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {showEdu && (
          <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>A <strong className="text-foreground">Roth IRA</strong> uses after-tax dollars — no deduction now, but all qualified withdrawals in retirement are completely tax-free, including growth.</p>
            <p><strong className="text-foreground">Best for:</strong> People who expect to be in a higher tax bracket in retirement, or who want tax diversification. Especially powerful for younger investors with decades of tax-free compounding.</p>
            <p><strong className="text-foreground">Income limits (2025):</strong> Single filers phase out at $150,000–$165,000 MAGI. Married filing jointly: $236,000–$246,000. Above these limits, use the Backdoor Roth strategy.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Backdoor Roth Calculator ───────────────────────────────────────────────
function BackdoorRothCalculator() {
  const [income, setIncome] = useState(180000);
  const [existingIRABasis, setExistingIRABasis] = useState(0);
  const [existingIRAValue, setExistingIRAValue] = useState(0);
  const [age, setAge] = useState(38);
  const [returnRate, setReturnRate] = useState(7);

  const isOver50 = age >= 50;
  const contribLimit = isOver50 ? LIMITS_2025.ira_over50 : LIMITS_2025.ira_under50;
  const years = 65 - age;

  // Pro-rata rule calculation
  const totalIRAValue = existingIRAValue + contribLimit;
  const totalBasis = existingIRABasis + contribLimit;
  const proRataRatio = totalIRAValue > 0 ? contribLimit / totalIRAValue : 1;
  const taxFreeConversion = contribLimit * proRataRatio;
  const taxableConversion = contribLimit - taxFreeConversion;
  const taxOnConversion = taxableConversion * 0.22;

  const projected = compoundGrowth(contribLimit, returnRate / 100, years);

  const steps = [
    { num: 1, title: "Open Traditional IRA", desc: "Open a Traditional IRA at your brokerage (Fidelity, Vanguard, Schwab). Do NOT invest the money yet." },
    { num: 2, title: "Make Non-Deductible Contribution", desc: `Contribute ${formatCurrency(contribLimit)} (2025 limit). File Form 8606 with your tax return to track your basis.` },
    { num: 3, title: "Wait for Settlement", desc: "Wait 1–2 business days for the contribution to settle before converting." },
    { num: 4, title: "Convert to Roth IRA", desc: "Convert the Traditional IRA to your Roth IRA. If no pre-existing IRA funds, this is nearly tax-free." },
    { num: 5, title: "Invest in Roth IRA", desc: "Now invest the converted funds in your chosen index funds or ETFs." },
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-primary/30 bg-primary/10">
        <Info className="w-4 h-4 text-primary" />
        <AlertDescription className="text-sm text-foreground">
          The <strong>Backdoor Roth IRA</strong> is a legal strategy for high earners who exceed the direct Roth IRA income limits.
          Watch out for the <strong>Pro-Rata Rule</strong> if you have existing pre-tax IRA funds.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-medium text-foreground">Annual Income (MAGI)</Label>
              <Input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} className="mt-2 bg-input border-border/60" />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">Current Age</Label>
              <Input type="number" value={age} onChange={e => setAge(Number(e.target.value))} min={18} max={64} className="mt-2 bg-input border-border/60" />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground">Existing Pre-Tax IRA Balance (Pro-Rata)</Label>
            <div className="text-xs text-muted-foreground mb-2">If you have existing Traditional/SEP/SIMPLE IRA funds, the pro-rata rule applies</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">IRA Basis (after-tax)</Label>
                <Input type="number" value={existingIRABasis} onChange={e => setExistingIRABasis(Number(e.target.value))} className="mt-1 bg-input border-border/60" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Total IRA Value</Label>
                <Input type="number" value={existingIRAValue} onChange={e => setExistingIRAValue(Number(e.target.value))} className="mt-1 bg-input border-border/60" />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground">Expected Return: {returnRate}%</Label>
            <Slider value={[returnRate]} onValueChange={([v]) => setReturnRate(v)} min={3} max={12} step={0.5} className="mt-3" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Contribution Amount", value: formatCurrency(contribLimit), color: "text-chart-1" },
              { label: "Tax-Free Conversion", value: formatCurrency(taxFreeConversion), color: "text-chart-4" },
              { label: "Taxable Portion", value: formatCurrency(taxableConversion), color: taxableConversion > 0 ? "text-destructive" : "text-chart-4" },
              { label: "Tax on Conversion", value: formatCurrency(taxOnConversion), color: taxOnConversion > 0 ? "text-destructive" : "text-chart-4" },
            ].map(item => (
              <div key={item.label} className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                <div className={`font-display text-xl font-bold ${item.color}`}>{item.value}</div>
              </div>
            ))}
          </div>

          <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
            <div className="text-xs text-muted-foreground mb-1">Projected Tax-Free Balance at 65</div>
            <div className="font-display text-2xl font-bold text-primary">{formatK(projected)}</div>
            <div className="text-xs text-muted-foreground mt-1">Based on {returnRate}% annual return over {years} years</div>
          </div>

          {existingIRAValue > 0 && (
            <Alert className="border-destructive/30 bg-destructive/10">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <AlertDescription className="text-sm text-foreground">
                <strong>Pro-Rata Rule Warning:</strong> You have existing pre-tax IRA funds. Only {Math.round(proRataRatio * 100)}% of your conversion will be tax-free.
                Consider rolling your pre-tax IRA into your employer's 401(k) to eliminate the pro-rata issue.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {/* Step-by-step guide */}
      <div>
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Backdoor Roth Step-by-Step Tutorial
        </h4>
        <div className="space-y-3">
          {steps.map(step => (
            <div key={step.num} className="flex gap-4 p-4 rounded-xl border border-border/50 bg-secondary/20">
              <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center flex-shrink-0 text-background font-bold text-sm">
                {step.num}
              </div>
              <div>
                <div className="font-medium text-foreground text-sm mb-1">{step.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function Calculators() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container py-10">
        <div className="mb-10">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Retirement Calculators</div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">
            Retirement Account Calculators
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Built with real 2025 IRS limits, tax deductibility rules, and income phase-out logic.
            All calculations are for educational purposes — consult a licensed advisor for personalized guidance.
          </p>
        </div>

        <Tabs defaultValue="401k" className="space-y-6">
          <TabsList className="bg-secondary border border-border/50 p-1 h-auto flex-wrap gap-1">
            <TabsTrigger value="401k" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              401(k)
            </TabsTrigger>
            <TabsTrigger value="traditional" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Traditional IRA
            </TabsTrigger>
            <TabsTrigger value="roth" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Roth IRA
            </TabsTrigger>
            <TabsTrigger value="backdoor" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Backdoor Roth
            </TabsTrigger>
          </TabsList>

          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <TabsContent value="401k"><K401Calculator /></TabsContent>
              <TabsContent value="traditional"><TraditionalIRACalculator /></TabsContent>
              <TabsContent value="roth"><RothIRACalculator /></TabsContent>
              <TabsContent value="backdoor"><BackdoorRothCalculator /></TabsContent>
            </CardContent>
          </Card>
        </Tabs>

        <div className="mt-6 bg-secondary/30 border border-border/50 rounded-xl p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Disclaimer:</strong> These calculators use 2025 IRS contribution limits and simplified tax assumptions.
            Actual results will vary based on investment performance, tax law changes, and individual circumstances.
            This is for educational purposes only and does not constitute tax or investment advice.
          </p>
        </div>
      </div>
    </div>
  );
}
