import type { GroupType, Interest, PlanState } from './types';

/** What the visitor is here for, independent of who they're with. */
export type PersonaIntent = 'darshan' | 'dekhawa-history' | 'photo';

export interface Persona {
  companions: GroupType | null;
  intents: PersonaIntent[];
}

const INTENT_FOR: Partial<Record<Interest, PersonaIntent>> = {
  Darshan: 'darshan',
  History: 'dekhawa-history',
  Dekhava: 'dekhawa-history',
  Photography: 'photo',
};

/** Persona is inferred from answers the planning flow already collects
    ("Who is coming?" and interests) rather than a second question, so
    personalization changes what the app does with existing input. */
export function derivePersona(plan: PlanState): Persona {
  const intents: PersonaIntent[] = [];
  for (const interest of plan.interests) {
    const intent = INTENT_FOR[interest];
    if (intent && !intents.includes(intent)) intents.push(intent);
  }
  return { companions: plan.groupType, intents };
}

/** Visitors for whom a long queue costs the most: anyone with grandparents
    or young children, or anyone whose priority is darshan itself. */
export function isQueueSensitive(p: Persona): boolean {
  return (
    p.companions === 'grandparents' ||
    p.companions === 'children' ||
    p.intents.includes('darshan')
  );
}
