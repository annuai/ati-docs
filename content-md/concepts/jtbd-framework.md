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
sources:
  - Annuai — Jobs-to-be-Done framework template, supplied in conversation, September 2026
related:
  - open-questions
  - users
  - ati-flow
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

## How to fill this in

1. **Core Job Statement first** — one sentence, in the user's own words from an interview, not paraphrased or assumed.
2. **Functional / Emotional / Social jobs** — pull straight from Support and CS interview notes: what users say they're trying to do, versus how they describe feeling about it.
3. **Job Map steps** — walk through what a user actually does today at each of the 8 steps, especially around first deployment. This should align with whatever the deployment-procedure documentation turns up.
4. **Forces of Progress** — Push and Pull drive adoption; Anxiety and Habit hold users back. Interview questions should be written to surface all four, not just satisfaction.
5. **Desired Outcomes** — restate findings as measurable statements ("minimize/increase/avoid + metric + object") so design-system and deployment work can be prioritized against them.

:::callout title="Update this page, don't replace it"
As interviews happen, replace bracketed placeholders in the diagram and accordion sections above with real quotes and findings. Log the source interview in this page's `revisions` and add it to `sources` in the frontmatter, the same way the rest of this docs set tracks provenance.
:::
