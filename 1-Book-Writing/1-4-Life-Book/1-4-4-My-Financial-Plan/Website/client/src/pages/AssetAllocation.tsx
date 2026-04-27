import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { BarChart3, TrendingUp, TrendingDown, Minus } from "lucide-react";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}
function formatPct(n: number) { return `${n.toFixed(1)}%`; }

const RISK_MODELS = {
  conservative: {
    label: "Conservative",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    borderColor: "border-chart-2/30",
    stocks: 30, bonds: 60, cash: 10,
    expectedReturn: 5.0,
    volatility: 6,
    desc: "Capital preservation focus. Suitable for investors within 5 years of retirement or with low risk tolerance.",
  },
  balanced: {
    label: "Balanced",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    borderColor: "border-chart-1/30",
    stocks: 60, bonds: 35, cash: 5,
    expectedReturn: 7.0,
    volatility: 12,
    desc: "Growth with stability. The classic 60/40 portfolio, suitable for most long-term investors.",
  },
  aggressive: {
    label: "Aggressive",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
    borderColor: "border-chart-5/30",
    stocks: 85, bonds: 12, cash: 3,
    expectedReturn: 9.0,
    volatility: 18,
    desc: "Maximum growth potential. Suitable for investors 20+ years from retirement with high risk tolerance.",
  },
};

const SCENARIOS = {
  bull: {
    label: "Bull Market",
    icon: TrendingUp,
    color: "text-chart-4",
    multipliers: { conservative: 1.08, balanced: 1.15, aggressive: 1.22 },
    desc: "Strong economic growth, low rates, rising equity markets",
  },
  rateHike: {
    label: "Rate Hike Cycle",
    icon: Minus,
    color: "text-chart-1",
    multipliers: { conservative: 0.97, balanced: 0.98, aggressive: 1.02 },
    desc: "Fed tightening cycle; bonds fall, equities volatile, cash gains value",
  },
  recession: {
    label: "Recession",
    icon: TrendingDown,
    color: "text-destructive",
    multipliers: { conservative: 0.96, balanced: 0.88, aggressive: 0.75 },
    desc: "Economic contraction; equities decline significantly, bonds as safe haven",
  },
};

const CHART_COLORS = {
  stocks: "oklch(0.72 0.18 45)",
  bonds: "oklch(0.65 0.15 180)",
  cash: "oklch(0.70 0.15 130)",
};

function getAgeBasedAllocation(age: number) {
  // Rule of thumb: 110 - age = stock percentage (updated from 100 - age)
  const stocks = Math.max(20, Math.min(90, 110 - age));
  const bonds = Math.max(5, Math.min(70, age - 10));
  const cash = Math.max(2, 100 - stocks - bonds);
  return { stocks, bonds, cash: Math.min(cash, 15) };
}

