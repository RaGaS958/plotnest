# PlotNest Prototype Demo Guide

This guide explains how to present the PlotNest prototype to clients.

## Getting Started

1. Deploy to Vercel (or run `npm run dev` locally).
2. Open the application in a desktop browser for the best presentation experience (though it is fully responsive).
3. Ensure you start from a clean state. Use the **Reset Data** button in the top black Demo Banner if needed.

## Demo Roles & Scenarios

The prototype has a shared mock state (persisted in `localStorage`).

Use the **Role Switcher** in the top black bar to switch perspectives without logging out:

### 1. Buyer
- **Goal:** Show the discovery, plot selection, and booking experience.
- **Flow:** Home -> Search -> Green Valley Residency -> Interactive Site Plan -> Select Plot (e.g., A-02) -> Reserve -> Checkout (KYC & Mock Payment) -> My Bookings.
- **Note:** The "Reserve" button activates a 15-minute countdown hold lock.

### 2. Developer
- **Goal:** Show how builders manage their inventory.
- **Flow:** Switch to Developer -> Dashboard -> Plot Inventory -> Leads.
- **Note:** Notice how the plot the Buyer just booked is now marked as `BOOKED` in the developer inventory.

### 3. Admin
- **Goal:** Show platform governance.
- **Flow:** Switch to Admin -> Verification Queue. Show how admins can review and approve a submitted project (e.g., UrbanLeaf Farm Plots) before it goes live.

## Interactive Client Tour

At any point, click **Start Client Tour** in the top banner. 
This launches an interactive step-by-step walkthrough of the product's value proposition, explaining key features directly on the UI using highlighting rings and contextual tooltips.

## Prototype Limitations
- Payments are simulated (no real money).
- KYC does not call real government APIs.
- The state resets if the user clears their browser's `localStorage` or clicks Reset Data.
- Backend APIs are mocked via `src/context/AppContext.tsx`.
