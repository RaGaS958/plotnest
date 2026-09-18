# Antigravity Prompt 07 — Build the Client Onboarding Tutor

Create an **in-product guided onboarding/tutorial system** that explains the platform during a client demonstration.

This is not a generic tooltip system.
It must tell the story of the product.

## COMPONENT
Create:
`DemoTour`

Capabilities:
- start tour
- next
- back
- skip
- finish
- restart
- progress indicator
- contextual tooltip
- highlighted target
- optional dimmed backdrop
- mobile-friendly bottom sheet mode

Persist:
`demoTourCompleted=true`
but provide:
`Restart Product Tour`

## CLIENT TOUR

### Tour 1 — Marketplace
Step 1:
Target: homepage search
Text:
“Start here: buyers search by location, project, budget and plot preferences.”

Step 2:
Target: project card
Text:
“Projects surface the inventory, price range and trust signals a buyer needs before engaging.”

### Tour 2 — Exact Plot Selection
Target: site plan
Text:
“This is the key workflow: buyers choose the exact inventory unit rather than making a generic enquiry.”

Target: plot detail
Text:
“Every plot has its own area, dimensions, facing, road width, price and booking amount.”

### Tour 3 — Booking
Target: Reserve button
Text:
“Selecting Reserve creates a temporary hold so the chosen plot is not simultaneously offered during checkout.”

Target: checkout stepper
Text:
“The buyer moves through a guided sequence: details, demo KYC and payment.”

### Tour 4 — Payment
Target: payment panel
Text:
“For the prototype, payment is simulated. In production this can connect to an approved payment gateway and webhook flow.”

### Tour 5 — Buyer Dashboard
Target: timeline
Text:
“The customer can continue tracking the journey after payment instead of losing visibility.”

### Tour 6 — Developer Portal
Target: developer navigation
Text:
“Developers manage projects, inventory, leads, site visits and bookings from one workspace.”

### Tour 7 — Admin
Target: verification queue
Text:
“Admin controls marketplace quality through project, document and workflow verification.”

## CONTEXTUAL HELP
Add small:
`? What is this?`
buttons for complicated modules.

Each help panel should explain:
- What it does
- Why it matters
- What happens next

## DEMO MODE
Show a small non-intrusive:
`DEMO MODE`
badge in the application.

Create a command:
`Start Client Tour`

## IMPORTANT
The tutorial must never block critical functionality permanently.
It should be dismissible.

## CONTENT SOURCE
Use `tutorial-content.md`.
