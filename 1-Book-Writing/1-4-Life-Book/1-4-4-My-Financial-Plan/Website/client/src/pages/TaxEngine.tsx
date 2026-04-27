import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from "recharts";
import { FileText, TrendingDown, MapPin, ArrowDownUp, Info, CheckCircle } from "lucide-react";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}
function formatK(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return formatCurrency(n);
}

// Federal tax brackets 2025
function calcFederalTax(income: number, filing: "single" | "mfj"): number {
  const brackets = filing === "single"
    ? [[11925, 0.10], [48475, 0.12], [103350, 0.22], [197300, 0.24], [250525, 0.32], [626350, 0.35], [Infinity, 0.37]]
    : [[23850, 0.10], [96950, 0.12], [206700, 0.22], [394600, 0.24], [501050, 0.32], [751600, 0.35], [Infinity, 0.37]];
  let tax = 0, prev = 0;
  for (const [limit, rate] of brackets) {
    if (income <= (limit as number)) { tax += (income - prev) * (rate as number); break; }
    tax += ((limit as number) - prev) * (rate as number);
    prev = limit as number;
  }
  return tax;
}

// State tax rates (simplified)
const STATE_TAX = {
  NY: { name: "New York", rates: [[17150, 0.04], [23600, 0.045], [27900, 0.0525], [161550, 0.0585], [323200, 0.0625], [2155350, 0.0685], [5000000, 0.0965], [25000000, 0.103], [Infinity, 0.109]] as [number, number][], note: "NYC residents add 3.876% city tax" },
  NJ: { name: "New Jersey", rates: [[20000, 0.014], [35000, 0.0175], [40000, 0.035], [75000, 0.05525], [500000, 0.0637], [1000000, 0.0897], [Infinity, 0.1075]] as [number, number][], note: "No city income tax in NJ" },
  CA: { name: "California", rates: [[10412, 0.01], [24684, 0.02], [38959, 0.04], [54081, 0.06], [68350, 0.08], [349137, 0.093], [418961, 0.103], [698274, 0.113], [Infinity, 0.133]] as [number, number][], note: "SDI: 1.1% on all wages; CA has no cap" },
};

function calcStateTax(income: number, state: keyof typeof STATE_TAX): number {
  const { rates } = STATE_TAX[state];
  let tax = 0, prev = 0;
  for (const [limit, rate] of rates) {
    if (income <= limit) { tax += (income - prev) * rate; break; }
    tax += (limit - prev) * rate;
    prev = limit;
  }
  return tax;
}

