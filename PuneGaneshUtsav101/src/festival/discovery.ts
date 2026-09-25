import { Eye, Volume2, type LucideIcon } from 'lucide-react';

/* ---- Cultural discovery content ----
   All content here is illustrative sample data for this prototype and does not
   describe specific real installations. See per-screen footnotes. */

export interface LookForItem {
  icon: LucideIcon;
  label: string;
  meta: string;
}

export interface WhoItem {
  name: string;
  meta: string;
}

export interface Story {
  id: string;
  kind: 'ganpati' | 'dekhawa';
  stopIndex: number; // journey stop this belongs to
  name: string;
  deva?: string;
  meta: string; // area / mandal line
  image: string;
  hook: string; // list-card hook, 2 lines max — specific, never generic
  readMin: string;
  listenMin?: string; // omit if no audio
  intro: string; // ~90 words max
  lookFor: LookForItem[];
  explore?: string; // ganpati only, ~180 words max
  // dekhawa only
  who?: WhoItem[];
  unverified?: boolean; // attach inline "sample content" labels
}

const img = (id: string, w = 800, h = 450) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

export const ganpatiStories: Record<number, Story> = {
  0: {
    id: 'dagdusheth',
    kind: 'ganpati',
    stopIndex: 0,
    name: 'Dagdusheth Halwai Ganpati',
    deva: 'श्रीमंत दगडूशेठ हलवाई गणपती',
    meta: 'Budhwar Peth',
    image: img('1609867034380-17f469a2867c'),
    hook: 'Why a sweet-seller’s grief in the 1890s became one of Pune’s most beloved Ganpatis.',
    readMin: '3 min read',
    listenMin: '2 min listen',
    intro:
      'The story usually told here begins with Dagdusheth Halwai, a sweet merchant who is said to have lost his son to a plague and, in his grief, was guided by his teacher to install a Ganpati as a family of the whole city. Over generations the mandal grew into the grand shrine visitors see today — its gold-worked idol dressed anew each festival, its aarti drawing crowds well past midnight.',
    lookFor: [
      {
        icon: Eye,
        label: 'The gold-worked crown',
        meta: 'Re-dressed by the mandal’s artisans for each year’s festival.',
      },
      {
        icon: Eye,
        label: 'The two silver guardians',
        meta: 'Flanking figures said to be added in the temple’s later years.',
      },
      {
        icon: Volume2,
        label: 'The evening aarti',
        meta: 'Usually the loudest, most crowded moment — reported around 8 pm.',
      },
    ],
    explore:
      'Accounts of the mandal describe how a modest household shrine slowly became a civic institution. As Pune’s public Ganeshotsav grew through the early twentieth century, Dagdusheth’s trust took on charitable work — schooling, food, and relief — alongside the festival itself. Today the temple stands year-round rather than only during the ten days, and its craftsmen are known for the idol’s changing ornamentation. What began as one family’s remembrance is now, in the retelling, a story the whole neighbourhood shares.',
  },
  1: {
    id: 'tulshibaug',
    kind: 'ganpati',
    stopIndex: 1,
    name: 'Tulshibaug Ganpati',
    deva: 'तुळशीबाग गणपती',
    meta: 'Tulshibaug',
    image: img('1662306164410-1890619ae042'),
    hook: 'The tallest fibre idol in the old city — and why its lanes stay narrow on purpose.',
    readMin: '3 min read',
    listenMin: '2 min listen',
    intro:
      'Tucked behind one of Pune’s busiest market lanes, this Ganpati is remembered for its striking height — a towering figure that seems to rise out of the crowded bazaar around it. The story usually shared here is less about a single founder and more about the market community that raised it, stall by stall, and still tends it each year.',
    lookFor: [
      {
        icon: Eye,
        label: 'The full height of the idol',
        meta: 'Best seen from a step back, before the lane narrows near the gate.',
      },
      {
        icon: Eye,
        label: 'The market backdrop',
        meta: 'Bangles and brassware stalls frame the approach on either side.',
      },
    ],
    explore:
      'Locals often describe Tulshibaug as a mandal of shopkeepers. The surrounding market — known for everyday household goods, thread, and small brass items — grew alongside the festival, and the two are hard to separate. The narrow approach that can feel crowded is, in the retelling, part of the character: darshan here is threaded through daily commerce rather than set apart from it. Visitors who come earlier in the day usually find the lanes easier to move through.',
  },
  3: {
    id: 'kasba',
    kind: 'ganpati',
    stopIndex: 3,
    name: 'Kasba Ganpati',
    deva: 'कसबा गणपती',
    meta: 'Kasba Peth',
    image: img('1598089842345-111cc13e5ece'),
    hook: 'Pune’s gramadaivat — the presiding deity said to lead every immersion procession.',
    readMin: '2 min read',
    intro:
      'Kasba Ganpati is spoken of as Pune’s gramadaivat, the city’s presiding deity, and the retelling connects it to the founding of the old town itself. By long custom it is described as the first idol carried out in the immersion procession, with the other major mandals following in a fixed order behind it — a quiet seniority that the city is said to still honour each year.',
    lookFor: [
      {
        icon: Eye,
        label: 'The small, old shrine',
        meta: 'Modest beside the grander mandals — its age is the point.',
      },
      {
        icon: Eye,
        label: 'The shaded courtyard',
        meta: 'Usually quieter in the afternoon — a calmer darshan.',
      },
    ],
    explore:
      'Unlike the towering installations elsewhere on the route, Kasba’s appeal is its continuity. The retelling ties it to the seventeenth-century founding of the town, and its status as gramadaivat gives it a ceremonial precedence the newer mandals recognise. For families walking the route, it often reads as the gentlest stop — smaller crowds, a seated courtyard, and a sense of visiting something old rather than something grand.',
  },
};

