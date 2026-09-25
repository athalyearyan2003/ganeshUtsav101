import { useState } from 'react';
import { initialPlan, type PlanState, type JourneyStatus } from './festival/types';
import { Screen1 } from './festival/Screen1';
import { Screen2 } from './festival/Screen2';
import { Screen3 } from './festival/Screen3';
import { Transition } from './festival/Transition';
import { Screen4 } from './festival/Screen4';
import { Screen5 } from './festival/Screen5';
import { Screen6 } from './festival/Screen6';
import { ScreenHome } from './festival/ScreenHome';
import { ScreenJourneySuggestions } from './festival/ScreenJourneySuggestions';
import { ScreenHelp } from './festival/ScreenHelp';
import { ScreenMedical } from './festival/ScreenMedical';
import { ScreenSafety } from './festival/ScreenSafety';
import { ScreenFindFamily } from './festival/ScreenFindFamily';
import { ScreenDiscover } from './festival/ScreenDiscover';
import { ScreenStory } from './festival/ScreenStory';
import { storyById, storyForStop } from './festival/discovery';
import { mandals } from './festival/mandals';
import { GetHelpButton, TabBar, type TabId } from './festival/ui';

const stopEtas = [7, 6, 9, 4];

// Where a discovery screen returns to on "Continue to your journey".
// 'home' / 'discover-root' are root tabs; 's4' / 's5' are pushed origins.
type JourneyOrigin =
  | { name: 's4' }
  | { name: 's5'; stop: number }
  | { name: 'home' }
  | { name: 'discover-root' };

type Route =
  | { name: 'home' }
  | { name: 's1' }
  | { name: 's2' }
  | { name: 's3' }
  | { name: 'transition' }
  | { name: 'journey-empty' }
  | { name: 's4' }
  | { name: 's5'; stop: number }
  | { name: 's6' }
  | { name: 'help' }
  | { name: 'medical' }
  | { name: 'safety' }
  | { name: 'find-family' }
  // discover as a root tab has no `back`; pushed from a journey screen it does
  | { name: 'discover'; back?: JourneyOrigin }
  | { name: 'story'; id: string; back: JourneyOrigin; fromList: boolean };