// ─── Traditional vs Roth Comparison ────────────────────────────────────────
function TraditionalVsRoth() {
  const [income, setIncome] = useState(120000);
  const [contrib, setContrib] = useState(7000);
  const [years, setYears] = useState(30);
  const [returnRate, setReturnRate] = useState(7);
  const [retirementTaxRate, setRetirementTaxRate] = useState(22);
  const [currentTaxRate, setCurrentTaxRate] = useState(24);

  const traditionalGrowth = contrib * ((Math.pow(1 + returnRate / 100, years) - 1) / (returnRate / 100));
  const traditionalAfterTax = traditionalGrowth * (1 - retirementTaxRate / 100);
  const rothGrowth = contrib * (1 - currentTaxRate / 100) * ((Math.pow(1 + returnRate / 100, years) - 1) / (returnRate / 100));
  // Roth: after-tax contribution, all growth tax-free
  const rothAfterTax = contrib * ((Math.pow(1 + returnRate / 100, years) - 1) / (returnRate / 100));

  const winner = rothAfterTax > traditionalAfterTax ? "Roth IRA" : "Traditional IRA";
  const diff = Math.abs(rothAfterTax - traditionalAfterTax);

  const chartData = useMemo(() => {
    return Array.from({ length: Math.floor(years / 5) + 1 }, (_, i) => {
      const y = i * 5;
      const tradGrowth = contrib * ((Math.pow(1 + returnRate / 100, y) - 1) / (returnRate / 100));
      const tradAfterTax = tradGrowth * (1 - retirementTaxRate / 100);
      const rAfterTax = contrib * ((Math.pow(1 + returnRate / 100, y) - 1) / (returnRate / 100));
      return {
        year: `Yr ${y}`,
        "Traditional (after tax)": Math.round(tradAfterTax),
        "Roth (tax-free)": Math.round(rAfterTax),
      };
    });
  }, [contrib, returnRate, years, retirementTaxRate]);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Annual Contribution</Label>
              <Input type="number" value={contrib} onChange={e => setContrib(Number(e.target.value))} className="mt-1.5 bg-input border-border/60 h-9" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Years to Retirement</Label>
              <Input type="number" value={years} onChange={e => setYears(Number(e.target.value))} min={5} max={40} className="mt-1.5 bg-input border-border/60 h-9" />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Expected Return: {returnRate}%</Label>
            <Slider value={[returnRate]} onValueChange={([v]) => setReturnRate(v)} min={3} max={12} step={0.5} className="mt-2" />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Current Tax Rate: {currentTaxRate}%</Label>
            <Slider value={[currentTaxRate]} onValueChange={([v]) => setCurrentTaxRate(v)} min={10} max={37} step={1} className="mt-2" />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Estimated Retirement Tax Rate: {retirementTaxRate}%</Label>
            <Slider value={[retirementTaxRate]} onValueChange={([v]) => setRetirementTaxRate(v)} min={10} max={37} step={1} className="mt-2" />
          </div>

          <Alert className={`border-primary/30 bg-primary/10`}>
            <CheckCircle className="w-4 h-4 text-primary" />
            <AlertDescription className="text-sm text-foreground">
              <strong>{winner}</strong> wins by <strong>{formatK(diff)}</strong> after {years} years.
              {retirementTaxRate > currentTaxRate
                ? " Your retirement tax rate is higher — Roth is generally better."
                : " Your retirement tax rate is lower — Traditional may be better."}
            </AlertDescription>
          </Alert>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Traditional Balance", value: formatK(traditionalGrowth), sub: "Pre-tax", color: "text-chart-2" },
              { label: "Traditional After-Tax", value: formatK(traditionalAfterTax), sub: `At ${retirementTaxRate}% rate`, color: "text-chart-2" },
              { label: "Roth Balance", value: formatK(rothAfterTax), sub: "100% tax-free", color: "text-primary" },
              { label: "Roth Advantage", value: formatK(diff), sub: winner === "Roth IRA" ? "Roth wins" : "Traditional wins", color: "text-chart-4" },
            ].map(item => (
              <div key={item.label} className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                <div className={`font-display text-lg font-bold ${item.color}`}>{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
        <h4 className="text-sm font-semibold text-foreground mb-4">After-Tax Value Comparison Over Time</h4>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.02 240)" />
            <XAxis dataKey="year" tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
            <YAxis tickFormatter={v => formatK(v)} tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "oklch(0.13 0.018 240)", border: "1px solid oklch(0.22 0.02 240)", borderRadius: "8px" }} formatter={(v: number) => formatCurrency(v)} />
            <Legend />
            <Line type="monotone" dataKey="Traditional (after tax)" stroke="oklch(0.65 0.15 180)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Roth (tax-free)" stroke="oklch(0.72 0.18 45)" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Tax-Loss Harvesting ────────────────────────────────────────────────────
