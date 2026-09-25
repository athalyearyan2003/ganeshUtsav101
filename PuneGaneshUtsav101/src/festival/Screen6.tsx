import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useDragControls, animate, type PanInfo } from 'motion/react';
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
  House,
  type LucideIcon,
} from 'lucide-react';
import { MapDiagram } from './MapDiagram';
import { StatusPill } from './ui';
import type { RouteStop } from './route';

const PEEK_HEIGHT = 190;
// A little bounce, since a settle here always follows either a drag release
// or a deliberate tap — momentum-driven, per the spring guidance for sheets.
const SHEET_SPRING = { type: 'spring' as const, bounce: 0.2, duration: 0.4 };

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

export function Screen6({
  stops,
  stop,
  onBack,
  onEndJourney,
  onHelp,
  onArrived,
}: {
  stops: RouteStop[];
  stop: number;
  onBack: () => void;
  onEndJourney: () => void;
  onHelp: () => void;
  onArrived: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const total = stops.length;
  const current = stops[Math.min(stop, total - 1)];
  const m = current.mandal;
  const isLast = stop >= total - 1;
  const eta = current.legFromPrevMin || 6;

  // The sheet is always full-height (70% of the map area); collapsing just
  // translates it down so only the peek height shows above the bottom edge.
  // A real drag + spring, not a discrete CSS height swap.
  const mapAreaRef = useRef<HTMLDivElement>(null);
  const [sheetHeight, setSheetHeight] = useState(420);
  useEffect(() => {
    const el = mapAreaRef.current;
    if (!el) return;
    const update = () => setSheetHeight(Math.round(el.clientHeight * 0.7));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const collapsedY = Math.max(sheetHeight - PEEK_HEIGHT, 0);
  const y = useMotionValue(collapsedY);
  // Drag starts only from the grab handle, not the scrollable content below
  // it — otherwise dragging to scroll the expanded sheet would drag the
  // whole sheet instead.
  const dragControls = useDragControls();
  // Keep the sheet pinned to whichever state it's in when the container is
  // remeasured (e.g. safe-area/orientation changes), rather than stranding it.
  useEffect(() => {
    y.set(expanded ? 0 : collapsedY);
  }, [collapsedY, expanded, y]);

  const snapTo = (next: boolean, velocity = 0) => {
    setExpanded(next);
    animate(y, next ? 0 : collapsedY, { ...SHEET_SPRING, velocity });
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const current = y.get();
    // Momentum decides intent when the flick is decisive; otherwise fall
    // back to whichever state the release point is closer to.
    if (info.velocity.y < -400) snapTo(true, info.velocity.y);
    else if (info.velocity.y > 400) snapTo(false, info.velocity.y);
    else snapTo(current < collapsedY / 2, info.velocity.y);
  };

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
            onClick={onEndJourney}
            aria-label="End journey and return home"
            className="flex h-11 shrink-0 items-center gap-1.5 rounded-[10px] border border-border-strong px-2.5 text-[13px] font-medium text-ink-secondary active:bg-sunken"
          >
            <House size={20} strokeWidth={1.75} />
            End
          </button>
          <button
            onClick={onHelp}
            aria-label="Get help"
            className="flex min-h-11 min-w-[48px] shrink-0 items-center gap-1.5 rounded-[10px] border border-[var(--color-emergency)] px-3 py-2 text-[13px] font-medium text-[var(--color-emergency)] active:bg-[rgba(143,29,29,0.06)]"
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
      <div ref={mapAreaRef} className="relative min-h-0 flex-1 overflow-hidden">
        <MapDiagram nextName={shortName(m.name)} />

        {/* Bottom sheet — always sheetHeight tall; collapsing translates it
            down so only the peek shows. Draggable with a real spring snap. */}
        <motion.div
          drag="y"
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={{ top: 0, bottom: collapsedY }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragEnd={onDragEnd}
          style={{ y, height: sheetHeight }}
          className="absolute inset-x-0 bottom-0 flex flex-col rounded-t-[24px] border-t border-border bg-surface shadow-[0_-2px_16px_rgba(28,26,23,0.1)]"
        >
          <button
            onPointerDown={(e) => dragControls.start(e)}
            onClick={() => snapTo(!expanded)}
            className="flex h-6 w-full shrink-0 cursor-grab touch-none items-center justify-center active:cursor-grabbing"
            aria-label={expanded ? 'Collapse details' : 'Expand details'}
          >
            <span className="h-1 w-8 rounded-full bg-border-strong" />
          </button>

          <div className="no-scrollbar flex-1 overflow-y-auto px-5" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 1.5rem)' }}>
            {!expanded ? (
              /* Peek — a purpose-built glance layout, not a clipped preview
                 of the expanded content: identity and status share one row
                 so both are visible without scrolling. */
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium uppercase tracking-[0.8px] text-ink-secondary tnum">
                      Stop {stop + 1} of {total}
                    </p>
                    <h2 className="mt-1 truncate text-[20px] font-semibold leading-[26px] text-ink">
                      {m.name}
                    </h2>
                    <p className="deva truncate text-[15px] leading-[22px] text-ink-tertiary">
                      {m.deva}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5 pt-4">
                    <StatusPill icon={Footprints} label={m.walk.label} tone={m.walk.tone} />
                    <StatusPill icon={UsersRound} label={m.crowd.label} tone={m.crowd.tone} />
                  </div>
                </div>
                <div className="mt-2.5 flex gap-[2px]">
                  {Array.from({ length: total }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-[3px] flex-1 rounded-full ${
                        i < stop ? 'bg-[var(--color-route)]' : 'bg-border'
                      }`}
                    />
                  ))}
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
              </>
            ) : (
              <div className="animate-disclose">
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

                <div className="mt-8">
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
                        <button
                          onClick={() => snapTo(false)}
                          className="mt-3 flex h-14 items-center justify-center rounded-[10px] border border-border-strong px-4 text-[15px] font-medium text-ink active:bg-sunken"
                        >
                          Show on map
                        </button>
                      </div>
                    </div>
                  </section>

                  <button
                    onClick={onHelp}
                    className="mt-8 flex h-14 w-full items-center gap-3 rounded-[10px] border border-[var(--color-emergency)] px-4 text-[15px] font-medium text-[var(--color-emergency)]"
                  >
                    <Hospital size={24} strokeWidth={1.75} />
                    Get medical help
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
