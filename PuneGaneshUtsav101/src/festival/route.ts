import { mandals, type Mandal } from './mandals';
import type { PlanState, TimeOption } from './types';

export interface RouteStop {
  mandal: Mandal;
  /** Walking distance/time from the previous *selected* stop (or from the
      start, for the first stop) — summed across any skipped mandals in
      between, so it stays honest about the ground actually covered. */
  legFromPrevM: number;
  legFromPrevMin: number;
  /** Why this stop is in the plan, when a specific choice caused it — shown
      the same way the existing "Added because…" rest-stop copy is shown.
      Omitted when a stop is simply the best default, not a caused pick. */
  reason?: string;
}

export interface GeneratedRoute {
  stops: RouteStop[];
  totalWalkM: number;
  totalMin: number;
  /** True when needs/time were restrictive enough that we could not fully
      honour every constraint (e.g. too few step-free stops to fill the
      time budget) — surfaced so the UI can say so rather than pretend. */
  constrained: boolean;
}

const STOP_TARGET: Record<TimeOption, number> = { '1': 2, '2': 3, '4': 5 };

export function reasonFor(m: Mandal, plan: PlanState): string | undefined {
  const matchedInterest = plan.interests.find((i) => m.interestTags.includes(i));
  if (matchedInterest) return `Matches your interest in ${matchedInterest}`;
  if (plan.needs.includes('accessibility') && m.easier)
    return 'Included because it has step-free access';
  return undefined;
}

export function generateRoute(plan: PlanState): GeneratedRoute {
  const targetCount = plan.time ? STOP_TARGET[plan.time] : STOP_TARGET['2'];
  const avoidCrowd = plan.needs.includes('avoidCrowd');
  const needsAccessible = plan.needs.includes('accessibility');
  const wantsMedical = plan.needs.includes('medical');
  const wantsFeeding = plan.needs.includes('feeding');

  // Hard requirement: accessibility can't be traded away for score. Everything
  // else is a soft preference expressed as scoring, so we never end up with
  // an empty route just because no candidate satisfies every preference.
  const eligible = needsAccessible ? mandals.filter((m) => m.easier) : mandals;
  const pool = eligible.length > 0 ? eligible : mandals;
  const constrainedByAccessibility = needsAccessible && eligible.length < targetCount;

  const scored = pool.map((m) => {
    let score = 0;
    score += m.interestTags.filter((t) => plan.interests.includes(t)).length * 10;
    if (avoidCrowd && m.crowd.tone === 'high') score -= 6;
    if (avoidCrowd && m.crowd.tone === 'easy') score += 2;
    if (wantsMedical && m.facilities.some((f) => f.label.toLowerCase().includes('medical') || f.label.toLowerCase().includes('first aid')))
      score += 3;
    if (wantsFeeding && m.facilities.some((f) => f.label.toLowerCase().includes('feeding') && f.available))
      score += 3;
    return { mandal: m, score };
  });

  scored.sort((a, b) => b.score - a.score || a.mandal.walkOrder - b.mandal.walkOrder);
  const chosen = scored.slice(0, Math.min(targetCount, scored.length)).map((s) => s.mandal);
  chosen.sort((a, b) => a.walkOrder - b.walkOrder);

  const stops: RouteStop[] = [];
  let prevOrder = 0;
  for (const m of chosen) {
    // Sum the leg across every mandal between the previous selected stop and
    // this one, so a "skip" is still reflected as real distance walked.
    let legM = 0;
    let legMin = 0;
    for (const between of mandals) {
      if (between.walkOrder > prevOrder && between.walkOrder <= m.walkOrder) {
        legM += between.legFromPrevM;
        legMin += between.legFromPrevMin;
      }
    }
    stops.push({ mandal: m, legFromPrevM: legM, legFromPrevMin: legMin, reason: reasonFor(m, plan) });
    prevOrder = m.walkOrder;
  }

  const totalWalkM = stops.reduce((sum, s) => sum + s.legFromPrevM, 0);
  const totalStopMin = chosen.reduce((sum, m) => sum + m.timeMin, 0);
  const totalWalkMin = stops.reduce((sum, s) => sum + s.legFromPrevMin, 0);

  return {
    stops,
    totalWalkM,
    totalMin: totalStopMin + totalWalkMin,
    constrained: constrainedByAccessibility,
  };
}

