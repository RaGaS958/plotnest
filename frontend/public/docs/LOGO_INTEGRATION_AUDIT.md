# PlotNest Logo Integration Audit

## 1. Current Logo Locations
- **Header**: Used a manual CSS/SVG reconstruction of the logo in `frontend/src/components/common/Header.tsx`.
- **Footer**: Used a manual CSS/SVG reconstruction of the logo in `frontend/src/components/common/Footer.tsx`.
- **Splash Screen**: Used a manual CSS/SVG reconstruction via `<PlotNestLogo variant="vertical" />` (which was missing a proper implementation) in `frontend/src/components/common/SplashScreen.tsx`.
- **Favicon**: Missing entirely from `index.html`.
- **Demo Kit**: Contained an unused `client-logo-placeholder.svg`.

## 2. Issues Identified
- **Duplication & Hardcoding**: The logo was manually redrawn using inline SVG and CSS shapes instead of using official brand assets.
- **Missing Brand Assets**: No centralized `assets/branding` directory existed.
- **Missing Favicons**: The application lacked browser icons.
- **Typography Separation**: The wordmark was recreated with HTML text next to the inline SVGs instead of using the provided typography-integrated logo.

## 3. Replacements & Fixes
- Extracted official logo variants from the provided brand guidelines sheet.
- Created canonical assets:
  - `src/assets/branding/plotnest-logo-large.png`
  - `src/assets/branding/plotnest-logo.png`
  - `src/assets/branding/plotnest-icon.png`
  - `src/assets/branding/plotnest-app-icon.png`
- Created `PlotNestLogo.tsx` component in `src/components/branding/` to centralize usage and ensure responsive sizing according to brand guidelines.
- Replaced inline SVGs in `Header.tsx` and `Footer.tsx` with the new `PlotNestLogo` component.
- Updated `SplashScreen.tsx` to use the `large` variant and removed the redundant HTML tagline.
- Added favicon and apple-touch-icon links to `index.html`.
- Deleted the old `client-logo-placeholder.svg`.
