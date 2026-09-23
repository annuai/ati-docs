---
id: zone-types
title: Map zone types
summary: The specific behaviours a drawn zone can add to the map — speed changes, obstacle-distance overrides, collision shapes and more.
simple: A zone is a shape drawn on the map. Which "type" it's given decides what it actually does — slow the robot down, change how close it can get to something, or turn a safety check off.
aliases:
  - ramp zone
  - low speed zone
  - variable stop distance zone
  - 3D collision detection zone
  - variable padding zone
  - conveyor wall zone
  - no payload safety zone
  - traffic intersection zone
  - special camera zone
  - no-go zone
  - table pickup zone
  - wheel pose zone
  - docking zone
  - zebra crossing zone
  - special lidar 2D zone
  - smart door zone
status: needs-confirmation
author: Annuai
added: '2026-09-23'
sources:
  - 'Ati team — internal "Zones" reference document (map zone types and parameters), supplied September 2026'
  - 'Ati team — Deployment Manager zone-type selector, screenshot supplied September 2026'
related:
  - map-annotation
  - zone
  - v-behavioural-zone
  - v-obstacle-avoidance
  - v-forbidden-zone
  - v-exclusion-zone
  - traffic-control
order: 23
---

## Why this page exists

[[map-annotation|Map annotation]] already covers zones at a general level — behavioural zones, traffic control, forbidden and preferred areas. This page is the specific, named list of zone types the map editor actually supports, and what each one does to the robot's behaviour while it's inside.

Every zone below is drawn as a shape on the map (a polygon or a rectangle) and carries its own settings on top of that shape.

:::callout title="The current, complete list — from the editor itself"
The map editor's own zone-type selector lists **17 zone types**. Only **9** of them have a documented behaviour, from an internal zones reference document — the other **8** are confirmed to exist, by name, straight from the product, but nothing is written down yet about what they actually do.
:::

## Documented zone types

### Ramp zone

Slows the robot down automatically while it's on an incline. Drawing the zone only needs one extra piece of information beyond its outline: which compass direction points uphill. The system compares the robot's current heading against that uphill direction to work out whether it's heading up, heading down, or currently on flat ground outside any ramp — and reduces the robot to a fixed, slow "creep" speed whenever it's on a slope in either direction.

### Low speed zone

Caps the robot's speed inside a marked area — an assembly area, for example. It's drawn with one setting: a speed multiplier, so a value of "half speed" simply halves whatever speed the robot would otherwise be driving at. This behaviour can be switched off across a whole site, and a site-wide default speed multiplier is used for any low speed zone that doesn't specify its own.

### Variable stop distance zone

Changes how close the robot lets an obstacle get before it slows down and stops — useful somewhere like a loading dock, where the robot needs to approach closer than its normal safety margin would otherwise allow. Two distances are set: how close the robot gets before it stops completely, and a further distance at which it starts slowing down. Between those two points its speed decreases smoothly rather than dropping suddenly. Like the low speed zone, this can be switched off site-wide, with site-wide default distances used otherwise.

### 3D collision detection zone

Describes a physical object on the floor — a platform, a fixture — by its real shape and height, rather than treating it as a flat obstacle. Each object gets its own footprint outline and a vertical range: how far off the ground it starts and ends. A 20cm-tall platform sitting on the floor, for example, would span from ground level up to 20cm. This lets the robot's collision checking reason about objects with real height, rather than assuming everything on the map is the same.

### Variable padding zone

Overrides how much safety clearance the robot keeps around itself while inside the zone — built for narrow aisles or tight spaces where the robot's normal clearance would otherwise stop it from fitting through at all. The zone sets a clearance distance for each side of the robot (left, right, front, rear), and can optionally set a different — usually smaller — set of clearances for when the robot is carrying a payload. It can also be restricted to only apply when the robot is travelling in a particular direction, automatically swapping the left/right clearances if the robot passes through the other way. This has to be switched on for the site before it takes effect.

### Conveyor wall zone

A more specialised version of the 3D collision idea, purpose-built for safely detecting a conveyor's edge so the robot can dock against it or pass by it. It carries the same shape-and-height description as a 3D collision zone, plus its own sensor-tuning settings — in plain terms: how tightly nearby sensor readings need to cluster together to be treated as "one object" (rather than noise or several separate things), a minimum size below which a detected cluster is ignored as noise, and extra safety clearance applied specifically when checking the robot against the conveyor.

### No payload safety zone

Turns off the robot's "is something on my lifter" safety check while inside the zone. This exists for cases where a robot has to set a load down onto another fixture — a rack, for instance — where that fixture would otherwise be mistaken by the sensor for a dropped or misaligned payload.

### Traffic intersection zone and obstacle avoidance zone

Both of these are named zone types with no behaviour described in the reference document.

- **Obstacle avoidance zone** is very likely the same rectangular, per-zone mechanism already documented at [[v-obstacle-avoidance|Obstacle avoidance]] — where the robot only steers around an obstacle inside a configured zone, and simply stops for one outside it.
- **Traffic intersection zone** is not confirmed to be the same thing as the gates, exclusion zones or VISA arbitration already documented under [[traffic-control|Traffic control]], though it plausibly overlaps with that mechanism.

## Named in the editor, not yet documented

Eight further zone types appear in the map editor's own selector with no description anywhere in Ati's material of what they do:

- **Special camera zone**
- **No-go zone** — possibly the same thing as the already-documented [[v-forbidden-zone|Forbidden zone]], but the two names are not confirmed to refer to the same mechanism.
- **Table pickup zone**
- **Wheel pose zone** — likely the "wheel zone" already flagged, under an approximate name, as an example of an undocumented zone type elsewhere in this documentation. See [[map-annotation]].
- **Docking zone** — a "docking zone" is already mentioned in passing as an example of a behavioural zone; whether that's this same, formally-named zone type is not confirmed.
- **Zebra crossing zone**
- **Special LiDAR 2D zone**
- **Smart door zone**

:::gap title="What these eight actually do is not documented"
All eight are confirmed, current zone types — they appear in the map editor's own zone-type selector — but no source describes their parameters or effect on the robot. Treat the names above as placeholders until the team that owns each one documents it.
:::

:::callout title="This is now the confirmed, complete current list"
Earlier documentation could only say the full list of zone types was unknown even inside Ati. The map editor's own selector settles that: there are 17 zone types today, all named above. What is still unknown is what most of them do — and an Ati support engineer's caution still stands, that new zone types get added whenever a feature needs one, so this list can grow.
:::
