EXTEND "MY FAMILY GANESHOTSAV" — ADD CULTURAL DISCOVERY (GANPATI STORIES + DEKHAWA)

Do not change any existing screen, the colour palette, the radius scale, or the safe-area handling already built. This adds discovery content and two entry points on top of the existing prototype. Reuse the existing header, card, disclosure, footnote, and button components exactly as already defined — do not invent new visual styles for anything listed here as "reuse."

No new tab bar, no new global navigation shell. This stays a linear task flow with an optional side-branch, not a browsing app.

═══════════════════════════════════════════
1. NEW ICONS NEEDED (add to the existing Lucide mapping, same sizing/stroke rules as before)
═══════════════════════════════════════════
  BookOpen → story / reading
  Volume2 → listen / audio available
  Pause → audio playing state
  Eye → "Look for this" visual detail
  UserRound → character entry (Dekhawa)
(Info, Clock3, ChevronDown/Up, ArrowLeft/Right, ChevronRight already exist — reuse them, don't redefine.)

═══════════════════════════════════════════
2. NAVIGATION MODEL — define this precisely so nothing is ambiguous
═══════════════════════════════════════════

TWO entry points into discovery, both optional, both text-only rows (no button chrome — see Tertiary Link spec below):
  A. On the Journey screen (Screen 4), inside the summary block, one link: "See what's worth knowing along your route" → opens the Discover list, scoped only to stops in this journey.
  B. On each stop card (Screen 4) and on the Destination Detail screen (Screen 5), a per-stop row: "Discover its story" → jumps DIRECTLY to that stop's story detail screen, skipping the list. Only show this row if that stop has story content; if it doesn't, omit the row entirely — never show a dead link.

Both paths converge on the same two detail templates (Ganpati Story Detail, Dekhawa Discovery) — do not build separate templates for the two entry paths.

Returning: every discovery screen's sticky bottom action is "Continue to your journey" — it returns the user to exactly the screen and scroll position they left (Screen 4 at the same stop, or Screen 5, whichever they came from). If they arrived via the Discover list, a secondary text link above the sticky bar also offers "Back to Discover." Do not add any discovery entry point to the Live Journey screen (Screen 6) — out of scope for this pass, keep it off that screen.

State preservation: opening or browsing discovery must never reset the generated route, selected preferences, or scroll position of the underlying journey. Treat it as a screen pushed on top, not a mode that clears state.

Nothing here is ever required before continuing. No forced screen, no autoplay, no reading gate before "Start walking here" or "Continue" becomes available anywhere in the existing flow.

═══════════════════════════════════════════
3. NEW COMPONENT — TERTIARY LINK ROW (used for both entry points)
═══════════════════════════════════════════
No fill, no border, no card. 16px leading icon (BookOpen), Label-size text in Ink-Secondary, trailing ChevronRight 16 in Ink-Tertiary. 44pt minimum tap height even though the visible content is smaller. This is deliberately the lowest-emphasis interactive element in the app — it must never visually compete with the existing Primary Action or Secondary Outlined buttons on the same screen.
States: default / pressed (text shifts to Ink, background gets a 4% Ink tint for the duration of the press, no persistent fill).

═══════════════════════════════════════════
4. SCREEN A — DISCOVER (story list)
═══════════════════════════════════════════
Header: reuse the existing header component — ArrowLeft, title "Discover" at Label size, no step progress bar (this isn't a planning step).
Below header, one Body line, Ink-Secondary: "A few stories about the mandals on your route."

List of preview cards, one per journey stop that has content, plus one Dekhawa card where applicable (see Screen C). Vertical stack, 12 gap, each card uses the existing card token (L / 14 radius, Surface fill, 1px Border — same as stop cards on Screen 4).

CARD STRUCTURE, top to bottom:
  - Image, full card width, 16:9, flush to the card's top radius (rounded top corners only, matching the card).
  - 16 padding below the image:
    H2 name (e.g. "Tulshibaug Ganpati"), Body Ink-Tertiary devanagari name beneath it — same naming pattern as existing stop cards.
    Body, 2-line max, Ink-Secondary: a short, specific hook, e.g. "Why this Ganpati's crown changes every year." Never generic ("Discover the magic of...").
    Meta row: icon + text, e.g. BookOpen 16 "3 min read" · Volume2 16 "2 min listen" (omit the listen segment if no audio exists for that story — never show a fake duration).
  Whole card is tappable, ChevronRight 20 at the top-right of the name row.
  States: default / pressed (Surface-Sunken tint, same as existing card press state).

UNAVAILABLE STATE: if a journey stop has no story yet, still show its card but reduced — no image (Surface-Sunken placeholder block instead), Ink-Tertiary text only, Meta line reads "Story not available yet," and the card is not tappable. Never fabricate content to fill a gap.

═══════════════════════════════════════════
5. SCREEN B — GANPATI STORY DETAIL
═══════════════════════════════════════════
Header: reuse the existing header component, ArrowLeft only, no title text needed.

Large visual: full-bleed, edge-to-edge (no side margins, no rounded corners here since it bleeds to the screen edge), approx. 320pt tall, positioned directly below the header — not behind it, not overlaid by it. This is the one place in the app where a large image is appropriate; it is the subject matter itself, not a decorative hero, and this exception applies only to this screen and Screen C, nowhere else.

Below the image, standard 20 margins resume:
  H1 name, Body Ink-Tertiary devanagari name, Meta area name — same block pattern as existing stop cards.
  Meta row: BookOpen "3 min read" · Volume2 "2 min listen" (as available).

  INTRO — Body-L paragraph, hard cap at ~90 words. This is a constraint, not a suggestion: if the content would run longer, cut it, don't let it grow into an article.

  "LOOK FOR THIS" — Label-size section header with Eye 20 leading. 1–3 rows below it, each reusing the existing facilities-row pattern (icon + Label text + one-line Meta description, no availability language needed here): e.g. Eye 20 "The silver crown" / Meta "Replaced by local artisans each year, never reused."

  "EXPLORE THE STORY" — collapsed by default, reusing the exact same disclosure component as "Facilities at this stop" on Screen 4 (48-tall row, ChevronDown, expands in place). Expanded content: 1–2 short paragraphs, hard cap ~180 words total.

  OPTIONAL LISTEN — Secondary Outlined button (S / 10 radius token, same button style as "Save this route"), Volume2 leading, label "Listen · 2 min." On tap, the button itself changes state to show progress: label becomes "Playing · 0:42 of 2:00" with a Pause icon leading — no separate media player UI, no scrubber, this is a prototype-level state change only. Omit this control entirely if no audio exists.

  FOOTNOTE, above the sticky bar, reusing the existing footnote style (Meta, Ink-Tertiary, Info 16 leading): "Story details are illustrative sample content for this prototype." This is the one consistent place every discovery screen states that — don't scatter disclaimers elsewhere in the copy.

  Sticky bottom bar: reuse the existing sticky-bar component. Primary Action button (M / 12 radius, dark ink text on the orange fill — same accessibility rule as every other primary button in the app): "Continue to Tulshibaug" + ArrowRight. If entered via the Discover list, a small text link sits above it: "Back to Discover."

═══════════════════════════════════════════
6. SCREEN C — DEKHAWA DISCOVERY
═══════════════════════════════════════════
Same structural shell as Screen B (header, full-bleed image, standard margins below), with these section differences:

  Title block: H1 Dekhawa name/theme (e.g. "Samudra Manthan"), Meta: mandal + area. Directly under the meta line, an inline illustrative-content label reusing the footnote style: Info 16 + "Sample content — illustrative" wherever the specific installation details aren't verified. Attach this label to the section it applies to, not just once at the bottom, since the requirement is that unverified content is clearly labelled where it appears, not just disclaimed generally.

  "THE STORY BEING TOLD" — Body-L, same ~90-word cap as Screen B's intro.

  "WHO'S IN IT" — 2–4 rows, UserRound 20 icon + Label name + one-line Meta description, e.g. "UserRound · Vishnu (as Kurma) / Meta: Takes the form of a turtle to support the mountain." Same illustrative-content label applies if these specifics aren't verified for the actual installation.

  "LOOK FOR THIS" — identical component to Screen B's version, e.g. Eye 20 "The churning motion" / Meta "Watch how the rope wraps and unwraps around the mountain." · Volume2 20 "Marathi narration" / Meta "A recorded narration plays near the base."

  Optional listen control: identical component and states to Screen B.

  Footnote: same style as Screen B, worded: "This Dekhawa's details are illustrative sample content and don't describe a specific real installation."

  Sticky bottom bar: identical pattern to Screen B — "Continue to [stop name]" + ArrowRight, dark ink on the orange fill.

═══════════════════════════════════════════
7. HARD EXCLUSIONS FOR THIS EXTENSION
═══════════════════════════════════════════
No badges, streaks, "stories read" counters, or completion tracking of any kind.
No social features — no sharing, no likes, no comments, no view counts.
No autoplay audio, no full audio player UI, no scrubber, no playback speed controls.
No bottom tab bar or persistent "Discover" navigation icon — entry is via the two text links only.
No long-form article layout — every text block obeys its stated word cap.
No decorative gradient or colour overlay on the story images.
No specific historical or ritual claims presented as verified fact — everything follows the illustrative-content labelling defined above.
No entry point added to the Live Journey screen in this pass.