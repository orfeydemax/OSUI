---
description: Collect evidence and produce a verification verdict (V9.1 §10.7, §28)
---

# /verify — Verification and Evidence

> V9.1 Lifecycle Stage: **Verify**
> Reference: §10.7, §28

## Purpose

Collect evidence that the change works as intended, verify that protected behaviors remain intact, and produce a formal verdict.

## Prerequisites
- `/build` completed (enhance, create, or debug)
- Change Card updated with `next_action: verify`

## Steps

### 1. Select Verification Method by Track

| Track | Method | Template |
|-------|--------|----------|
| Nano | Quick Verify | `quick_verify.md` |
| Core | Verification Checklist | `verification_checklist.md` |
| Extended | Verification Matrix | `verification_matrix.md` |
| Critical | Verification Matrix + Staging Evidence + Recovery Proof | `verification_matrix.md` |
| Hotfix | Verification Evidence (minimal but traceable) | `verification_checklist.md` |

### 2. Check Protected Perimeter (V9.1)

> **ОБЯЗАТЕЛЬНО.** Без этого шага verdict не может быть `pass`.

If a `protected_behavior_contract.md` exists for this change:
1. Read the contract
2. For EACH listed behavior:
   - [ ] Verify the behavior still works (test / manual / screenshot / log)
   - [ ] Record evidence for each behavior
   - [ ] Result per behavior: `preserved` / `degraded` / `broken`
3. Summary:
   - `protected_perimeter_status: intact | partial | breached`

**Stops:**
- ANY behavior = `broken` → verdict = `fail`, return to `/build`
- ANY behavior = `degraded` → verdict cannot be `pass`, only `pass_with_waiver` (if degradation is acknowledged by human)
- Contract missing for shared surface enhance → **STOP. Cannot verify. Return to `/build` Step 3.**

If no protected_behavior_contract exists (new feature / non-shared surface):
- `protected_perimeter_status: not_applicable`
- Proceed to Step 3

### 3. Verify New Target Behavior

For each verification item:
- What was checked
- How it was checked (test / manual / staging / screenshot / log / scenario)
- Evidence reference (link, file, screenshot)
- Result: pass / fail
- Who acknowledged the result

### 4. Check Removal Side-Effects (V9.1)

If a `removal_delta.md` exists for this change:
- [ ] Each removed behavior was intentionally removed (not accidentally)
- [ ] No neighboring functionality was silently broken by removal
- [ ] Replacement behavior (if any) works as documented
- `removal_verified: true | false`

If no removal_delta.md exists:
- `removal_verified: not_applicable`

### 5. Collect Before/After Evidence (V9.1)

For brownfield `/enhance` changes:
- [ ] Before state captured (from Current Reality Snapshot or baseline)
- [ ] After state captured (current implementation)
- [ ] Delta between before/after matches declared scope
- [ ] No undeclared changes detected

**If before/after evidence incomplete for brownfield enhance → verdict cannot be `pass`, only `pass_with_waiver`.**

For new features (`/create`):
- Before/after evidence not required (no prior state)

### 6. Assess Harness Sufficiency (V9.1)

Check: was the verification performed with sufficient harness?
- [ ] All required harness capabilities available (`HARNESS_CAPABILITIES.yaml`)
- [ ] If `replay_protected_flow: no` → manual verification was performed instead
- [ ] If `run_targeted_verify: no` → alternative evidence collected
- `harness_sufficient: true | false`

**If `harness_sufficient: false` AND no alternative evidence was collected → verdict = `fail_harness_insufficient`. Return to human for decision.**

### 7. Evidence Requirements (§28.2)
Evidence must be:
- **Complete** — covers the declared scope
- **Traceable** — links to specific artifacts
- **Reproducible** — can be re-verified
- **Owner-acknowledged** — human confirmed validity
- **Contradiction-aware** — checked for conflicts with existing behavior

### 8. Evidence Classes (§28.3)
Do not mix:
- Verification evidence (does it work?)
- Release evidence (is it safe to release?)
- Observation evidence (is it working in production?)
- Recovery evidence (can we roll back?)

### 9. Produce Verdict (V9.1)

| Verdict | When |
|---------|------|
| `pass` | All checks passed + protected perimeter intact + no removal issues + harness sufficient |
| `pass_with_waiver` | Passed with known limitations: degraded protected behavior (acknowledged), insufficient harness (documented), or partial before/after evidence |
| `fail` | Critical issues found, or protected behavior broken → return to `/build` |
| `fail_harness_insufficient` | Cannot produce reliable verdict because harness capabilities are missing. Document what is missing, return to human for decision. |

**Rules:**
- `pass` REQUIRES `protected_perimeter_status: intact` or `not_applicable`
- `pass` REQUIRES `removal_verified: true` or `not_applicable`
- `pass` REQUIRES complete before/after evidence (for brownfield enhance)
- `pass_with_waiver` REQUIRES a waiver record with:
  - `waiver_reason`: what limitation exists
  - `waiver_owner`: who owns the risk
  - `waiver_approved_by`: human approval reference (name or gate ID)
  - `waiver_closure_condition`: when/how this waiver can be closed
- `fail_harness_insufficient` REQUIRES list of missing capabilities

### 10. Update Change Card
- `verification_verdict: pass | pass_with_waiver | fail | fail_harness_insufficient`
- `protected_perimeter_status: intact | partial | breached | not_applicable`
- `stage: verify → release` (if passed or pass_with_waiver)
- `gates.verification_go: pending_human`

### 11. Human Gate: Verification Go/No-Go
Present verification evidence to human owner.
- If approved → proceed to `/release`
- If rejected → return to `/build` with feedback

## Output
- Completed verification artifact (Quick Verify / Checklist / Matrix)
- Protected perimeter check results (per-behavior evidence)
- Removal verification results (if applicable)
- Before/after evidence (for brownfield enhance)
- Harness sufficiency assessment
- Verification verdict
- Updated Change Card
- Human approval for release

## Forbidden
- ❌ Releasing without verification evidence
- ❌ Self-approving verification on high-risk tracks
- ❌ Empty verification forms ("everything works" without trace)
- ❌ Verdict `pass` when protected perimeter not checked (v9.1)
- ❌ Verdict `pass` when protected behavior is `degraded` or `broken` (v9.1)
- ❌ Skipping removal side-effect check when `removal_delta.md` exists (v9.1)
- ❌ Claiming harness sufficiency without checking `HARNESS_CAPABILITIES.yaml` (v9.1)

## Context Budget
- **Class: Medium to Heavy** — read change card, implementation artifacts, test results, protected_behavior_contract, removal_delta, current_reality_snapshot, HARNESS_CAPABILITIES.yaml
