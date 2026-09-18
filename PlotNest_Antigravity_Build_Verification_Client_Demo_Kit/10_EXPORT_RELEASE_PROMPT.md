# Antigravity Prompt 10 — Demo Release & Export

Prepare the project for client demonstration.

## RELEASE TASKS
1. Remove unused files and dead code.
2. Fix all warnings that affect demo quality.
3. Ensure build succeeds.
4. Ensure all routes work.
5. Ensure mock data is seeded correctly.
6. Ensure Reset Demo works.
7. Ensure Demo Tour works.
8. Ensure no real credentials or secrets exist.
9. Ensure demo documents are clearly marked SAMPLE/DEMO.
10. Ensure payment flow is explicitly simulation-only.
11. Ensure responsive behavior is clean.
12. Ensure page titles and favicon/brand are present.
13. Ensure a clean README exists.

## DEMO CONTROLS
Include:
- Demo Mode badge
- role switcher
- Reset Demo Data
- Start Client Tour
- optional “Open Demo Scenario” shortcuts

## DEMO SCENARIOS
Provide one-click starting states:
- Fresh Buyer
- Buyer With Booking
- Developer Inventory
- Admin Verification Queue

## BUILD
Run the production build.

Do not claim a successful build unless the command actually succeeds.

## OUTPUT
Create:
`docs/DEMO_RELEASE_NOTES.md`

Include:
- what works
- how to start
- demo accounts/roles
- demo limitations
- known prototype-only behavior
- recommended next production integrations

The app is ready only when it can be shown live without needing manual database edits.
