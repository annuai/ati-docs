---
id: indicator-lights
title: Indicator lights and sounds
summary: What a Sherpa's lights and voice messages mean, read directly off the robot rather than a dashboard.
simple: Before checking any screen, a robot's own lights and sounds already say what it's doing — moving, turning, stuck, low on battery, or waiting for a button press.
aliases:
  - status lights
  - LED indicators
  - robot lights
status: current
author: Annuai
added: '2026-09-21'
sources:
  - 'UM Sherpa Pivot.pdf, UM_Sherpa_Tug.pdf and UM_Sherpa_Flexfork_.pdf, supplied September 2026'
related:
  - robot-states
  - v-sherpa-pivot
  - v-sherpa-tug
  - v-sherpa-flex-fork
  - robot
order: 20
---

Every Sherpa carries a ring of LED indicators — eight lights on the Pivot and Tug, four on the Flex Fork — that report the robot's status independently of the [[v-fleet-manager|Fleet Manager]] dashboard. Colour and sound are paired, so a status is identifiable without reading either on its own. This table is identical across the three manuals reviewed, with one exception noted below.

## Reading the lights

Each swatch animates the way the manuals describe the light behaving — a slow or fast pulse for
"blinking", a moving sweep for "running" or "rolling", split colour for two lights on at once.

:::lights
items:
  - label: Blue & white
    color: '#2f6feb'
    secondary: '#ffffff'
    pattern: split
    sound: Normal beep
    status: Moving normally, en route
  - label: Red & white
    color: '#ef4444'
    secondary: '#ffffff'
    pattern: split
    sound: High-frequency beep
    status: Reversing
  - label: Yellow, one side
    color: '#f6c343'
    pattern: steady
    sound: Normal beep
    status: Turning
  - label: Running yellow
    color: '#f6c343'
    pattern: sweep-slow
    sound: High-pitched, long beep
    status: Turning in place
  - label: Fast-blinking yellow
    color: '#f6c343'
    pattern: pulse-fast
    sound: 'High-frequency beep, "Obstacle detected"'
    status: Obstacle detected
  - label: Blinking green
    color: '#22c55e'
    pattern: pulse-slow
    sound: 'High-pitched beep, "Please press the dispatch button"'
    status: 'Waiting for the [[v-dispatch|dispatch button]] to be pressed'
  - label: Steady green
    color: '#22c55e'
    pattern: steady
    sound: No sound
    status: Idle, ready for a trip
  - label: Rolling red
    color: '#ef4444'
    pattern: sweep-slow
    sound: '"Low battery" voice message'
    status: Battery low
  - label: Fast-blinking red
    color: '#ef4444'
    pattern: pulse-fast
    sound: Emergency tone
    status: E-stop pressed
  - label: Blinking purple
    color: '#8b5cf6'
    pattern: pulse-slow
    sound: No sound
    status: Manual mode, connecting to a PS4 controller
  - label: Steady purple
    color: '#8b5cf6'
    pattern: steady
    sound: No sound
    status: Manual mode, PS4 connected
  - label: All lights off
    color: '#9ca3af'
    pattern: off
    sound: No sound
    status: Powered off
:::

:::gap title="One model differs"
The Sherpa Flex Fork manual adds a thirteenth state — **cyan blue**, with the same obstacle beep and voice message, for an obstacle detected specifically from the rear. The Pivot and Tug manuals fold a rear obstacle into the same fast-blinking yellow as any other obstacle. Whether this is a genuine difference in the Flex Fork's sensor layout or simply the newer of the three manuals documenting a case the older two omit is not confirmed.
:::

## Not part of this system

Three other lights sit on every Sherpa but signal something different from the table above, and are easy to confuse with it:

- **Blue guide light** — projects a direction arrow onto the floor ahead of the robot; a wayfinding aid, not a status signal.
- **Red guide light** — two lights marking the robot's padding zone; an object or person inside them can trigger the safety sensors, but the light itself is a boundary marker, not a status code.
- **Beacon** — a rotating amber beacon that shows only whether the robot is powered on, for visibility in low light.

:::gap
Whether this indicator-light table and its sounds are the same across the rest of the [[ati-robotics|Sherpa hardware line-up]] — the 10K, Pallet Mover, Lifter 500 and Mecha — has not been confirmed; only the Pivot, Tug and Flex Fork manuals were reviewed.
:::
