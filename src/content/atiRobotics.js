import { p, h, defs, figure, gap } from './blocks.js';

// Knowledge contributed directly by the Ati team rather than found in this folder.
const TEAM = 'Ati team — noted September 2026';

const S = {
  overview: 'old/index.html'
};

export const atiRobotics = [
  {
    id: 'ati-robotics',
    title: 'Ati Robotics',
    summary: 'An OEM that builds both the robots and the orchestration software that runs them.',
    simple:
      'Ati is an OEM. It manufactures the robots itself, and it builds the software that decides what those robots do. Both halves come from the same company.',
    aliases: ['Ati', 'the company', 'OEM'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-16',
        author: 'Annuai',
        note: 'Rewritten. Ati is an OEM that builds both the robots and the orchestration software — the page previously recorded this as a gap.'
      }
    ],
    sources: [TEAM, S.overview, 'public/assets/ati-sherpa.png'],
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
      figure(
        '/assets/ati-sherpa.png',
        'An Ati Sherpa XT Lite autonomous mobile robot: a yellow four-wheeled vehicle with a sensor mast, a safety beacon and a side access panel.',
        'The robot in Ati’s product render. Its chassis is labelled Ati · Sherpa XT Lite — the only hardware naming that appears anywhere in the source material.'
      ),
      gap(
        'The company itself is still largely undocumented here: no founding, market, customer base, hardware line-up, product family or roadmap. The robot line is known only by the name printed on one render.'
      ),
      p(
        'Building both halves also means two documentation traditions in one company — requirement documents on the software side, a build list and a design risk analysis on the hardware side. See [[engineering-documents]].'
      ),
      p('For the software half in detail, read [[ati-flow]].')
    ],
    related: ['ati-flow', 'robot', 'orchestration', 'v-oem', 'v-sherpa', 'engineering-documents']
  }
];
