import { useState } from 'react';
import {
  ArrowLeft,
  Navigation,
  Armchair,
  Toilet,
  Stethoscope,
  UsersRound,
  Footprints,
  Droplets,
  CarFront,
  Hospital,
  Check,
  LifeBuoy,
  Flag,
  type LucideIcon,
} from 'lucide-react';
import { MapDiagram } from './MapDiagram';
import { StatusPill } from './ui';
import { mandals } from './mandals';

function NearbyRow({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex min-h-11 items-center gap-3 border-b border-border py-2 text-[15px] leading-[22px] text-ink">
      <Icon size={24} strokeWidth={1.75} className="shrink-0" />
      <span className="tnum">{label}</span>
    </div>
  );
}

// Short label for the top strip and map pin (names are long)
const shortName = (name: string) => name.replace(/ Ganpati$/, '').split(' ')[0];
// Illustrative walking time to each stop
const etas = [7, 6, 9, 4];

export function Screen6({
  stop,
  onBack,
  onHelp,
  onArrived,
}: {
  stop: number;
  onBack: () => void;
  onHelp: () => void;
  onArrived: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const total = mandals.length;
  const m = mandals[Math.min(stop, total - 1)];
  const isLast = stop >= total - 1;
  const eta = etas[stop] ?? 6;

  return (
    <div className="relative flex h-full flex-col bg-canvas">
      {/* Top status strip */}
      <div className="z-20 border-b border-border bg-canvas">
        <div className="flex h-16 items-center gap-3 px-5">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="grid h-11 w-11 -ml-2.5 place-items-center rounded-[12px] text-ink active:bg-sunken"
          >
            <ArrowLeft size={24} strokeWidth={1.75} />
          </button>
          <Navigation size={24} strokeWidth={1.75} className="text-ink" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-medium leading-[20px] text-ink">
              Walking to {shortName(m.name)}
            </p>
            <p className="text-[13px] leading-[18px] text-ink-tertiary tnum">
              Approx. {eta} min left
            </p>
          </div>
          <button
            onClick={onHelp}
            aria-label="Get help"
            className="flex min-h-11 min-w-[48px] items-center gap-1.5 rounded-[10px] border border-[var(--color-emergency)] px-3 py-2 text-[13px] font-medium text-[var(--color-emergency)] active:bg-[rgba(143,29,29,0.06)]"
          >
            <LifeBuoy size={20} strokeWidth={1.75} />
            Help
          </button>
        </div>
        {/* contextual bar */}
        <div className="flex h-12 items-center gap-2 bg-[var(--color-moderate-bg)] px-5 text-[15px] font-medium text-[var(--color-moderate)]">
          <Armchair size={20} strokeWidth={1.75} className="shrink-0" />
          Rest point in about 3 minutes
        </div>
      </div>

      {/* Map */}
      <div className="relative flex-1">
        <MapDiagram nextName={shortName(m.name)} />

        {/* Bottom sheet */}
        <div
          className={`absolute inset-x-0 bottom-0 flex flex-col rounded-t-[24px] border-t border-border bg-surface shadow-[0_1px_2px_rgba(28,26,23,0.06)] transition-all duration-300 ${
            expanded ? 'h-[70%]' : 'h-[190px]'
          }`}
        >
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex h-6 w-full shrink-0 items-center justify-center"
            aria-label={expanded ? 'Collapse details' : 'Expand details'}
          >
            <span className="h-1 w-8 rounded-full bg-border-strong" />
          </button>

          <div className="no-scrollbar flex-1 overflow-y-auto px-5" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 1.5rem)' }}>
            {/* Peek content */}
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

            <h2 className="mt-3 text-[20px] font-semibold leading-[26px] text-ink">
              {m.name}
            </h2>
            <p className="deva text-[15px] leading-[22px] text-ink-tertiary">
              {m.deva}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <StatusPill icon={Footprints} label={m.walk.label} tone={m.walk.tone} />
              <StatusPill icon={UsersRound} label={m.crowd.label} tone={m.crowd.tone} />
            </div>

            <button
              onClick={onArrived}
              className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-[12px] bg-primary text-[15px] font-medium text-[#1c1c1e] active:bg-[var(--color-primary-press)]"
            >
              {isLast ? (
                <>
                  We&apos;ve arrived — finish journey
                  <Flag size={20} strokeWidth={2} />
                </>
              ) : (
                <>
                  We&apos;ve arrived — next stop
                  <Check size={20} strokeWidth={2} />
                </>
              )}
            </button>

            {/* Expanded content */}
            {expanded ? (
              <div className="animate-disclose mt-8">
                <section>
                  <h3 className="mb-1 text-[15px] font-medium text-ink-secondary">
                    Nearby right now
                  </h3>
                  <NearbyRow icon={Armchair} label="Rest point — 120 m" />
                  <NearbyRow icon={Toilet} label="Toilet — 200 m" />
                  <NearbyRow icon={Stethoscope} label="First aid — 300 m" />
                  <NearbyRow icon={Droplets} label="Water — 80 m" />
                </section>

                <section className="mt-8">
                  <h3 className="mb-2 text-[15px] font-medium text-ink-secondary">
                    If you get separated
                  </h3>
                  <div className="flex gap-3">
                    <UsersRound
                      size={24}
                      strokeWidth={1.75}
                      className="mt-0.5 shrink-0 text-ink"
                    />
                    <div>
                      <p className="text-[15px] font-medium leading-[20px] text-ink">
                        Regroup at Kotwal Chawdi corner
                      </p>
                      <p className="mt-1 text-[15px] leading-[22px] text-ink-secondary">
                        Tell everyone in your group before you set off. It&apos;s
                        the easiest landmark to find in a crowd.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="mt-8">
                  <h3 className="mb-2 text-[15px] font-medium text-ink-secondary">
                    Getting back
                  </h3>
                  <div className="flex gap-3">
                    <CarFront
                      size={24}
                      strokeWidth={1.75}
                      className="mt-0.5 shrink-0 text-ink"
                    />
                    <div className="flex-1">
                      <p className="text-[15px] font-medium leading-[20px] text-ink">
                        Your parking — Mandai
                      </p>
                      <p className="mt-1 text-[15px] leading-[22px] text-ink-secondary tnum">
                        1.2 km, approx. 16 min walk from here
                      </p>
                      <button className="mt-3 flex h-14 items-center justify-center rounded-[10px] border border-border-strong px-4 text-[15px] font-medium text-ink active:bg-sunken">
                        Show route back
                      </button>
                    </div>
                  </div>
                </section>

                <button className="mt-8 flex h-14 w-full items-center gap-3 rounded-[10px] border border-[var(--color-emergency)] px-4 text-[15px] font-medium text-[var(--color-emergency)]">
                  <Hospital size={24} strokeWidth={1.75} />
                  Get medical help
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
