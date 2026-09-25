import type { ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Info,
  LifeBuoy,
  House,
  Compass,
  Route as RouteIcon,
  type LucideIcon,
} from 'lucide-react';

/* ---- Double rule: the single festival-signage structural motif ---- */
export function DoubleRule() {
  return (
    <div aria-hidden className="w-full">
      <div className="h-px w-full bg-[var(--color-border)]" />
      <div className="h-[3px]" />
      <div className="h-px w-full bg-[var(--color-border)]" />
    </div>
  );
}

/* ---- Planning header with step progress ---- */
export function PlanningHeader({
  step,
  onBack,
}: {
  step: number;
  onBack?: () => void;
}) {
  const total = 4;
  return (
    <header className="sticky top-0 z-20 bg-canvas">
      <div className="relative flex h-14 items-center px-5">
        {onBack ? (
          <button
            onClick={onBack}
            aria-label="Go back"
            className="grid h-11 w-11 -ml-2.5 place-items-center rounded-[12px] text-ink active:bg-sunken"
          >
            <ArrowLeft size={24} strokeWidth={1.75} />
          </button>
        ) : (
          <span className="h-11 w-11 -ml-2.5" />
        )}
        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[13px] font-medium uppercase tracking-[0.8px] text-ink-secondary tnum">
          Step {step} of {total}
        </span>
      </div>
      {/* progress bar — capsule segments */}
      <div className="flex h-[3px] w-full gap-[2px] px-0">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-full flex-1 rounded-full ${
              i < step ? 'bg-primary' : 'bg-[var(--color-border)]'
            }`}
          />
        ))}
      </div>
    </header>
  );
}

/* ---- Plain header for post-planning screens ---- */
export function PlainHeader({
  title,
  onBack,
  right,
}: {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-canvas px-5">
      <div className="flex h-14 items-center">
        {onBack ? (
          <button
            onClick={onBack}
            aria-label="Go back"
            className="grid h-11 w-11 -ml-2.5 place-items-center rounded-[12px] text-ink active:bg-sunken"
          >
            <ArrowLeft size={24} strokeWidth={1.75} />
          </button>
        ) : (
          <span className="h-11 w-11 -ml-2.5" />
        )}
        <span className="text-[15px] font-medium text-ink">{title}</span>
        <div className="ml-auto">{right}</div>
      </div>
    </header>
  );
}

/* ---- Sticky bottom bar ---- */
export function StickyBar({
  helper,
  children,
}: {
  helper?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="shrink-0 border-t border-border bg-canvas">
      <div className="px-5 pt-4" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 1.5rem)' }}>
        {helper ? (
          <p className="mb-2 text-[13px] leading-[18px] text-ink-tertiary tnum">
            {helper}
          </p>
        ) : null}
        {children}
      </div>
    </div>
  );
}

/* ---- Primary button — M/12px ---- */
export function PrimaryButton({
  children,
  onClick,
  disabled,
  trailing = true,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  trailing?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex h-14 w-full items-center justify-center gap-2 rounded-[12px] text-[15px] font-medium transition-colors ${
        disabled
          ? 'cursor-not-allowed bg-[var(--color-border)] text-ink-tertiary'
          : 'bg-primary text-[#1c1c1e] active:bg-[var(--color-primary-press)]'
      }`}
    >
      <span>{children}</span>
      {trailing && !disabled ? (
        <ArrowRight size={20} strokeWidth={1.75} />
      ) : null}
    </button>
  );
}

