import {
  Footprints,
  UsersRound,
  CloudRain,
  Landmark,
  Volume2,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { PlainHeader } from './ui';

function TipRow({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-border py-4">
      <Icon size={24} strokeWidth={1.75} className="mt-0.5 shrink-0 text-ink-secondary" />
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-medium leading-[20px] text-ink">{title}</p>
        <p className="mt-1 text-[15px] leading-[22px] text-ink-secondary">{body}</p>
      </div>
    </div>
  );
}

export function ScreenTips({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <PlainHeader title="Practical tips" onBack={onBack} />
      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-5">
        <p className="mt-4 text-[15px] leading-[22px] text-ink-secondary">
          A few things that help on a first visit, whether it&apos;s your first
          Ganeshotsav or your tenth.
        </p>

        <div className="mt-4">
          <TipRow
            icon={Landmark}
            title="A mandal is a neighbourhood committee's Ganpati installation"
            body="Each one is set up and run by local volunteers for the festival. Darshan means viewing the idol; a Dekhawa is a themed display some mandals build alongside it."
          />
          <TipRow
            icon={UsersRound}
            title="Crowds build through the evening"
            body="Afternoons are usually calmer. The most visited mandals get very dense after sunset, especially on weekends."
          />
          <TipRow
            icon={Footprints}
            title="Expect to walk more than expected"
            body="Vehicles are restricted near many mandals during the festival, so most of the route is on foot, often on uneven or crowded lanes."
          />
          <TipRow
            icon={CloudRain}
            title="Rain can change plans quickly"
            body="Pune gets sudden showers during the festival. A route may need to adjust — carry something for rain if the sky looks uncertain."
          />
          <TipRow
            icon={Volume2}
            title="It's loud, and that's normal"
            body="Music, drums, and loudspeakers are part of the festival atmosphere near most mandals, not a sign of anything unusual."
          />
          <TipRow
            icon={ShieldCheck}
            title="Police and volunteers manage the crowd"
            body="You'll see visible policing and barricading around busy mandals — they're there to help movement, not restrict visitors."
          />
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
}
