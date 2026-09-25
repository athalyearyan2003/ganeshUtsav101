import { ArrowLeft, ShieldAlert, LocateFixed } from 'lucide-react';

const LANDMARK = 'Tulshibaug Ganpati';

export function ScreenSafety({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <header className="shrink-0 border-b border-border bg-canvas px-5">
        <div className="flex h-14 items-center">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="grid h-11 w-11 -ml-2.5 place-items-center rounded-[12px] text-ink active:bg-sunken"
          >
            <ArrowLeft size={24} strokeWidth={1.75} />
          </button>
          <span className="text-[15px] font-medium text-ink">Police / safety</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-6 pt-5">
        {/* Primary action */}
        <a
          href="tel:112"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-[12px] bg-[var(--color-emergency)] text-[15px] font-medium text-white active:opacity-90"
        >
          <ShieldAlert size={20} strokeWidth={1.75} />
          Call 112 — India's emergency number
        </a>

        {/* Location line */}
        <div className="mt-4 flex items-start gap-2 text-[15px] leading-[22px] text-ink">
          <LocateFixed size={20} strokeWidth={1.75} className="mt-px shrink-0 text-ink-secondary" />
          <span>
            Your approximate location: near{' '}
            <span className="font-medium">{LANDMARK}</span>
          </span>
        </div>

        {/* Guidance */}
        <p className="mt-3 text-[15px] leading-[22px] text-ink-secondary">
          Tell them your name, your location near {LANDMARK}, and what's happening.
        </p>
      </div>
    </div>
  );
}
