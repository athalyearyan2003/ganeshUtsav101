import { useState } from 'react';
import { ArrowLeft, Siren, LocateFixed, Info, ChevronDown, ChevronUp, Stethoscope } from 'lucide-react';

const LANDMARK = 'Tulshibaug Ganpati';

export function ScreenMedical({
  onBack,
  onShowOnMap,
}: {
  onBack: () => void;
  onShowOnMap?: () => void;
}) {
  const [open, setOpen] = useState(false);

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
          <span className="text-[15px] font-medium text-ink">Medical emergency</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-6 pt-5">
        {/* Primary action */}
        <a
          href="tel:112"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-[12px] bg-[var(--color-emergency)] text-[15px] font-medium text-white active:opacity-90"
        >
          <Siren size={20} strokeWidth={1.75} />
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
          Tell them your name, that you're near {LANDMARK}, and what's happened.
        </p>

        {/* Nearby medical disclosure */}
        <div className="mt-6 border-t border-border">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-12 w-full items-center justify-between text-[15px] font-medium text-ink"
          >
            Nearby medical support
            {open ? (
              <ChevronUp size={20} strokeWidth={1.75} className="text-ink-tertiary" />
            ) : (
              <ChevronDown size={20} strokeWidth={1.75} className="text-ink-tertiary" />
            )}
          </button>

          {open ? (
            <div className="animate-disclose pb-2">
              {[
                { label: 'First aid post — near Tulshibaug east gate, approx. 180 m' },
                { label: 'Medical van — Laxmi Road junction, approx. 400 m' },
              ].map(({ label }) => (
                <div key={label} className="border-t border-border py-3">
                  <div className="flex items-start gap-2">
                    <Stethoscope size={20} strokeWidth={1.75} className="mt-px shrink-0 text-ink-secondary" />
                    <div className="flex-1">
                      <p className="text-[15px] leading-[22px] text-ink">{label}</p>
                      {onShowOnMap ? (
                        <button
                          onClick={onShowOnMap}
                          className="mt-1 text-[13px] font-medium text-[var(--color-assist)]"
                        >
                          Show on map
                        </button>
                      ) : (
                        <p className="mt-1 text-[13px] text-ink-tertiary">
                          Map available during an active journey
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <p className="mt-1 flex items-start gap-1.5 text-[13px] leading-[18px] text-ink-tertiary">
                <Info size={16} strokeWidth={1.75} className="mt-px shrink-0" />
                Illustrative sample — locations not verified. Use 112 for dispatch.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
