import { useEffect, useRef, useState } from 'react';
import {
  LocateFixed,
  MapPin,
  Armchair,
  Toilet,
  Stethoscope,
  UsersRound,
  ParkingCircle,
  type LucideIcon,
} from 'lucide-react';

// The map canvas is rendered larger than the viewport so it's genuinely
// pannable (native scroll) rather than a fixed illustration.
const CANVAS_W = 780;
const CANVAS_H = 1040;
// "You are here" position, as a fraction of the canvas — used both to place
// the node and to center the initial scroll on it.
const HERE_X = 0.51;
const HERE_Y = 0.82;

function MapNode({
  left,
  top,
  icon: Icon,
  label,
  variant = 'plain',
}: {
  left: string;
  top: string;
  icon: LucideIcon;
  label: string;
  variant?: 'current' | 'next' | 'assist' | 'plain';
}) {
  const nodeClass =
    variant === 'current'
      ? 'bg-[var(--color-route)] text-white ring-2 ring-white'
      : variant === 'next'
        ? 'bg-ink text-white'
        : variant === 'assist'
          ? 'bg-surface text-[var(--color-assist)] border-2 border-[var(--color-assist)]'
          : 'bg-surface text-ink border-2 border-border';
  return (
    <div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1"
      style={{ left, top }}
    >
      <span className="relative grid h-7 w-7 shrink-0 place-items-center">
        {variant === 'current' ? (
          <>
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-7 w-7 rounded-full bg-[var(--color-route)] animate-gps-ring" />
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-7 w-7 rounded-full bg-[var(--color-route)] animate-gps-ring [animation-delay:1.2s]" />
          </>
        ) : null}
        <span
          className={`relative z-[1] grid h-7 w-7 place-items-center rounded-full ${nodeClass}`}
        >
          <Icon size={16} strokeWidth={1.75} />
        </span>
      </span>
      <span className="whitespace-nowrap rounded-[6px] bg-canvas px-1.5 py-0.5 text-[13px] font-medium leading-[18px] text-ink shadow-[0_1px_2px_rgba(28,26,23,0.12)]">
        {label}
      </span>
    </div>
  );
}

export function MapDiagram({ nextName = 'Tulshibaug' }: { nextName?: string }) {
  // A key change replays the drift/recenter animation when the user recenters.
  const [recenterKey, setRecenterKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const centerOnHere = (behavior: ScrollBehavior) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({
      left: CANVAS_W * HERE_X - el.clientWidth / 2,
      top: CANVAS_H * HERE_Y - el.clientHeight / 2,
      behavior,
    });
  };

  // Start centered on the visitor's position, not the canvas origin.
  useEffect(() => centerOnHere('auto'), []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-sunken">
      <div
        ref={scrollRef}
        className="h-full w-full overflow-auto overscroll-contain"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div key={recenterKey} className="relative" style={{ width: CANVAS_W, height: CANVAS_H }}>
          <svg
            width={CANVAS_W}
            height={CANVAS_H}
            viewBox="0 0 390 520"
            className="absolute inset-0"
            aria-hidden={true}
          >
            {/* streets — mid-grey so they read clearly against the warm sunken
                base, distinct from both the background and the route accent */}
            <g stroke="#8A8A8A" strokeWidth={5} strokeLinecap="round" fill="none">
              <path d="M40 90 H350" />
              <path d="M60 90 V440" />
              <path d="M200 60 V470" />
              <path d="M330 90 V440" />
              <path d="M60 300 H330" />
              <path d="M120 200 L200 260" />
            </g>
            <g stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" fill="none" opacity={0.6}>
              <path d="M40 90 H350" />
              <path d="M60 90 V440" />
              <path d="M200 60 V470" />
              <path d="M330 90 V440" />
              <path d="M60 300 H330" />
              <path d="M120 200 L200 260" />
            </g>

            {/* landmark blocks */}
            <g fill="rgba(27,25,23,0.10)">
              <rect x="90" y="120" width="90" height="60" rx="4" />
              <rect x="230" y="120" width="80" height="70" rx="4" />
              <rect x="90" y="340" width="100" height="70" rx="4" />
            </g>

            {/* completed route segment */}
            <path
              d="M200 430 L200 300 L120 200"
              stroke="#A0A0A0"
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
            />
            {/* remaining route segment — solid base */}
            <path
              id="remaining-route"
              d="M120 200 L120 120 L200 120"
              stroke="#C96A1D"
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
            />
            {/* remaining route — flowing dashes showing direction of travel */}
            <path
              d="M120 200 L120 120 L200 120"
              stroke="#FFFFFF"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              className="animate-route-flow"
            />

            {/* moving progress dot travelling toward the next stop */}
            <circle r={4.5} fill="#C96A1D" stroke="#FFFFFF" strokeWidth={2}>
              <animateMotion dur="3.2s" repeatCount="indefinite" rotate="auto">
                <mpath href="#remaining-route" />
              </animateMotion>
            </circle>
          </svg>

          {/* landmark labels */}
          <span className="absolute left-[24%] top-[26%] text-[20px] font-semibold leading-[26px] text-ink-secondary">
            Shaniwarwada
          </span>
          <span className="absolute left-[60%] top-[27%] text-[20px] font-semibold leading-[26px] text-ink-secondary">
            Laxmi Road
          </span>
          <span className="absolute left-[24%] top-[70%] text-[20px] font-semibold leading-[26px] text-ink-secondary">
            Mandai
          </span>

          {/* map nodes */}
          <MapNode left="51%" top="82%" icon={LocateFixed} label="You are here" variant="current" />
          <MapNode left="51%" top="22%" icon={MapPin} label={`Next: ${nextName}`} variant="next" />
          <MapNode left="31%" top="38%" icon={Armchair} label="Rest point" />
          <MapNode left="31%" top="58%" icon={Toilet} label="Toilet" />
          <MapNode left="82%" top="58%" icon={Stethoscope} label="First aid" />
          <MapNode left="60%" top="88%" icon={UsersRound} label="Regroup point" variant="assist" />
          <MapNode left="24%" top="78%" icon={ParkingCircle} label="Your parking" />
        </div>
      </div>

      {/* Recenter control — keeps the map feeling live and interactive */}
      <button
        onClick={() => {
          centerOnHere('smooth');
          setRecenterKey((k) => k + 1);
        }}
        aria-label="Recenter map on your location"
        className="absolute bottom-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-border bg-canvas text-ink shadow-[0_1px_3px_rgba(28,26,23,0.16)] active:bg-sunken"
      >
        <LocateFixed size={20} strokeWidth={1.75} />
      </button>
    </div>
  );
}
