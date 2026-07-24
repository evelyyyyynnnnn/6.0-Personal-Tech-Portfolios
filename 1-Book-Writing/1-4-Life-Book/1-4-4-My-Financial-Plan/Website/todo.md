# WealthWise Pro — TODO

## Foundation
- [x] Global styles, color palette, typography (dark premium theme)
- [x] DB schema: users, consultations, chat_messages
- [x] App routing and layout structure
- [x] Navigation component (top nav for public site)

## Landing Page
- [x] Hero section with value proposition and CTA
- [x] CFA/FRM credential highlights
- [x] Feature overview cards
- [x] Client success stories (anonymized, with disclaimer)
- [x] Legal disclaimer section
- [x] Membership/pricing teaser
- [x] State tax callout (NY/NJ/CA)
- [x] Stats row

## Calculators
- [x] 401(k) calculator with tax deduction logic and chart
- [x] Traditional IRA calculator with deductibility rules
- [x] Roth IRA calculator with income phase-out limits
- [x] Backdoor Roth IRA step-by-step calculator
- [x] Visual output charts for all calculators
- [x] Education library tabs (What is 401k, Roth IRA, Backdoor Roth, Tax Guide)

## Retirement Planner
- [x] Input form: age, income, company match, risk preference
- [x] Output: optimal account allocation (401k/Roth/taxable)
- [x] Projected retirement assets chart
- [x] Monthly cash flow breakdown

## Tax Optimization Engine
- [x] Traditional vs Roth comparison with future tax rate simulation
- [x] Tax-loss harvesting simulator
- [x] Multi-state tax analysis (NY, NJ, CA)
- [x] Withdrawal strategy optimizer

## Asset Allocation Advisor
- [x] Age-based stock/bond/cash ratio recommendations
- [x] Risk level models (conservative/balanced/aggressive)
- [x] Market scenario simulations (bull/rate hike/recession)
- [x] Visual allocation charts

## Account Dashboard
- [ ] 401k, IRA, brokerage account overview (future)
- [ ] Total assets, distribution, historical performance (future)
- [ ] Tax-adjusted net return display (future)

## Company Benefits Optimizer
- [x] 401k match optimization calculator
- [x] Vesting schedule visualizer (cliff vs graded)
- [x] Mega backdoor Roth eligibility checker + step-by-step guide

## Buy vs Rent Calculator
- [ ] 30-year cost comparison model (future)
- [ ] Down payment scenario analysis (future)
- [ ] Break-even analysis (future)

## AI Q&A Assistant
- [x] Streaming chat interface with financial system prompt
- [x] CFA/FRM-informed context (2025 IRS rules, NY/NJ/CA state taxes)
- [x] Chat history persistence per user
- [x] Suggested questions grid
- [x] Auth gate (sign-in required)

## Membership & Consultation
- [x] Free vs Premium vs Advisory tier display
- [x] Consultation booking form (name, contact, goals, preferred time)
- [x] Owner notification on consultation submission (name + contact + goals)
- [x] Service cards with pricing
- [x] Client testimonials

## Tests & Polish
- [x] Vitest unit tests: 18 tests passing (auth, consultation, chat)
- [x] Responsive design (mobile-first)
- [x] Legal disclaimer on all relevant pages
- [x] TypeScript: 0 errors
- [x] Final checkpoint

## Future / Planned
- [ ] Stripe payment integration for Premium/Advisory tiers
- [ ] Account dashboard with portfolio tracking
- [ ] Buy vs. rent calculator
- [ ] RIA registration and investment advice licensing
- [ ] B2B features (startup HR, accounting firm partnerships)
- [ ] Email notifications (in addition to in-app)

## Language & Theme Toggles (New)
- [x] Language context (EN/ZH) with React context + localStorage persistence
- [x] Chinese translations for all nav labels and key UI strings
- [x] Light theme CSS variables (warm white financial look)
- [x] Theme toggle button in TopNav (sun/moon icon)
- [x] Language toggle button in TopNav (EN/中文)
- [x] ThemeProvider set to switchable mode