/* ---- Secondary text/outline button — S/10px ---- */
export function SecondaryButton({
  children,
  onClick,
  outlined,
}: {
  children: ReactNode;
  onClick?: () => void;
  outlined?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex h-14 items-center justify-center rounded-[10px] px-4 text-[15px] font-medium text-ink active:bg-sunken ${
        outlined ? 'border border-border-strong' : ''
      }`}
    >
      {children}
    </button>
  );
}

/* ---- Status pill — Capsule ---- */
type StatusTone = 'easy' | 'moderate' | 'high';
const statusStyles: Record<StatusTone, string> = {
  easy: 'bg-[var(--color-easy-bg)] text-[var(--color-easy)]',
  moderate: 'bg-[var(--color-moderate-bg)] text-[var(--color-moderate)]',
  high: 'bg-[var(--color-high-bg)] text-[var(--color-high)]',
};

export function StatusPill({
  icon: Icon,
  label,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  tone: StatusTone;
}) {
  return (
    <span
      className={`inline-flex min-h-8 items-center gap-1.5 rounded-full px-2.5 py-1 text-[15px] font-medium ${statusStyles[tone]}`}
    >
      <Icon size={20} strokeWidth={1.75} />
      {label}
    </span>
  );
}

/* ---- Inline info / constraint note — S/10px ---- */
export function InlineNote({
  icon: Icon,
  tone = 'moderate',
  children,
}: {
  icon: LucideIcon;
  tone?: StatusTone | 'assist';
  children: ReactNode;
}) {
  const toneMap: Record<string, string> = {
    ...statusStyles,
    assist: 'bg-[var(--color-easy-bg)] text-[var(--color-assist)]',
  };
  return (
    <div
      className={`flex items-start gap-2 rounded-[10px] p-3 text-[15px] leading-[22px] ${toneMap[tone]}`}
    >
      <Icon size={20} strokeWidth={1.75} className="mt-px shrink-0" />
      <span>{children}</span>
    </div>
  );
}

/* ---- Tertiary link row — lowest-emphasis interactive element ----
   No fill, no border, no card. Never competes with Primary/Secondary buttons. */
export function TertiaryLink({
  icon: Icon,
  children,
  onClick,
}: {
  icon: LucideIcon;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex min-h-11 w-full items-center gap-2 rounded-[6px] px-1 -mx-1 text-left text-ink-secondary transition-colors active:bg-[rgba(28,28,30,0.04)] active:text-ink"
    >
      <Icon size={16} strokeWidth={1.75} className="shrink-0" />
      <span className="min-w-0 flex-1 text-[15px] leading-[22px]">{children}</span>
      <ChevronRight size={16} strokeWidth={1.75} className="shrink-0 text-ink-tertiary" />
    </button>
  );
}

/* ---- Get Help button — shared across the three root tabs and Live Journey ----
   Same emergency-red outlined component used in Screen6's top strip. */
export function GetHelpButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Get help"
      className="flex min-h-11 min-w-[48px] items-center gap-1.5 rounded-[10px] border border-[var(--color-emergency)] px-3 py-2 text-[13px] font-medium text-[var(--color-emergency)] active:bg-[rgba(143,29,29,0.06)]"
    >
      <LifeBuoy size={20} strokeWidth={1.75} />
      Help
    </button>
  );
}

/* ---- Shared root-tab header (Home / Discover / Journey) ----
   56pt, no back arrow, plain "Pune Ganeshotsav," label + Get Help. */
export function RootHeader({
  onHelp,
  label = 'Pune Ganeshotsav,',
}: {
  onHelp?: () => void;
  label?: string;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-canvas px-5">
      <div className="flex h-14 items-center">
        <span className="text-[15px] font-medium text-ink-secondary">{label}</span>
        <div className="ml-auto">
          <GetHelpButton onClick={onHelp} />
        </div>
      </div>
    </header>
  );
}

/* ---- Global bottom tab bar — only on the three root screens ---- */
export type TabId = 'home' | 'discover' | 'journey';

export function TabBar({
  active,
  onSelect,
}: {
  active: TabId;
  onSelect: (t: TabId) => void;
}) {
  const items: { id: TabId; icon: LucideIcon; label: string }[] = [
    { id: 'home', icon: House, label: 'Home' },
    { id: 'discover', icon: Compass, label: 'Discover' },
    { id: 'journey', icon: RouteIcon, label: 'Journey' },
  ];
  return (
    <nav
      className="shrink-0 border-t border-border bg-canvas"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex h-[49px]">
        {items.map(({ id, icon: Icon, label }) => {
          const on = active === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              aria-current={on ? 'page' : undefined}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 ${
                on ? 'text-[var(--color-route)]' : 'text-ink-tertiary'
              }`}
            >
              <Icon size={24} strokeWidth={on ? 2 : 1.75} />
              <span className="text-[11px] font-medium leading-none">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function Footnote({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-1.5 text-[13px] leading-[18px] text-ink-tertiary">
      <Info size={16} strokeWidth={1.75} className="mt-px shrink-0" />
      <span>{children}</span>
    </p>
  );
}
