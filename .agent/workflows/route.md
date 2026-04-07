---
description: Pre-routing gates, track selection, and routing decision (V9.1 §10.5, §15, §16)
---

# /route — Track Selection and Routing

> V9.1 Lifecycle Stage: **Route**
> Reference: §10.5, §15, §16, §17

## Purpose

Validate pre-conditions for safe change execution, choose the correct track (Nano/Core/Extended/Critical/Hotfix), calculate the routing score, determine required artifacts, and document the routing decision.

## Steps

### 0. Pre-Routing Gates (V9.1)

Before track selection, execute three mandatory checks.

#### 0a. Harness Capability Check
Read `docs/00_Registry/HARNESS_CAPABILITIES.yaml`. For this change, verify:
- `capture_baseline`: can we snapshot current state? → `yes` / `partial` / `no`
- `replay_protected_flow`: can we verify protected behaviors? → `yes` / `partial` / `no`
- `run_targeted_verify`: can we run targeted verification? → `yes` / `partial` / `no`

If ANY required capability = `no` → flag `harness_gap: true` in routing decision.
If `capture_baseline` = `no` AND change is brownfield `/enhance` → **escalate to Extended+ minimum**.

#### 0b. Baseline Confidence Check
- Does `docs/00_Registry/PRODUCT_SURFACE_STATE.yaml` exist and contain current state? → `yes` / `stale` / `missing`
- Does a `protected_behavior_contract.md` exist for affected surface? → `yes` / `no`
- Is `PROJECT_BRAIN.yaml` → `baseline_repo_commit` current? → `yes` / `drift`

If baseline = `missing` → **STOP. Cannot route without baseline.**
If baseline = `stale` → update baseline first, then continue routing.

#### 0c. Agent Legibility Check
For the change target, verify:
- [ ] Target code/files readable by AI (not binary, not encrypted)
- [ ] Verify path exists (how to confirm the change works)
- [ ] Trace/log path exists (how to observe the change in production)

Output:
- `agent_fit: high | medium | low`
- `paired_mode_required: true | false` (if low → human must co-pilot)
- `manual_first_required: true | false` (if no verify path → human verifies first)

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

### 4. Check Forced Escalation (§15.3 + V9.1)

Even with low score, escalate to Extended+ if:

**V8 escalation triggers:**
- Roles, rights, RLS, auth affected
- History impacted
- Old data reading model changed
- Backup/restore contour affected
- Product or architectural conflict exists
- Framing contradictions unresolvable at current level

**V9.1 brownfield escalation triggers:**
- Removal of existing behavior (UI element, API endpoint, feature) → **Extended+ minimum**
- Change to visible user flow (navigation, main screen layout, booking path) → **Extended+ minimum**
- Unknown coupling detected (change touches module with undocumented dependencies) → **Extended+ minimum**
- No `protected_behavior_contract.md` for affected shared UI surface → **Extended+ minimum**

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
- `harness_check_result` (V9.1 — from Step 0a)
- `baseline_confidence` (V9.1 — from Step 0b)
- `agent_fit` (V9.1 — from Step 0c)

### 7. Update Change Card
- `track: <selected>`
- `routing_score: <score>`
- `routing_score_reasoning: <reasoning>`
- `stage: route` (NOT `build` — stage changes ONLY after human approval)
- `gates.track_approval: pending_human`

### ⛔ STOP — Track Approval Gate (W-11 enforcement)

**AI MUST stop here.** Do NOT proceed to `/build`, `/enhance`, or `/create`.

Present to the human:
1. Selected track and score
2. Routing score reasoning
3. Pre-routing gate results (Step 0a–0c)
4. Required artifacts list
5. Forced escalation triggers (if any)

**Wait for human response:**
- `approved` → set `gates.track_approval: approved`, set `stage: build`, proceed to `/build`
- `rejected` → return to `/frame` or `/plan`
- `escalated` → escalate track, re-run Step 3–4

**This is a Human Gate. AI cannot close it. AI cannot assume approval.**
**Two consecutive pilots (CHG-V9_1-PILOT, CHG-V9_1-PILOT-2) violated this gate. This STOP exists to prevent recurrence.**


## Output
- Routing Decision Record (`routing_decision.yaml`)
- Updated Change Card with track, score, and artifacts list
- Human approval for track

## Forbidden
- ❌ Assigning a track without the routing score
- ❌ Nano Track if any disqualifying criterion exists
- ❌ Skipping `/frame` for ANY track (Nano/Core/Extended/Critical) — ДИРЕКТИВА v8.0.2. Для Nano/Core допускается сокращённый формат Frame.
- ❌ Routing without human gate approval
- ❌ Skipping pre-routing gates (Step 0) — ДОБАВЛЕНО v9.1
- ❌ Brownfield `/enhance` with `capture_baseline: no` on Core track — must escalate to Extended+ — ДОБАВЛЕНО v9.1
- ❌ Removal change on Nano/Core track — must escalate to Extended+ — ДОБАВЛЕНО v9.1

## Context Budget
- **Class: Light to Medium** — Check `PROJECT_BRAIN.yaml`, read change card, framing artifacts, score table, `HARNESS_CAPABILITIES.yaml`, `PRODUCT_SURFACE_STATE.yaml`. ⛔ DO NOT perform heavy architecture scans.

