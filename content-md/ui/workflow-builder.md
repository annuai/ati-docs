---
id: ui-workflow-builder
slug: workflow-builder
kind: screen
title: Workflow Builder
summary: A node-based library for composing the steps, decisions and integrations a robot workflow can run.
simple: 'Workflow Builder is where a person assembles a robot job from building blocks: start it, move the robot, ask a question, wait for a sensor, confirm a pickup, then finish it.'
aliases:
  - workflow builder
  - workflow nodes
  - nodes
  - logic nodes
status: current
author: Annuai
added: '2026-09-17'
sources:
  - Ati team — noted September 2026
  - User-supplied Workflow Builder UI reference — September 2026
purpose: Build the exact sequence a robot follows, from a start trigger through movement, material handling, logic and integrations to an end trigger.
users:
  - '[[v-solutions-architect|Solutions Architect / Configurator]] — full edit, while setting a site up'
  - '[[v-head-of-operations|Supervisor]] — view and approve, according to the earlier role model'
  - '[[v-fleet-supervisor|Fleet Supervisor]] — view only in the earlier role model; the need for this persona is still unresolved'
  - '[[v-operator|Operator]] — hidden in the earlier role model'
see:
  - A node palette grouped by capability
  - An ordered workflow canvas, with connected nodes
  - Configuration fields within each node — for example station type, container type, confirmation type or start trigger
  - A map preview alongside the workflow, in the supplied UI reference
  - A processing-zone selector and a publish action, in the supplied UI reference
do:
  - Add a node to the workflow, configure it and order it with the surrounding steps
  - Build movement, logic, error handling, light and sound, email, and AIoT interactions into one sequence
  - Publish a workflow once it is ready for a processing zone
states:
  - Start Node and End Node delimit a workflow
  - Station can be configured as Pick Up or Drop Off
  - Confirm can be configured as Manual or Automatic
  - Manual confirmation can use a Dispatch Button; Automatic confirmation can use RFID
related:
  - ui-workflows
  - workflow
  - missions-and-actions
  - v-solutions-architect
  - map-annotation
  - v-rfid
order: 5
---

:::callout title="A library, not a fixed recipe"
The builder is a catalogue of what can be composed. A workflow should only contain the nodes its job actually needs; a simple point-to-point movement does not need every category below.
:::

## How to read the library

The supplied UI groups nodes visually by capability. The library below keeps the same underlying structure, but makes every option searchable and explainable. Where the supplied information only names a node, it is described plainly without guessing its configuration fields or runtime behaviour.

## Move

| Node | What it lets the workflow do |
| --- | --- |
| Adjust localisation | Correct or refine the robot’s understanding of where it is. |
| In-Place Turn | Turn the robot without moving it to another location. |
| Check Position Status | Check the status of a position. |
| Docking / Charging | Dock the robot or begin its charging behaviour. |
| Move | Send the robot to its next location. |
| Set Footprint | Set the robot footprint when its load is larger than the robot itself. |
| Switch Map | Change the map the robot uses. |

## Logic

| Node | What it lets the workflow do |
| --- | --- |
| Break | Stop the current logic path. |
| Continue | Continue the current logic path. |
| If | Run a path only when a condition is true. |
| Loop | Repeat a defined sequence. |
| Pause | Pause the workflow. |
| Prompt user | Ask a person for input before proceeding. |
| Return | Return from the current logic path. |
| Wait | Wait before the next step. |
| While | Keep running a path while a condition remains true. |

## Errors

| Node | What it lets the workflow do |
| --- | --- |
| Create log | Create a log entry from inside the workflow. |
| Try / Catch | Attempt a sequence and define what happens if it fails. |

## Sound and light

| Node | What it lets the workflow do |
| --- | --- |
| Play / Stop sound | Start or stop a sound from the workflow. |
| Show light | Show a light signal from the workflow. |

## Email

| Node | What it lets the workflow do |
| --- | --- |
| Send Email | Send an email from the workflow. |

## AIoT

**AIoT** means *Artificial Intelligence of Things*: the combination of AI and IoT used here to connect the robot workflow to physical devices and signals.

| Node | What it lets the workflow do |
| --- | --- |
| Connect Bluetooth | Connect to a Bluetooth device. |
| Set Output | Set an output. |
| Set / Reset I/O | Set or reset an input/output signal. |
| Wait for Input | Wait until an input signal arrives. |

## Workflow building blocks

:::defs
items:
  - term: Start Node
    text: The beginning of a workflow. The supplied UI shows its trigger set to Auto API.
  - term: End Node
    text: The end of a workflow. The supplied UI shows its trigger set to Auto API.
  - term: Station
    text: Select **Pick Up** or **Drop Off**, then select the station.
  - term: Material
    text: The supplied reference configures material with a type, SKU or Sub-SKU, and quantity.
  - term: Container
    text: 'Set the container type: **Trolley**, **Cart** or **Payload**.'
  - term: Confirm
    text: Choose **Manual** or **Automatic** confirmation. Manual uses a **Dispatch Button**; Automatic uses **RFID**.
:::

## Example — move a trolley from pickup to drop-off

This example follows the shape shown in the supplied Workflow Builder reference. It is an example composition, not a claim that every site uses these exact settings.

```
Start Node        Auto API
  ↓
Station           Pick Up → selected pickup station
  ↓
Container         Trolley
  ↓
Confirm           Manual → Dispatch Button
  ↓
Move              selected drop-off station
  ↓
Station           Drop Off → selected drop-off station
  ↓
End Node          Auto API
```

## What still needs documenting

:::gap
The node names and the options above are documented. Their detailed configuration fields, validation rules, branching semantics, error behaviour, permissions and how the canvas handles connections have not yet been specified. The supplied UI establishes the builder layout and some field examples, not the complete runtime contract.
:::
