---
id: jtbd-framework
title: Jobs-to-be-Done Framework
summary: A research template for understanding what Ati Flow users actually need — filled in from support, CS and user interviews, not assumed.
simple: 'A Jobs-to-be-Done map has five parts: the core job a user is trying to get done, the functional/emotional/social sides of that job, the 8 steps they walk through to do it, the forces that push them toward or away from a solution, and the outcomes that tell you whether it went well. This page is the empty map — the bracketed placeholders get replaced with real findings as interviews happen.'
aliases:
  - JTBD
  - jobs to be done
  - user needs framework
status: draft
author: Annuai
added: '2026-09-21'
revisions:
  - date: '2026-09-21'
    author: Annuai
    note: Created as an empty framework — no interviews have happened yet. Placeholders throughout are marked in [brackets] and should be replaced with real interview language, not assumed answers.
  - date: '2026-09-21'
    author: Annuai
    note: Split the single generic map into one map per Ati Flow user (Operator, Head of Operations, Configurator), using the tasks already documented in the user model. Fleet Supervisor is held back because that role itself is unconfirmed. Job-map steps that map to a documented task are filled in; everything about motivation, feeling and forces is still an interview-only placeholder — nothing here beyond the permission-matrix tasks is a confirmed finding.
  - date: '2026-09-21'
    author: Annuai
    note: 'Corrected "Mission" to "Workflow" in the Configurator job map — Ati Flow''s product-facing term, per [[d-workflow-over-mission]] — and added a disambiguation callout naming Mission as the industry-standard word for the same thing.'
sources:
  - Annuai — Jobs-to-be-Done framework template, supplied in conversation, September 2026
  - content-md/atiFlow/users.md
related:
  - open-questions
  - users
  - ati-flow
  - d-workflow-over-mission
order: 19
---

## Why this page is empty

This is a framework, not a finding. None of the bracketed text below is a real answer about Ati Flow users — it's a placeholder showing what kind of statement goes there once support, CS and user interviews happen. Treat every `[bracket]` as a question to ask, not a fact to cite.

:::gap title="No interviews completed yet"
The Core Job Statement, the three job dimensions, the Job Map, and the Forces of Progress below are all unfilled. The first real content on this page should come from the Support and Customer Success interviews already planned — see [[open-questions]] for what's still unknown about Ati Flow's users and roles.
:::

## The map

```mermaid caption="Jobs-to-be-Done framework for Ati Flow. Every bracketed node is a placeholder to be replaced with real interview findings — nothing here is a confirmed user need yet."
flowchart TB
    subgraph INPUTS["Research inputs"]
        direction LR
        I1["Support interviews"]
        I2["Customer Success interviews"]
        I3["Direct user interviews"]
        I4["Product usage / support-ticket data"]
    end

    CORE["Core Functional Job Statement<br/><i>When [situation/trigger],<br/>I want to [motivation/action],<br/>so I can [expected outcome]</i>"]

    INPUTS --> CORE
    CORE --> FUNC
    CORE --> EMO
    CORE --> SOC

    subgraph FUNC["Functional job"]
        F1["The practical task the user is<br/>trying to get done<br/>e.g. '[deploy Ati Flow for my team]'"]
    end

    subgraph EMO["Emotional job"]
        E1["How the user wants to feel<br/>e.g. '[feel confident nothing will break]'"]
    end

    subgraph SOC["Social job"]
        S1["How the user wants to be seen<br/>e.g. '[be seen as the person who set this up smoothly]'"]
    end

    FUNC --> MAP
    EMO --> MAP
    SOC --> MAP

    subgraph MAP["Job map — 8 universal steps"]
        direction LR
        M1["1. Define"] --> M2["2. Locate"]
        M2 --> M3["3. Prepare"]
        M3 --> M4["4. Confirm"]
        M4 --> M5["5. Execute"]
        M5 --> M6["6. Monitor"]
        M6 --> M7["7. Modify"]
        M7 --> M8["8. Conclude"]
    end

    MAP --> FORCES

    subgraph FORCES["Forces of progress"]
        direction LR
        PUSH["Push<br/>dissatisfaction with<br/>current approach<br/>e.g. '[manual deployment steps<br/>are error-prone]'"]
        PULL["Pull<br/>attraction of<br/>Ati Flow<br/>e.g. '[promises faster setup]'"]
        ANXIETY["Anxiety<br/>fear of switching<br/>e.g. '[will this break<br/>our existing workflow?]'"]
        HABIT["Habit<br/>comfort with<br/>current tool<br/>e.g. '[team already knows<br/>the old process]'"]
    end

    FORCES --> OUTCOMES

    subgraph OUTCOMES["Desired outcomes — what to measure"]
        direction LR
        O1["Minimize time to [complete first deployment]"]
        O2["Increase likelihood of [successful setup on first try]"]
        O3["Minimize [support tickets during onboarding]"]
        O4["Increase confidence in [ongoing use post-deployment]"]
    end
```

## The eight job-map steps, defined

:::accordions
items:
  - title: 1. Define
    body:
      - t: p
        text: What does the user decide needs doing, and what triggers that decision? Unfilled — pending Support/CS interviews.
  - title: 2. Locate
    body:
      - t: p
        text: What does the user need to gather before they can start — information, access, people? Unfilled.
  - title: 3. Prepare
    body:
      - t: p
        text: How does the user set up the environment before executing the job? Unfilled.
  - title: 4. Confirm
    body:
      - t: p
        text: How does the user check they're ready to proceed? Unfilled.
  - title: 5. Execute
    body:
      - t: p
        text: What does the user actually do to complete the job? Unfilled.
  - title: 6. Monitor
    body:
      - t: p
        text: How does the user check it's working as expected? Unfilled.
  - title: 7. Modify
    body:
      - t: p
        text: What does the user adjust if something isn't right? Unfilled.
  - title: 8. Conclude
    body:
      - t: p
        text: How does the user know the job is finished? Unfilled.
