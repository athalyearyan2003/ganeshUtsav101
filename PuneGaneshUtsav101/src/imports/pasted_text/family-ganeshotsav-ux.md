MY FAMILY GANESHOTSAV — MOBILE UX CONCEPT
A civic/festival wayfinding service for Pune Ganeshotsav, designed around the people in your group.

Build 6 mobile screens at 390 × 844 plus one short transition state. Link them in sequence as a clickable prototype.

═══════════════════════════════════════════
0. WHAT THIS PRODUCT IS
═══════════════════════════════════════════

A planning and accompaniment tool for families visiting multiple Ganpati mandals during Pune Ganeshotsav, where the group often includes a grandparent, a small child, or someone who cannot walk long distances or stand in dense crowds.

Core premise: PLAN THE FESTIVAL AROUND THE PEOPLE COMING WITH YOU, NOT JUST THE GANPATIS YOU WANT TO VISIT.

Tone: a municipal/cultural service that a city or festival trust would run. Calm, plain-spoken, trustworthy, practical. Not a startup product, not a tourism app, not a lifestyle app.

The product must visibly demonstrate: "We understood your group." Every constraint the user enters must produce a specific, visible change in the generated journey.

═══════════════════════════════════════════
1. DESIGN SYSTEM (define these as Figma styles/variables before building screens)
═══════════════════════════════════════════

TYPOGRAPHY — Inter (or Inter Tight). One family only. Tabular numerals for all distances, times and counts.
- Display    32 / 38, Semibold, -0.5 tracking   → screen 1 headline only
- H1         26 / 32, Semibold, -0.3            → screen question headlines
- H2         20 / 26, Semibold                  → destination names, section headers
- Body-L     17 / 26, Regular                   → DEFAULT body size (deliberately large for older readers)
- Body       15 / 22, Regular                   → secondary descriptions
- Label      15 / 20, Medium                    → buttons, selection card titles, status text
- Meta       13 / 18, Regular                   → timestamps, source notes, "last updated"
- Devanagari secondary names render at Body 15/22, Regular, Ink-Tertiary. Same family weight feel, never a decorative or calligraphic font.
Minimum text size anywhere in the UI: 13. Body copy never below 15. No all-caps except a single "STEP 2 OF 4" progress label at Meta size with +0.8 tracking.

SPACING — strict 8pt grid.
- Screen side margin: 20 (constant on every screen, no exceptions)
- Section gap: 32
- Related item gap: 12
- Inside-component padding: 16
- Sticky bottom action bar: 16 padding, 24 bottom safe-area inset
No arbitrary values. No 15, 18, 22, 30.

RADIUS — restrained 3-step scale: 4 (chips, inputs, small tags), 8 (selection cards, buttons, surfaces), 12 (bottom sheet top corners only). Nothing is fully rounded. No pill-shaped buttons anywhere. Avatars/nodes on the map are the only circles, and only because they mark points in space.

ELEVATION — one shadow token only: 0 1px 2px rgba(28,26,23,0.06), used on the sticky bottom bar and the bottom sheet. Everywhere else, separation comes from 1px borders and background contrast. No layered shadows, no glass, no blur.

COLOUR — small, semantic, functional.
Surfaces
- Canvas          #FBF8F3  (warm off-white paper)
- Surface         #FFFFFF
- Surface-Sunken  #F3EEE5  (used for grouped/inactive regions and the map base)
- Border          #E2DACE  (1px, default)
- Border-Strong   #C9BFB0  (1px, selected/ focus)
Ink
- Ink             #1B1917
- Ink-Secondary   #56504A
- Ink-Tertiary    #857D74  (metadata only, never for essential text)
Action
- Primary         #6E1B1B  (deep maroon — ONLY on primary buttons and the selected-state border/check. Never used as a status colour.)
- Primary-Press   #571515
- Accent-Route    #E08A2B  (saffron — ONLY the route line and the "you are here / current step" marker. Never a background, never decoration.)
Status (each ALWAYS paired with an icon and a text label; colour alone never carries meaning)
- Easy / Low      #27614A  text on #E8F0EB
- Moderate        #8A5A0B  text on #F6EEDD
- High / Crowded  #A83226  text on #F8E9E6
Support
- Assist          #175E63  (accessibility, easier route, assistance features)
- Emergency       #8F1D1D  (the single "Get help" action only)
Contrast: all text ≥ 4.5:1 against its background; all icons paired with text ≥ 3:1.

