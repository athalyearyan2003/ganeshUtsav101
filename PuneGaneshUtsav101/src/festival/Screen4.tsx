import { useState, type ReactNode } from 'react';
import {
  Footprints,
  Armchair,
  UsersRound,
  Clock3,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Accessibility,
  Stethoscope,
  Toilet,
  Baby,
  ParkingCircle,
  Info,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import type { PlanState } from './types';
import {
  PlainHeader,
  StickyBar,
  PrimaryButton,
  SecondaryButton,
  StatusPill,
  InlineNote,
  Footnote,
  TertiaryLink,
} from './ui';
import { storyForMandal } from './discovery';
import type { Facility, Mandal } from './mandals';
import { formatDistance, type RouteStop } from './route';

function FacilityList({ items }: { items: Facility[] }) {
  return (
    <div className="mt-3 grid grid-cols-1 gap-y-2.5 sm:grid-cols-2">
      {items.map((f, i) => {
        const Icon = f.icon;
        return (
          <div
            key={i}
            className={`flex items-center gap-2 text-[13px] leading-[18px] ${
              f.available ? 'text-ink-secondary' : 'text-ink-tertiary'
            }`}
          >
            <Icon size={20} strokeWidth={1.75} className="shrink-0" />
            <span>{f.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function StopCard({
  mandal,
  reason,
  onOpen,
  onDiscoverStop,
}: {
  mandal: Mandal;
  reason?: string;
  onOpen: () => void;
  onDiscoverStop: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const story = storyForMandal(mandal.id);
  return (
    <div className="rounded-[14px] border border-border bg-surface p-4">
      <button onClick={onOpen} className="flex w-full items-start gap-2 text-left">
        <div className="min-w-0 flex-1">
          <h2 className="text-[20px] font-semibold leading-[26px] text-ink">
            {mandal.name}
          </h2>
          <p className="deva mt-0.5 text-[15px] leading-[22px] text-ink-tertiary">
            {mandal.deva}
          </p>
          <p className="mt-0.5 text-[13px] leading-[18px] text-ink-tertiary">
            {mandal.area}
          </p>
        </div>
        <ChevronRight
          size={20}
          strokeWidth={1.75}
          className="mt-1 shrink-0 text-ink-tertiary"
        />
      </button>

      <div className="mt-3 flex flex-wrap gap-2">
        <StatusPill icon={Footprints} label={mandal.walk.label} tone={mandal.walk.tone} />
        <StatusPill icon={UsersRound} label={mandal.crowd.label} tone={mandal.crowd.tone} />
      </div>

      <p className="mt-3 text-[13px] leading-[18px] text-ink-tertiary tnum">
        {mandal.note}
      </p>
      {reason ? (
        <p className="mt-0.5 text-[13px] leading-[18px] text-ink-tertiary">{reason}</p>
      ) : null}

      {mandal.easier ? (
        <div className="mt-3">
          <div className="flex items-center gap-2 rounded-[10px] bg-[var(--color-easy-bg)] p-3 text-[15px] font-medium text-[var(--color-assist)]">
            <Accessibility size={20} strokeWidth={1.75} className="shrink-0" />
            Easier route available
          </div>
        </div>
      ) : null}

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-3 flex h-12 w-full items-center justify-between border-t border-border pt-3 text-[15px] font-medium text-ink"
      >
        Facilities at this stop
        {open ? (
          <ChevronUp size={20} strokeWidth={1.75} className="text-ink-tertiary" />
        ) : (
          <ChevronDown size={20} strokeWidth={1.75} className="text-ink-tertiary" />
        )}
      </button>
      {open ? (
        <div className="animate-disclose">
          <FacilityList items={mandal.facilities} />
        </div>
      ) : null}

      {/* Discovery entry — only when this stop has a story */}
      {story ? (
        <div className="mt-1 border-t border-border pt-1">
          <TertiaryLink icon={BookOpen} onClick={() => onDiscoverStop(story.id)}>
            Discover its story
          </TertiaryLink>
        </div>
      ) : null}
    </div>
  );
}

function Node({ n }: { n: number }) {
  return (
    <div className="relative grid h-7 w-7 place-items-center rounded-full bg-ink text-[13px] font-semibold text-white tnum">
      {n}
    </div>
  );
}

function Leg({ meters, minutes }: { meters: number; minutes: number }) {
  return (
    <div className="flex items-center gap-2 py-3 text-[15px] leading-[22px] text-ink-secondary">
      <Footprints size={20} strokeWidth={1.75} className="shrink-0 text-ink-tertiary" />
      <span className="tnum">
        {formatDistance(meters)} · approx. {minutes} min walk
      </span>
    </div>
  );
}

function RestNode({ withRest }: { withRest: boolean }) {
  if (!withRest) return null;
  return (
    <div className="flex gap-3 py-3">
      <div className="flex w-7 shrink-0 justify-center">
        <div className="grid h-5 w-5 place-items-center rounded-full border-2 border-[var(--color-route)] bg-surface text-[var(--color-route)]">
          <Armchair size={12} strokeWidth={2} />
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-[15px] leading-[22px] text-ink">
          Rest stop — Shaniwarwada steps, shaded seating
        </p>
        <p className="mt-0.5 text-[13px] leading-[18px] text-ink-tertiary">
          Added because you asked for a break every 20 minutes.
        </p>
      </div>
    </div>
  );
}

export function Screen4({
  plan,
  stops,
  constrained,
  onBack,
  onOpenStop,
  onStart,
  onAdjust,
  onDiscoverAll,
  onDiscoverStop,
  headerRight,
}: {
  plan: PlanState;
  stops: RouteStop[];
  constrained: boolean;
  onBack?: () => void;
  onOpenStop: (i: number) => void;
  onStart: () => void;
  onAdjust: () => void;
  onDiscoverAll: () => void;
  onDiscoverStop: (id: string) => void;
  headerRight?: ReactNode;
}) {
  const withRest = plan.needs.includes('rest');
  const withParking = plan.needs.includes('parking');

  const chips: { icon: LucideIcon; label: string }[] = [
    { icon: UsersRound, label: `${plan.groupCount} people` },
    {
      icon: Clock3,
      label:
        plan.time === '1' ? '1 hour' : plan.time === '4' ? '4 hours' : '2 hours',
    },
  ];
  if (plan.needs.includes('shorterWalk'))
    chips.push({ icon: Footprints, label: 'Shorter walking' });
  if (withRest) chips.push({ icon: Armchair, label: 'Rest every 20 min' });
  if (plan.needs.includes('avoidCrowd'))
    chips.push({ icon: UsersRound, label: 'Avoid crowds' });
  if (plan.needs.includes('accessibility'))
    chips.push({ icon: Accessibility, label: 'Step-free' });
  if (plan.needs.includes('toilet')) chips.push({ icon: Toilet, label: 'Toilet access' });
  if (plan.needs.includes('medical'))
    chips.push({ icon: Stethoscope, label: 'Medical support' });
  if (plan.needs.includes('feeding'))
    chips.push({ icon: Baby, label: 'Feeding/changing' });

  const totalWalkM = stops.reduce((sum, s) => sum + s.legFromPrevM, 0);
  const totalMin = stops.reduce((sum, s) => sum + s.legFromPrevMin + s.mandal.timeMin, 0);
  const hours = Math.floor(totalMin / 60);
  const mins = totalMin % 60;
  const durationLabel = hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`;

  // Insert a rest node after any leg once ~20 min has accumulated since the
  // last one, rather than at a fixed stop — matches "every 20 minutes" honestly
  // regardless of how many stops the plan ends up with.
  const restAfterStop = new Set<number>();
  if (withRest) {
    let minutesSinceRest = 0;
    for (let i = 1; i < stops.length; i++) {
      minutesSinceRest += stops[i].legFromPrevMin + stops[i - 1].mandal.timeMin;
      if (minutesSinceRest >= 20) {
        restAfterStop.add(i - 1);
        minutesSinceRest = 0;
      }
    }
  }
  const restCount = restAfterStop.size;

  return (
    <div className="flex h-full flex-col">
      <PlainHeader title="Your journey" onBack={onBack} right={headerRight} />

      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar">
        {/* Summary block */}
        <div className="bg-sunken px-5 py-5">
          <h2 className="text-[20px] font-semibold leading-[26px] text-ink tnum">
            {stops.length} mandals · Approx. {durationLabel}
          </h2>
          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] leading-[22px] text-ink-secondary tnum">
            <span className="inline-flex items-center gap-1.5">
              <Footprints size={20} strokeWidth={1.75} /> {formatDistance(totalWalkM)} total
              walking
            </span>
            {withRest ? (
              <span className="inline-flex items-center gap-1.5">
                <Armchair size={20} strokeWidth={1.75} /> {restCount} rest stops
                included
              </span>
            ) : null}
          </p>
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
            {chips.map((c, i) => {
              const Icon = c.icon;
              return (
                <button
                  key={i}
                  onClick={onAdjust}
                  className="flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-[13px] font-medium text-ink-secondary"
                >
                  <Icon size={16} strokeWidth={1.75} />
                  <span className="tnum">{c.label}</span>
                </button>
              );
            })}
          </div>

          {constrained ? (
            <div className="mt-3">
              <InlineNote icon={Info} tone="moderate">
                We couldn&apos;t find enough step-free stops to fill the full
                time available — this route is shorter than usual.
              </InlineNote>
            </div>
          ) : null}

          {/* Discovery entry — scoped to this journey */}
          <div className="mt-3">
            <TertiaryLink icon={BookOpen} onClick={onDiscoverAll}>
              See what&apos;s worth knowing along your route
            </TertiaryLink>
          </div>
        </div>

        {/* Route */}
        <div className="px-5 py-5">
          {stops.map((s, i) => {
            const showRest = restAfterStop.has(i);
            return (
              <div key={s.mandal.id}>
                <div className="flex gap-3">
                  {/* spine */}
                  <div className="relative flex w-7 shrink-0 flex-col items-center">
                    <div className="absolute top-0 bottom-0 left-1/2 w-1 -translate-x-1/2 bg-[var(--color-route)]" />
                    <Node n={i + 1} />
                  </div>
                  <div className="min-w-0 flex-1 pb-3">
                    <StopCard
                      mandal={s.mandal}
                      reason={s.reason}
                      onOpen={() => onOpenStop(i)}
                      onDiscoverStop={onDiscoverStop}
                    />
                  </div>
                </div>

                {/* connector */}
                {i < stops.length - 1 ? (
                  <div className="flex gap-3">
                    <div className="flex w-7 shrink-0 justify-center">
                      <div className="w-1 bg-[var(--color-route)]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Leg meters={stops[i + 1].legFromPrevM} minutes={stops[i + 1].legFromPrevMin} />
                      {showRest ? <RestNode withRest /> : null}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}

          {/* Final parking node */}
          {withParking ? (
            <div className="flex gap-3">
              <div className="relative flex w-7 shrink-0 flex-col items-center">
                <div className="absolute top-0 bottom-1/2 left-1/2 w-1 -translate-x-1/2 bg-[var(--color-route)]" />
                <div className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-surface text-ink">
                  <ParkingCircle size={16} strokeWidth={1.75} />
                </div>
              </div>
              <div className="min-w-0 flex-1 py-1">
                <p className="text-[15px] leading-[22px] text-ink tnum">
                  Return to parking — Mandai, 900 m, approx. 12 min
                </p>
              </div>
            </div>
          ) : null}

          {plan.needs.includes('accessibility') ? (
            <div className="mt-4">
              <InlineNote icon={Info} tone="assist">
                Where lanes are stepped, we&apos;ve chosen the step-free
                approach. Some stops add a short detour.
              </InlineNote>
            </div>
          ) : null}

          <div className="mt-5">
            <Footnote>
              Crowd levels are reported by visitors and volunteers and can change
              quickly. Walking times are approximate.
            </Footnote>
          </div>
          <div className="h-6" />
        </div>
      </div>

      <StickyBar>
        <div className="flex gap-3">
          <SecondaryButton onClick={onAdjust}>Adjust plan</SecondaryButton>
          <div className="flex-1">
            <PrimaryButton onClick={onStart}>Start journey</PrimaryButton>
          </div>
        </div>
      </StickyBar>
    </div>
  );
}
