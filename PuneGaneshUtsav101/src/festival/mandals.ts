import {
  Toilet,
  Armchair,
  Stethoscope,
  Droplets,
  Baby,
  type LucideIcon,
} from 'lucide-react';
import type { Interest } from './types';

export interface Facility {
  icon: LucideIcon;
  label: string;
  available: boolean;
}

export interface Mandal {
  id: string;
  name: string;
  deva: string;
  area: string;
  walk: { tone: 'easy' | 'moderate' | 'high'; label: string };
  crowd: { tone: 'easy' | 'moderate' | 'high'; label: string };
  note: string;
  easier?: boolean;
  facilities: Facility[];
  interestTags: Interest[];
  /** Canonical old-city walking sequence position — used to keep a selected
      route physically walkable even though stops are chosen by score. */
  walkOrder: number;
  /** Distance/time from the immediately preceding mandal in walkOrder. For
      walkOrder 1 this is the approximate distance from typical parking. */
  legFromPrevM: number;
  legFromPrevMin: number;
  /** Approx. minutes spent at this stop (queue + darshan/dekhawa). */
  timeMin: number;
}

export const mandals: Mandal[] = [
  {
    id: 'dagdusheth',
    name: 'Dagdusheth Halwai Ganpati',
    deva: 'श्रीमंत दगडूशेठ हलवाई गणपती',
    area: 'Budhwar Peth',
    walk: { tone: 'easy', label: 'Easy walk' },
    crowd: { tone: 'high', label: 'Very crowded' },
    note: 'Usually very crowded after 7 pm · Reported 14 min ago',
    easier: true,
    interestTags: ['Darshan', 'Architecture', 'Photography'],
    walkOrder: 1,
    legFromPrevM: 400,
    legFromPrevMin: 6,
    timeMin: 35,
    facilities: [
      { icon: Toilet, label: 'Toilet — 2 min away', available: true },
      { icon: Armchair, label: 'Seating — inside complex', available: true },
      { icon: Stethoscope, label: 'First aid — at east gate', available: true },
      { icon: Droplets, label: 'Water — at entrance', available: true },
      { icon: Baby, label: 'Feeding room — not available', available: false },
    ],
  },
  {
    id: 'tulshibaug',
    name: 'Tulshibaug Ganpati',
    deva: 'तुळशीबाग गणपती',
    area: 'Tulshibaug',
    walk: { tone: 'moderate', label: 'Moderate walk' },
    crowd: { tone: 'moderate', label: 'Moderate crowd' },
    note: 'Market lanes narrow near the entrance · Reported 8 min ago',
    interestTags: ['Darshan', 'History'],
    walkOrder: 2,
    legFromPrevM: 600,
    legFromPrevMin: 9,
    timeMin: 20,
    facilities: [
      { icon: Toilet, label: 'Toilet — 4 min away', available: true },
      { icon: Armchair, label: 'Seating — limited', available: true },
      { icon: Droplets, label: 'Water — at entrance', available: true },
      { icon: Baby, label: 'Feeding room — not available', available: false },
    ],
  },
  {
    id: 'guruji-talim',
    name: 'Guruji Talim',
    deva: 'गुरुजी तालीम',
    area: 'Ganpati Chowk',
    walk: { tone: 'easy', label: 'Easy walk' },
    crowd: { tone: 'moderate', label: 'Moderate crowd' },
    note: 'Known for its message of communal harmony · Reported 20 min ago',
    interestTags: ['History'],
    walkOrder: 3,
    legFromPrevM: 450,
    legFromPrevMin: 6,
    timeMin: 15,
    facilities: [
      { icon: Toilet, label: 'Toilet — 5 min away', available: true },
      { icon: Stethoscope, label: 'First aid — at chowk', available: true },
      { icon: Droplets, label: 'Water — nearby stall', available: true },
    ],
  },
  {
    id: 'kasba',
    name: 'Kasba Ganpati',
    deva: 'कसबा गणपती',
    area: 'Kasba Peth',
    walk: { tone: 'moderate', label: 'Moderate walk' },
    crowd: { tone: 'easy', label: 'Low crowd' },
    note: "Pune's gramadaivat — quieter in the afternoon · Reported 11 min ago",
    easier: true,
    interestTags: ['Darshan', 'History'],
    walkOrder: 4,
    legFromPrevM: 500,
    legFromPrevMin: 7,
    timeMin: 20,
    facilities: [
      { icon: Toilet, label: 'Toilet — 3 min away', available: true },
      { icon: Armchair, label: 'Seating — shaded courtyard', available: true },
      { icon: Droplets, label: 'Water — at entrance', available: true },
      { icon: Baby, label: 'Feeding room — not available', available: false },
    ],
  },
  {
    id: 'tilak',
    name: 'Tilak Ganpati',
    deva: 'टिळक गणपती',
    area: 'Kesari Wada',
    walk: { tone: 'easy', label: 'Easy walk' },
    crowd: { tone: 'moderate', label: 'Moderate crowd' },
    note: 'Live historical commentary reported most evenings · Reported 18 min ago',
    easier: true,
    interestTags: ['History', 'Darshan'],
    walkOrder: 5,
    legFromPrevM: 550,
    legFromPrevMin: 8,
    timeMin: 25,
    facilities: [
      { icon: Toilet, label: 'Toilet — 4 min away', available: true },
      { icon: Armchair, label: 'Seating — mats provided', available: true },
      { icon: Droplets, label: 'Water — nearby stall', available: true },
    ],
  },
  {
    id: 'bhausaheb-rangari',
    name: 'Shrimant Bhausaheb Rangari Ganpati',
    deva: 'श्रीमंत भाऊसाहेब रंगारी गणपती',
    area: 'Budhwar Peth',
    walk: { tone: 'moderate', label: 'Moderate walk' },
    crowd: { tone: 'high', label: 'Very crowded' },
    note: 'Large festival setup with live radio · Reported 10 min ago',
    interestTags: ['Darshan', 'Photography'],
    walkOrder: 6,
    legFromPrevM: 650,
    legFromPrevMin: 10,
    timeMin: 30,
    facilities: [
      { icon: Toilet, label: 'Toilet — 3 min away', available: true },
      { icon: Stethoscope, label: 'Medical booth — at entrance', available: true },
      { icon: Droplets, label: 'Water — bottle recycling point', available: true },
      { icon: Baby, label: 'Feeding room — Matru Chhaya booth', available: true },
    ],
  },
  {
    id: 'bal-vikas',
    name: 'Bal Vikas Mandal',
    deva: 'बाल विकास मंडळ',
    area: 'Budhwar Peth',
    walk: { tone: 'moderate', label: 'Moderate walk' },
    crowd: { tone: 'moderate', label: 'Moderate crowd' },
    note: 'Moving Dekhawa tableau · Reported 12 min ago',
    interestTags: ['Dekhava', 'Photography'],
    walkOrder: 7,
    legFromPrevM: 500,
    legFromPrevMin: 7,
    timeMin: 20,
    facilities: [
      { icon: Toilet, label: 'Toilet — 6 min away', available: true },
      { icon: Droplets, label: 'Water — nearby stall', available: true },
    ],
  },
  {
    id: 'nutan-mitra',
    name: 'Nutan Mitra Mandal',
    deva: 'नूतन मित्र मंडळ',
    area: 'Narayan Peth',
    walk: { tone: 'easy', label: 'Easy walk' },
    crowd: { tone: 'easy', label: 'Low crowd' },
    note: 'Set up at a colony entrance · Reported 25 min ago',
    easier: true,
    interestTags: ['Architecture', 'Darshan'],
    walkOrder: 8,
    legFromPrevM: 400,
    legFromPrevMin: 6,
    timeMin: 15,
    facilities: [
      { icon: Toilet, label: 'Toilet — 5 min away', available: true },
      { icon: Armchair, label: 'Seating — limited', available: true },
    ],
  },
];