TOUCH TARGETS
- Minimum 44 × 44 for every interactive element.
- Selection cards: minimum 72 tall.
- Primary button: 56 tall, full width minus margins.
- Steppers (+ / −): 48 × 48.
- Map nodes: 44 tap area even where the visual node is 28.
- Minimum 8px gap between any two adjacent tap targets.

ICONOGRAPHY — LUCIDE ONLY. No emoji, no other libraries, no illustrations, no 3D icons.
Sizes: 20 inline with text, 24 for controls and list rows, 28 for prominent contextual indicators and map nodes. Stroke 1.75 consistently.
Mapping (use these names exactly):
  UsersRound → group / crowd context      UserRound → individual person
  Baby → child, breastfeeding context     Accessibility → accessibility need, easier route
  Footprints → walking distance           PersonStanding → low-mobility / walking assistance
  Route → route overview / total          Navigation → active navigation
  MapPin → destination / entrance         LocateFixed → your current position
  Armchair → rest or seating point        Toilet → toilet
  Stethoscope → medical support on route  Hospital → medical facility
  Droplets → drinking water               CarFront → vehicle / return to parking
  ParkingCircle → parking location        Clock3 → estimated time
  ChevronRight → open detail              ChevronDown / ChevronUp → expand / collapse in place
  ArrowRight → primary forward action     ArrowLeft → back
  Check → completed / selected            CircleAlert → warning or constraint
  Info → contextual explanation
Never use an icon alone to communicate status, facility availability, crowd or effort. Icon + text label, always. The only icon-only control permitted is the back arrow in the header, and it carries an accessible label.

═══════════════════════════════════════════
2. GLOBAL STRUCTURE
═══════════════════════════════════════════

Planning screens (1–3) share a header: 56 tall, ArrowLeft at left (hidden on screen 1), centred "STEP n OF 4" progress label at Meta size with a 3px-tall segmented progress bar directly under the header, full bleed, Primary fill on completed segments, Border on remaining.

Every planning screen has exactly this vertical structure:
  Header → H1 question (20 top margin) → one line of Body supporting text in Ink-Secondary → 32 gap → the input group → scrollable content → sticky bottom bar.

Sticky bottom bar on planning screens: Canvas background, 1px top Border, primary button full width, label changes per screen, ArrowRight icon 20 trailing the label. When nothing is selected the button is DISABLED (Border fill, Ink-Tertiary label) and a Meta-size helper line sits above it stating what is needed: "Choose one to continue."

Back always returns without losing entered data.

═══════════════════════════════════════════
3. SCREEN 1 — WHO IS COMING
═══════════════════════════════════════════

Header: no back arrow. Above the headline, a single Meta line: "Pune Ganeshotsav · Visitor planning" in Ink-Tertiary. That is the entirety of the branding. No logo lockup, no hero image, no illustration.

Display headline: "Who are you celebrating Ganeshotsav with?"
Body-L support line: "We'll plan the route around them, not just around the mandals."

INPUT: single-select list of 5 large selection cards, full width, 80 tall, 12 gap, stacked vertically (not a grid — grid shrinks the labels and hurts scanning).
Each card: 24 icon at left in a 40 column, Label-size title, Body-size one-line description, 20 selection indicator at right.
  1. UsersRound — "Family"          / "Adults and children together"
  2. PersonStanding — "With grandparents" / "Someone who prefers shorter walking"
  3. Baby — "With young children"   / "Strollers, feeding, quick breaks"
  4. UserRound — "Friends"          / "Comfortable with longer walks and crowds"
  5. UsersRound — "Mixed group"     / "A bit of everything"
Card states:
  default   Surface fill, 1px Border, empty 20 circle outline at right
  selected  Surface fill, 2px Primary border, Primary-filled 20 circle with white Check, title weight steps to Semibold
  pressed   Surface-Sunken fill
Selection must be unmistakable at arm's length: border weight change + filled check + weight change, three signals, not colour alone.

