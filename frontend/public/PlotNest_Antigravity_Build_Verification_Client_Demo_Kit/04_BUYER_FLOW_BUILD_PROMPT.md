# Antigravity Prompt 04 — Buyer End-to-End Flow

Implement and fully test the buyer journey first.

## TARGET FLOW
Home
→ Search
→ Results
→ Project
→ Site Plan
→ Plot Detail
→ Reserve
→ Hold Timer
→ Checkout
→ Demo KYC
→ Mock Payment
→ Confirmation
→ Buyer Dashboard

## MUST WORK

### Search
- search input
- filters
- sorting
- result count
- save
- compare

### Project
- gallery
- project info
- badges
- amenities
- documents
- price
- site plan

### Site Plan
Use `assets/demo-site-plan.svg`.

Plots must be clickable.

Clicking plot:
- highlights plot
- opens detail panel
- reads live mock data

### Reservation
Clicking Reserve:
- validates availability
- creates 15-minute hold
- displays countdown
- persists hold
- prevents duplicate reservation
- auto-releases on expiry

### Checkout
Use stepper:
Plot → Details → KYC → Payment → Confirmation

### Mock KYC
Use only synthetic data.
Clearly show:
`DEMO / SAMPLE DATA`

### Mock Payment
Allow:
- UPI
- Card
- Net Banking

Buttons:
- Simulate Success
- Simulate Failure

Success:
payment success → booking confirmed → plot booked → receipt → notification → timeline

Failure:
payment failed → booking remains pending → retry available until hold expires

## ACCEPTANCE
After implementation, actually test the whole flow from fresh state and from a refresh.
Fix all issues discovered.
