import {
  UsersRound,
  UserRound,
  PersonStanding,
  Baby,
  Footprints,
  Armchair,
  Toilet,
  Stethoscope,
  CarFront,
  Accessibility,
  type LucideIcon,
} from 'lucide-react';
import type { GroupType, NeedId } from './types';

export const groupOptions: {
  id: GroupType;
  icon: LucideIcon;
  title: string;
  desc: string;
}[] = [
  { id: 'family', icon: UsersRound, title: 'Family', desc: 'Adults and children together' },
  {
    id: 'grandparents',
    icon: PersonStanding,
    title: 'With grandparents',
    desc: 'Someone who prefers shorter walking',
  },
  {
    id: 'children',
    icon: Baby,
    title: 'With young children',
    desc: 'Strollers, feeding, quick breaks',
  },
  {
    id: 'friends',
    icon: UserRound,
    title: 'Friends',
    desc: 'Comfortable with longer walks and crowds',
  },
  { id: 'mixed', icon: UsersRound, title: 'Mixed group', desc: 'A bit of everything' },
];

export const needCatalog: Record<
  NeedId,
  { icon: LucideIcon; title: string; meta?: string }
> = {
  shorterWalk: { icon: Footprints, title: 'Shorter walking distances' },
  rest: {
    icon: Armchair,
    title: 'Frequent rest points',
    meta: "We'll add a rest stop roughly every 20 minutes.",
  },
  avoidCrowd: { icon: UsersRound, title: 'Avoid very crowded areas' },
  toilet: { icon: Toilet, title: 'Toilet access on the way' },
  medical: { icon: Stethoscope, title: 'Medical support nearby' },
  feeding: { icon: Baby, title: 'Breastfeeding and changing space' },
  parking: { icon: CarFront, title: 'Return to the same parking spot' },
  accessibility: { icon: Accessibility, title: 'Wheelchair or walker access' },
};

/* Which needs are suggested (pre-selected) for a given group, with reasons */
export function suggestedNeeds(group: GroupType | null): {
  id: NeedId;
  reason: string;
}[] {
  switch (group) {
    case 'grandparents':
      return [
        { id: 'shorterWalk', reason: "Suggested because you're visiting with grandparents" },
        { id: 'rest', reason: "Suggested because you're visiting with grandparents" },
      ];
    case 'children':
      return [
        { id: 'feeding', reason: 'Suggested because you have young children' },
        { id: 'toilet', reason: 'Suggested because you have young children' },
      ];
    case 'family':
      return [{ id: 'rest', reason: 'Suggested for families with mixed ages' }];
    case 'mixed':
      return [
        { id: 'shorterWalk', reason: 'Suggested for a mixed-ability group' },
        { id: 'rest', reason: 'Suggested for a mixed-ability group' },
      ];
    case 'friends':
    default:
      return [];
  }
}

export const groupBOrder: NeedId[] = [
  'shorterWalk',
  'rest',
  'avoidCrowd',
  'toilet',
  'medical',
  'feeding',
  'parking',
  'accessibility',
];
