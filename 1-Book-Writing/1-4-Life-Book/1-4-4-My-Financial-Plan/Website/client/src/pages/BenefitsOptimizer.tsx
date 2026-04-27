import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Building2, CheckCircle, AlertCircle, Info, DollarSign } from "lucide-react";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}
function formatK(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return formatCurrency(n);
}

// ─── 401k Match Optimizer ───────────────────────────────────────────────────
function MatchOptimizer() {
  const [salary, setSalary] = useState(120000);
  const [matchPct, setMatchPct] = useState(50);
  const [matchUpTo, setMatchUpTo] = useState(6);
  const [contribPct, setContribPct] = useState(8);
  const [age, setAge] = useState(32);
  const [returnRate, setReturnRate] = useState(7);

  const k401Limit = age >= 50 ? 31000 : 23500;
  const yourContrib = Math.min(salary * (contribPct / 100), k401Limit);
  const maxMatchableContrib = salary * (matchUpTo / 100);
  const employerMatch = Math.min(yourContrib, maxMatchableContrib) * (matchPct / 100);
  const maxPossibleMatch = maxMatchableContrib * (matchPct / 100);
  const unmatchedMoney = maxPossibleMatch - employerMatch;
  const isMaxingMatch = contribPct >= matchUpTo;
  const years = 65 - age;
  const matchValueAtRetirement = employerMatch * ((Math.pow(1 + returnRate / 100, years) - 1) / (returnRate / 100));

  const chartData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(pct => {
    const contrib = Math.min(salary * (pct / 100), k401Limit);
    const match = Math.min(contrib, salary * (matchUpTo / 100)) * (matchPct / 100);
    return {
      contribution: `${pct}%`,
      "Your Contribution": Math.round(contrib),
      "Employer Match": Math.round(match),
      "Total": Math.round(contrib + match),
    };
  });

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <Label className="text-xs text-muted-foreground">Annual Salary</Label>
            <Input type="number" value={salary} onChange={e => setSalary(Number(e.target.value))} className="mt-1.5 bg-input border-border/60 h-9" />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Your Contribution: {contribPct}% of salary</Label>
            <Slider value={[contribPct]} onValueChange={([v]) => setContribPct(v)} min={1} max={20} step={1} className="mt-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>1%</span><span>{formatCurrency(yourContrib)}/yr</span><span>20%</span></div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Company Match: {matchPct}% up to {matchUpTo}% of salary</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <Label className="text-xs text-muted-foreground">Match %</Label>
                <Slider value={[matchPct]} onValueChange={([v]) => setMatchPct(v)} min={0} max={100} step={25} className="mt-1.5" />
                <div className="text-xs text-muted-foreground mt-1">{matchPct}%</div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Up to % of salary</Label>
                <Slider value={[matchUpTo]} onValueChange={([v]) => setMatchUpTo(v)} min={1} max={10} step={1} className="mt-1.5" />
                <div className="text-xs text-muted-foreground mt-1">{matchUpTo}%</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Current Age</Label>
              <Input type="number" value={age} onChange={e => setAge(Number(e.target.value))} min={20} max={64} className="mt-1.5 bg-input border-border/60 h-9" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Return Rate: {returnRate}%</Label>
              <Slider value={[returnRate]} onValueChange={([v]) => setReturnRate(v)} min={3} max={12} step={0.5} className="mt-2" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`rounded-xl p-5 border ${isMaxingMatch ? "border-chart-4/30 bg-chart-4/10" : "border-chart-1/30 bg-chart-1/10"}`}>
            <div className="flex items-start gap-3">
              {isMaxingMatch
                ? <CheckCircle className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                : <AlertCircle className="w-5 h-5 text-chart-1 flex-shrink-0 mt-0.5" />
              }
              <div>
                <div className="font-semibold text-foreground mb-1">
                  {isMaxingMatch ? "You're capturing the full match!" : `Increase contribution to ${matchUpTo}% to capture full match`}
                </div>
                {!isMaxingMatch && (
                  <div className="text-sm text-muted-foreground">
                    You're leaving <strong className="text-chart-1">{formatCurrency(unmatchedMoney)}/year</strong> on the table.
                    Over {years} years, that's <strong className="text-chart-1">{formatK(unmatchedMoney * ((Math.pow(1 + returnRate / 100, years) - 1) / (returnRate / 100)))}</strong> in lost retirement savings.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Your Annual Contribution", value: formatCurrency(yourContrib), color: "text-chart-1" },
              { label: "Employer Match", value: formatCurrency(employerMatch), color: "text-chart-4" },
              { label: "Max Possible Match", value: formatCurrency(maxPossibleMatch), color: "text-chart-2" },
              { label: "Match Value at Retirement", value: formatK(matchValueAtRetirement), color: "text-primary" },
            ].map(item => (
              <div key={item.label} className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                <div className={`font-display text-xl font-bold ${item.color}`}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
        <h4 className="text-sm font-semibold text-foreground mb-4">Contribution % vs Total Annual Savings</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.02 240)" />
            <XAxis dataKey="contribution" tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
            <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "oklch(0.13 0.018 240)", border: "1px solid oklch(0.22 0.02 240)", borderRadius: "8px" }} formatter={(v: number) => formatCurrency(v)} />
            <Bar dataKey="Your Contribution" fill="oklch(0.65 0.15 180)" stackId="a" />
            <Bar dataKey="Employer Match" fill="oklch(0.72 0.18 45)" stackId="a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Vesting Schedule ───────────────────────────────────────────────────────
