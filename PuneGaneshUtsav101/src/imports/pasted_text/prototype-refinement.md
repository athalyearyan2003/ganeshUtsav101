REFINE THE EXISTING "MY FAMILY GANESHOTSAV" PROTOTYPE — VISUAL THEME + SAFE-AREA CORRECTION

Do not rebuild the information architecture, remove screens, or change the flow. All 6 screens, their content, copy, icons, and interaction logic stay exactly as built. This pass only touches colour and top/bottom safe-area handling.

═══════════════════════════════════════════
1. NEW COLOUR SYSTEM — WHITE, APPLE-INSPIRED, ORANGE/YELLOW ACCENT
═══════════════════════════════════════════

Replace the maroon-based palette with the tokens below. Every other design token (typography, spacing, radius, icon sizes) stays unchanged.

SURFACES
- Canvas (screen background)     `#FFFFFF`
- Surface-Sunken (grouped panels, map base, summary block)  `#F8F7F3`
- Card surfaces stay `#FFFFFF` — since canvas is also white, separate cards from background using the existing 1px border only (no shadow added). This flat, hairline-bordered look is intentionally Apple-esque.
- Border            `#E7E5E0`
- Border-Strong (selected outline)  same as Primary Action, see below

TEXT
- Ink (primary text)     `#1C1C1E`
- Ink-Secondary          `#6B6B6B`
- Ink-Tertiary           keep current tertiary grey, just confirm it stays lighter than Ink-Secondary and is never used for essential text

PRIMARY ACTION — saffron orange, ONE job only: buttons, selected-state borders/checks, progress bar fill.
- Primary Action     `#F28C28`
- Primary Action Press   `#D97A1D`
- CRITICAL — text/icon colour on this fill must be `#1C1C1E` (dark ink), never white. White text on `#F28C28` measures ~2.45:1 contrast, which fails accessibility for button labels. Dark ink on the same orange measures ~6.9:1, which passes comfortably. Every primary button, filled progress segment, and filled checkmark background must use dark ink content on top of this orange, not white.
- Selected-state border on cards/chips: 2px `#F28C28`, content inside stays Ink, not orange.

ROUTE / MAP ACCENT — a deliberately separate, deepened tone so the live-journey screen's route line and current-position marker never read as "just another button."
- Route-Accent       `#C96A1D`
- Used exclusively for: the live route line, the current-position marker ring, and the "next stop" node fill on Screen 6. Never used on buttons, chips, or any other screen. This keeps it in the same warm family as the brand colour while remaining visibly distinct from Primary Action wherever both appear on screen together (e.g. the map plus the sticky "We've arrived" button).

SECONDARY / CULTURAL ACCENT — sunflower yellow, deliberately restricted to ONE use so it can't be mistaken for a status colour.
- Cultural Accent     `#F4C542`
- Permitted uses ONLY: the "Suggested for your group" tag on Screen 2, and the double-hairline divider motif above sticky bottom bars.
- Not permitted: notices, warnings, status pills, buttons, or any small text. Never place body-size or smaller text directly on this yellow — pair it with dark ink only, in short label-sized tags.

DO NOT TOUCH — these stay exactly as already defined, unchanged by this rebrand:
- Status colours (crowd level, walking effort): Easy/green, Moderate/amber-brown, High-Crowded/red — keep their existing values. They must remain visually distinguishable from both Primary Action orange and Cultural Accent yellow. If any current status colour looks too close to the new palette once placed side by side, shift it slightly toward green or red rather than toward the new orange/yellow family.
- Assist/accessibility colour (teal) — unchanged.
- Emergency colour (deep red) — unchanged. Confirm it still reads as clearly distinct from Primary Action orange at a glance.

RULE OF THUMB FOR THE BUILDER: if you're about to put orange or yellow anywhere other than the specific uses listed above, stop — it belongs in a status, assist, or emergency colour instead, and those don't change.

Keep the palette restrained: no gradients, no glassmorphism, no colour used purely for decoration. Every colour on screen must be doing one of the jobs listed above.

═══════════════════════════════════════════
2. SAFE-AREA AND DYNAMIC ISLAND CORRECTION
═══════════════════════════════════════════

Critical: no content may render underneath or behind the status bar, Dynamic Island, or home indicator on any screen, including onboarding, route summary, destination detail, and live journey.

- Treat the top inset as a protected zone. Use `env(safe-area-inset-top)` (or the equivalent safe-area handling available in the current implementation) as the top padding on every screen's outermost container — do not use a fixed pixel offset.
- The 56px header (with back arrow, step label, and progress bar) must start below this protected zone, not overlap or sit partially behind it. On current iPhone models with a Dynamic Island, this means roughly 54–59px of top clearance before any header content begins — but derive it from the safe-area inset, not a hardcoded number, so it adapts across devices.
- Apply the same treatment to the top status strip on Screen 6 (the "Walking to Tulshibaug" bar sitting over the map) — it currently sits at the very top of that screen and needs the same top-safe-area padding as every other header.
- Apply `env(safe-area-inset-bottom)` as bottom padding on every sticky bottom bar (planning screens 1–3, the sticky bar on Screens 4 and 5, and the bottom sheet on Screen 6), so buttons and the sheet's peek state never collide with the home indicator.
- Check every screen individually — this must be applied screen by screen, not only on whichever screen is currently in view.
- The prototype should look correct when previewed inside an actual iPhone frame, not just in a desktop browser window.

═══════════════════════════════════════════
3. WHAT STAYS THE SAME
═══════════════════════════════════════════

Onboarding sequence, group selection, needs/accessibility preferences, time and interest selection, generated journey, destination detail, and live journey all keep their current content, copy, icons, and behaviour. Sample route, crowd, walking, and facility figures remain clearly illustrative (e.g. "usually," "approx.," "reported X min ago") rather than presented as confirmed live data. Typography, spacing, corner radius, and icon sizing all carry forward unchanged from the current build. Apply the colour and safe-area changes consistently across all screens.