PROGRESSIVE DISCLOSURE: on selection, reveal beneath (do not navigate away, animate open at 180ms):
  "How many people?" — stepper, − / count / +, 48 tap targets, count at H2 size, range 1–12, default 3.
  Below it, a Meta line that updates live: "Planning for 3 people."
Do not show the count control before a group type is chosen.

Sticky bar: "Continue" + ArrowRight.

═══════════════════════════════════════════
4. SCREEN 2 — WHAT WE SHOULD ACCOUNT FOR
═══════════════════════════════════════════

H1: "What should we account for?"
Body-L: "Pick anything that matters today. You can change this later."

This screen must visibly respond to screen 1. Render the list in two groups:

GROUP A — "Suggested for your group" (section header at Label size, Ink-Secondary, 20 bottom gap)
Pre-selected items, derived from screen 1, each with a Meta explanation line and an obvious way to remove it.
  If "With grandparents": Footprints "Shorter walking distances" (Meta: "Suggested because you're visiting with grandparents") and Armchair "Frequent rest points".
  If "With young children": Baby "Breastfeeding and changing space" and Toilet "Toilet access".
  If "Friends": nothing pre-selected; show only Group B.
Pre-selected rows are visually identical to any selected row — never a special locked style — and tapping deselects. Above the group, a Meta line: "We've suggested a few. Remove anything you don't need."

GROUP B — "Anything else?" 
Remaining options, unselected, same row component:
  Footprints      "Shorter walking distances"
  Armchair        "Frequent rest points"        (Meta when selected: "We'll add a rest stop roughly every 20 minutes.")
  UsersRound      "Avoid very crowded areas"
  Toilet          "Toilet access on the way"
  Stethoscope     "Medical support nearby"
  Baby            "Breastfeeding and changing space"
  CarFront        "Return to the same parking spot"
  Accessibility   "Wheelchair or walker access"

ROW COMPONENT (multi-select, checkbox semantics — several can be true at once):
  Full width, 64 tall minimum (72 when a Meta line is present), 1px bottom Border between rows, no card wrapper.
  24 icon at left, Label title, optional Meta explanation under it, 24 square checkbox at right (4 radius).
  unselected  empty square, 1.5px Border-Strong
  selected    Primary fill, white Check, row background shifts to a 4% Primary tint, title weight Semibold
Do not wrap each row in its own card. Do not use toggles — these are not settings, they are declarations about today.

Constraint feedback: when "Wheelchair or walker access" is selected, immediately show an inline note (not a modal) with CircleAlert 20 in Moderate colour: "Some older lanes near Tulshibaug are narrow and stepped. We'll route around them where possible." This tells the truth before the user invests in a plan.

Sticky bar: "Continue" + ArrowRight. This screen's button is never disabled — selecting nothing is a legitimate answer. Helper line above it: "3 things selected" (live count), or "Nothing selected — we'll plan a standard route."

═══════════════════════════════════════════
5. SCREEN 3 — TIME, THEN INTERESTS
═══════════════════════════════════════════

One screen, two disclosed stages, so each stage asks exactly one question.

STAGE 1
H1: "How much time do you have?"
Body-L: "Including walking and waiting in queues."
Segmented control, mutually exclusive, full width, 56 tall, 3 segments: "1 hour" / "2 hours" / "4 hours". Selected segment: Primary fill, white Semibold label. Unselected: Surface fill, Ink-Secondary. 1px Border around the whole control, 4 radius, 2px inner gap.
Under it, a live Meta line that changes with selection:
  1 hour  → "Usually enough for 2 mandals at a comfortable pace."
  2 hours → "Usually enough for 3–4 mandals at a comfortable pace."
  4 hours → "Enough for 5 mandals with proper breaks."
Use "usually" — never state it as certain.

STAGE 2 (revealed only after a time is chosen, 32 gap, animate open 180ms)
H2: "What does your group want to see?"
Body: "Choose up to three."
Compact multi-select chips, wrapping, 44 tall, 4 radius, 16 horizontal padding, 8 gaps:
  Darshan · History · Dekhava · Architecture · Photography
Chip states: unselected Surface + 1px Border + Ink-Secondary; selected Primary 8% tint + 1.5px Primary border + Ink + leading Check 16; disabled (after 3 chosen) Ink-Tertiary at 40% with no border change and no tap response — plus a Meta line "Three selected. Remove one to change." Do not silently swallow the fourth tap.
"Dekhava" keeps its local name. Add a small Info 16 next to the chip group opening a one-line inline explanation for first-time visitors: "Dekhava — the decorative themed displays some mandals build each year."

