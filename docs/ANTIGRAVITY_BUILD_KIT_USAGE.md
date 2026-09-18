# Antigravity Build Kit Usage

This document provides an inventory of the assets and specifications from the `PlotNest_Antigravity_Build_Verification_Client_Demo_Kit` that have been integrated into the PlotNest prototype.

### Documentation

The following specifications from the build kit were used to guide the development of this prototype:
- `01_CODEBASE_AUDIT_PROMPT.md`
- `02_PRODUCT_UX_ARCHITECTURE_PROMPT.md`
- `03_DESIGN_SYSTEM_PROMPT.md`
- `04_BUYER_FLOW_BUILD_PROMPT.md` (Buyer end-to-end flow, search, project, site plan, reservation, checkout, mock KYC, mock payment)
- `05_DEVELOPER_PORTAL_BUILD_PROMPT.md` (Developer Dashboard, Inventory, Leads)
- `06_ADMIN_PORTAL_BUILD_PROMPT.md` (Admin Console, Verification Queue, Audit)
- `07_INTERACTIVE_DEMO_TUTORIAL_PROMPT.md` (Interactive Demo Tutor / Onboarding)
- `08_DEMO_POLISH_PROMPT.md`
- `09_VERIFICATION_QA_PROMPT.md`
- `10_EXPORT_RELEASE_PROMPT.md`
- `CLIENT_DEMO_NARRATIVE.md`

### Assets

Which SVG/image/demo assets are being used:

- **Asset:** `client-logo-placeholder.svg`
  - **Current location:** Rendered directly via inline SVG in `src/components/common/Header.tsx`.
  - **Purpose:** Provide a clean, brandable logo placeholder for the prototype.
  - **Where it is used:** Main navigation header.
  - **Reusable:** Yes.
  - **Needs conversion:** Converted to inline React SVG for easier styling/theming.

- **Asset:** `demo-site-plan.svg`
  - **Current location:** Translated into a fully interactive SVG React Component in `src/components/buyer/SitePlan.tsx`.
  - **Purpose:** Serve as the interactive master layout plan for plot selection.
  - **Where it is used:** `ProjectDetailPage` > `SitePlan` tab.
  - **Reusable:** Yes.
  - **Needs conversion:** Converted to programmatic SVG to allow data binding (highlighting available plots, clicking to reserve).

- **Asset:** `demo-document-cover.svg`
  - **Current location:** Integrated directly into the Demo KYC and Documents components.
  - **Purpose:** Show safe simulated document state.
  - **Where it is used:** Buyer Dashboard / Checkout Flow.
  - **Reusable:** Yes.
  - **Needs conversion:** Handled by inline design patterns.

### Data

Which mock data is being integrated:
- The entire `MOCK_DATA_SEED.json` state has been integrated into `src/data/mockData.ts`, which seeds the `AppContext`.
- Entities supported: Users, Organizations, Projects, Plots, Bookings, Payments, SiteVisits, Documents, VerificationCases, Leads, Notifications.
- State is managed via React Context and `localStorage` to persist across reloads.

### Design

Which design tokens are being integrated:
- Typography (`Inter`, `system-ui`) and Colors (`brandPrimary`, `brandAccent`, `background`, etc.) from `DESIGN_TOKENS.json` are deeply embedded into Tailwind classes and inline styles across the app (e.g., `#14532D` for primary).

### Tutorial

Which tutorial content is being integrated:
- `tutorial-content.md` content is being surfaced through the `DemoTour` component.

### Demo

Which demo scenarios are being implemented:
- **Buyer Demo:** Fresh state or state with an active booking (simulating successful checkout).
- **Developer Demo:** Full inventory and leads management.
- **Admin Demo:** Verification queue for project approvals.
- Controlled via `DemoBanner` in the UI.
