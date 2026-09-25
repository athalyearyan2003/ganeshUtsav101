export type GroupType =
  | 'family'
  | 'grandparents'
  | 'children'
  | 'friends'
  | 'mixed';

export type NeedId =
  | 'shorterWalk'
  | 'rest'
  | 'avoidCrowd'
  | 'toilet'
  | 'medical'
  | 'feeding'
  | 'parking'
  | 'accessibility';

export type TimeOption = '1' | '2' | '4';

export type Interest =
  | 'Darshan'
  | 'History'
  | 'Dekhava'
  | 'Architecture'
  | 'Photography';

export type JourneyStatus = 'none' | 'planned' | 'active' | 'completed';

export interface PlanState {
  groupType: GroupType | null;
  groupCount: number;
  needs: NeedId[];
  time: TimeOption | null;
  interests: Interest[];
}

export const initialPlan: PlanState = {
  groupType: null,
  groupCount: 3,
  needs: [],
  time: null,
  interests: [],
};
