import { useState } from 'react';
import {
  Footprints,
  UsersRound,
  Armchair,
  Accessibility,
  CircleAlert,
  MapPin,
  Toilet,
  Droplets,
  Stethoscope,
  Baby,
  Check,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import {
  PlainHeader,
  StickyBar,
  PrimaryButton,
  SecondaryButton,
  StatusPill,
  InlineNote,
  TertiaryLink,
} from './ui';
import { mandals } from './mandals';
import { storyForStop } from './discovery';

function RouteCard({
  selected,
  onSelect,
  recommended,
  icon: Icon,
  title,
  headline,
  metas,
}: {
  selected: boolean;
  onSelect: () => void;
  recommended?: boolean;
  icon: LucideIcon;
  title: string;
  headline: string;
  metas: { icon: LucideIcon; text: string; warn?: boolean }[];
}) {
  return (
    <button
      onClick={onSelect}
      className={`relative w-full rounded-[14px] p-4 text-left transition-colors ${
        selected
          ? 'border-2 border-primary bg-[rgba(244,197,66,0.07)]'
          : 'border border-border bg-surface'
      }`}
    >
      <span className="absolute right-4 top-4">
        {selected ? (
          <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[#1c1c1e]">
            <Check size={14} strokeWidth={2.5} />
          </span>
        ) : (
          <span className="block h-5 w-5 rounded-full border border-border-strong" />
        )}
      </span>
      <div className="flex items-center gap-2 pr-8">
        <Icon size={24} strokeWidth={1.75} className="text-ink" />
        <span
          className={`text-[15px] text-ink ${selected ? 'font-semibold' : 'font-medium'}`}
        >
          {title}
        </span>
        {recommended ? (
          <span className="rounded-full bg-[var(--color-easy-bg)] px-2.5 py-0.5 text-[13px] font-medium text-[var(--color-assist)]">
            Recommended for your group
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-[17px] leading-[26px] text-ink tnum">{headline}</p>
      <div className="mt-2 flex flex-col gap-1">
        {metas.map((m, i) => {
          const MI = m.icon;
          return (
            <span
              key={i}
              className={`flex items-center gap-1.5 text-[13px] leading-[18px] ${
                m.warn ? 'text-[var(--color-moderate)]' : 'text-ink-secondary'
              }`}
            >
              <MI size={16} strokeWidth={1.75} className="shrink-0" />
              {m.text}
            </span>
          );
        })}
      </div>
    </button>
  );
}

const passList: { icon: LucideIcon; text: string; muted?: boolean }[] = [
  { icon: Armchair, text: 'Rest point — 3 min in, shaded' },
  { icon: Toilet, text: 'Public toilet — 5 min in, Shivaji Road' },
  { icon: Droplets, text: 'Water point — near the gate' },
  { icon: Stethoscope, text: 'First aid post — at the east gate' },
  {
    icon: Baby,
    text: 'Feeding room — not available at this mandal',
    muted: true,
  },
];

export function Screen5({
  stopIndex,
  onBack,
  onStart,
  onDiscoverStop,
}: {
  stopIndex: number;
  onBack: () => void;
  onStart: () => void;
  onDiscoverStop: (id: string) => void;
}) {
  const m = mandals[stopIndex] ?? mandals[0];
  const story = storyForStop(stopIndex);
  const [route, setRoute] = useState<'easier' | 'direct'>('easier');
  const [justChanged, setJustChanged] = useState(false);

  const pick = (r: 'easier' | 'direct') => {
    if (r === route) return;
    setRoute(r);
    setJustChanged(true);
    window.setTimeout(() => setJustChanged(false), 2000);
  };

  const dist = route === 'easier' ? '600 m, approx. 9 min' : '400 m, approx. 6 min';

  return (
    <div className="flex h-full flex-col">
      <PlainHeader title={`Stop ${stopIndex + 1} of ${mandals.length}`} onBack={onBack} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-5">
        {/* Title block */}
        <div className="mt-5">
          <h1 className="text-[26px] font-semibold leading-[32px] tracking-[-0.3px] text-ink">
            {m.name}
          </h1>
          <p className="deva mt-1 text-[15px] leading-[22px] text-ink-tertiary">
            {m.deva}
          </p>
          <p className="mt-1 text-[13px] leading-[18px] text-ink-tertiary">
            {m.area}, Pune
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusPill icon={Footprints} label={m.walk.label} tone={m.walk.tone} />
            <StatusPill icon={UsersRound} label={m.crowd.label} tone={m.crowd.tone} />
          </div>
          <p className="mt-2 text-[13px] leading-[18px] text-ink-tertiary tnum">
            Currently reported as {m.crowd.label.toLowerCase()} · 6 min ago
          </p>
          {story ? (
            <div className="mt-3 border-t border-border pt-1">
              <TertiaryLink icon={BookOpen} onClick={() => onDiscoverStop(story.id)}>
                Discover its story
              </TertiaryLink>
            </div>
          ) : null}
        </div>

        {/* Route choice */}
        <div className="mt-8">
          <h2 className="mb-3 text-[15px] font-medium text-ink-secondary">
            Choose your route
          </h2>
          <div className="flex flex-col gap-3">
            <RouteCard
              selected={route === 'easier'}
              onSelect={() => pick('easier')}
              recommended
              icon={Accessibility}
              title="Easier route"
              headline="600 m · approx. 9 min"
              metas={[
                { icon: Footprints, text: 'No steps' },
                { icon: Armchair, text: '1 rest point on the way' },
                { icon: Footprints, text: 'Wider lanes' },
              ]}
            />
            <RouteCard
              selected={route === 'direct'}
              onSelect={() => pick('direct')}
              icon={Footprints}
              title="Direct route"
              headline="400 m · approx. 6 min"
              metas={[
                { icon: CircleAlert, text: '4 steps near the entrance', warn: true },
                { icon: UsersRound, text: 'Narrow lane, usually dense', warn: true },
              ]}
            />
          </div>
          {justChanged ? (
            <p className="animate-disclose mt-3 text-[15px] leading-[22px] text-ink-secondary tnum">
              Route updated — {dist}.
            </p>
          ) : null}
        </div>

        {/* Entry and exit */}
        <div className="mt-8">
          <div className="flex items-start gap-3 border-b border-border py-4">
            <MapPin size={24} strokeWidth={1.75} className="shrink-0 text-ink" />
            <div>
              <p className="text-[15px] font-medium leading-[20px] text-ink">
                Enter from Ganpati Chowk gate
              </p>
              <p className="mt-0.5 text-[13px] leading-[18px] text-ink-tertiary">
                The queue splits here — the left side moves faster for seated
                darshan.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 py-4">
            <MapPin size={24} strokeWidth={1.75} className="shrink-0 text-ink" />
            <div>
              <p className="text-[15px] font-medium leading-[20px] text-ink">
                Exit onto Laxmi Road
              </p>
              <p className="mt-0.5 text-[13px] leading-[18px] text-ink-tertiary">
                Exit is one-way during peak hours; you cannot re-enter from this
                side.
              </p>
            </div>
          </div>
        </div>

        {/* On this route */}
        <div className="mt-8">
          <h2 className="mb-1 text-[15px] font-medium text-ink-secondary">
            On this route
          </h2>
          <div>
            {passList.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className={`flex min-h-14 items-center gap-3 border-b border-border py-3 text-[15px] leading-[22px] ${
                    p.muted ? 'text-ink-tertiary' : 'text-ink'
                  }`}
                >
                  <Icon size={24} strokeWidth={1.75} className="shrink-0" />
                  <span className="tnum">{p.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Constraint notice */}
        <div className="mt-6">
          <InlineNote icon={CircleAlert} tone="moderate">
            <span className="block font-medium">
              Wheelchair access only from the east gate
            </span>
            <span className="mt-0.5 block">
              It&apos;s about 200 m further, but step-free the whole way.
            </span>
          </InlineNote>
        </div>

        <div className="h-6" />
      </div>

      <StickyBar>
        <div className="flex flex-col gap-3">
          <PrimaryButton onClick={onStart}>Start walking here</PrimaryButton>
          <SecondaryButton outlined>Save this route</SecondaryButton>
        </div>
      </StickyBar>
    </div>
  );
}
