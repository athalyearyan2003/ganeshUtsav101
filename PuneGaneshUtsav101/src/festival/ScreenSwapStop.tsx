import { Footprints, UsersRound, ChevronRight } from 'lucide-react';
import { PlainHeader, StatusPill } from './ui';
import type { Mandal } from './mandals';

function CandidateCard({
  mandal,
  reason,
  onSelect,
}: {
  mandal: Mandal;
  reason?: string;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="w-full rounded-[14px] border border-border bg-surface p-4 text-left transition-colors active:bg-sunken"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h2 className="text-[20px] font-semibold leading-[26px] text-ink">{mandal.name}</h2>
          <p className="deva mt-0.5 text-[15px] leading-[22px] text-ink-tertiary">{mandal.deva}</p>
          <p className="mt-0.5 text-[13px] leading-[18px] text-ink-tertiary">{mandal.area}</p>
        </div>
        <ChevronRight size={20} strokeWidth={1.75} className="mt-1 shrink-0 text-ink-tertiary" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <StatusPill icon={Footprints} label={mandal.walk.label} tone={mandal.walk.tone} />
        <StatusPill icon={UsersRound} label={mandal.crowd.label} tone={mandal.crowd.tone} />
      </div>
      {reason ? (
        <p className="mt-2 text-[13px] leading-[18px] text-ink-tertiary">{reason}</p>
      ) : null}
    </button>
  );
}

export function ScreenSwapStop({
  currentName,
  candidates,
  onBack,
  onPick,
}: {
  currentName: string;
  candidates: { mandal: Mandal; reason?: string }[];
  onBack: () => void;
  onPick: (mandal: Mandal) => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <PlainHeader title="Choose a different stop" onBack={onBack} />
      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-5">
        <p className="mt-4 text-[15px] leading-[22px] text-ink-secondary">
          Replacing <span className="font-medium text-ink">{currentName}</span>. The rest of
          your route stays the same.
        </p>
        <div className="mt-4 flex flex-col gap-3 pb-8">
          {candidates.length === 0 ? (
            <p className="text-[15px] leading-[22px] text-ink-tertiary">
              No other stops fit your group&apos;s needs right now.
            </p>
          ) : (
            candidates.map((c) => (
              <CandidateCard
                key={c.mandal.id}
                mandal={c.mandal}
                reason={c.reason}
                onSelect={() => onPick(c.mandal)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
