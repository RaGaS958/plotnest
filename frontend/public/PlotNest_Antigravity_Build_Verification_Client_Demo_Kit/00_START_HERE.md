# PlotNest — Antigravity Build + Verification + Client Demo Kit

Use these prompts in order inside Antigravity / your coding agent.

## Goal
Turn the PlotNest concept into a polished, fully interactive, demo-ready prototype that can be:
- verified internally
- exported/builded cleanly
- shown to a client
- explained to a client through an in-product onboarding/tutorial system

## Prompt order
1. `01_CODEBASE_AUDIT_PROMPT.md`
2. `02_PRODUCT_UX_ARCHITECTURE_PROMPT.md`
3. `03_DESIGN_SYSTEM_PROMPT.md`
4. `04_BUYER_FLOW_BUILD_PROMPT.md`
5. `05_DEVELOPER_PORTAL_BUILD_PROMPT.md`
6. `06_ADMIN_PORTAL_BUILD_PROMPT.md`
7. `07_INTERACTIVE_DEMO_TUTORIAL_PROMPT.md`
8. `08_DEMO_POLISH_PROMPT.md`
9. `09_VERIFICATION_QA_PROMPT.md`
10. `10_EXPORT_RELEASE_PROMPT.md`

## Important
Do not ask the coding agent to rebuild everything blindly.
At every stage it must:
- inspect the current code first
- preserve working features
- reuse components
- avoid duplicate files
- document architectural decisions
- run tests/checks
- fix issues rather than merely report them

## Supporting assets
- `assets/client-logo-placeholder.svg`
- `assets/demo-site-plan.svg`
- `assets/demo-document-cover.svg`
- `assets/tutorial-content.md`
- `MOCK_DATA_SEED.json`
- `DESIGN_TOKENS.json`

## Final outcome
The finished prototype should have:
Buyer + Developer + Admin experiences,
working mock data,
realistic interactions,
demo payment flow,
plot hold logic,
client tutorial,
guided walkthrough,
reset-demo controls,
responsive layouts,
and a clean production-like codebase.