Sticky bar: "Plan our journey" + ArrowRight. Disabled until a time is selected; interests are optional.

TRANSITION STATE (between screen 3 and 4, maximum 2.5 seconds, then auto-advance)
Full screen, Canvas, centred content, no spinner graphic, no gradient, no logo animation.
H2: "Planning around your group"
Three lines appear in sequence at Body-L, each gaining a Check 20 in Easy colour as it lands:
  "3 people, 2 hours"
  "Shorter walking, rest every 20 minutes"
  "Avoiding the busiest lanes right now"
This state exists to make the system's reasoning visible, not to fill time.

═══════════════════════════════════════════
6. SCREEN 4 — YOUR JOURNEY
═══════════════════════════════════════════

Header: ArrowLeft, title "Your journey" at Label size, no step indicator (planning is done).

SUMMARY BLOCK (top, Surface-Sunken, full bleed, 20 padding, no card, no shadow)
Line 1, H2: "4 mandals · Approx. 2 hr 10 min"
Line 2, Body, Ink-Secondary, icon-led inline: Footprints 20 "2.4 km total walking" · Armchair 20 "3 rest stops included"
Line 3: a horizontally scrolling row of constraint chips at 40 tall, 4 radius, Surface fill, Ink-Secondary, each with its icon — these are read-only reminders of what shaped the plan, each tappable to return to the relevant step:
  UsersRound "3 people" · Clock3 "2 hours" · Footprints "Shorter walking" · Armchair "Rest every 20 min"
This is the "we understood your group" moment. It must sit above the route, not below it.

ROUTE — a vertical sequence, not a map. Left gutter of 40 holds the spine: a 2px vertical Accent-Route line connecting numbered 28 nodes (Ink fill, white Semibold numeral). Content sits to the right of the gutter.

STOP CARD (repeat 4×, 12 gap, Surface, 1px Border, 8 radius, 16 padding):
  Row 1: H2 destination name. Directly under it, Body in Ink-Tertiary: Devanagari name. Under that, Meta: area name.
     1. Dagdusheth Halwai Ganpati — श्रीमंत दगडूशेठ हलवाई गणपती — Budhwar Peth
     2. Tulshibaug Ganpati — तुळशीबाग गणपती — Tulshibaug
     3. Guruji Talim — गुरुजी तालीम — Ganpati Chowk
     4. Kasba Ganpati — कसबा गणपती — Kasba Peth
  Row 2: two status pills side by side, 4 radius, 32 tall, icon 20 + text, using the status colour set:
     Footprints "Easy walk" / "Moderate walk" / "High effort"
     UsersRound "Low crowd" / "Moderate crowd" / "Very crowded"
  Row 3: Meta with honest framing and provenance, e.g. "Usually very crowded after 7 pm · Reported 14 min ago"
  Row 4 (only where true): a full-width inline strip, Assist colour, Accessibility 20 + Label "Easier route available"
  Row 5: collapsed disclosure — a 48-tall row reading "Facilities at this stop" with ChevronDown at right. Expanded in place, it reveals a 2-column list of icon + text + availability word, never icon alone:
     Toilet "Toilet — 2 min away" · Armchair "Seating — inside complex" · Stethoscope "First aid — at east gate" · Droplets "Water — at entrance" · Baby "Feeding room — not available"
     Unavailable items render Ink-Tertiary with a strikethrough-free "not available" label — never a red X alone.
  Whole card is tappable → screen 5, with ChevronRight 20 at the far right of Row 1.

CONNECTOR BLOCK (between stop cards, sits in and beside the spine, no card, 12 vertical padding):
  Footprints 20 + Body: "600 m · approx. 9 min walk"
  Where a rest stop is inserted, a distinct smaller node on the spine (20, Surface fill, 2px Accent-Route border, Armchair 12 inside) with Body beside it: "Rest stop — Shaniwarwada steps, shaded seating". A Meta line under it: "Added because you asked for a break every 20 minutes." Show cause, not just effect.

