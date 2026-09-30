import { mandals, type AartiSlot, type Mandal, type WaitInfo } from './mandals';
import { derivePersona, isQueueSensitive } from './persona';
import type { NeedId, PlanState } from './types';
import type { RouteStop } from './route';

/* ---- Worth the wait -------------------------------------------------- */

// Only flag a wait as long enough to offer an alternative when the reported
// upper bound is an hour or more; shorter queues aren't worth a detour.
const LONG_WAIT_MIN = 60;

export interface StopInsights {
  wait?: WaitInfo;
  /** A quieter stop with a sourced shorter wait that isn't already in the route. */
  alternative?: Mandal;
  aarti?: { quieter: AartiSlot; busiest: AartiSlot };
}

export function stopInsights(mandal: Mandal, stops: RouteStop[], plan: PlanState): StopInsights {
  const persona = derivePersona(plan);
  const insights: StopInsights = { wait: mandal.wait };

  if (mandal.wait && mandal.wait.maxMin >= LONG_WAIT_MIN && isQueueSensitive(persona)) {
    const inRoute = new Set(stops.map((s) => s.mandal.id));
    const needsAccessible = plan.needs.includes('accessibility');
    insights.alternative = mandals.find(
      (m) =>
        m.id !== mandal.id &&
        !inRoute.has(m.id) &&
        m.wait !== undefined &&
        m.wait.maxMin < LONG_WAIT_MIN &&
        (!needsAccessible || m.easier),
    );
  }

  const quieter = mandal.aarti?.find((a) => a.load === 'quieter');
  const busiest = mandal.aarti?.find((a) => a.load === 'busiest');
  if (quieter && busiest && isQueueSensitive(persona)) {
    insights.aarti = { quieter, busiest };
  }

  return insights;
}

/* ---- Shaped by your group -------------------------------------------- */

export interface ShapingLine {
  need: NeedId;
  text: string;
}

// Attribute a need to a member only where the planner itself suggested it
// for that group (see suggestedNeeds); otherwise stay honest and general.
function memberFor(need: NeedId, plan: PlanState): string {
  if (plan.groupType === 'grandparents' && (need === 'shorterWalk' || need === 'rest'))
    return 'your grandparents';
  if (plan.groupType === 'children' && (need === 'feeding' || need === 'toilet'))
    return 'the children';
  return 'someone in your group';
}

/** One line per need that the planner actually applies in route selection
    (see generateRoute), phrased as the rule applied, not a claim about any
    single stop. */
export function shapedBy(plan: PlanState): ShapingLine[] {
  const rules: { need: NeedId; text: string }[] = [
    { need: 'accessibility', text: 'Step-free stops only' },
    { need: 'shorterWalk', text: 'Easier walks ranked higher' },
    { need: 'avoidCrowd', text: 'Very crowded stops ranked lower' },
    { need: 'rest', text: 'A rest stop about every 20 minutes' },
    { need: 'feeding', text: 'Stops with a feeding room ranked higher' },
    { need: 'medical', text: 'Stops with first aid ranked higher' },
  ];
  return rules
    .filter((r) => plan.needs.includes(r.need))
    .map((r) => ({ need: r.need, text: `${r.text} — for ${memberFor(r.need, plan)}` }));
}
