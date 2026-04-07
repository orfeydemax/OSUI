---
description: Select track, strictness level, and required artifacts for a change (V8 §10.5, §15, §16)
---

# /route — Track Selection and Routing

> V8 Lifecycle Stage: **Route**
> Reference: §10.5, §15, §16, §17

## Purpose

Choose the correct track (Nano/Core/Extended/Critical/Hotfix), calculate the routing score, determine required artifacts, and document the routing decision.

## Steps

### 1. Check Nano Eligibility
Before scoring, check if ALL Nano criteria are met (§16.2):
- [ ] Single screen or single local module
- [ ] No data migration
- [ ] No role/RLS/auth/permission changes
- [ ] No history impact
- [ ] No core state model change
- [ ] No breaking change
- [ ] Production risk ≤ low
- [ ] Locally verifiable and locally rollbackable
- [ ] No multi-owner coordination needed

If ALL pass → Nano Track. **Frame всё равно обязателен** (сокращённый формат). Proceed to Step 4.
If ANY fail → proceed to scoring.

### 2. Calculate Routing Score (§15.1)

| Signal | Points |
|--------|--------|
| Single layer, no history | 0 |
| Multiple layers touched | +2 |
| Roles / access / RLS / auth changed | +3 |
| Status or state-model changed | +2 |
| Data migration involved | +3 |
| History risk | +4 |
| Stateful / storage / restore risk | +3 |
| Breaking change | +5 |
| Architectural shift or core logic shift | +5 |
| Active production incident | → Hotfix Track |

### 3. Map Score to Track (§15.2)

| Score Range | Track |
|-------------|-------|
| Nano eligible | Nano Track |
| 0–3 | Core Track |
| 4–8 | Extended Track |
| 9+ | Critical Governance Track |
| Production incident | Hotfix Track |

### 4. Check Forced Escalation (§15.3)
Even with low score, escalate to Extended+ if:
- Roles, rights, RLS, auth affected
- History impacted
- Old data reading model changed
- Backup/restore contour affected
- Product or architectural conflict exists
- Framing contradictions unresolvable at current level

### 5. Determine Required Artifacts (§19)
Based on track, list all mandatory artifacts.

### 6. Create Routing Decision Record
Use template: `docs/_templates/routing_decision.yaml`
- `selected_track`
- `routing_score`
- `routing_score_reasoning`
- `forced_escalation_reason` (if applicable)
- `required_artifacts`
- `forbidden_shortcuts`
- `approved_by` (Human Gate: Track Approval)
- `approved_at`

### 7. Update Change Card
- `track: <selected>`
- `routing_score: <score>`
- `routing_score_reasoning: <reasoning>`
- `stage: route → build` (after approval)
- `gates.track_approval: pending_human`

### 8. Human Gate: Track Approval
Present routing decision to human owner for approval.
- If approved → `gates.track_approval: approved`, move to `/build`
- If rejected → return to `/frame` or `/plan`
- If escalated → escalate track

## Output
- Routing Decision Record (`routing_decision.yaml`)
- Updated Change Card with track, score, and artifacts list
- Human approval for track

## Forbidden
- ❌ Assigning a track without the routing score
- ❌ Nano Track if any disqualifying criterion exists
- ❌ Skipping `/frame` for ANY track (Nano/Core/Extended/Critical) — ДИРЕКТИВА v8.0.2. Для Nano/Core допускается сокращённый формат Frame.
- ❌ Routing without human gate approval

## Context Budget
- **Class: Light to Medium** — Check `PROJECT_BRAIN.yaml`, read change card, framing artifacts, score table. ⛔ DO NOT perform heavy architecture scans.