function VestingSchedule() {
  const [salary, setSalary] = useState(120000);
  const [matchPct, setMatchPct] = useState(50);
  const [matchUpTo, setMatchUpTo] = useState(6);
  const [vestingType, setVestingType] = useState<"cliff" | "graded">("graded");
  const [cliffYears, setCliffYears] = useState(3);
  const [yearsAtCompany, setYearsAtCompany] = useState(2);

  const annualMatch = salary * (matchUpTo / 100) * (matchPct / 100);

  const gradedSchedule = [
    { year: 1, pct: 0 }, { year: 2, pct: 20 }, { year: 3, pct: 40 },
    { year: 4, pct: 60 }, { year: 5, pct: 80 }, { year: 6, pct: 100 },
  ];

  const vestedPct = vestingType === "cliff"
    ? (yearsAtCompany >= cliffYears ? 100 : 0)
    : (gradedSchedule.find(s => s.year === Math.min(yearsAtCompany, 6))?.pct ?? 0);

  const vestedAmount = annualMatch * yearsAtCompany * (vestedPct / 100);
  const unvestedAmount = annualMatch * yearsAtCompany * (1 - vestedPct / 100);

  const chartData = vestingType === "cliff"
    ? Array.from({ length: 7 }, (_, i) => ({
        year: `Year ${i + 1}`,
        "Vested %": i + 1 >= cliffYears ? 100 : 0,
      }))
    : gradedSchedule.map(s => ({ year: `Year ${s.year}`, "Vested %": s.pct }));

  return (
    <div className="space-y-6">
      <Alert className="border-primary/30 bg-primary/10">
        <Info className="w-4 h-4 text-primary" />
        <AlertDescription className="text-sm text-foreground">
          <strong>Vesting</strong> determines when employer contributions become truly "yours." Leaving before full vesting means forfeiting unvested employer contributions.
          Always factor vesting into job change decisions.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <Label className="text-xs text-muted-foreground">Annual Salary</Label>
            <Input type="number" value={salary} onChange={e => setSalary(Number(e.target.value))} className="mt-1.5 bg-input border-border/60 h-9" />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Company Match: {matchPct}% up to {matchUpTo}%</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Slider value={[matchPct]} onValueChange={([v]) => setMatchPct(v)} min={0} max={100} step={25} />
              <Slider value={[matchUpTo]} onValueChange={([v]) => setMatchUpTo(v)} min={1} max={10} step={1} />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Vesting Type</Label>
            <div className="flex gap-2 mt-2">
              {(["cliff", "graded"] as const).map(v => (
                <button key={v} onClick={() => setVestingType(v)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors border capitalize ${vestingType === v ? "bg-primary/20 border-primary/50 text-primary" : "border-border/50 text-muted-foreground hover:bg-secondary"}`}>
                  {v} Vesting
                </button>
              ))}
            </div>
          </div>

          {vestingType === "cliff" && (
            <div>
              <Label className="text-xs text-muted-foreground">Cliff Years: {cliffYears}</Label>
              <Slider value={[cliffYears]} onValueChange={([v]) => setCliffYears(v)} min={1} max={6} step={1} className="mt-2" />
            </div>
          )}

          <div>
            <Label className="text-xs text-muted-foreground">Years at Company: {yearsAtCompany}</Label>
            <Slider value={[yearsAtCompany]} onValueChange={([v]) => setYearsAtCompany(v)} min={1} max={6} step={1} className="mt-2" />
          </div>
        </div>

        <div className="space-y-4">
          <div className={`rounded-xl p-5 border ${vestedPct === 100 ? "border-chart-4/30 bg-chart-4/10" : vestedPct === 0 ? "border-destructive/30 bg-destructive/10" : "border-chart-1/30 bg-chart-1/10"}`}>
            <div className="text-xs text-muted-foreground mb-1">Current Vesting Status</div>
            <div className={`font-display text-3xl font-bold ${vestedPct === 100 ? "text-chart-4" : vestedPct === 0 ? "text-destructive" : "text-chart-1"}`}>{vestedPct}% Vested</div>
            <div className="text-sm text-muted-foreground mt-1">After {yearsAtCompany} year{yearsAtCompany !== 1 ? "s" : ""}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Annual Match", value: formatCurrency(annualMatch), color: "text-chart-1" },
              { label: "Vested Amount", value: formatCurrency(vestedAmount), color: "text-chart-4" },
              { label: "Unvested (at risk)", value: formatCurrency(unvestedAmount), color: "text-destructive" },
              { label: "Total Employer Contributed", value: formatCurrency(annualMatch * yearsAtCompany), color: "text-primary" },
            ].map(item => (
              <div key={item.label} className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                <div className={`font-display text-xl font-bold ${item.color}`}>{item.value}</div>
              </div>
            ))}
          </div>

          {unvestedAmount > 0 && (
            <Alert className="border-chart-1/30 bg-chart-1/10">
              <AlertCircle className="w-4 h-4 text-chart-1" />
              <AlertDescription className="text-sm text-foreground">
                If you leave now, you forfeit <strong>{formatCurrency(unvestedAmount)}</strong> in unvested employer contributions.
                Consider waiting until your next vesting milestone before changing jobs.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
        <h4 className="text-sm font-semibold text-foreground mb-4">Vesting Schedule</h4>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.02 240)" />
            <XAxis dataKey="year" tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
            <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "oklch(0.13 0.018 240)", border: "1px solid oklch(0.22 0.02 240)", borderRadius: "8px" }} formatter={(v: number) => `${v}%`} />
            <Bar dataKey="Vested %" fill="oklch(0.72 0.18 45)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Mega Backdoor Roth ─────────────────────────────────────────────────────
function MegaBackdoorRoth() {
  const [salary, setSalary] = useState(150000);
  const [age, setAge] = useState(35);
  const [planAllows, setPlanAllows] = useState(true);
  const [returnRate, setReturnRate] = useState(7);

  const k401Limit = age >= 50 ? 31000 : 23500;
  const totalLimit2025 = age >= 50 ? 77500 : 70000; // 415(c) limit
  const employerContribs = salary * 0.06 * 0.5; // assume 50% match on 6%
  const afterTaxSpace = totalLimit2025 - k401Limit - employerContribs;
  const years = 65 - age;
  const projectedValue = afterTaxSpace * ((Math.pow(1 + returnRate / 100, years) - 1) / (returnRate / 100));

  const steps = [
    { title: "Verify Plan Allows After-Tax Contributions", desc: "Check your plan documents or ask HR if your 401(k) allows after-tax (non-Roth) contributions beyond the $23,500 pre-tax limit." },
    { title: "Verify In-Service Withdrawals or In-Plan Conversions", desc: "Your plan must allow either in-service withdrawals to a Roth IRA, or in-plan Roth conversions. Without this, the strategy doesn't work." },
    { title: "Contribute After-Tax to 401(k)", desc: `Contribute up to ${formatCurrency(afterTaxSpace)} in after-tax (non-Roth) contributions. These don't reduce your taxable income but grow tax-deferred.` },
    { title: "Convert to Roth Immediately", desc: "Convert the after-tax contributions to Roth (either in-plan or via rollover to Roth IRA) as soon as possible to minimize taxable gains before conversion." },
    { title: "Enjoy Tax-Free Growth", desc: "Once in Roth, all future growth is tax-free. This effectively lets high earners contribute far more to Roth than the standard $7,000 IRA limit." },
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-primary/30 bg-primary/10">
        <Info className="w-4 h-4 text-primary" />
        <AlertDescription className="text-sm text-foreground">
          The <strong>Mega Backdoor Roth</strong> allows contributions up to the IRS 415(c) limit ($70,000 in 2025) via after-tax 401(k) contributions + conversion.
          This is separate from and in addition to the standard $23,500 pre-tax 401(k) limit.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Annual Salary</Label>
              <Input type="number" value={salary} onChange={e => setSalary(Number(e.target.value))} className="mt-1.5 bg-input border-border/60 h-9" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Current Age</Label>
              <Input type="number" value={age} onChange={e => setAge(Number(e.target.value))} min={20} max={64} className="mt-1.5 bg-input border-border/60 h-9" />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Does your plan allow after-tax contributions?</Label>
            <div className="flex gap-2 mt-2">
              {[true, false].map(v => (
                <button key={String(v)} onClick={() => setPlanAllows(v)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors border ${planAllows === v ? "bg-primary/20 border-primary/50 text-primary" : "border-border/50 text-muted-foreground hover:bg-secondary"}`}>
                  {v ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Expected Return: {returnRate}%</Label>
            <Slider value={[returnRate]} onValueChange={([v]) => setReturnRate(v)} min={3} max={12} step={0.5} className="mt-2" />
          </div>

          <div className="bg-secondary/30 rounded-xl p-4 border border-border/50 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">2025 Pre-Tax 401(k) Limit</span><span className="text-foreground font-medium">{formatCurrency(k401Limit)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Employer Contributions (est.)</span><span className="text-foreground font-medium">{formatCurrency(employerContribs)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">415(c) Total Limit</span><span className="text-foreground font-medium">{formatCurrency(totalLimit2025)}</span></div>
            <div className="flex justify-between pt-2 border-t border-border/50"><span className="text-foreground font-semibold">After-Tax Contribution Space</span><span className="font-bold text-primary">{formatCurrency(afterTaxSpace)}</span></div>
          </div>
        </div>

        <div className="space-y-4">
          {planAllows ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "After-Tax Contribution", value: formatCurrency(afterTaxSpace), color: "text-chart-1" },
                  { label: "Total Roth Contribution", value: formatCurrency(afterTaxSpace + k401Limit), color: "text-chart-2" },
                  { label: "Years to Grow", value: `${years} years`, color: "text-chart-4" },
                  { label: "Projected Tax-Free Value", value: formatK(projectedValue), color: "text-primary" },
                ].map(item => (
                  <div key={item.label} className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                    <div className={`font-display text-xl font-bold ${item.color}`}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="bg-chart-4/10 border border-chart-4/30 rounded-xl p-4">
                <div className="text-xs text-muted-foreground mb-1">vs. Standard Roth IRA Limit</div>
                <div className="font-display text-2xl font-bold text-chart-4">
                  {Math.round(afterTaxSpace / 7000)}x more
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Mega Backdoor Roth allows {formatCurrency(afterTaxSpace)} vs. standard $7,000 Roth IRA limit
                </div>
              </div>
            </>
          ) : (
            <Alert className="border-destructive/30 bg-destructive/10">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <AlertDescription className="text-sm text-foreground">
                Your plan does not allow after-tax contributions or in-service withdrawals. Consider using a standard Backdoor Roth IRA ($7,000/year) or maximizing your pre-tax 401(k) instead.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {planAllows && (
        <div>
          <h4 className="font-semibold text-foreground mb-4">Mega Backdoor Roth Step-by-Step</h4>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border/50 bg-secondary/20">
                <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center flex-shrink-0 text-background font-bold text-sm">{i + 1}</div>
                <div>
                  <div className="font-medium text-foreground text-sm mb-1">{step.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BenefitsOptimizer() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container py-10">
        <div className="mb-10">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Benefits Optimizer</div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">Company Benefits Optimizer</h1>
          <p className="text-muted-foreground max-w-2xl">
            Maximize your 401(k) match, understand your vesting schedule, and unlock the Mega Backdoor Roth —
            the most powerful (and underutilized) tax-advantaged savings strategy for high earners.
          </p>
        </div>

        <Tabs defaultValue="match" className="space-y-6">
          <TabsList className="bg-secondary border border-border/50 p-1 h-auto gap-1">
            <TabsTrigger value="match" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <DollarSign className="w-3.5 h-3.5 mr-1.5" />401k Match
            </TabsTrigger>
            <TabsTrigger value="vesting" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Building2 className="w-3.5 h-3.5 mr-1.5" />Vesting Schedule
            </TabsTrigger>
            <TabsTrigger value="mega" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CheckCircle className="w-3.5 h-3.5 mr-1.5" />Mega Backdoor Roth
            </TabsTrigger>
          </TabsList>

          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <TabsContent value="match"><MatchOptimizer /></TabsContent>
              <TabsContent value="vesting"><VestingSchedule /></TabsContent>
              <TabsContent value="mega"><MegaBackdoorRoth /></TabsContent>
            </CardContent>
          </Card>
        </Tabs>

        <div className="mt-6 bg-secondary/30 border border-border/50 rounded-xl p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Disclaimer:</strong> Employer match and vesting calculations are estimates based on your inputs.
            Always verify your specific plan documents. The Mega Backdoor Roth strategy requires plan-specific features — consult your plan administrator and a tax advisor.
          </p>
        </div>
      </div>
    </div>
  );
}
