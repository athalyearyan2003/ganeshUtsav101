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

export type StartPointId = 'swargate' | 'shaniwarwada' | 'budhwar-peth' | 'kasba';

export interface PlanState {
  groupType: GroupType | null;
  groupCount: number;
  needs: NeedId[];
  time: TimeOption | null;
  interests: Interest[];
  /** Where the group is parked/starting from — only asked when "Return to
      the same parking spot" is selected, since that's the only place it
      changes anything the visitor sees. Null means "typical starting point,"
      which matches the route's existing default distances. */
  startPoint: StartPointId | null;
}

export const initialPlan: PlanState = {
  groupType: null,
  groupCount: 3,
  needs: [],
  time: null,
  interests: [],
  startPoint: null,
};