export function formatDistance(m: number): string {
  return m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${m} m`;
}

/** Distance/time between two points in the canonical walk order, summing
    every mandal strictly between them — works whichever direction the swap
    moves, since it's the same ground either way. */
function legBetweenOrders(orderA: number, orderB: number): { m: number; min: number } {
  const lo = Math.min(orderA, orderB);
  const hi = Math.max(orderA, orderB);
  let m = 0;
  let min = 0;
  for (const between of mandals) {
    if (between.walkOrder > lo && between.walkOrder <= hi) {
      m += between.legFromPrevM;
      min += between.legFromPrevMin;
    }
  }
  return { m, min };
}

export interface SwapCandidate {
  mandal: Mandal;
  reason?: string;
  /** Change in total route walking distance/time if this candidate is
      picked — positive means more walking, negative means less. Lets the
      visitor see the real cost of a swap before committing to it, the same
      way Screen2's accessibility note warns before the plan is built. */
  deltaWalkM: number;
  deltaWalkMin: number;
}

/** Other mandals the visitor could swap this stop for — excludes mandals
    already in the route, keeps the accessibility hard-filter, and ranks by
    interest match so the best-fitting alternatives surface first. */
export function swapCandidates(
  currentStops: RouteStop[],
  position: number,
  plan: PlanState,
): SwapCandidate[] {
  const usedIds = new Set(currentStops.map((s) => s.mandal.id));
  const needsAccessible = plan.needs.includes('accessibility');
  const prevOrder = position > 0 ? currentStops[position - 1].mandal.walkOrder : 0;
  const nextStop = currentStops[position + 1];
  const oldLegIn = currentStops[position].legFromPrevM;
  const oldLegInMin = currentStops[position].legFromPrevMin;
  const oldLegOut = nextStop?.legFromPrevM ?? 0;
  const oldLegOutMin = nextStop?.legFromPrevMin ?? 0;

  return mandals
    .filter((m) => !usedIds.has(m.id) && (!needsAccessible || m.easier))
    .map((m) => {
      const legIn = legBetweenOrders(prevOrder, m.walkOrder);
      const legOut = nextStop ? legBetweenOrders(m.walkOrder, nextStop.mandal.walkOrder) : { m: 0, min: 0 };
      return {
        mandal: m,
        reason: reasonFor(m, plan),
        deltaWalkM: legIn.m + legOut.m - (oldLegIn + oldLegOut),
        deltaWalkMin: legIn.min + legOut.min - (oldLegInMin + oldLegOutMin),
      };
    })
    .sort((a, b) => {
      const scoreA = a.mandal.interestTags.filter((t) => plan.interests.includes(t)).length;
      const scoreB = b.mandal.interestTags.filter((t) => plan.interests.includes(t)).length;
      return scoreB - scoreA || a.mandal.walkOrder - b.mandal.walkOrder;
    });
}

/** Replace the stop at `position` with a manually chosen mandal, recomputing
    only the legs touching that position (in and out) — everything else in
    the route stays exactly as it was. */
export function applySwapAt(
  stops: RouteStop[],
  position: number,
  mandal: Mandal,
  plan: PlanState,
): RouteStop[] {
  const next = stops.map((s) => ({ ...s }));
  const prevOrder = position > 0 ? next[position - 1].mandal.walkOrder : 0;
  const legIn = legBetweenOrders(prevOrder, mandal.walkOrder);
  next[position] = {
    mandal,
    legFromPrevM: legIn.m,
    legFromPrevMin: legIn.min,
    reason: reasonFor(mandal, plan) ?? 'You chose this stop',
  };
  if (position + 1 < next.length) {
    const legOut = legBetweenOrders(mandal.walkOrder, next[position + 1].mandal.walkOrder);
    next[position + 1] = { ...next[position + 1], legFromPrevM: legOut.m, legFromPrevMin: legOut.min };
  }
  return next;
}
