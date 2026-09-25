import {
  Toilet,
  Armchair,
  Stethoscope,
  Droplets,
  Baby,
  type LucideIcon,
} from 'lucide-react';

export interface Facility {
  icon: LucideIcon;
  label: string;
  available: boolean;
}

export interface Mandal {
  name: string;
  deva: string;
  area: string;
  walk: { tone: 'easy' | 'moderate' | 'high'; label: string };
  crowd: { tone: 'easy' | 'moderate' | 'high'; label: string };
  note: string;
  easier?: boolean;
  facilities: Facility[];
  legTo?: string; // distance/time to next
}

export const mandals: Mandal[] = [
  {
    name: 'Dagdusheth Halwai Ganpati',
    deva: 'श्रीमंत दगडूशेठ हलवाई गणपती',
    area: 'Budhwar Peth',
    walk: { tone: 'easy', label: 'Easy walk' },
    crowd: { tone: 'high', label: 'Very crowded' },
    note: 'Usually very crowded after 7 pm · Reported 14 min ago',
    easier: true,
    facilities: [
      { icon: Toilet, label: 'Toilet — 2 min away', available: true },
      { icon: Armchair, label: 'Seating — inside complex', available: true },
      { icon: Stethoscope, label: 'First aid — at east gate', available: true },
      { icon: Droplets, label: 'Water — at entrance', available: true },
      { icon: Baby, label: 'Feeding room — not available', available: false },
    ],
    legTo: '600 m · approx. 9 min walk',
  },
  {
    name: 'Tulshibaug Ganpati',
    deva: 'तुळशीबाग गणपती',
    area: 'Tulshibaug',
    walk: { tone: 'moderate', label: 'Moderate walk' },
    crowd: { tone: 'moderate', label: 'Moderate crowd' },
    note: 'Market lanes narrow near the entrance · Reported 8 min ago',
    facilities: [
      { icon: Toilet, label: 'Toilet — 4 min away', available: true },
      { icon: Armchair, label: 'Seating — limited', available: true },
      { icon: Droplets, label: 'Water — at entrance', available: true },
      { icon: Baby, label: 'Feeding room — not available', available: false },
    ],
    legTo: '500 m · approx. 7 min walk',
  },
  {
    name: 'Guruji Talim',
    deva: 'गुरुजी तालीम',
    area: 'Ganpati Chowk',
    walk: { tone: 'easy', label: 'Easy walk' },
    crowd: { tone: 'moderate', label: 'Moderate crowd' },
    note: 'Known for its message of communal harmony · Reported 20 min ago',
    facilities: [
      { icon: Toilet, label: 'Toilet — 5 min away', available: true },
      { icon: Stethoscope, label: 'First aid — at chowk', available: true },
      { icon: Droplets, label: 'Water — nearby stall', available: true },
    ],
    legTo: '450 m · approx. 6 min walk',
  },
  {
    name: 'Kasba Ganpati',
    deva: 'कसबा गणपती',
    area: 'Kasba Peth',
    walk: { tone: 'moderate', label: 'Moderate walk' },
    crowd: { tone: 'easy', label: 'Low crowd' },
    note: "Pune's gramadaivat — quieter in the afternoon · Reported 11 min ago",
    easier: true,
    facilities: [
      { icon: Toilet, label: 'Toilet — 3 min away', available: true },
      { icon: Armchair, label: 'Seating — shaded courtyard', available: true },
      { icon: Droplets, label: 'Water — at entrance', available: true },
      { icon: Baby, label: 'Feeding room — not available', available: false },
    ],
  },
];
