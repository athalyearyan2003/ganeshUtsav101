import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Volume2,
  Pause,
  Eye,
  UserRound,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';
import type { Story } from './discovery';
import { StickyBar, PrimaryButton, Footnote } from './ui';

function SampleLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-1.5 text-[13px] leading-[18px] text-ink-tertiary">
      <Info size={16} strokeWidth={1.75} className="mt-px shrink-0" />
      <span>{children}</span>
    </p>
  );
}

function ListenButton({ minutes }: { minutes: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <button
      onClick={() => setPlaying((v) => !v)}
      className="flex h-14 w-full items-center justify-center gap-2 rounded-[10px] border border-border-strong px-4 text-[15px] font-medium text-ink active:bg-sunken"
    >
      {playing ? (
        <>
          <Pause size={20} strokeWidth={1.75} />
          Playing · 0:42 of {minutes.replace(' min listen', ':00').replace(' min', ':00')}
        </>
      ) : (
        <>
          <Volume2 size={20} strokeWidth={1.75} />
          Listen · {minutes.replace(' listen', '')}
        </>
      )}
    </button>
  );
}

function SectionHeader({
  icon: Icon,
  children,
}: {
  icon: typeof Eye;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2 text-[15px] font-semibold uppercase tracking-[0.6px] text-ink">
      <Icon size={20} strokeWidth={1.75} className="text-ink" />
      {children}
    </h2>
  );
}

function DetailRow({
  icon: Icon,
  label,
  meta,
}: {
  icon: typeof Eye;
  label: string;
  meta: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <Icon size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-ink" />
      <div className="min-w-0">
        <p className="text-[15px] font-medium leading-[20px] text-ink">{label}</p>
        <p className="mt-0.5 text-[13px] leading-[18px] text-ink-secondary">{meta}</p>
      </div>
    </div>
  );
}

export function ScreenStory({
  story,
  fromList,
  onBack,
  onContinue,
  onBackToDiscover,
}: {
  story: Story;
  fromList: boolean;
  onBack: () => void;
  onContinue: () => void;
  onBackToDiscover: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isDekhawa = story.kind === 'dekhawa';

  return (
    <div className="flex min-h-full flex-col">
      {/* Header — ArrowLeft only, no title */}
      <header className="sticky top-0 z-20 border-b border-border bg-canvas px-5">
        <div className="flex h-14 items-center">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="grid h-11 w-11 -ml-2.5 place-items-center rounded-[12px] text-ink active:bg-sunken"
          >
            <ArrowLeft size={24} strokeWidth={1.75} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Full-bleed subject image — the one large-image exception */}
        <div className="h-[320px] w-full bg-sunken">
          <img
            src={story.image}
            alt={story.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="px-5 pb-6">
          {/* Title block */}
          <div className="mt-5">
            <h1 className="text-[26px] font-semibold leading-[32px] tracking-[-0.3px] text-ink">
              {story.name}
            </h1>
            {story.deva ? (
              <p className="deva mt-1 text-[15px] leading-[22px] text-ink-tertiary">
                {story.deva}
              </p>
            ) : null}
            <p className="mt-1 text-[13px] leading-[18px] text-ink-tertiary">
              {story.meta}
            </p>

            {/* Dekhawa: inline sample-content label attached to the title section */}
            {isDekhawa && story.unverified ? (
              <div className="mt-2">
                <SampleLabel>Sample content — illustrative</SampleLabel>
              </div>
            ) : null}

            {/* Meta row */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] leading-[18px] text-ink-secondary tnum">
              <span className="inline-flex items-center gap-1.5">
                <BookOpen size={16} strokeWidth={1.75} /> {story.readMin}
              </span>
              {story.listenMin ? (
                <span className="inline-flex items-center gap-1.5">
                  <Volume2 size={16} strokeWidth={1.75} /> {story.listenMin}
                </span>
              ) : null}
            </div>
          </div>

          {/* Intro / story being told */}
          <div className="mt-6">
            {isDekhawa ? (
              <h2 className="mb-2 text-[15px] font-semibold uppercase tracking-[0.6px] text-ink">
                The story being told
              </h2>
            ) : null}
            <p className="text-[17px] leading-[27px] text-ink">{story.intro}</p>
          </div>

          {/* Who's in it — dekhawa only */}
          {isDekhawa && story.who ? (
            <div className="mt-8">
              <SectionHeader icon={UserRound}>Who’s in it</SectionHeader>
              <div className="mt-1 divide-y divide-border">
                {story.who.map((w, i) => (
                  <DetailRow key={i} icon={UserRound} label={w.name} meta={w.meta} />
                ))}
              </div>
              {story.unverified ? (
                <div className="mt-2">
                  <SampleLabel>
                    Characters shown are illustrative and may differ from the actual
                    installation.
                  </SampleLabel>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Look for this */}
          <div className="mt-8">
            <SectionHeader icon={Eye}>Look for this</SectionHeader>
            <div className="mt-1 divide-y divide-border">
              {story.lookFor.map((l, i) => (
                <DetailRow key={i} icon={l.icon} label={l.label} meta={l.meta} />
              ))}
            </div>
          </div>

          {/* Explore the story — disclosure, ganpati only */}
          {!isDekhawa && story.explore ? (
            <div className="mt-6">
              <button
                onClick={() => setExpanded((v) => !v)}
                className="flex h-12 w-full items-center justify-between border-t border-border pt-3 text-[15px] font-medium text-ink"
              >
                Explore the story
                {expanded ? (
                  <ChevronUp size={20} strokeWidth={1.75} className="text-ink-tertiary" />
                ) : (
                  <ChevronDown
                    size={20}
                    strokeWidth={1.75}
                    className="text-ink-tertiary"
                  />
                )}
              </button>
              {expanded ? (
                <p className="animate-disclose text-[15px] leading-[24px] text-ink-secondary">
                  {story.explore}
                </p>
              ) : null}
            </div>
          ) : null}

          {/* Optional listen */}
          {story.listenMin ? (
            <div className="mt-6">
              <ListenButton minutes={story.listenMin} />
            </div>
          ) : null}

          {/* Footnote — the one place each discovery screen states this */}
          <div className="mt-6">
            <Footnote>
              {isDekhawa
                ? "This Dekhawa's details are illustrative sample content and don't describe a specific real installation."
                : 'Story details are illustrative sample content for this prototype.'}
            </Footnote>
          </div>
        </div>
      </div>

      <StickyBar>
        <div className="flex flex-col gap-3">
          {fromList ? (
            <button
              onClick={onBackToDiscover}
              className="self-center text-[15px] font-medium text-ink-secondary active:text-ink"
            >
              Back to Discover
            </button>
          ) : null}
          <PrimaryButton onClick={onContinue}>Continue to your journey</PrimaryButton>
        </div>
      </StickyBar>
    </div>
  );
}
