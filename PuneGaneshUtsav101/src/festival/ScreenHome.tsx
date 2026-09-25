import {
  ArrowRight,
  BookOpen,
  MapPin,
  Clock3,
  Armchair,
  Toilet,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { RootHeader, PrimaryButton, TertiaryLink } from './ui';
import type { JourneyStatus } from './types';

/* ---- Sunken primary panel — shared shell for every home state ---- */
function PrimaryPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[14px] bg-sunken p-5">{children}</div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-medium uppercase tracking-[0.8px] text-ink-secondary">
      {children}
    </h2>
  );
}

/* ---- Compact discovery card — one entry only, never a grid ---- */
function DiscoveryCard({
  title,
  meta,
  onClick,
}: {
  title: string;
  meta: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-[14px] border border-border bg-surface p-4 text-left transition-colors active:bg-sunken"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-sunken text-ink">
        <BookOpen size={20} strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium leading-[20px] text-ink">
          {title}
        </span>
        <span className="mt-0.5 block text-[13px] leading-[18px] text-ink-tertiary tnum">
          {meta}
        </span>
      </span>
      <ChevronRight size={20} strokeWidth={1.75} className="shrink-0 text-ink-tertiary" />
    </button>
  );
}

/* ---- Glance row for "Nearby now" — icon + label, no card ---- */
function NearbyRow({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex min-h-11 items-center gap-3 text-[15px] leading-[22px] text-ink">
      <Icon size={20} strokeWidth={1.75} className="shrink-0 text-ink-secondary" />
      <span className="tnum">{label}</span>
    </div>
  );
}

export function ScreenHome({
  status,
  stop,
  total,
  nextName,
  eta,
  onHelp,
  onPlan,
  onOpenRoute,
  onContinueLive,
  onDiscover,
  onNextStory,
}: {
  status: JourneyStatus;
  stop: number;
  total: number;
  nextName: string;
  eta: number;
  onHelp: () => void;
  onPlan: () => void;
  onOpenRoute: () => void;
  onContinueLive: () => void;
  onDiscover: () => void;
  onNextStory: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <RootHeader onHelp={onHelp} />

      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-5 pb-8">
        {/* ── STATE 1 — no journey planned ── */}
        {status === 'none' ? (
          <>
            <div className="mt-5">
              <PrimaryPanel>
                <h1 className="text-[24px] font-semibold leading-[30px] tracking-[-0.3px] text-ink">
                  Plan a route around your family
                </h1>
                <p className="mt-2 text-[17px] leading-[26px] text-ink-secondary">
                  Answer a few quick questions about time, interests, and what
                  your group needs.
                </p>
                <div className="mt-5">
                  <PrimaryButton onClick={onPlan}>Plan my journey</PrimaryButton>
                </div>
              </PrimaryPanel>
            </div>

            <div className="mt-8">
              <SectionLabel>Explore the festival</SectionLabel>
              <div className="mt-3">
                <DiscoveryCard
                  title="A few Ganpatis and Dekhawas worth knowing about"
                  meta="4 stories"
                  onClick={onDiscover}
                />
              </div>
            </div>
          </>
        ) : null}

        {/* ── ROUTE PLANNED, NOT YET STARTED ── */}
        {status === 'planned' ? (
          <>
            <div className="mt-5">
              <PrimaryPanel>
                <h1 className="text-[24px] font-semibold leading-[30px] tracking-[-0.3px] text-ink">
                  Your route is ready
                </h1>
                <p className="mt-2 text-[15px] leading-[22px] text-ink-secondary tnum">
                  4 stops · approx. 2 hr 10 min
                </p>
                <div className="mt-5">
                  <PrimaryButton onClick={onOpenRoute}>
                    Start your journey
                  </PrimaryButton>
                </div>
              </PrimaryPanel>
            </div>

            <div className="mt-8">
              <SectionLabel>Discover along your route</SectionLabel>
              <div className="mt-3">
                <DiscoveryCard
                  title="See what's worth knowing along your route"
                  meta="4 stories"
                  onClick={onDiscover}
                />
              </div>
            </div>
          </>
        ) : null}

        {/* ── STATE 2 — journey active ── */}
        {status === 'active' ? (
          <>
            <div className="mt-5">
              <PrimaryPanel>
                <p className="text-[13px] font-medium uppercase tracking-[0.8px] text-ink-secondary tnum">
                  Stop {stop + 1} of {total}
                </p>
                <div className="mt-1.5 flex gap-[2px]">
                  {Array.from({ length: total }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-[3px] flex-1 rounded-full ${
                        i < stop ? 'bg-[var(--color-route)]' : 'bg-border'
                      }`}
                    />
                  ))}
                </div>

                <h1 className="mt-3 flex items-start gap-2 text-[24px] font-semibold leading-[30px] tracking-[-0.3px] text-ink">
                  <MapPin
                    size={20}
                    strokeWidth={1.75}
                    className="mt-1.5 shrink-0 text-ink-secondary"
                  />
                  <span>Next: {nextName}</span>
                </h1>
                <p className="mt-2 flex items-center gap-2 text-[15px] leading-[22px] text-ink-secondary tnum">
                  <Clock3 size={16} strokeWidth={1.75} className="shrink-0" />
                  Approx. {eta} min to this stop
                </p>

                <div className="mt-5">
                  <PrimaryButton onClick={onContinueLive}>
                    Continue journey
                  </PrimaryButton>
                </div>
                <div className="mt-2">
                  <TertiaryLink icon={MapPin} onClick={onOpenRoute}>
                    View full route
                  </TertiaryLink>
                </div>
              </PrimaryPanel>
            </div>

            <div className="mt-8">
              <SectionLabel>Discover along your route</SectionLabel>
              <div className="mt-3">
                <DiscoveryCard
                  title="The story behind your next stop"
                  meta={`${nextName} · story`}
                  onClick={onNextStory}
                />
              </div>
            </div>

            <div className="mt-8">
              <SectionLabel>Nearby now</SectionLabel>
              <div className="mt-2 flex flex-col divide-y divide-border">
                <NearbyRow icon={Armchair} label="Rest point in about 3 minutes" />
                <NearbyRow icon={Toilet} label="Toilet — 200 m" />
              </div>
            </div>
          </>
        ) : null}

        {/* ── STATE 3 — journey completed ── */}
        {status === 'completed' ? (
          <>
            <div className="mt-5">
              <PrimaryPanel>
                <h1 className="text-[24px] font-semibold leading-[30px] tracking-[-0.3px] text-ink">
                  You completed your journey
                </h1>
                <p className="mt-2 text-[15px] leading-[22px] text-ink-secondary tnum">
                  4 stops · approx. 2 hr 10 min
                </p>
                <div className="mt-4">
                  <TertiaryLink icon={BookOpen} onClick={onDiscover}>
                    Revisit the stories from today
                  </TertiaryLink>
                </div>
                <div className="mt-4">
                  <PrimaryButton onClick={onPlan}>Plan a new journey</PrimaryButton>
                </div>
              </PrimaryPanel>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
