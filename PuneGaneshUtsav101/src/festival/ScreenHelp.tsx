import { useState } from 'react';
import { ArrowLeft, Siren, ShieldAlert, UsersRound, Phone, Pencil, type LucideIcon } from 'lucide-react';

const STORAGE_KEY = 'ganeshotsav_family_number';

function readSavedNumber(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

function writeSavedNumber(value: string): void {
  try {
    if (value) window.localStorage.setItem(STORAGE_KEY, value);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage can be unavailable (private browsing, blocked cookies); the
    // number just won't persist across visits — not worth surfacing an error.
  }
}

function FamilyCallCard() {
  const [number, setNumber] = useState(readSavedNumber);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  const save = () => {
    const trimmed = draft.trim();
    setNumber(trimmed);
    writeSavedNumber(trimmed);
    setEditing(false);
  };

  if (editing || !number) {
    return (
      <div className="rounded-[14px] border-2 border-[var(--color-assist)] bg-canvas p-4">
        <p className="text-[15px] font-semibold leading-[20px] text-ink">
          Save a family member&apos;s number
        </p>
        <p className="mt-1 text-[13px] leading-[18px] text-ink-secondary">
          So you can call them in one tap if you get separated.
        </p>
        <div className="mt-3 flex gap-2">
          <input
            type="tel"
            inputMode="tel"
            defaultValue={number}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="+91 98765 43210"
            className="h-11 min-w-0 flex-1 rounded-[10px] border border-border-strong bg-surface px-3 text-[15px] text-ink placeholder:text-ink-tertiary"
          />
          <button
            onClick={save}
            className="flex h-11 shrink-0 items-center justify-center rounded-[10px] bg-primary px-4 text-[15px] font-medium text-[#1c1c1e] active:bg-[var(--color-primary-press)]"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[88px] w-full items-center gap-4 rounded-[14px] border-2 border-[var(--color-assist)] bg-canvas px-4 py-4">
      <Phone size={24} strokeWidth={1.75} className="shrink-0 text-[var(--color-assist)]" />
      <div className="min-w-0 flex-1">
        <p className="text-[17px] font-semibold leading-[24px] text-ink">Call family</p>
        <p className="mt-0.5 truncate text-[13px] leading-[18px] text-ink-secondary tnum">
          {number}
        </p>
      </div>
      <a
        href={`tel:${number}`}
        className="flex h-11 shrink-0 items-center justify-center rounded-[10px] bg-[var(--color-assist)] px-4 text-[15px] font-medium text-white active:opacity-90"
      >
        Call
      </a>
      <button
        onClick={() => {
          setDraft(number);
          setEditing(true);
        }}
        aria-label="Edit saved number"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] text-ink-tertiary active:bg-sunken"
      >
        <Pencil size={18} strokeWidth={1.75} />
      </button>
    </div>
  );
}

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
        <p className="mb-4 text-[15px] leading-[22px] text-ink-secondary">
          Choose what kind of help you need. Tap once to continue.
        </p>

        <FamilyCallCard />

        <p className="mb-3 mt-6 text-[13px] font-medium uppercase tracking-[0.8px] text-ink-secondary">
          Or get help nearby
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
