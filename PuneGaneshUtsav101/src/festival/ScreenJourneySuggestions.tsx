import {
  Clock3,
  Footprints,
  UsersRound,
  Armchair,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { RootHeader, PrimaryButton } from './ui';
import type { PlanState } from './types';

export interface Suggestion {
  id: string;
  title: string;
  meta: string; // stops · approx time
  blurb: string;
  tags: { icon: LucideIcon; label: string }[];
  seed: Partial<PlanState>;
}

/* Illustrative sample journeys — curated starting points, not live availability. */
const suggestions: Suggestion[] = [
  {
    id: 'classic',
    title: 'The classic five',
    meta: '5 stops · approx. 4 hr',
    blurb:
      'The best-known mandals of the old city, in the order the procession usually follows.',
    tags: [
      { icon: Clock3, label: '4 hours' },
      { icon: Footprints, label: 'Longer walk' },
    ],
    seed: { time: '4', interests: ['Darshan', 'History'] },
  },
  {
    id: 'gentle',
    title: 'A gentle morning with elders',
    meta: '3 stops · approx. 2 hr',
    blurb:
      'Shorter distances, seating along the way, and quieter darshan earlier in the day.',
    tags: [
      { icon: Clock3, label: '2 hours' },
      { icon: Armchair, label: 'Rest every 20 min' },
    ],
    seed: {
      time: '2',
      needs: ['rest', 'shorterWalk', 'accessibility'],
      interests: ['Darshan'],
    },
  },
  {
    id: 'stories',
    title: 'Stories & Dekhawas',
    meta: '4 stops · approx. 2 hr',
    blurb:
      'For the retellings — the mandals with the richest histories and a moving tableau.',
    tags: [
      { icon: Clock3, label: '2 hours' },
      { icon: UsersRound, label: 'Small group' },
    ],
    seed: { time: '2', interests: ['History', 'Dekhava'] },
  },
];

function SuggestionCard({
  s,
  onSelect,
}: {
  s: Suggestion;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="w-full rounded-[14px] border border-border bg-surface p-4 text-left transition-colors active:bg-sunken"
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-[20px] font-semibold leading-[26px] text-ink">
            {s.title}
          </h3>
          <p className="mt-0.5 text-[13px] leading-[18px] text-ink-tertiary tnum">
            {s.meta}
          </p>
        </div>
        <ChevronRight
          size={20}
          strokeWidth={1.75}
          className="mt-1 shrink-0 text-ink-tertiary"
        />
      </div>
      <p className="mt-2 text-[15px] leading-[22px] text-ink-secondary">{s.blurb}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {s.tags.map((t, i) => {
          const Icon = t.icon;
          return (
            <span
              key={i}
              className="flex h-8 items-center gap-1.5 rounded-full border border-border bg-sunken px-3 text-[13px] font-medium text-ink-secondary"
            >
              <Icon size={16} strokeWidth={1.75} />
              <span className="tnum">{t.label}</span>
            </span>
          );
        })}
      </div>
    </button>
  );
}

export function ScreenJourneySuggestions({
  onHelp,
  onPlan,
  onSelect,
}: {
  onHelp: () => void;
  onPlan: () => void;
  onSelect: (seed: Partial<PlanState>) => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <RootHeader label="Journey" onHelp={onHelp} />

      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-5 pb-8">
        <div className="mt-5 rounded-[14px] bg-sunken p-5">
          <h1 className="text-[24px] font-semibold leading-[30px] tracking-[-0.3px] text-ink">
            Plan a route around your family
          </h1>
          <p className="mt-2 text-[17px] leading-[26px] text-ink-secondary">
            Answer a few quick questions about time, interests, and what your
            group needs.
          </p>
          <div className="mt-5">
            <PrimaryButton onClick={onPlan}>Plan my journey</PrimaryButton>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.8px] text-ink-secondary">
            Or start from a suggested journey
          </h2>
          <p className="mt-2 text-[15px] leading-[22px] text-ink-secondary">
            Pick one to see a route, then adjust it around your group.
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {suggestions.map((s) => (
              <SuggestionCard key={s.id} s={s} onSelect={() => onSelect(s.seed)} />
            ))}
          </div>
          <p className="mt-4 text-[13px] leading-[18px] text-ink-tertiary">
            Suggested journeys are illustrative sample itineraries. Stops, times,
            and crowd levels vary and are confirmed once you generate the route.
          </p>
        </div>
      </div>
    </div>
  );
}
