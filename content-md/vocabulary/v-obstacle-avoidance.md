---
id: v-obstacle-avoidance
term: Obstacle avoidance
kind: jargon
simple: The robot noticing something in its way and changing how it drives to avoid it — but only in the specific areas configured to allow it.
technical: The runtime autonomy behaviour responsible for detecting obstacles and modifying the robot’s motion or route to avoid collisions. Enabled per zone, not everywhere on the map — see below.
usedIn:
  - Robot autonomy
  - Navigation
  - Blocked-robot behaviour
related:
  - v-dynamic-obstacle
  - v-static-obstacle
  - v-path-planning
  - v-replanning
  - v-behavioural-zone
  - zone-types
status: current
author: Annuai
added: '2026-09-17'
revisions:
  - date: '2026-09-22'
    author: Annuai
    note: Added the rectangular-zone mechanic and the stop-rather-than-swerve limitation outside a configured zone, from an internal DM/FM walkthrough.
  - date: '2026-09-23'
    author: Annuai
    note: Confirmed, from an internal zones reference document, that "obstacle avoidance zone" is one of the map editor's own named zone types — see [[zone-types]]. That document gives no further detail beyond the name, so it doesn't yet add anything past what was already documented here.
sources:
  - Ati team — noted September 2026
  - 'Ati support engineer — Deployment Manager/Fleet Manager walkthrough, transcript supplied in conversation, September 2026'
  - 'Ati team — internal "Zones" reference document (map zone types and parameters), supplied September 2026'
order: 57
---

## Where it's actually allowed

A robot only attempts to steer around an obstacle inside a rectangular zone drawn on the map for that purpose, configured with a maximum obstacle size, how far the robot may deviate from its route, and whether the obstacle is expected to be static or moving. Outside such a zone — a doorway or a narrow gangway, for instance — the robot doesn't swerve at all: it detects the obstacle with its LiDAR and simply stops. The reasoning given is that deviating in a tight space would just steer it into a wall, so avoidance is deliberately restricted to places wide enough for it to be safe.

"Obstacle avoidance zone" is confirmed to be one of the map editor's own named [[zone-types|zone types]], rather than a separate mechanism.