export default function AssetAllocation() {
  const [age, setAge] = useState(35);
  const [portfolioValue, setPortfolioValue] = useState(250000);
  const [risk, setRisk] = useState<"conservative" | "balanced" | "aggressive">("balanced");
  const [scenario, setScenario] = useState<"bull" | "rateHike" | "recession">("bull");

  const riskModel = RISK_MODELS[risk];
  const ageAllocation = getAgeBasedAllocation(age);
  const scenarioData = SCENARIOS[scenario];

  const allocationData = [
    { name: "Stocks", value: riskModel.stocks, color: CHART_COLORS.stocks },
    { name: "Bonds", value: riskModel.bonds, color: CHART_COLORS.bonds },
    { name: "Cash/Equivalents", value: riskModel.cash, color: CHART_COLORS.cash },
  ];

  const scenarioReturn = scenarioData.multipliers[risk];
  const scenarioPortfolioValue = portfolioValue * scenarioReturn;
  const scenarioChange = scenarioPortfolioValue - portfolioValue;

  // Comparison chart data
  const comparisonData = [
    {
      name: "Conservative",
      "Bull Market": Math.round(portfolioValue * SCENARIOS.bull.multipliers.conservative),
      "Rate Hike": Math.round(portfolioValue * SCENARIOS.rateHike.multipliers.conservative),
      "Recession": Math.round(portfolioValue * SCENARIOS.recession.multipliers.conservative),
    },
    {
      name: "Balanced",
      "Bull Market": Math.round(portfolioValue * SCENARIOS.bull.multipliers.balanced),
      "Rate Hike": Math.round(portfolioValue * SCENARIOS.rateHike.multipliers.balanced),
      "Recession": Math.round(portfolioValue * SCENARIOS.recession.multipliers.balanced),
    },
    {
      name: "Aggressive",
      "Bull Market": Math.round(portfolioValue * SCENARIOS.bull.multipliers.aggressive),
      "Rate Hike": Math.round(portfolioValue * SCENARIOS.rateHike.multipliers.aggressive),
      "Recession": Math.round(portfolioValue * SCENARIOS.recession.multipliers.aggressive),
    },
  ];

  // Age-based recommendation timeline
  const ageTimeline = [25, 35, 45, 55, 65].map(a => {
    const alloc = getAgeBasedAllocation(a);
    return { age: `Age ${a}`, Stocks: alloc.stocks, Bonds: alloc.bonds, Cash: alloc.cash };
  });

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container py-10">
        <div className="mb-10">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Asset Allocation</div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">Smart Asset Allocation Advisor</h1>
          <p className="text-muted-foreground max-w-2xl">
            Age-based allocation models, risk-level portfolios, and market scenario stress tests —
            built on FRM-certified risk management principles.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-foreground">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label className="text-xs text-muted-foreground">Age: {age}</Label>
                  <Slider value={[age]} onValueChange={([v]) => setAge(v)} min={20} max={70} step={1} className="mt-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>20</span><span>70</span></div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Portfolio Value</Label>
                  <div className="mt-2 text-xl font-bold text-primary">{formatCurrency(portfolioValue)}</div>
                  <Slider value={[portfolioValue]} onValueChange={([v]) => setPortfolioValue(v)} min={10000} max={2000000} step={10000} className="mt-2" />
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Risk Tolerance</Label>
                  <div className="space-y-2">
                    {(["conservative", "balanced", "aggressive"] as const).map(r => (
                      <button
                        key={r}
                        onClick={() => setRisk(r)}
                        className={`w-full p-3 rounded-xl text-left transition-all border ${risk === r ? `${RISK_MODELS[r].bgColor} ${RISK_MODELS[r].borderColor}` : "border-border/50 hover:bg-secondary"}`}
                      >
                        <div className={`text-sm font-semibold capitalize ${risk === r ? RISK_MODELS[r].color : "text-foreground"}`}>{r}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {RISK_MODELS[r].stocks}% stocks / {RISK_MODELS[r].bonds}% bonds / {RISK_MODELS[r].cash}% cash
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Market Scenario</Label>
                  <div className="space-y-2">
                    {(["bull", "rateHike", "recession"] as const).map(s => {
                      const sc = SCENARIOS[s];
                      return (
                        <button
                          key={s}
                          onClick={() => setScenario(s)}
                          className={`w-full p-3 rounded-xl text-left transition-all border ${scenario === s ? "bg-secondary border-primary/30" : "border-border/50 hover:bg-secondary"}`}
                        >
                          <div className={`text-sm font-semibold flex items-center gap-2 ${scenario === s ? "text-primary" : "text-foreground"}`}>
                            <sc.icon className={`w-3.5 h-3.5 ${sc.color}`} />
                            {sc.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">{sc.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Allocation */}
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-foreground flex items-center justify-between">
                  {riskModel.label} Portfolio
                  <Badge className={`${riskModel.bgColor} ${riskModel.color} border ${riskModel.borderColor} text-xs`}>
                    {formatPct(riskModel.expectedReturn)} expected return
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">{riskModel.desc}</p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={allocationData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value">
                        {allocationData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: "oklch(0.13 0.018 240)", border: "1px solid oklch(0.22 0.02 240)", borderRadius: "8px" }}
                        formatter={(v: number) => `${v}%`}
                      />
                      <Legend formatter={(v) => <span style={{ color: "oklch(0.60 0.01 240)", fontSize: "12px" }}>{v}</span>} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="space-y-3">
                    {allocationData.map(item => (
                      <div key={item.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-foreground">{item.name}</span>
                          <span className="font-bold text-foreground">{item.value}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full">
                          <div className="h-2 rounded-full transition-all" style={{ width: `${item.value}%`, background: item.color }} />
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">{formatCurrency(portfolioValue * item.value / 100)}</div>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-border/50 text-xs text-muted-foreground">
                      Expected volatility: ±{riskModel.volatility}% annually
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Age-Based Recommendation */}
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-foreground">
                  Age-Based Recommendation for Age {age}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Stocks", value: ageAllocation.stocks, color: "text-chart-1", bg: CHART_COLORS.stocks },
                    { label: "Bonds", value: ageAllocation.bonds, color: "text-chart-2", bg: CHART_COLORS.bonds },
                    { label: "Cash", value: ageAllocation.cash, color: "text-chart-4", bg: CHART_COLORS.cash },
                  ].map(item => (
                    <div key={item.label} className="bg-secondary/50 rounded-xl p-4 border border-border/50 text-center">
                      <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                      <div className={`font-display text-2xl font-bold ${item.color}`}>{item.value}%</div>
                      <div className="text-xs text-muted-foreground">{formatCurrency(portfolioValue * item.value / 100)}</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mb-4">Allocation evolution by age (110 - age rule)</div>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={ageTimeline}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.02 240)" />
                    <XAxis dataKey="age" tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
                    <YAxis tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "oklch(0.13 0.018 240)", border: "1px solid oklch(0.22 0.02 240)", borderRadius: "8px" }} />
                    <Bar dataKey="Stocks" fill={CHART_COLORS.stocks} stackId="a" />
                    <Bar dataKey="Bonds" fill={CHART_COLORS.bonds} stackId="a" />
                    <Bar dataKey="Cash" fill={CHART_COLORS.cash} stackId="a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Scenario Simulation */}
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                  <scenarioData.icon className={`w-4 h-4 ${scenarioData.color}`} />
                  Scenario: {scenarioData.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">{scenarioData.desc}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">Current Value</div>
                    <div className="font-display text-lg font-bold text-foreground">{formatCurrency(portfolioValue)}</div>
                  </div>
                  <div className={`rounded-xl p-4 border ${scenarioChange >= 0 ? "border-chart-4/30 bg-chart-4/10" : "border-destructive/30 bg-destructive/10"}`}>
                    <div className="text-xs text-muted-foreground mb-1">Change</div>
                    <div className={`font-display text-lg font-bold ${scenarioChange >= 0 ? "text-chart-4" : "text-destructive"}`}>
                      {scenarioChange >= 0 ? "+" : ""}{formatCurrency(scenarioChange)}
                    </div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">Projected Value</div>
                    <div className="font-display text-lg font-bold text-primary">{formatCurrency(scenarioPortfolioValue)}</div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground mb-3">All strategies under this scenario:</div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.02 240)" />
                    <XAxis dataKey="name" tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
                    <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} tick={{ fill: "oklch(0.60 0.01 240)", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "oklch(0.13 0.018 240)", border: "1px solid oklch(0.22 0.02 240)", borderRadius: "8px" }} formatter={(v: number) => formatCurrency(v)} />
                    <Legend />
                    <Bar dataKey="Bull Market" fill="oklch(0.70 0.15 130)" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Rate Hike" fill="oklch(0.65 0.15 180)" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Recession" fill="oklch(0.60 0.22 25)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 bg-secondary/30 border border-border/50 rounded-xl p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Disclaimer:</strong> Asset allocation recommendations are based on general principles and do not account for individual tax situations, liquidity needs, or specific investment goals.
            Scenario simulations are illustrative estimates, not predictions. Past market behavior does not guarantee future results.
          </p>
        </div>
      </div>
    </div>
  );
}
