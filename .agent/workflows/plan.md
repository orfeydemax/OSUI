---
description: Structured planning — translate clay draft into a mature change task with economics, passport, and AI governance (V8 §10.2, §11)
---

# /plan — Change Clarification and Planning

> V8 Lifecycle Stage: **Clarification → Plan**
> Reference: §10.2, §11

## Purpose

Translate a raw draft from `/clay` into a structured, mature change task. This includes economic justification, scope assessment, risk profiling, and AI governance baseline.

## Prerequisites
- Change exists in `docs/Planned/Clay/` (created by `/clay`)
- `stage: clay` or `stage: clarification`

## Steps

### 1. Product Economics Gate (§11.1)
Use template: `docs/_templates/economics_gate.yaml`
- Problem or opportunity
- Who wins
- User value
- Business value
- Cost of inaction
- Expected success signal
- Owner approval

### 2. Change Passport (§11.2)
Use template: `docs/_templates/change_passport.yaml`
- Change type and scope
- Touched entities, roles, interfaces, data, services, modules
- Risk levels: history, client, business, production
- Initial track guess

### 3. AI Governance Gate (§11.3)
Update Change Card:
- `human_owner:` — confirmed
- `ai_operator:` — if applicable
- `ai_mode:` — human_only / ai_assisted / ai_heavy
- `ai_evidence_log_required:` — true/false
- Define: where AI can act alone, where AI can only propose, where AI is forbidden

### 4. Role Compression Declaration (§11.4)
If one person holds multiple roles:
- Document which functions are combined
- Where independent approval is needed
- Whether conflict of review exists

### 5. Scope Check
Verify all fields in the Change Card are populated:
- `summary`, `problem_statement`, `expected_outcome`
- `failure_definition`, `what_must_not_break`
- All `touched_*` fields

### 6. Determine Framing Requirement
Based on track guess and scope:
- `framing_required: true` if Extended+, user scenario changes, document conflicts, role/status changes
- `framing_required: false` if Nano-eligible or clearly local Core change

### 7. Clarification Loop
If data is insufficient:
- Ask specific questions to the human owner
- Do not proceed until abort conditions are cleared (§11.5)

### 8. Abort Conditions (§11.5)
Work CANNOT continue if:
- No human owner
- No change meaning
- No scope defined
- Cannot assess risk
- Unclear which contour is affected
- Unknown what must not break
- Hidden history impact masked as "small fix"

### 9. Update Change Card
- `stage: plan`
- Move files to `docs/Planned/Queue/` when ready for routing

## Output
- Economics Gate (completed)
- Change Passport (completed)
- Updated Change Card with all plan fields
- Framing requirement decision
- Change moved to `docs/Planned/Queue/`

## Next Step
- If `framing_required: true` → `/frame`
- If `framing_required: false` → `/route`

## Context Budget
- **Class: Medium** — Check `PROJECT_BRAIN.yaml`, read explicit change card and clay summary. Conditionally read relevant context docs ONLY if requested/required.
