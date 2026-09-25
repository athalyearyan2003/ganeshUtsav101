import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import type { PlanState } from './types';

export function Transition({
  plan,
  onDone,
}: {
  plan: PlanState;
  onDone: () => void;
}) {
  const lines = buildLines(plan);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const timers: number[] = [];
    lines.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShown(i + 1), 500 + i * 600));
    });
    timers.push(window.setTimeout(onDone, 2400));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-canvas px-5">
      <h2 className="mb-8 text-[20px] font-semibold leading-[26px] text-ink">
        Planning around your group
      </h2>
      <div className="flex flex-col gap-4">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 text-[17px] leading-[26px] transition-opacity duration-300 ${
              i < shown ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                i < shown
                  ? 'bg-[var(--color-easy-bg)] text-[var(--color-easy)]'
                  : 'bg-transparent'
              }`}
            >
              {i < shown ? <Check size={16} strokeWidth={2.5} /> : null}
            </span>
            <span className="text-ink tnum">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function buildLines(plan: PlanState): string[] {
  const lines: string[] = [];
  const hrs = plan.time === '1' ? '1 hour' : plan.time === '4' ? '4 hours' : '2 hours';
  lines.push(`${plan.groupCount} people, ${hrs}`);

  const comfort: string[] = [];
  if (plan.needs.includes('shorterWalk')) comfort.push('shorter walking');
  if (plan.needs.includes('rest')) comfort.push('rest every 20 minutes');
  if (plan.needs.includes('accessibility')) comfort.push('step-free lanes');
  if (comfort.length) {
    lines.push(capitalize(comfort.join(', ')));
  }

  if (plan.needs.includes('avoidCrowd')) {
    lines.push('Avoiding the busiest lanes right now');
  } else {
    lines.push('Ordering stops for a comfortable pace');
  }
  return lines;
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