FINAL NODE: ParkingCircle node, Body "Return to parking — Mandai, 900 m, approx. 12 min". Included because "return to the same parking spot" was selected; if it wasn't selected, omit the node entirely.

FOOTNOTE, Meta, Ink-Tertiary, above the sticky bar, with Info 16: "Crowd levels are reported by visitors and volunteers and can change quickly. Walking times are approximate."

STICKY BAR: primary "Start journey" + ArrowRight. Secondary text button to its left at 56 tall: "Adjust plan" (returns to screen 2, keeping selections).

═══════════════════════════════════════════
7. SCREEN 5 — DESTINATION DETAIL
═══════════════════════════════════════════

Header: ArrowLeft, title "Stop 1 of 4" at Label size.

TITLE BLOCK: H1 "Dagdusheth Halwai Ganpati", Body Ink-Tertiary "श्रीमंत दगडूशेठ हलवाई गणपती", Meta "Budhwar Peth, Pune". Below, the same two status pills as screen 4 (walk effort, crowd) so the user recognises rather than recalls. Meta: "Currently reported as very crowded · 6 min ago".

ROUTE CHOICE — the primary decision on this screen, so it sits highest.
Label-size section header: "Choose your route"
Two large selection cards, single-select, stacked, 12 gap, 116 tall, radio semantics:
  CARD A (default selected)
    Accessibility 24 + Label "Easier route" + a small Assist-coloured tag "Recommended for your group"
    Body: "600 m · approx. 9 min"
    Meta list, each with a 16 icon: Footprints "No steps" · Armchair "1 rest point on the way" · Footprints "Wider lanes"
  CARD B
    Footprints 24 + Label "Direct route"
    Body: "400 m · approx. 6 min"
    Meta list: CircleAlert "4 steps near the entrance" · UsersRound "Narrow lane, usually dense"
  Selected state: 2px Primary border, 4% Primary tint fill, Primary-filled radio with white Check at top-right, title Semibold.
  Unselected: Surface, 1px Border, empty 20 radio.
  Switching routes updates the numbers elsewhere on the screen immediately; show a brief 300ms Body-size inline confirmation under the cards: "Route updated — 600 m, approx. 9 min."

ENTRY AND EXIT — plain two-row list, 1px separators, no cards:
  MapPin 24 · Label "Enter from Ganpati Chowk gate" · Meta "The queue splits here — the left side moves faster for seated darshan."
  MapPin 24 · Label "Exit onto Laxmi Road" · Meta "Exit is one-way during peak hours; you cannot re-enter from this side."

ON THIS ROUTE — list of what the group will actually pass, in walking order, each row 56 tall:
  Armchair "Rest point — 3 min in, shaded"
  Toilet "Public toilet — 5 min in, Shivaji Road"
  Droplets "Water point — near the gate"
  Stethoscope "First aid post — at the east gate"
  Baby "Feeding room — not available at this mandal" (Ink-Tertiary, plainly stated)

CONSTRAINT NOTICE — full-width strip, Moderate colours, 16 padding, CircleAlert 24 at left:
  Label "Wheelchair access only from the east gate"
  Body "It's about 200 m further, but step-free the whole way."
Warnings are informative and offer a way forward. Never a bare red alert.

STICKY BAR: primary "Start walking here" + ArrowRight. Secondary outlined button above or beside at 56 tall: "Save this route".

═══════════════════════════════════════════
8. SCREEN 6 — LIVE JOURNEY
═══════════════════════════════════════════

This must NOT look like Google Maps. No satellite imagery, no dense street labels, no POI pin clutter, no commercial listings, no traffic colours.

MAP TREATMENT — a simplified, abstracted festival diagram:
  Base fill Surface-Sunken. Streets rendered as 6px rounded Canvas-coloured lines forming a legible simplified lane structure — only the lanes relevant to the route, plus 2–3 for orientation. Two or three large landmark blocks in a flat 6% Ink fill with H2-size Ink-Secondary names: "Shaniwarwada", "Mandai", "Laxmi Road". Nothing else. No buildings, no parks, no textures.
  ROUTE: completed portion 4px solid Ink-Tertiary; remaining portion 4px solid Accent-Route. Direction shown by 3 small chevrons along the line, not animated flow.
  NODES, each 28 with a 44 tap area, each with an ALWAYS-VISIBLE text label beside it at Meta size on a Canvas chip — no icon-only nodes:
    LocateFixed, Accent-Route filled, 2px white ring — "You are here"
    MapPin, Ink filled, white glyph — "Next: Tulshibaug"
    Armchair, Surface fill + 2px Border — "Rest point"
    Toilet, Surface fill + 2px Border — "Toilet"
    Stethoscope, Surface fill + 2px Border — "First aid"
    UsersRound, Assist border — "Regroup point"
    ParkingCircle, Surface fill + 2px Border — "Your parking"
  Where labels would collide, offset the label, never drop it.
  A minimal legend is unnecessary because every node is labelled — do not add one.