function TaxLossHarvesting() {
  const [portfolioValue, setPortfolioValue] = useState(200000);
  const [lossPositions, setLossPositions] = useState(15000);
  const [capitalGains, setCapitalGains] = useState(20000);
  const [taxRate, setTaxRate] = useState(24);
  const [stateRate, setStateRate] = useState(6);

  const harvestableAmount = Math.min(lossPositions, capitalGains + 3000);
  const offsetGains = Math.min(lossPositions, capitalGains);
  const ordinaryDeduction = Math.min(Math.max(0, lossPositions - capitalGains), 3000);
  const federalSavings = offsetGains * (taxRate / 100) + ordinaryDeduction * (taxRate / 100);
  const stateSavings = offsetGains * (stateRate / 100) + ordinaryDeduction * (stateRate / 100);
  const totalSavings = federalSavings + stateSavings;
  const carryForward = Math.max(0, lossPositions - capitalGains - 3000);

  return (
    <div className="space-y-6">
      <Alert className="border-chart-2/30 bg-chart-2/10">
        <Info className="w-4 h-4 text-chart-2" />
        <AlertDescription className="text-sm text-foreground">
          <strong>Tax-Loss Harvesting</strong> lets you sell losing positions to offset capital gains, reducing your tax bill.
          You can also deduct up to $3,000/year against ordinary income. Repurchase similar (not identical) assets after 31 days to avoid wash-sale rules.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">Total Portfolio Value</Label>
            <Input type="number" value={portfolioValue} onChange={e => setPortfolioValue(Number(e.target.value))} className="mt-1.5 bg-input border-border/60 h-9" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Unrealized Losses (harvestable)</Label>
            <Input type="number" value={lossPositions} onChange={e => setLossPositions(Number(e.target.value))} className="mt-1.5 bg-input border-border/60 h-9" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Capital Gains This Year</Label>
            <Input type="number" value={capitalGains} onChange={e => setCapitalGains(Number(e.target.value))} className="mt-1.5 bg-input border-border/60 h-9" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Federal Tax Rate: {taxRate}%</Label>
            <Slider value={[taxRate]} onValueChange={([v]) => setTaxRate(v)} min={10} max={37} step={1} className="mt-2" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">State Tax Rate: {stateRate}%</Label>
            <Slider value={[stateRate]} onValueChange={([v]) => setStateRate(v)} min={0} max={14} step={0.5} className="mt-2" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Gains Offset", value: formatCurrency(offsetGains), color: "text-chart-4" },
              { label: "Ordinary Income Deduction", value: formatCurrency(ordinaryDeduction), color: "text-chart-2" },
              { label: "Federal Tax Saved", value: formatCurrency(federalSavings), color: "text-chart-1" },
              { label: "Total Tax Savings", value: formatCurrency(totalSavings), color: "text-primary" },
            ].map(item => (
              <div key={item.label} className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                <div className={`font-display text-xl font-bold ${item.color}`}>{item.value}</div>
              </div>
            ))}
          </div>

          {carryForward > 0 && (
            <div className="bg-chart-1/10 border border-chart-1/30 rounded-xl p-4">
              <div className="text-xs text-muted-foreground mb-1">Loss Carry-Forward to Next Year</div>
              <div className="font-display text-xl font-bold text-chart-1">{formatCurrency(carryForward)}</div>
              <div className="text-xs text-muted-foreground mt-1">Can offset future gains or $3,000/yr of ordinary income</div>
            </div>
          )}

          <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Wash-Sale Rule Reminder</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Do not repurchase the same or "substantially identical" security within 30 days before or after the sale.
              Instead, buy a similar ETF (e.g., sell VTI, buy ITOT) to maintain market exposure while capturing the tax loss.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Multi-State Tax Analysis ───────────────────────────────────────────────
