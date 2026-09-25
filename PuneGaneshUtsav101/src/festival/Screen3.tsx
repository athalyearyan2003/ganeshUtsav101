import { useState } from 'react';
import { Check, Info } from 'lucide-react';
import type { Interest, PlanState, TimeOption } from './types';
import { PlanningHeader, StickyBar, PrimaryButton } from './ui';

const times: { id: TimeOption; label: string; note: string }[] = [
  { id: '1', label: '1 hour', note: 'Usually enough for 2 mandals at a comfortable pace.' },
  { id: '2', label: '2 hours', note: 'Usually enough for 3–4 mandals at a comfortable pace.' },
  { id: '4', label: '4 hours', note: 'Enough for 5 mandals with proper breaks.' },
];

const interests: Interest[] = [
  'Darshan',
  'History',
  'Dekhava',
  'Architecture',
  'Photography',
];

export function Screen3({
  plan,
  setPlan,
  onNext,
  onBack,
}: {
  plan: PlanState;
  setPlan: (p: Partial<PlanState>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [showDekhava, setShowDekhava] = useState(false);
  const timeNote = times.find((t) => t.id === plan.time)?.note;
  const atLimit = plan.interests.length >= 3;

  const toggleInterest = (i: Interest) => {
    const has = plan.interests.includes(i);
    if (!has && atLimit) return;
    setPlan({
      interests: has
        ? plan.interests.filter((x) => x !== i)
        : [...plan.interests, i],
    });
  };

  return (
    <div className="flex h-full flex-col">
      <PlanningHeader step={3} onBack={onBack} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-5">
        <h1 className="mt-5 text-[26px] font-semibold leading-[32px] tracking-[-0.3px] text-ink">
          How much time do you have?
        </h1>
        <p className="mt-4 text-[17px] leading-[26px] text-ink-secondary">
          Including walking and waiting in queues.
        </p>

        <div className="mt-8 flex h-14 gap-[2px] rounded-[10px] border border-border bg-surface p-[2px]">
          {times.map((t) => {
            const sel = plan.time === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setPlan({ time: t.id })}
                className={`flex-1 rounded-[8px] text-[15px] transition-colors ${
                  sel
                    ? 'bg-primary font-semibold text-[#1c1c1e]'
                    : 'font-medium text-ink-secondary active:bg-sunken'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        {timeNote ? (
          <p className="animate-disclose mt-3 text-[13px] leading-[18px] text-ink-tertiary">
            {timeNote}
          </p>
        ) : null}

        {plan.time ? (
          <div className="animate-disclose mt-8 border-t border-border pt-6">
            <h2 className="text-[20px] font-semibold leading-[26px] text-ink">
              What does your group want to see?
            </h2>
            <p className="mt-1 text-[15px] leading-[22px] text-ink-secondary">
              Choose up to three.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {interests.map((i) => {
                const sel = plan.interests.includes(i);
                const disabled = !sel && atLimit;
                return (
                  <button
                    key={i}
                    onClick={() => toggleInterest(i)}
                    aria-pressed={sel}
                    className={`flex h-11 items-center gap-1.5 rounded-full px-4 text-[15px] font-medium transition-colors ${
                      sel
                        ? 'border-[1.5px] border-primary bg-[rgba(244,197,66,0.12)] text-ink'
                        : disabled
                          ? 'border border-transparent text-ink-tertiary opacity-40'
                          : 'border border-border bg-surface text-ink-secondary active:bg-sunken'
                    }`}
                  >
                    {sel ? <Check size={16} strokeWidth={2.5} /> : null}
                    {i}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowDekhava((v) => !v)}
              className="mt-3 flex items-center gap-1.5 text-[13px] font-medium text-ink-secondary"
            >
              <Info size={16} strokeWidth={1.75} />
              What is Dekhava?
            </button>
            {showDekhava ? (
              <p className="animate-disclose mt-2 text-[13px] leading-[18px] text-ink-tertiary">
                Dekhava — the decorative themed displays some mandals build each
                year.
              </p>
            ) : null}

            {atLimit ? (
              <p className="mt-3 text-[13px] leading-[18px] text-ink-tertiary">
                Three selected. Remove one to change.
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="h-6" />
      </div>

      <StickyBar
        helper={plan.time ? undefined : 'Choose a time to continue.'}
      >
        <PrimaryButton disabled={!plan.time} onClick={onNext}>
          Plan our journey
        </PrimaryButton>
      </StickyBar>
    </div>
  );
}
