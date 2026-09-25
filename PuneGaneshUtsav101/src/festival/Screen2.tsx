import { useMemo } from 'react';
import { Check, CircleAlert } from 'lucide-react';
import type { NeedId, PlanState, StartPointId } from './types';
import { needCatalog, groupBOrder, suggestedNeeds } from './data';
import { startPoints } from './startPoints';
import {
  PlanningHeader,
  StickyBar,
  PrimaryButton,
  InlineNote,
} from './ui';

const startPointOrder: StartPointId[] = ['swargate', 'shaniwarwada', 'budhwar-peth', 'kasba'];

function NeedRow({
  id,
  selected,
  reason,
  onToggle,
}: {
  id: NeedId;
  selected: boolean;
  reason?: string;
  onToggle: () => void;
}) {
  const item = needCatalog[id];
  const Icon = item.icon;
  const meta = reason ?? (selected ? item.meta : undefined);
  return (
    <button
      onClick={onToggle}
      className={`flex w-full items-center gap-3 border-b border-border px-1 text-left transition-colors ${
        meta ? 'min-h-[72px]' : 'min-h-16'
      } ${selected ? 'bg-[rgba(244,197,66,0.07)]' : ''}`}
    >
      <span className="grid w-6 shrink-0 place-items-center text-ink">
        <Icon size={24} strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1 py-3">
        <span
          className={`block text-[15px] leading-[20px] text-ink ${
            selected ? 'font-semibold' : 'font-medium'
          }`}
        >
          {item.title}
        </span>
        {meta ? (
          <span className="mt-0.5 block text-[13px] leading-[18px] text-ink-tertiary">
            {meta}
          </span>
        ) : null}
      </span>
      <span className="grid w-6 shrink-0 place-items-center">
        {selected ? (
          <span className="grid h-6 w-6 place-items-center rounded-[6px] bg-primary text-[#1c1c1e]">
            <Check size={16} strokeWidth={2.5} />
          </span>
        ) : (
          <span className="h-6 w-6 rounded-[6px] border-[1.5px] border-border-strong" />
        )}
      </span>
    </button>
  );
}

export function Screen2({
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
  const suggestions = useMemo(
    () => suggestedNeeds(plan.groupType),
    [plan.groupType],
  );
  const suggestedIds = suggestions.map((s) => s.id);
  const groupB = groupBOrder.filter((id) => !suggestedIds.includes(id));

  const toggle = (id: NeedId) => {
    const has = plan.needs.includes(id);
    setPlan({
      needs: has ? plan.needs.filter((n) => n !== id) : [...plan.needs, id],
    });
  };

  const count = plan.needs.length;

  return (
    <div className="flex h-full flex-col">
      <PlanningHeader step={2} onBack={onBack} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-5">
        <h1 className="mt-5 text-[26px] font-semibold leading-[32px] tracking-[-0.3px] text-ink">
          What should we keep in mind for your group?
        </h1>
        <p className="mt-4 text-[17px] leading-[26px] text-ink-secondary">
          Pick anything that matters today. You can change this later.
        </p>

        {suggestions.length > 0 ? (
          <div className="mt-8">
            <h2 className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[13px] font-semibold text-[#1c1c1e]" style={{ backgroundColor: 'var(--color-cultural)' }}>
              Suggested for your group
            </h2>
            <p className="mb-4 mt-1 text-[13px] leading-[18px] text-ink-tertiary">
              We&apos;ve suggested a few. Remove anything you don&apos;t need.
            </p>
            <div>
              {suggestions.map((s) => (
                <NeedRow
                  key={s.id}
                  id={s.id}
                  selected={plan.needs.includes(s.id)}
                  reason={plan.needs.includes(s.id) ? s.reason : undefined}
                  onToggle={() => toggle(s.id)}
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-8">
          <h2 className="mb-4 text-[15px] font-medium text-ink-secondary">
            {suggestions.length > 0 ? 'Anything else?' : 'What should we keep in mind?'}
          </h2>
          <div>
            {groupB.map((id) => (
              <NeedRow
                key={id}
                id={id}
                selected={plan.needs.includes(id)}
                onToggle={() => toggle(id)}
              />
            ))}
          </div>
        </div>

        {plan.needs.includes('accessibility') ? (
          <div className="animate-disclose mt-5">
            <InlineNote icon={CircleAlert} tone="moderate">
              Some older lanes near Tulshibaug are narrow and stepped.
              We&apos;ll route around them where possible.
            </InlineNote>
          </div>
        ) : null}

        {plan.needs.includes('parking') ? (
          <div className="animate-disclose mt-6 border-t border-border pt-6">
            <h2 className="text-[15px] font-medium text-ink-secondary">
              Where are you parked?
            </h2>
            <p className="mt-1 text-[13px] leading-[18px] text-ink-tertiary">
              So we can tell you how far it is from your last stop.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {startPointOrder.map((id) => {
                const sp = startPoints[id];
                const sel = plan.startPoint === id;
                return (
                  <button
                    key={id}
                    onClick={() => setPlan({ startPoint: id })}
                    aria-pressed={sel}
                    className={`flex h-11 items-center gap-1.5 rounded-full px-4 text-[15px] font-medium transition-colors ${
                      sel
                        ? 'border-[1.5px] border-primary bg-[rgba(244,197,66,0.12)] text-ink'
                        : 'border border-border bg-surface text-ink-secondary active:bg-sunken'
                    }`}
                  >
                    {sel ? <Check size={16} strokeWidth={2.5} /> : null}
                    {sp.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="h-6" />
      </div>

      <StickyBar
        helper={
          count > 0
            ? `${count} ${count === 1 ? 'thing' : 'things'} selected`
            : 'Nothing selected — we’ll plan a standard route.'
        }
      >
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </StickyBar>
    </div>
  );
}