function MultiStateTax() {
  const [income, setIncome] = useState(150000);
  const [filing, setFiling] = useState<"single" | "mfj">("single");
  const [k401Contrib, setK401Contrib] = useState(23500);

  const agi = income - k401Contrib;
  const federalTax = calcFederalTax(agi, filing);
  const stdDeduction = filing === "single" ? 15000 : 30000;
  const federalTaxable = Math.max(0, agi - stdDeduction);
  const federalTaxFinal = calcFederalTax(federalTaxable, filing);

  const stateResults = (["NY", "NJ", "CA"] as const).map(state => {
    const stateTax = calcStateTax(agi, state);
    const ficaTax = Math.min(income, 176100) * 0.062 + income * 0.0145;
    const totalTax = federalTaxFinal + stateTax + ficaTax;
    const effectiveRate = (totalTax / income) * 100;
    const takeHome = income - totalTax;
    return { state, stateTax, totalTax, effectiveRate, takeHome, ficaTax };
  });

  const chartData = stateResults.map(r => ({
    state: STATE_TAX[r.state].name,
    "Federal Tax": Math.round(federalTaxFinal),
    "State Tax": Math.round(r.stateTax),
    "FICA": Math.round(r.ficaTax),
  }));

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-4">
        <div>
          <Label className="text-xs text-muted-foreground">Gross Income</Label>
          <Input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} className="mt-1.5 bg-input border-border/60 h-9" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Filing Status</Label>
          <div className="flex gap-2 mt-1.5">
            {(["single", "mfj"] as const).map(s => (
              <button key={s} onClick={() => setFiling(s)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors border ${filing === s ? "bg-primary/20 border-primary/50 text-primary" : "border-border/50 text-muted-foreground hover:bg-secondary"}`}>
                {s === "single" ? "Single" : "MFJ"}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">401(k) Contribution</Label>
          <Input type="number" value={k401Contrib} onChange={e => setK401Contrib(Number(e.target.value))} className="mt-1.5 bg-input border-border/60 h-9" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {stateResults.map(r => (
          <div key={r.state} className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs font-semibold text-primary uppercase tracking-wider">{r.state}</div>
                <div className="font-display text-lg font-bold text-foreground">{STATE_TAX[r.state].name}</div>
              </div>
              <Badge className="bg-secondary text-muted-foreground border-border/50 text-xs">
                {r.effectiveRate.toFixed(1)}% effective
              </Badge>
            </div>
            <div className="space-y-2">
              {[
                { label: "Federal Tax", value: federalTaxFinal },
                { label: "State Tax", value: r.stateTax },
                { label: "FICA (SS + Medicare)", value: r.ficaTax },
                { label: "Total Tax", value: r.totalTax, bold: true },
                { label: "Take-Home Pay", value: r.takeHome, highlight: true },
              ].map(item => (
                <div key={item.label} className={`flex justify-between text-sm ${item.highlight ? "pt-2 border-t border-border/50" : ""}`}>
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className={`font-medium ${item.highlight ? "text-primary font-bold" : item.bold ? "text-foreground font-semibold" : "text-foreground"}`}>
                    {formatCurrency(item.value)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
              {STATE_TAX[r.state].note}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
        <h4 className="text-sm font-semibold text-foreground mb-4">Tax Burden Comparison by State</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.02 240)" />
            <XAxis dataKey="state" tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
            <YAxis tickFormatter={v => formatK(v)} tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "oklch(0.13 0.018 240)", border: "1px solid oklch(0.22 0.02 240)", borderRadius: "8px" }} formatter={(v: number) => formatCurrency(v)} />
            <Legend />
            <Bar dataKey="Federal Tax" fill="oklch(0.65 0.15 180)" stackId="a" radius={[0, 0, 0, 0]} />
            <Bar dataKey="State Tax" fill="oklch(0.72 0.18 45)" stackId="a" />
            <Bar dataKey="FICA" fill="oklch(0.70 0.15 130)" stackId="a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Withdrawal Strategy ────────────────────────────────────────────────────
function WithdrawalStrategy() {
  const [traditionalBalance, setTraditionalBalance] = useState(800000);
  const [rothBalance, setRothBalance] = useState(300000);
  const [taxableBalance, setTaxableBalance] = useState(200000);
  const [monthlyNeed, setMonthlyNeed] = useState(8000);
  const [taxRate, setTaxRate] = useState(22);

  const annualNeed = monthlyNeed * 12;
  const totalBalance = traditionalBalance + rothBalance + taxableBalance;

  // Optimal withdrawal order: taxable → traditional → roth
  const fromTaxable = Math.min(taxableBalance, annualNeed);
  const remainingAfterTaxable = Math.max(0, annualNeed - fromTaxable);
  const fromTraditional = Math.min(traditionalBalance, remainingAfterTaxable);
  const remainingAfterTrad = Math.max(0, remainingAfterTaxable - fromTraditional);
  const fromRoth = Math.min(rothBalance, remainingAfterTrad);

  const taxOnWithdrawal = fromTraditional * (taxRate / 100);
  const netAfterTax = annualNeed - taxOnWithdrawal;
  const yearsOfIncome = totalBalance / annualNeed;

  const strategies = [
    {
      name: "Optimal Strategy",
      order: ["Taxable Brokerage (LTCG rates)", "Traditional IRA/401k (ordinary income)", "Roth IRA (tax-free, last resort)"],
      pros: "Minimizes lifetime tax burden; preserves tax-free Roth growth longest",
      color: "border-chart-4/30 bg-chart-4/10",
    },
    {
      name: "Roth-First Strategy",
      order: ["Roth IRA first", "Taxable Brokerage", "Traditional IRA/401k last"],
      pros: "Reduces RMDs; good if you expect tax rates to rise significantly",
      color: "border-chart-1/30 bg-chart-1/10",
    },
    {
      name: "Pro-Rata Strategy",
      order: ["Withdraw proportionally from all accounts", "Maintain consistent tax bracket", "Rebalance annually"],
      pros: "Keeps tax bracket stable; simplest to execute",
      color: "border-chart-2/30 bg-chart-2/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">Traditional IRA/401(k) Balance</Label>
            <Input type="number" value={traditionalBalance} onChange={e => setTraditionalBalance(Number(e.target.value))} className="mt-1.5 bg-input border-border/60 h-9" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Roth IRA Balance</Label>
            <Input type="number" value={rothBalance} onChange={e => setRothBalance(Number(e.target.value))} className="mt-1.5 bg-input border-border/60 h-9" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Taxable Brokerage Balance</Label>
            <Input type="number" value={taxableBalance} onChange={e => setTaxableBalance(Number(e.target.value))} className="mt-1.5 bg-input border-border/60 h-9" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Monthly Income Needed</Label>
            <Input type="number" value={monthlyNeed} onChange={e => setMonthlyNeed(Number(e.target.value))} className="mt-1.5 bg-input border-border/60 h-9" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Estimated Tax Rate in Retirement: {taxRate}%</Label>
            <Slider value={[taxRate]} onValueChange={([v]) => setTaxRate(v)} min={10} max={37} step={1} className="mt-2" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Total Portfolio", value: formatK(totalBalance), color: "text-primary" },
              { label: "Annual Income Needed", value: formatCurrency(annualNeed), color: "text-chart-1" },
              { label: "Tax on Withdrawals", value: formatCurrency(taxOnWithdrawal), color: "text-destructive" },
              { label: "Years of Income", value: `${yearsOfIncome.toFixed(0)} yrs`, color: "text-chart-4" },
            ].map(item => (
              <div key={item.label} className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                <div className={`font-display text-xl font-bold ${item.color}`}>{item.value}</div>
              </div>
            ))}
          </div>

          <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Year 1 Optimal Withdrawal</div>
            <div className="space-y-2">
              {[
                { label: "From Taxable Brokerage", value: fromTaxable, note: "LTCG rates (0-20%)" },
                { label: "From Traditional IRA/401k", value: fromTraditional, note: `Ordinary income (${taxRate}%)` },
                { label: "From Roth IRA", value: fromRoth, note: "Tax-free" },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center text-sm">
                  <div>
                    <div className="text-foreground">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.note}</div>
                  </div>
                  <div className="font-medium text-foreground">{formatCurrency(item.value)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">Withdrawal Strategy Comparison</h4>
        {strategies.map(s => (
          <div key={s.name} className={`rounded-xl p-5 border ${s.color}`}>
            <div className="font-semibold text-foreground mb-2">{s.name}</div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-2">Withdrawal Order:</div>
                <ol className="space-y-1">
                  {s.order.map((step, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-foreground">
                      <span className="w-4 h-4 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="sm:w-48">
                <div className="text-xs text-muted-foreground mb-1">Best For:</div>
                <div className="text-xs text-foreground leading-relaxed">{s.pros}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function TaxEngine() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container py-10">
        <div className="mb-10">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Tax Optimization</div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">Tax Optimization Engine</h1>
          <p className="text-muted-foreground max-w-2xl">
            CFA and FRM-informed tax strategies: Traditional vs Roth simulation, tax-loss harvesting,
            multi-state analysis (NY, NJ, CA), and optimal withdrawal sequencing.
          </p>
        </div>

        <Tabs defaultValue="comparison" className="space-y-6">
          <TabsList className="bg-secondary border border-border/50 p-1 h-auto flex-wrap gap-1">
            <TabsTrigger value="comparison" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ArrowDownUp className="w-3.5 h-3.5 mr-1.5" />Trad vs Roth
            </TabsTrigger>
            <TabsTrigger value="harvesting" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TrendingDown className="w-3.5 h-3.5 mr-1.5" />Tax-Loss Harvesting
            </TabsTrigger>
            <TabsTrigger value="states" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MapPin className="w-3.5 h-3.5 mr-1.5" />State Tax (NY/NJ/CA)
            </TabsTrigger>
            <TabsTrigger value="withdrawal" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-3.5 h-3.5 mr-1.5" />Withdrawal Strategy
            </TabsTrigger>
          </TabsList>

          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <TabsContent value="comparison"><TraditionalVsRoth /></TabsContent>
              <TabsContent value="harvesting"><TaxLossHarvesting /></TabsContent>
              <TabsContent value="states"><MultiStateTax /></TabsContent>
              <TabsContent value="withdrawal"><WithdrawalStrategy /></TabsContent>
            </CardContent>
          </Card>
        </Tabs>

        <div className="mt-6 bg-secondary/30 border border-border/50 rounded-xl p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Disclaimer:</strong> Tax calculations use 2025 IRS brackets and simplified assumptions.
            State tax calculations are estimates and may not reflect all deductions, credits, or local taxes.
            Always consult a licensed CPA or tax attorney for personalized tax advice.
          </p>
        </div>
      </div>
    </div>
  );
}