:::

## Which user, which job

A job map tracks one job executor doing one job — mixing users into a single map muddies both the map and the eventual interview questions. Ati Flow has four documented users (see [[users]]), each with a different job rather than a different slice of the same job:

| User | Scope | What they do today |
| --- | --- | --- |
| [[v-operator\|Operator]] | Floor level, one zone | Fleet Monitor for own zone, robot status, task queue, raises manual priority requests |
| [[v-fleet-supervisor\|Fleet Supervisor]] | Zone-level oversight | Fleet Monitor across assigned zones with reassignment control, manages robots in those zones — **role not yet confirmed to exist**, see [[users]] |
| [[v-head-of-operations\|Head of Operations]] | Whole site | Manages robots site-wide, views & approves Workflows and Maps, views Integrations status, manages users and roles |
| [[v-solutions-architect\|Solutions Architect (Configurator)]] | Sets a new site up | Builds and annotates Maps, designs Workflows, configures Robots and Integrations, exclusive Debug access |

Below is one job map per confirmed user. Only the steps that match a documented task are filled in; everything else — and every Core Job Statement, emotional job, social job and Force of Progress — is still `[bracketed]` because none of it has been said by a user in an interview yet.

:::callout title="Workflow, not Mission"
The wider robotics/AMR industry calls this a **Mission**; Ati Flow, as an orchestration product, currently calls the same thing a **Workflow** — no meaning difference. See [[d-workflow-over-mission]].
:::

:::accordions
items:
  - title: 'Operator — keep my zone running'
    body:
      - t: p
        text: "Core functional job (draft, unconfirmed): [When a robot in my zone stops or my task queue backs up, I want to see what's happening and respond, so I can keep my zone running without escalating]"
      - t: table
        headers: ['Step', 'What is known']
        rows:
          - ['1. Define', 'Unfilled — pending interview']
          - ['2. Locate', 'Unfilled']
          - ['3. Prepare', 'Unfilled']
          - ['4. Confirm', 'Unfilled']
          - ['5. Execute', 'Raises a manual priority request, with the trade-off shown before confirming']
          - ['6. Monitor', 'Watches Fleet Monitor for their own zone — robot status and task queue']
          - ['7. Modify', 'Unfilled']
          - ['8. Conclude', 'Unfilled']
  - title: 'Head of Operations — keep the whole site accountable'
    body:
      - t: p
        text: "Core functional job (draft, unconfirmed): [When something across the site needs approval or oversight, I want visibility and control across all zones, so I can keep the site accountable]"
      - t: table
        headers: ['Step', 'What is known']
        rows:
          - ['1. Define', 'Unfilled']
          - ['2. Locate', 'Unfilled']
          - ['3. Prepare', 'Unfilled']
          - ['4. Confirm', 'Views and approves Workflows and Maps']
          - ['5. Execute', 'Manages robots site-wide; manages users and roles']
          - ['6. Monitor', 'Views Integrations status; is the escalation point above Fleet Supervisors']
          - ['7. Modify', 'Unfilled']
          - ['8. Conclude', 'Unfilled']
  - title: 'Solutions Architect (Configurator) — take a site from zero to operational'
    body:
      - t: p
        text: "Core functional job (draft, unconfirmed): [When a new site has no fleet running, I want to configure maps, workflows, robots and integrations, so I can take it from zero to operational]"
      - t: table
        headers: ['Step', 'What is known']
        rows:
          - ['1. Define', 'Unfilled']
          - ['2. Locate', 'Unfilled']
          - ['3. Prepare', 'Builds and annotates the map; designs workflows']
          - ['4. Confirm', 'Uses Debug — the only role with access — to verify a configuration behaves correctly']
          - ['5. Execute', 'Configures robots down to low-level parameters; wires up integrations and site configuration']
          - ['6. Monitor', 'Unfilled']
          - ['7. Modify', 'Unfilled']
          - ['8. Conclude', 'Unfilled']
:::

:::gap title="Fleet Supervisor has no job map yet"
Writing a job map for the Fleet Supervisor would assume the role exists. It doesn't, yet — see the open question in [[users]]. If the role is confirmed, its map goes here.
:::

## How to fill this in

1. **Core Job Statement first** — one sentence, in the user's own words from an interview, not paraphrased or assumed.
2. **Functional / Emotional / Social jobs** — pull straight from Support and CS interview notes: what users say they're trying to do, versus how they describe feeling about it.
3. **Job Map steps** — walk through what a user actually does today at each of the 8 steps, especially around first deployment. This should align with whatever the deployment-procedure documentation turns up.
4. **Forces of Progress** — Push and Pull drive adoption; Anxiety and Habit hold users back. Interview questions should be written to surface all four, not just satisfaction.
5. **Desired Outcomes** — restate findings as measurable statements ("minimize/increase/avoid + metric + object") so design-system and deployment work can be prioritized against them.

:::callout title="Update this page, don't replace it"
As interviews happen, replace bracketed placeholders in the diagram and accordion sections above with real quotes and findings. Log the source interview in this page's `revisions` and add it to `sources` in the frontmatter, the same way the rest of this docs set tracks provenance.
:::