export default function App() {
  const [plan, setPlanState] = useState<PlanState>(initialPlan);
  const [status, setStatus] = useState<JourneyStatus>('none');
  const [currentStop, setCurrentStop] = useState(0);
  const [route, setRoute] = useState<Route>({ name: 'home' });
  // Where the Help flow returns to when exited (it's reachable from every root).
  const [helpOrigin, setHelpOrigin] = useState<Route>({ name: 'home' });

  const setPlan = (p: Partial<PlanState>) =>
    setPlanState((prev) => ({ ...prev, ...p }));

  const originToRoute = (o: JourneyOrigin): Route => {
    if (o.name === 's5') return { name: 's5', stop: o.stop };
    if (o.name === 'discover-root') return { name: 'discover' };
    if (o.name === 'home') return { name: 'home' };
    return { name: 's4' };
  };
  // The discover-list route a story returns to when opened from a list.
  const discoverListRoute = (o: JourneyOrigin): Route =>
    o.name === 'discover-root' ? { name: 'discover' } : { name: 'discover', back: o };

  const openHelp = (from: Route) => {
    setHelpOrigin(from);
    setRoute({ name: 'help' });
  };

  // ---- Tab bar wiring (only shown on the three root screens) ----
  const isRoot =
    route.name === 'home' ||
    (route.name === 'discover' && !route.back) ||
    route.name === 'journey-empty' ||
    route.name === 's4';
  const activeTab: TabId =
    route.name === 'home'
      ? 'home'
      : route.name === 's4' || route.name === 'journey-empty'
        ? 'journey'
        : 'discover';
  const onTab = (t: TabId) => {
    if (t === 'home') setRoute({ name: 'home' });
    else if (t === 'discover') setRoute({ name: 'discover' });
    // No route yet → suggested journeys instead of a dead end.
    else setRoute(status === 'none' ? { name: 'journey-empty' } : { name: 's4' });
  };

  let screen;
  switch (route.name) {
    case 'home':
      screen = (
        <ScreenHome
          status={status}
          stop={currentStop}
          total={mandals.length}
          nextName={mandals[Math.min(currentStop, mandals.length - 1)].name}
          eta={stopEtas[currentStop] ?? 6}
          onHelp={() => openHelp({ name: 'home' })}
          onPlan={() => {
            setPlanState(initialPlan);
            setStatus('none');
            setRoute({ name: 's1' });
          }}
          onOpenRoute={() => setRoute({ name: 's4' })}
          onContinueLive={() => setRoute({ name: 's6' })}
          onDiscover={() => setRoute({ name: 'discover' })}
          onNextStory={() => {
            const story = storyForStop(currentStop);
            if (story)
              setRoute({
                name: 'story',
                id: story.id,
                back: { name: 'home' },
                fromList: false,
              });
            else setRoute({ name: 'discover' });
          }}
        />
      );
      break;
    case 's1':
      screen = (
        <Screen1
          plan={plan}
          setPlan={setPlan}
          onBack={() => setRoute({ name: 'home' })}
          onNext={() => setRoute({ name: 's2' })}
        />
      );
      break;
    case 's2':
      screen = (
        <Screen2
          plan={plan}
          setPlan={setPlan}
          onBack={() => setRoute({ name: 's1' })}
          onNext={() => setRoute({ name: 's3' })}
        />
      );
      break;
    case 's3':
      screen = (
        <Screen3
          plan={plan}
          setPlan={setPlan}
          onBack={() => setRoute({ name: 's2' })}
          onNext={() => setRoute({ name: 'transition' })}
        />
      );
      break;
    case 'transition':
      screen = (
        <Transition
          plan={plan}
          onDone={() => {
            setStatus('planned');
            setRoute({ name: 's4' });
          }}
        />
      );
      break;
    case 'journey-empty':
      screen = (
        <ScreenJourneySuggestions
          onHelp={() => openHelp({ name: 'journey-empty' })}
          onPlan={() => {
            setPlanState(initialPlan);
            setStatus('none');
            setRoute({ name: 's1' });
          }}
          onSelect={(seed) => {
            setPlanState({ ...initialPlan, ...seed });
            setRoute({ name: 'transition' });
          }}
        />
      );
      break;
    case 's4':
      screen = (
        <Screen4
          plan={plan}
          headerRight={<GetHelpButton onClick={() => openHelp({ name: 's4' })} />}
          onOpenStop={(i) => setRoute({ name: 's5', stop: i })}
          onStart={() => {
            setStatus('active');
            setCurrentStop(0);
            setRoute({ name: 's6' });
          }}
          onAdjust={() => setRoute({ name: 's2' })}
          onDiscoverAll={() => setRoute({ name: 'discover', back: { name: 's4' } })}
          onDiscoverStop={(id) =>
            setRoute({ name: 'story', id, back: { name: 's4' }, fromList: false })
          }
        />
      );
      break;
    case 's5':
      screen = (
        <Screen5
          stopIndex={route.stop}
          onBack={() => setRoute({ name: 's4' })}
          onStart={() => {
            setStatus('active');
            setCurrentStop(0);
            setRoute({ name: 's6' });
          }}
          onDiscoverStop={(id) =>
            setRoute({
              name: 'story',
              id,
              back: { name: 's5', stop: route.stop },
              fromList: false,
            })
          }
        />
      );
      break;
    case 's6':
      screen = (
        <Screen6
          stop={currentStop}
          onBack={() => setRoute({ name: 's4' })}
          onHelp={() => openHelp({ name: 's6' })}
          onArrived={() => {
            if (currentStop < mandals.length - 1) {
              setCurrentStop((s) => s + 1);
            } else {
              setStatus('completed');
              setCurrentStop(0);
              setRoute({ name: 'home' });
            }
          }}
        />
      );
      break;
    case 'help':
      screen = (
        <ScreenHelp
          onBack={() => setRoute(helpOrigin)}
          onMedical={() => setRoute({ name: 'medical' })}
          onSafety={() => setRoute({ name: 'safety' })}
          onFamily={() => setRoute({ name: 'find-family' })}
        />
      );
      break;
    case 'medical':
      screen = <ScreenMedical onBack={() => setRoute({ name: 'help' })} />;
      break;
    case 'safety':
      screen = <ScreenSafety onBack={() => setRoute({ name: 'help' })} />;
      break;
    case 'find-family':
      screen = (
        <ScreenFindFamily
          onBack={() => setRoute({ name: 'help' })}
          onSafety={() => setRoute({ name: 'safety' })}
        />
      );
      break;
    case 'discover': {
      const back = route.back;
      screen = (
        <ScreenDiscover
          // Root tab (no back) vs pushed detail (has back)
          onBack={back ? () => setRoute(originToRoute(back)) : undefined}
          onHelp={back ? undefined : () => openHelp({ name: 'discover' })}
          curated={!back && status === 'none'}
          onOpenStory={(id) =>
            setRoute({
              name: 'story',
              id,
              back: back ?? { name: 'discover-root' },
              fromList: true,
            })
          }
        />
      );
      break;
    }
    case 'story': {
      const story = storyById(route.id);
      const back = route.back;
      const fromList = route.fromList;
      if (!story) {
        screen = null;
        break;
      }
      screen = (
        <ScreenStory
          story={story}
          fromList={fromList}
          onBack={() =>
            fromList ? setRoute(discoverListRoute(back)) : setRoute(originToRoute(back))
          }
          onContinue={() => setRoute(originToRoute(back))}
          onBackToDiscover={() => setRoute(discoverListRoute(back))}
        />
      );
      break;
    }
  }

  return (
    <div className="flex min-h-screen w-full justify-center bg-[#e8e6e0] sm:items-center sm:py-8">
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-canvas sm:h-[844px] sm:max-w-[390px] sm:rounded-[28px] sm:border sm:border-border-strong sm:shadow-[0_20px_60px_rgba(28,26,23,0.18)]">
        {/* Status-bar / Dynamic Island clearance — always reserves the top safe zone */}
        <div
          className="shrink-0 bg-canvas"
          style={{ height: 'max(env(safe-area-inset-top), 60px)' }}
          aria-hidden
        />
        <div className="min-h-0 flex-1">{screen}</div>
        {isRoot ? <TabBar active={activeTab} onSelect={onTab} /> : null}
      </div>
    </div>
  );
}