TOP STATUS STRIP (over the map, Canvas, 1px bottom Border, 64 tall, full width — not floating, not glass):
  ArrowLeft at left. Then Navigation 24 + Label "Walking to Tulshibaug" + Meta "Approx. 7 min left".
Directly under it, a single contextual bar, 48 tall, Moderate tint, Armchair 20 + Label: "Rest point in about 3 minutes". This bar changes contextually (Toilet, UsersRound, CircleAlert "Crowd ahead is heavy — the east lane is easier") and disappears when nothing is relevant. One contextual message at a time, never stacked.

BOTTOM SHEET — two snap points, 12 radius top corners, 32×4 grab handle in Border colour.
  PEEK (180 tall):
    Meta "STOP 2 OF 4" with a 4-segment progress bar, completed segments Accent-Route.
    H2 "Tulshibaug Ganpati" + Body Ink-Tertiary "तुळशीबाग गणपती"
    Two status pills: Footprints "Easy walk" · UsersRound "Moderate crowd"
    Primary button, full width: "We've arrived" + Check 20
  EXPANDED (to 70% height, scrollable):
    Section "Nearby right now" — rows of icon + label + distance: Armchair "Rest point — 120 m" · Toilet "Toilet — 200 m" · Stethoscope "First aid — 300 m" · Droplets "Water — 80 m"
    Section "If you get separated" — UsersRound 24, Label "Regroup at Kotwal Chawdi corner", Body "Tell everyone in your group before you set off. It's the easiest landmark to find in a crowd."
    Section "Getting back" — CarFront 24, Label "Your parking — Mandai", Body "1.2 km, approx. 16 min walk from here", with a secondary outlined button "Show route back".
    Last row, left-aligned, 56 tall, Emergency-coloured text and a 1px Emergency border, NOT a floating red circle, NOT the visual focus of the screen: Hospital 24 + "Get medical help".
  The sheet never fully covers the map; minimum 300px of map always visible.

═══════════════════════════════════════════
9. INTERACTION STATES TO DEFINE EXPLICITLY
═══════════════════════════════════════════

Selection card: default / pressed / selected / disabled (Ink-Tertiary, 1px Border, no tap feedback, with a visible reason line)
Chip: default / selected / disabled-after-limit
Checkbox row: default / selected / suggested-and-selected (identical to selected)
Primary button: default / pressed / disabled (Border fill, Ink-Tertiary, plus helper text stating what is missing) / loading (label becomes "Planning…", button stays the same size, no spinner over 2.5s)
Stop node: upcoming (Border outline) / current (Accent-Route fill) / completed (Ink-Tertiary fill with Check)
Facility item: available / not available (Ink-Tertiary + explicit "not available" text) / unknown ("Not confirmed today")
Status levels, always icon + word + colour:
  Crowd: "Low crowd" / "Moderate crowd" / "Very crowded"
  Walking: "Easy walk" / "Moderate walk" / "High effort"

═══════════════════════════════════════════
10. LANGUAGE RULES
═══════════════════════════════════════════

Plain, short, specific. Second person plural where it fits the group framing ("your family", "everyone in your group"). No exclamation marks. No marketing voice. No "unforgettable", "seamless", "discover", "embark", "journey of a lifetime", "AI-powered", "personalised just for you".

Use exactly this register:
  "Who are you celebrating Ganeshotsav with?"
  "We'll plan the route around them, not just around the mandals."
  "Choose what your family needs today."
  "Shorter walking route"
  "Rest point in about 3 minutes"
  "Usually very crowded after 7 pm"
  "Reported 14 min ago"
  "Approx. 9 min"
  "Added because you asked for a break every 20 minutes."
  "Continue to Dagdusheth"
  "Save this route"
  "Nothing selected — we'll plan a standard route."

