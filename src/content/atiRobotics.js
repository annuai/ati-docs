import { p, h, list, table, chain, defs, figure, gap } from './blocks.js';

// Knowledge contributed directly by the Ati team rather than found in this folder.
const TEAM = 'Ati team — noted September 2026';

const S = {
  overview: 'old/index.html'
};

const SITE = 'https://www.atirobotics.ai/company/';

export const atiRobotics = [
  {
    id: 'ati-robotics',
    title: 'Ati Robotics',
    summary: 'A full-stack robotics partner — founded 2017 in Bengaluru, now global — that builds both the robots and the orchestration software that runs them.',
    simple:
      'Ati is an OEM: it manufactures the robots itself, and it builds the software that decides what those robots do. It describes itself as a full-stack robotics partner rather than a box seller — staying involved after a robot ships, not just selling it.',
    aliases: ['Ati', 'the company', 'OEM'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-16',
        author: 'Annuai',
        note: 'Rewritten. Ati is an OEM that builds both the robots and the orchestration software — the page previously recorded this as a gap.'
      },
      {
        date: '2026-09-18',
        author: 'Krishna',
        note: 'Added founding, timeline, global offices, scale figures and company positioning from the company website, closing most of this page’s largest gap. Hardware line-up beyond the Sherpa XT Lite name, and product roadmap, are still not documented anywhere in this folder.'
      }
    ],
    sources: [TEAM, S.overview, 'public/assets/ati-sherpa.png', SITE],
    blocks: [
      h('What Ati builds'),
      p('Two halves of one system, both made in-house:'),
      defs([
        {
          term: 'The robots',
          text: 'The physical machines that move material around a factory floor. See [[robot]].'
        },
        {
          term: 'The orchestration software',
          text: '[[ati-flow|Ati Flow]], which decides what needs moving, which robot moves it, and when. See [[orchestration]].'
        }
      ]),
      h('Why being an OEM matters'),
      p(
        'An [[v-oem|OEM]] manufactures what it sells rather than reselling or integrating someone else’s equipment. For Ati that means the fleet is not software from one vendor wrapped around robots from another — the machine and the system that commands it are built by the same company.'
      ),
      p(
        'It also explains the shape of this documentation. Robot-level configuration, the [[map|map]] and the [[missions-and-actions|mission]] logic are all Ati’s concern, which is why [[configuration-layers]] runs from drive parameters all the way up to business-system integration.'
      ),
      h('A partner, not a box seller'),
      p(
        'The company positions itself as a **full-stack robotics partner** rather than a product vendor: hardware, software, orchestration and integration from one accountable team, and continued involvement after a robot ships — tracking utilisation, resolving edge cases and improving performance alongside the customer rather than handing over a machine and leaving. The company’s own shorthand for the alternative is “one throat to grab” — no finger-pointing between separate hardware and software vendors.'
      ),
      figure(
        '/assets/ati-sherpa.png',
        'An Ati Sherpa XT Lite autonomous mobile robot: a yellow four-wheeled vehicle with a sensor mast, a safety beacon and a side access panel.',
        'The robot in Ati’s product render. Its chassis is labelled Ati · Sherpa XT Lite — the only hardware naming that appears anywhere in the source material.'
      ),
      h('Founding and timeline'),
      chain(
        [
          { title: '2017', note: 'Founded in Bengaluru, India, to purpose-build AMRs for factories rather than adapt warehouse AGVs' },
          { title: '2018', note: 'First enterprise AMR deployments in Indian automotive and manufacturing, including Fortune 500 customers such as Airbus, Valeo and Brose' },
          { title: '2022', note: 'Global expansion — North America, Mexico and Southeast Asia; US headquarters established in Rochester Hills, Michigan' },
          { title: '2026', note: 'Rebranded to Ati Robotics, reflecting hardware, software orchestration and the intelligence layer as one platform', kind: 'outcome' }
        ],
        'Originally a motors company before the 2026 rebrand — “the name changed, the mission didn’t,” per the company site.'
      ),
      h('Scale, as stated on the company website'),
      p('Company-reported figures, not independently verified in this documentation:'),
      table(
        ['Measure', 'Figure'],
        [
          ['Team members worldwide', '250'],
          ['Fortune 500 customers', '15'],
          ['Factories deployed', '70+'],
          ['Global regions', '4'],
          ['Missions completed', '2,000,000+']
        ]
      ),
      h('Global presence'),
      list([
        '**United States** — Madison Heights, Michigan (US headquarters established in Rochester Hills, Michigan, per the 2022 timeline entry — the company site names both)',
        '**India** — Bengaluru, Karnataka (R&D)',
        '**Mexico** — Cuautlancingo, Puebla',
        '**Southeast Asia** — Chonburi, Thailand'
      ]),
      gap(
        'The company site names two different Michigan locations for the US operation — an office address in Madison Heights, and a 2022 timeline entry naming Rochester Hills as where the US headquarters was established. Both are recorded above rather than one being guessed as the correct current HQ.'
      ),
      h('Engineering culture'),
      p(
        'The company describes an “engineering-first” culture rooted in India’s engineering talent base: robots are hardened through real deployments before shipping, designed against failure modes rather than demos. Dr. Naveen Arulselvan, CTO, is named on the company site discussing the engineering tradeoffs involved in building AMRs for real factory floor conditions.'
      ),
      gap(
        'Beyond the Sherpa XT Lite name on one product render, there is still no documented hardware line-up, product family or roadmap anywhere in this folder.'
      ),
      p(
        'Building both halves also means two documentation traditions in one company — requirement documents on the software side, a build list and a design risk analysis on the hardware side. See [[engineering-documents]].'
      ),
      p('For the software half in detail, read [[ati-flow|the Ati Flow overview]].')
    ],
    related: ['ati-flow', 'robot', 'orchestration', 'v-oem', 'v-sherpa', 'engineering-documents']
  }
];
