# Antigravity Prompt 09 — Full Verification Before Export

Treat the current application as a release candidate.

Do not just provide a QA report. Test and fix issues.

## FUNCTIONAL QA

### Buyer
- Home works
- Search works
- Filters work
- Project navigation works
- Site plan works
- Plot details work
- Reserve works
- Hold timer works
- Hold expiry releases inventory
- Checkout works
- Demo KYC works
- Payment success works
- Payment failure works
- Booking confirmation works
- Buyer dashboard reflects changes
- Site visit works
- Favorites work
- Compare works
- Notifications work

### Developer
- Dashboard works
- Project onboarding works
- Inventory editing works
- Lead pipeline works
- Site visits work
- Booking list works
- Preview works

### Admin
- Dashboard works
- Verification queue works
- Approve works
- Request Changes works
- Reject works
- Payment monitoring works
- Booking monitoring works
- Audit logs work

## EDGE CASES
Test:
- click Reserve twice
- reserve already booked plot
- reserve already held plot
- refresh during hold
- payment failure then retry
- payment success after state change
- empty search
- no matching filters
- invalid form
- mobile modal
- mobile checkout
- browser back/forward where relevant

## TECHNICAL QA
Run:
- typecheck
- lint
- unit tests if present
- build
- route verification

Inspect console/network errors.

## UX QA
Confirm:
- primary CTA visibility
- readable typography
- clear statuses
- accessibility
- mobile usability

## FINAL OUTPUT
Create:
`docs/RELEASE_QA_REPORT.md`

Include only verified results, actual defects fixed, and known limitations.
