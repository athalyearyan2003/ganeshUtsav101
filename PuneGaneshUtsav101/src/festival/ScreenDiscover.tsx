import { BookOpen, Volume2, ChevronRight } from 'lucide-react';
import { PlainHeader, RootHeader } from './ui';
import { discoverList, curatedList, type Story } from './discovery';
import { mandals } from './mandals';

function StoryCard({ story, onOpen }: { story: Story; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="w-full overflow-hidden rounded-[14px] border border-border bg-surface text-left transition-colors active:bg-sunken"
    >
      <div className="aspect-[16/9] w-full bg-sunken">
        <img src={story.image} alt={story.name} className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <h2 className="text-[20px] font-semibold leading-[26px] text-ink">
              {story.name}
            </h2>
            {story.deva ? (
              <p className="deva mt-0.5 text-[15px] leading-[22px] text-ink-tertiary">
                {story.deva}
              </p>
            ) : (
              <p className="mt-0.5 text-[13px] leading-[18px] text-ink-tertiary">
                {story.meta}
              </p>
            )}
          </div>
          <ChevronRight
            size={20}
            strokeWidth={1.75}
            className="mt-1 shrink-0 text-ink-tertiary"
          />
        </div>
        <p className="mt-2 line-clamp-2 text-[15px] leading-[22px] text-ink-secondary">
          {story.hook}
        </p>
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
    </button>
  );
}

function UnavailableCard({ name, deva }: { name: string; deva: string }) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-border bg-surface">
      <div className="grid h-[120px] w-full place-items-center bg-sunken">
        <span className="text-[13px] font-medium uppercase tracking-[0.6px] text-ink-tertiary">
          No story yet
        </span>
      </div>
      <div className="p-4">
        <h2 className="text-[20px] font-semibold leading-[26px] text-ink-tertiary">
          {name}
        </h2>
        {deva ? (
          <p className="deva mt-0.5 text-[15px] leading-[22px] text-ink-tertiary">
            {deva}
          </p>
        ) : null}
        <p className="mt-2 text-[13px] leading-[18px] text-ink-tertiary">
          Story not available yet
        </p>
      </div>
    </div>
  );
}

export function ScreenDiscover({
  onBack,
  onOpenStory,
  onHelp,
  curated = false,
}: {
  onBack?: () => void;
  onOpenStory: (id: string) => void;
  onHelp?: () => void;
  /** true when no journey exists yet — show a small curated set, not the route list */
  curated?: boolean;
}) {
  const items = curated ? curatedList() : discoverList(mandals.length);
  const root = !onBack;
  return (
    <div className="flex h-full flex-col">
      {root ? (
        <RootHeader label="Discover" onHelp={onHelp} />
      ) : (
        <PlainHeader title="Discover" onBack={onBack} />
      )}
      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-5">
        <p className="mt-4 text-[15px] leading-[22px] text-ink-secondary">
          {curated
            ? 'A few Ganpatis and Dekhawas worth knowing about, even before you plan a route.'
            : 'A few stories about the mandals on your route.'}
        </p>
        <div className="mt-4 flex flex-col gap-3 pb-8">
          {items.map((it, i) =>
            it.type === 'story' ? (
              <StoryCard
                key={it.story.id}
                story={it.story}
                onOpen={() => onOpenStory(it.story.id)}
              />
            ) : (
              <UnavailableCard key={`u-${i}`} name={it.name} deva={it.deva} />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
