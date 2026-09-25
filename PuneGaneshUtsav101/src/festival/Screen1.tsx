import { Check, Minus, Plus } from 'lucide-react';
import type { GroupType, PlanState } from './types';
import { groupOptions } from './data';
import { PlanningHeader, StickyBar, PrimaryButton } from './ui';

export function Screen1({
  plan,
  setPlan,
  onNext,
  onBack,
}: {
  plan: PlanState;
  setPlan: (p: Partial<PlanState>) => void;
  onNext: () => void;
  onBack?: () => void;
}) {
  const selected = plan.groupType;

  const setCount = (n: number) =>
    setPlan({ groupCount: Math.max(1, Math.min(12, n)) });

  return (
    <div className="flex h-full flex-col">
      <PlanningHeader step={1} onBack={onBack} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-5">
        <p className="mt-3 text-[13px] leading-[18px] text-ink-tertiary">
          Pune Ganeshotsav · Visitor planning
        </p>
        <h1 className="mt-5 text-[32px] font-semibold leading-[38px] tracking-[-0.5px] text-ink">
          Who are you taking along today?
        </h1>
        <p className="mt-4 text-[17px] leading-[26px] text-ink-secondary">
          We&apos;ll shape the route around your group, not just around the
          mandals.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          {groupOptions.map((opt) => {
            const isSel = selected === opt.id;
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                onClick={() => setPlan({ groupType: opt.id as GroupType })}
                className={`flex min-h-20 w-full items-center gap-1 rounded-[14px] bg-surface px-4 text-left transition-colors active:bg-sunken ${
                  isSel
                    ? 'border-2 border-primary bg-[rgba(244,197,66,0.07)]'
                    : 'border border-border'
                }`}
              >
                <span className="grid w-10 shrink-0 place-items-center text-ink">
                  <Icon size={24} strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1 py-4 pl-1">
                  <span
                    className={`block text-[15px] leading-[20px] text-ink ${
                      isSel ? 'font-semibold' : 'font-medium'
                    }`}
                  >
                    {opt.title}
                  </span>
                  <span className="mt-0.5 block text-[15px] leading-[22px] text-ink-secondary">
                    {opt.desc}
                  </span>
                </span>
                <span className="grid w-8 shrink-0 place-items-center">
                  {isSel ? (
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[#1c1c1e]">
                      <Check size={14} strokeWidth={2.5} />
                    </span>
                  ) : (
                    <span className="h-5 w-5 rounded-full border border-border-strong" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {selected ? (
          <div className="animate-disclose mt-8 border-t border-border pt-6">
            <p className="text-[17px] font-medium leading-[26px] text-ink">
              How many are coming along?
            </p>
            <div className="mt-4 flex items-center gap-5">
              <button
                onClick={() => setCount(plan.groupCount - 1)}
                aria-label="Fewer people"
                className="grid h-12 w-12 place-items-center rounded-[10px] border border-border-strong bg-surface text-ink active:bg-sunken disabled:opacity-40"
                disabled={plan.groupCount <= 1}
              >
                <Minus size={24} strokeWidth={1.75} />
              </button>
              <span className="min-w-10 text-center text-[20px] font-semibold leading-[26px] text-ink tnum">
                {plan.groupCount}
              </span>
              <button
                onClick={() => setCount(plan.groupCount + 1)}
                aria-label="More people"
                className="grid h-12 w-12 place-items-center rounded-[10px] border border-border-strong bg-surface text-ink active:bg-sunken disabled:opacity-40"
                disabled={plan.groupCount >= 12}
              >
                <Plus size={24} strokeWidth={1.75} />
              </button>
            </div>
            <p className="mt-3 text-[13px] leading-[18px] text-ink-tertiary tnum">
              Planning for {plan.groupCount}{' '}
              {plan.groupCount === 1 ? 'person' : 'people'}.
            </p>
          </div>
        ) : null}

        <div className="h-6" />
      </div>

      <StickyBar>
        <PrimaryButton disabled={!selected} onClick={onNext}>
          Continue
        </PrimaryButton>
      </StickyBar>
    </div>
  );
}
