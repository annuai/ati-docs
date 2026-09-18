import { p, list, defs } from './blocks.js';

// Knowledge supplied directly in conversation rather than found in this folder.
const ORG = 'Ati team — org structure and internal tooling, supplied in conversation, September 2026';

/*
  Teams at Ati.

  Who does what across the company, kept brief and limited to this section — a short orientation,
  not a full org chart. Descriptions are drafted generically for a robotics OEM and flagged
  `needs-confirmation` until an Ati-specific source or the team itself confirms them.
*/

export const teams = [
  {
    id: 'team-operations',
    slug: 'operations',
    title: 'Operations',
    summary: 'Manages operational insights, future planning and efficiency across the company.',
    simple:
      'Operations looks after how the company runs as a whole — pulling together operational insights, planning ahead, and finding ways to run more efficiently — rather than any one site or product.',
    aliases: ['ops'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-18',
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Corrected: Operations is a company-wide function focused on operational insights, future planning and efficiency, not the team that deploys and runs robots on-site day to day — that is Solutions, Service and Support.'
      }
    ],
    sources: [ORG],
    blocks: [
      list(['Operational insights across the company', 'Future planning', 'Efficiency'])
    ],
    related: ['users']
  },

  {
    id: 'team-tech',
    slug: 'tech',
    title: 'Tech',
    summary: 'Builds and maintains everything that makes a robot work — autonomy, electronics, validation and cloud.',
    simple:
      'Tech is everything that makes a robot actually work: the software that drives it, the electronics inside it, the testing that proves it is safe to run, and the cloud services behind it.',
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-18',
    sources: [ORG],
    blocks: [
      p('Four functions sit inside Tech:'),
      defs([
        { term: 'Autonomy', text: 'The software that lets a robot understand its surroundings and drive itself — navigation, perception, localization and safety. See [[robot]].' },
        { term: 'Electronics', text: 'The physical circuit boards, sensors and wiring on and around the robot.' },
        { term: 'Validation', text: 'Testing robots and software against real and simulated conditions before they are trusted in production. See [[v-validation|Validation]].' },
        { term: 'Cloud', text: 'The backend services, infrastructure and data pipelines a fleet of robots and Ati’s software depend on.' }
      ])
    ],
    related: ['v-validation', 'v-feluda', 'robot', 'v-amr']
  },

  {
    id: 'team-npi',
    slug: 'npi',
    title: 'NPI (New Product Initiative)',
    summary: 'Takes a new robot or hardware idea from concept through to something that can be manufactured and deployed.',
    simple:
      'NPI is the team that takes a new robot idea from a concept and turns it into something that can actually be built and shipped.',
    aliases: ['New Product Initiative', 'New Product Introduction'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-18',
    sources: [ORG],
    blocks: [
      p(
        'NPI sits between an early product idea and the point where [[team-mechanical-engineering|Mechanical Engineering]] and [[team-tech|Tech]] can build against a settled design.'
      )
    ],
    related: ['team-mechanical-engineering', 'team-tech', 'ati-robotics']
  },

  {
    id: 'team-mechanical-engineering',
    slug: 'mechanical-engineering',
    title: 'Mechanical Engineering',
    summary: 'Designs and engineers the physical robot — chassis, drivetrain and structural components.',
    simple: 'Mechanical Engineering designs the physical robot itself: its frame, its wheels and drive system, and how it is put together.',
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-18',
    sources: [ORG],
    blocks: [
      p('Works closely with [[team-npi|NPI]] on new hardware, and with [[team-tech|Tech]]’s Electronics function on what the chassis needs to carry and support.')
    ],
    related: ['team-npi', 'team-tech', 'robot']
  },

  {
    id: 'team-product',
    slug: 'product',
    title: 'Product',
    summary: 'Decides what Ati’s software and robots should do, and how they should feel to use.',
    simple:
      'Product decides what Ati’s software and robots should actually do, and works out how they should look and feel to the person using them.',
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-18',
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Corrected Product Management: Ati Flow is not the only software Ati builds, so its scope is not limited to Ati Flow. Folded Design back in as a function within Product, rather than a separate top-level team, matching the current organisation structure.'
      }
    ],
    sources: [ORG],
    blocks: [
      p('Two functions sit inside Product:'),
      defs([
        {
          term: 'Design',
          text: 'UX for Ati’s software, and the physical styling of new robots and concepts. Covers finding and working through usability challenges, and styling work for new robots and concepts.'
        },
        {
          term: 'Product Management',
          text: 'What gets built and why, split by Software — Ati Flow and Ati’s other software — and Hardware, the robots.'
        }
      ])
    ],
    related: ['ati-flow', 'users', 'users']
  },

  {
    id: 'team-support',
    slug: 'support',
    title: 'Support',
    summary: 'Resolves issues with robots and software once deployed, on-site and online.',
    simple:
      'Support fixes problems with robots and software once they are deployed, working both on-site and remotely. Support engineers also help set up new maps and deploy new robots into sites that are already live.',
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-18',
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Corrected: Support works both on-site and online, and support engineers also help set up new maps and deploy new robots into existing sites. Escalates to Service when a problem cannot be resolved.'
      }
    ],
    sources: [ORG],
    blocks: [
      list([
        'Resolves robot and software issues, on-site and remotely',
        'Sets up new [[map|maps]]',
        'Deploys new robots into sites that are already live'
      ]),
      p('Escalates to [[team-service|Service]] when a problem cannot be resolved.')
    ],
    related: ['team-service', 'v-deployment-manager', 'map']
  },

  {
    id: 'team-solutions',
    slug: 'solutions',
    title: 'Solutions',
    summary: 'The first team to handle a deployment after site evaluation, deciding what it will take to run it.',
    simple:
      'Solutions is the first team to pick up a deployment once the site has been evaluated. It works out how many robots are needed, what kind, the ideal cycle time, and the most efficient mapping.',
    aliases: ['Solutioning'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-18',
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Corrected and expanded: Solutions is specifically the first team to take on a deployment after site evaluation and planning, deciding robot count, robot type, ideal cycle time and the most efficient mapping approach.'
      }
    ],
    sources: [ORG],
    blocks: [
      p(
        'This is the [[v-solutioning|solutioning]] work described in stage 1 of the [[wf-deployment|deployment workflow]], carried out by the [[v-solutions-architect|Solutions Architect]] user. After site evaluation, Solutions works out:'
      ),
      list([
        'How many robots are required',
        'What kind of robots are required',
        'What the ideal [[v-cycle-time|cycle time]] is',
        'What the most efficient mapping approach is'
      ])
    ],
    related: ['v-solutioning', 'v-solutions-architect', 'v-cycle-time', 'wf-deployment']
  },

  {
    id: 'team-service',
    slug: 'service',
    title: 'Service',
    summary: 'Steps in when Support cannot resolve a problem, working on-site as needed.',
    simple: 'Service comes in when Support is not able to fix a problem, and works on-site when that is required.',
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-18',
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Corrected: Service is specifically the escalation from Support when Support cannot resolve a problem, and works on-site when required — rather than a general physical-maintenance function running in parallel with Support.'
      }
    ],
    sources: [ORG],
    blocks: [
      p('Distinct from [[team-support|Support]], which works both on-site and online — Service is the on-site escalation once Support cannot fix a problem.')
    ],
    related: ['team-support', 'robot']
  },

  {
    id: 'team-customer-success',
    slug: 'customer-success',
    title: 'Customer Success',
    summary: 'Owns the ongoing relationship with a customer after deployment.',
    simple: 'Customer Success looks after the relationship with a customer after their robots are deployed, making sure they keep getting value from the product.',
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-18',
    sources: [ORG],
    blocks: [
      p('Picks up where [[team-solutions|Solutions]] and [[team-service|Service]] hand a site over, for the life of the relationship.')
    ],
    related: ['team-solutions', 'team-service']
  },

  {
    id: 'team-human-resources',
    slug: 'human-resources',
    title: 'Human Resources',
    summary: 'Manages hiring, people operations and wellbeing across the company.',
    simple: 'Human Resources hires people, runs people operations, and looks after the wellbeing of everyone working at Ati.',
    aliases: ['HR'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-18',
    sources: [ORG],
    blocks: [
      list([
        'Hiring and onboarding across every other team on this page',
        'People operations — policy, benefits and internal processes',
        'Employee wellbeing'
      ])
    ]
  },

  {
    id: 'team-marketing',
    slug: 'marketing',
    title: 'Marketing',
    summary: 'Manages how Ati and its products are presented and communicated to the outside world.',
    simple: 'Marketing shapes how Ati and its products are presented to the outside world.',
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-18',
    sources: [ORG],
    blocks: [
      p('External positioning and communication for [[ati-robotics|Ati Robotics]] and [[ati-flow|Ati Flow]].')
    ],
    related: ['ati-robotics', 'ati-flow']
  }
];
