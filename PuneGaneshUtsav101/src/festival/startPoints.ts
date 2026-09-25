import type { StartPointId } from './types';

export interface StartPoint {
  id: StartPointId;
  label: string;
  parkingName: string;
  /** Approx. distance/time from here to the first stop in the canonical
      walk order (Dagdusheth). */
  distM: number;
  distMin: number;
  /** Approx. distance/time for the return leg at the end of the journey —
      a flat estimate independent of the last stop, same as the original
      static "Return to parking" copy this replaces. */
  returnDistM: number;
  returnDistMin: number;
}

export const startPoints: Record<StartPointId, StartPoint> = {
  swargate: {
    id: 'swargate',
    label: 'Swargate',
    parkingName: 'Swargate',
    distM: 1200,
    distMin: 16,
    returnDistM: 1200,
    returnDistMin: 16,
  },
  shaniwarwada: {
    id: 'shaniwarwada',
    label: 'Shaniwarwada area',
    parkingName: 'Shaniwarwada',
    distM: 300,
    distMin: 4,
    returnDistM: 300,
    returnDistMin: 4,
  },
  'budhwar-peth': {
    id: 'budhwar-peth',
    label: 'Budhwar Peth',
    parkingName: 'Budhwar Peth',
    distM: 150,
    distMin: 2,
    returnDistM: 150,
    returnDistMin: 2,
  },
  kasba: {
    id: 'kasba',
    label: 'Kasba Peth / Mandai',
    parkingName: 'Mandai',
    distM: 900,
    distMin: 12,
    returnDistM: 900,
    returnDistMin: 12,
  },
};