Honesty about uncertainty is mandatory. Never state crowd level, facility availability or walking time as fact. Always qualify with "approx.", "usually", "currently reported as", or a "last updated" timestamp. Never show a percentage, a live-count number, or a confidence score.

═══════════════════════════════════════════
11. CULTURAL TREATMENT — RESTRAINED
═══════════════════════════════════════════

Permitted, and only this:
- The warm paper Canvas and maroon/saffron accents already defined
- Devanagari secondary names for every mandal, set quietly in Ink-Tertiary
- Local vocabulary used correctly and unglossed except where genuinely unfamiliar: darshan, dekhava, mandal, chowk, peth
- One structural motif: a 1px double horizontal rule (2 lines, 3px apart) used ONLY as the divider above each screen's sticky bottom bar, referencing painted festival signage. Nothing more.
- A visual logic borrowed from civic wayfinding: high contrast, numbered sequences, left-aligned type, generous line height.

Forbidden:
- Ganpati illustrations, silhouettes, idols, modaks, lotus, trunk motifs
- Toran borders, rangoli patterns, mandalas, paisleys, temple arches
- Marigold photography, drum imagery, crowd photography
- Gold gradients, foil textures, ornamental dividers, decorative frames
- Devanagari-styled Latin display type

═══════════════════════════════════════════
12. HARD EXCLUSIONS — DO NOT BUILD ANY OF THIS
═══════════════════════════════════════════

No onboarding carousel, splash animation, login, or account setup.
No gradients, glassmorphism, blur, neumorphism, or layered shadows.
No hero sections with large background images.
No card wrapper around every element. Lists and rows with separators are the default; cards are reserved for stop summaries and route choices.
No charts, graphs, progress rings, statistics, scores or percentages.
No gamification: no badges, streaks, points, "mandals unlocked", stamps, collections.
No social features: no ratings, reviews, star counts, photo feeds, sharing, follower counts, check-ins.
No AI chat assistant, no chat bubble, no sparkle icon, no "powered by AI" label.
No floating action buttons, floating pills, or floating glass panels.
No dark mode toggle, no settings screen, no notification bell, no search bar.
No bottom tab navigation — this is a linear task flow, not a browsing app.
No sponsored content, offers, ticketing, bookings or payments.
No emoji anywhere, in UI or copy.
No empty screens with a centred illustration and one line of text.
No icon used without an accompanying text label, except the header back arrow.

═══════════════════════════════════════════
13. ACCESSIBILITY REQUIREMENTS (build these in, don't just declare them)
═══════════════════════════════════════════

- Layout must hold at 200% text scaling: no fixed-height text containers, no truncation of essential labels, cards grow vertically, status pills wrap to a second line rather than clipping.
- Body text never below 15. Metadata never below 13, and never carries essential information.
- All text meets 4.5:1; large text and icon strokes meet 3:1.
- Every interactive element ≥ 44 × 44 with ≥ 8px separation.
- Selected states carry three simultaneous signals: border weight, a Check mark, and a font-weight change. Never colour alone.
- Every status has a word, not just a colour or an icon.
- Navigation is identical across all planning screens: back at top-left, forward at bottom, nothing else.
- No time-limited interactions, no auto-advancing carousels, no content that moves on its own. The transition state is the only timed element and it advances forward only.
- Every screen has one clear primary action, visually dominant and in the same position.
- Error and constraint messages appear inline next to their cause, never in a modal, and always state what to do next.

═══════════════════════════════════════════
14. FINAL CHECK BEFORE YOU FINISH
═══════════════════════════════════════════

Verify each screen against these, and fix rather than explain:
- One question per screen, answerable without scrolling back.
- A first-time visitor who doesn't know Pune's festival geography can still follow it.
- A 68-year-old can read every essential label and hit every control.
- The primary action is obvious within two seconds on every screen.
- Every constraint entered on screens 1–2 produces a visible, attributable change on screen 4.
- No screen looks like a generic app-kit template, a SaaS dashboard, or a Google Maps clone.
- Nothing on screen exists purely for decoration.