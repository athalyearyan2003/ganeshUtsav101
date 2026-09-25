import { ArrowLeft, UsersRound, Route, Info } from 'lucide-react';

const REGROUP_NAME = 'Kotwal Chawdi corner';
const REGROUP_NOTE =
  "Tell everyone in your group before you set off. It's the easiest landmark to find in a crowd.";

export function ScreenFindFamily({
  onBack,
  onSafety,
  onShowOnMap,
}: {
  onBack: () => void;
  onSafety: () => void;
  onShowOnMap?: () => void;
}) {
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
          <span className="text-[15px] font-medium text-ink">Find my family</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-6 pt-5">
        <div className="flex items-start gap-3">
          <UsersRound size={24} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[var(--color-assist)]" />
          <div>
            <h2 className="text-[20px] font-semibold leading-[26px] text-ink">
              Regroup at {REGROUP_NAME}
            </h2>
            <p className="mt-2 text-[15px] leading-[22px] text-ink-secondary">
              {REGROUP_NOTE}
            </p>
          </div>
        </div>

        {onShowOnMap ? (
          <button
            onClick={onShowOnMap}
            className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-[10px] border-2 border-[var(--color-assist)] bg-canvas px-4 text-[15px] font-medium text-[var(--color-assist)] active:bg-[rgba(23,94,99,0.06)]"
          >
            <Route size={20} strokeWidth={1.75} />
            Show on map
          </button>
        ) : (
          <p className="mt-6 text-[13px] leading-[18px] text-ink-tertiary">
            The map is available once your journey is active.
          </p>
        )}

        <div className="mt-5 flex items-start gap-1.5 text-[13px] leading-[18px] text-ink-tertiary">
          <Info size={16} strokeWidth={1.75} className="mt-px shrink-0" />
          <span>
            If you can't find them,{' '}
            <button
              onClick={onSafety}
              className="font-medium text-[var(--color-assist)] underline underline-offset-2"
            >
              use Police / safety assistance
            </button>
            .
          </span>
        </div>
      </div>
    </div>
  );
}
