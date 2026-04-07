---
description: Show confirmed change state — stage, track, gates, blockers, risks, next action (V8 §10.9)
---

# /status — Change Status Dashboard

> V8 Reference: §10.9

## Purpose

Show only the confirmed, verifiable state of changes. No speculation, no unconfirmed data.

## Display Format

### Active Changes Summary
For each active change, display:

```
┌─────────────────────────────────────────────────────┐
│ CHG-2026-03-30-01: [Title]                          │
│ Stage: build | Track: core | Owner: [name]          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ Gates:                                               │
│   ✅ problem_definition: approved                    │
│   ✅ brief_origin: approved                          │
│   ✅ track_approval: approved                        │
│   ⏳ verification_go: not_started                    │
│   ⬜ release_approval: not_started                   │
│ Risks: [list]                                        │
│ Blockers: [list]                                     │
│ Next: Complete implementation, then /verify           │
└─────────────────────────────────────────────────────┘
```

### Gate Legend
- ✅ `approved` — gate passed
- ⏳ `pending_human` — awaiting human decision
- ❌ `rejected` / `blocked` — gate failed
- 🔺 `escalated` — escalated to higher authority
- ⬜ `not_started` — not yet reached

## Steps

### 1. Get Status State
⛔ **RULE: DO NOT execute Glob/Read tools to scan directories.**
- Generate status based on `git log -n 10` and `docs/CHANGELOG.md`.
- Read specific `change_card.yaml` ONLY if deep details are explicitly requested by human.

### 2. Display Per-Change Status
For each change, show:
- `id`, `title`
- `stage`, `track`
- `human_owner`
- All gate states
- `active_risks`
- `open_blockers`
- `next_action`
- `updated_at`

### 3. Summary Statistics
- Total active changes
- By stage breakdown
- By track breakdown
- Changes with blockers
- Changes awaiting human decision

## Source of Truth Rule
- Status reads ONLY from `change_card.yaml` fields
- If folder and stage disagree → stage field wins (§7.3)
- Derived registries do NOT override source-of-truth documents (§8.1)

## Context Budget
- **Class: Light** — git log, CHANGELOG.md. ⛔ NO heavy file reads.
