HOME SCREEN — "MY FAMILY GANESHOTSAV" (CONNECTS JOURNEY, DISCOVER, ASSISTANCE)

Do not redesign the existing planning, route, destination detail, live journey, discovery, or help screens. This adds a Home screen and a global tab bar on top of what already exists. Reuse existing colour tokens, radius scale, typography, icon set, and safe-area handling exactly as already defined.

ARCHITECTURE CHANGE — READ FIRST
This supersedes the earlier "no bottom tab navigation" rule. That rule fit a single linear wizard; it no longer fits a product with three parallel destinations a visitor returns to throughout the day. Add a 3-item bottom tab bar: Home, Discover, Journey. Emergency Help is deliberately NOT a tab — see section 2.

═══════════════════════════════════════════
1. GLOBAL TAB BAR
═══════════════════════════════════════════
Standard iOS tab bar, Canvas fill, 1px top Border, height 49 + `env(safe-area-inset-bottom)`. Three items only:
  House 24 → "Home"
  Compass 24 → "Discover"
  Route 24 → "Journey"
Active tab: Primary Action orange icon + label. Inactive: Ink-Tertiary. No badge counts, no notification dots.

Tapping "Journey" with no journey planned does not show an empty screen — it shows the same primary block defined in State 1 below ("Plan a route around your family" + "Plan my journey" button), so there's never a dead end.
Tapping "Discover" opens the existing Discover screen — scoped to the current journey's stops if one exists, otherwise showing a small curated set of 3–4 entries (never the full mandal list — this stays true to "context over catalogue" even with no journey yet).

═══════════════════════════════════════════
2. HEADER (shared across Home, Discover, Journey root screens)
═══════════════════════════════════════════
56pt height, `env(safe-area-inset-top)` respected, Canvas fill, no back arrow (these are root tabs).
Left: plain text label "Pune Ganeshotsav," Label size, Ink-Secondary — no logo graphic, no wordmark styling.
Right: the same "Get Help" component already defined for the Live Journey top strip (Emergency-red border, LifeBuoy 20 + "Help" label, Canvas fill, 48×44 min tap area) — present on all three root screens, not just Home. This is what keeps assistance reachable without making it a tab: recognition without turning it into a browsing destination.
Do not add a date/festival-day badge unless it's driven by a real calendar calculation — don't fabricate a "Day 3 of Ganeshotsav" placeholder that could be wrong.

═══════════════════════════════════════════
3. HOME — STATE 1 (no journey planned)
═══════════════════════════════════════════
PRIMARY BLOCK — Surface-Sunken panel, L/14 radius, 20 padding, single block, no image, no gradient:
  H2: "Plan a route around your family"
  Body-L, Ink-Secondary: "Answer a few quick questions about time, interests, and what your group needs."
  Primary Action button, full width, 56 tall, M/12 radius, dark-ink text on the orange fill (same accessibility rule as every other primary button in the app): "Plan my journey" + ArrowRight.
  This is the only prominent CTA on the screen. Nothing else on this state competes with it visually.

DISCOVERY SECTION — 32pt gap below, Label header: "Explore the festival."
ONE card only (reuse the existing story-preview card component, L/14 radius), not four separate entry cards. Content: a short line naming a small curated set, e.g. "A few Ganpatis and Dekhawas worth knowing about," BookOpen 20 leading, Meta "4 stories." Tapping opens the Discover tab. Do not expand this into a grid of "Ganpatis / Stories / Dekhawas / Nearby" tiles — that reintroduces the catalogue feel this product has deliberately avoided everywhere else.

INFORMATION SECTION — omit entirely in this state. There's nothing contextual to show before a route exists; showing generic facility info here would be decorative, not useful. If you want something here, limit it to one plain Tertiary Link row ("Practical tips before you go") and nothing more — this is optional, not required.

═══════════════════════════════════════════
4. HOME — STATE 2 (journey active)
═══════════════════════════════════════════
PRIMARY BLOCK — same Surface-Sunken panel, now showing live state:
  Meta: "STOP 2 OF 4" with the same thin segmented progress indicator used in the planning flow (Accent fill on completed segments).
  H2, MapPin 20 leading: "Next: Tulshibaug Ganpati"
  Meta, Clock3 16 leading: "Approx. 12 min to this stop"
  Primary Action button, full width: "Continue journey" + ArrowRight — opens the Live Journey screen exactly where the user left it (state-preserving, same rule as the discovery-screen return behaviour already defined).
  Below it, a Tertiary Link (not a second prominent button): "View full route" → Journey tab.

DISCOVERY SECTION — Label header changes to "Discover along your route." Still one card, now scoped: BookOpen 20 "The story behind your next stop" → opens that stop's story detail screen directly, same navigation pattern already defined for discovery entry points.

INFORMATION SECTION — now active, Label header "Nearby now." Maximum two compact rows (icon + label, no cards), reusing the exact contextual-bar language from the Live Journey screen rather than inventing new copy, e.g. Armchair 20 "Rest point in 3 min" · Toilet 20 "Toilet nearby." Never more than two — this is a glance, not a facilities directory.

═══════════════════════════════════════════
5. HOME — STATE 3 (journey completed)
═══════════════════════════════════════════
No badges, no "places visited" grid, no completion score, no "festival passport," no collectible framing of any kind — this product has excluded gamification from the start and that holds here too.
Plain panel, same Surface-Sunken/L-14 treatment:
  H2: "You completed your journey"
  Meta: "4 stops · approx. 2 hr 10 min" (reuse the existing summary-line pattern from the Journey screen)
  Tertiary Link: "Revisit the stories from today" → Discover tab, scoped to the completed stops.
  Primary Action button: "Plan a new journey" + ArrowRight → planning Screen 1.
No celebratory animation, confetti, or congratulatory marketing language — keep the same matter-of-fact tone as the rest of the app.

═══════════════════════════════════════════
6. HARD EXCLUSIONS FOR THIS SCREEN
═══════════════════════════════════════════
No dashboard layout, no statistics, no analytics tiles, no dense map preview on Home. Exactly one prominent primary CTA per state — never two competing buttons at the same visual weight. No feature-card grid (no "4 tiles in a row" pattern). No gamification, streaks, or collectible states of any kind. No first-person marketing copy ("personalized for you," "your unforgettable festival"). No Help tab in the bottom bar. No repeating the planning questionnaire inline on Home — it's an entry point into the existing flow, not a duplicate of it.