export const dekhawaStory: Story = {
  id: 'samudra-manthan',
  kind: 'dekhawa',
  stopIndex: 0,
  name: 'Samudra Manthan',
  meta: 'A moving tableau near Dagdusheth · Budhwar Peth',
  image: img('1784815027580-a325ca72374f'),
  hook: 'A churning-of-the-ocean scene where the rope and mountain actually move.',
  readMin: '3 min read',
  listenMin: '2 min listen',
  unverified: true,
  intro:
    'This dekhawa stages the churning of the cosmic ocean — the gods and asuras pulling a serpent coiled around a mountain to draw out its treasures. In the moving version shown here, the mountain rocks and the rope appears to wind and unwind as figures on either side lean back and forth, so the whole scene seems to breathe. The narration usually explains who is pulling, and why.',
  lookFor: [
    {
      icon: Eye,
      label: 'The churning motion',
      meta: 'Watch how the rope wraps and unwraps around the mountain.',
    },
    {
      icon: Volume2,
      label: 'Marathi narration',
      meta: 'A recorded narration usually plays near the base of the tableau.',
    },
  ],
  who: [
    {
      name: 'Vishnu (as Kurma)',
      meta: 'Takes the form of a turtle to steady the sinking mountain.',
    },
    {
      name: 'The devas',
      meta: 'Pull from one side, hoping for the nectar of immortality.',
    },
    {
      name: 'The asuras',
      meta: 'Pull from the other, holding the serpent’s head.',
    },
  ],
};

/** Ordered list for the Discover screen: one entry per journey stop, plus dekhawa. */
export function discoverList(stopCount: number): (
  | { type: 'story'; story: Story }
  | { type: 'unavailable'; stopIndex: number; name: string; deva: string }
)[] {
  const items: ReturnType<typeof discoverList> = [];
  const names = [
    { name: 'Dagdusheth Halwai Ganpati', deva: 'श्रीमंत दगडूशेठ हलवाई गणपती' },
    { name: 'Tulshibaug Ganpati', deva: 'तुळशीबाग गणपती' },
    { name: 'Guruji Talim', deva: 'गुरुजी तालीम' },
    { name: 'Kasba Ganpati', deva: 'कसबा गणपती' },
  ];
  for (let i = 0; i < stopCount; i++) {
    const story = ganpatiStories[i];
    if (story) items.push({ type: 'story', story });
    else
      items.push({
        type: 'unavailable',
        stopIndex: i,
        name: names[i]?.name ?? `Stop ${i + 1}`,
        deva: names[i]?.deva ?? '',
      });
  }
  // Dekhawa card sits after its host stop
  items.push({ type: 'story', story: dekhawaStory });
  return items;
}

/** A small curated set for Discover when no journey exists yet — only entries
    that actually have a story, never the full mandal list. */
export function curatedList(): { type: 'story'; story: Story }[] {
  const items: { type: 'story'; story: Story }[] = [];
  for (const s of Object.values(ganpatiStories)) items.push({ type: 'story', story: s });
  items.push({ type: 'story', story: dekhawaStory });
  return items;
}

export function storyForStop(index: number): Story | undefined {
  return ganpatiStories[index];
}

export function storyById(id: string): Story | undefined {
  if (id === dekhawaStory.id) return dekhawaStory;
  return Object.values(ganpatiStories).find((s) => s.id === id);
}
