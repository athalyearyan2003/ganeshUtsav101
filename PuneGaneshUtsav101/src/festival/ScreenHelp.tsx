import { ArrowLeft, Siren, ShieldAlert, UsersRound, type LucideIcon } from 'lucide-react';

function HelpRow({
  icon: Icon,
  iconClass,
  borderClass,
  title,
  description,
  onClick,
}: {
  icon: LucideIcon;
  iconClass: string;
  borderClass: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex min-h-[88px] w-full items-center gap-4 rounded-[14px] border-2 bg-canvas px-4 py-4 text-left active:bg-sunken ${borderClass}`}
    >
      <Icon size={24} strokeWidth={1.75} className={`shrink-0 ${iconClass}`} />
      <div className="min-w-0 flex-1">
        <p className="text-[17px] font-semibold leading-[24px] text-ink">{title}</p>
        <p className="mt-0.5 text-[13px] leading-[18px] text-ink-secondary">{description}</p>
      </div>
    </button>
  );
}

export function ScreenHelp({
  onBack,
  onMedical,
  onSafety,
  onFamily,
}: {
  onBack: () => void;
  onMedical: () => void;
  onSafety: () => void;
  onFamily: () => void;
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
          <span className="text-[15px] font-medium text-ink">Get help.</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-6">
        <p className="mb-5 text-[15px] leading-[22px] text-ink-secondary">
          Choose what kind of help you need. Tap once to continue.
        </p>

        <div className="flex flex-col gap-3">
          <HelpRow
            icon={Siren}
            iconClass="text-[var(--color-emergency)]"
            borderClass="border-[var(--color-emergency)]"
            title="Medical emergency"
            description="Someone is injured or needs urgent medical help"
            onClick={onMedical}
          />
          <HelpRow
            icon={ShieldAlert}
            iconClass="text-[var(--color-emergency)]"
            borderClass="border-[var(--color-emergency)]"
            title="Police / safety"
            description="Immediate safety concern or need help from authorities nearby"
            onClick={onSafety}
          />
          <HelpRow
            icon={UsersRound}
            iconClass="text-[var(--color-assist)]"
            borderClass="border-[var(--color-assist)]"
            title="Find my family"
            description="Separated from your group and need to regroup"
            onClick={onFamily}
          />
        </div>
      </div>
    </div>
  );
}
