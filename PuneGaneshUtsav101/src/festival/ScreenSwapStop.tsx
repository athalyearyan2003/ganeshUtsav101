import { Footprints, UsersRound, ChevronRight, CircleAlert } from 'lucide-react';
import { PlainHeader, StatusPill, InlineNote } from './ui';
import type { Mandal } from './mandals';
import { formatDistance, type SwapCandidate } from './route';

// Below this, the difference reads as noise rather than a real cost —
// call it "about the same" instead of quoting a fake-precise number.
const NEGLIGIBLE_DELTA_M = 150;
// Above this, surface it as an inline warning rather than a quiet meta line —
// mirrors the accessibility constraint note on Screen2 (tell the truth before
// the visitor invests in the swap).
const SIGNIFICANT_DELTA_M = 500;

function walkDeltaLabel(deltaM: number, deltaMin: number): string {
  if (Math.abs(deltaM) < NEGLIGIBLE_DELTA_M) return 'About the same walking distance';
  const amount = formatDistance(Math.abs(deltaM));
  const minutes = Math.abs(deltaMin);
  return deltaM > 0
    ? `About ${amount} (${minutes} min) more walking than your current route`
    : `About ${amount} (${minutes} min) less walking than your current route`;
}

function CandidateCard({
  candidate,
  onSelect,
}: {
  candidate: SwapCandidate;
  onSelect: () => void;
}) {
  const { mandal, reason, deltaWalkM, deltaWalkMin } = candidate;
  const significant = deltaWalkM >= SIGNIFICANT_DELTA_M;
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
      {significant ? (
        <div className="mt-2">
          <InlineNote icon={CircleAlert} tone="moderate">
            {walkDeltaLabel(deltaWalkM, deltaWalkMin)}
          </InlineNote>
        </div>
      ) : (
        <p className="mt-2 text-[13px] leading-[18px] text-ink-tertiary tnum">
          {walkDeltaLabel(deltaWalkM, deltaWalkMin)}
        </p>
      )}
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
  candidates: SwapCandidate[];
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
              <CandidateCard key={c.mandal.id} candidate={c} onSelect={() => onPick(c.mandal)} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
