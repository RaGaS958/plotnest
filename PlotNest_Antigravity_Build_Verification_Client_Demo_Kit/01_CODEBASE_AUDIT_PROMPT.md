# Antigravity Prompt 01 — Codebase Audit & Safe Refactor

Act as a Principal Software Architect and Senior Full-Stack Engineer.

Before changing code, deeply inspect the entire existing PlotNest repository.

## FIRST: DISCOVER
Inspect:
- package.json / package manager
- source tree
- routes
- pages
- components
- hooks
- state management
- services
- mock data
- styles
- assets
- configuration
- build scripts
- tests
- lint configuration
- environment files

Do not modify anything during the first inspection pass.

## PRODUCE
Create or update:
`docs/ARCHITECTURE_AUDIT.md`

Include:
- current architecture
- frontend entry points
- routing map
- state flow
- data flow
- duplicated code
- unused code
- broken imports
- inconsistent naming
- accessibility gaps
- responsive gaps
- missing business logic
- missing demo state
- technical debt
- risks before client demo

## REFACTOR RULES
If files are badly arranged:
- organize frontend code logically
- separate domain/features/components
- keep reusable UI separate from business logic
- keep mock services separate from UI
- keep assets in a central asset structure
- keep admin/developer/buyer modules isolated where useful

Suggested structure:

src/
  app/
  routes/
  components/
    ui/
    shared/
    marketplace/
    booking/
    site-plan/
    dashboard/
  features/
    buyer/
    developer/
    admin/
    bookings/
    payments/
    verification/
    documents/
  services/
  store/
  data/
  hooks/
  utils/
  styles/
  assets/

Do not perform a huge rewrite if the existing project is healthy.
Refactor incrementally.

## REQUIRED CHECKS
After changes:
- install/verify dependencies
- run type checking
- run lint
- run tests if present
- run production build

Fix discovered issues before moving on.

## STOP CONDITION
Do not start major visual redesign until the current codebase structure is understood and stable.
