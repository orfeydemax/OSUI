---
description: Collect evidence and produce a verification verdict (V8 §10.7, §28)
---

# /verify — Verification and Evidence

> V8 Lifecycle Stage: **Verify**
> Reference: §10.7, §28

## Purpose

Collect evidence that the change works as intended and produce a formal verdict.

## Steps

### 1. Select Verification Method by Track

| Track | Method | Template |
|-------|--------|----------|
| Nano | Quick Verify | `quick_verify.md` |
| Core | Verification Checklist | `verification_checklist.md` |
| Extended | Verification Matrix | `verification_matrix.md` |
| Critical | Verification Matrix + Staging Evidence + Recovery Proof | `verification_matrix.md` |
| Hotfix | Verification Evidence (minimal but traceable) | `verification_checklist.md` |

### 2. Execute Verification
For each verification item:
- What was checked
- How it was checked (test / manual / staging / screenshot / log / scenario)
- Evidence reference (link, file, screenshot)
- Result: pass / fail
- Who acknowledged the result

### 3. Evidence Requirements (§28.2)
Evidence must be:
- **Complete** — covers the declared scope
- **Traceable** — links to specific artifacts
- **Reproducible** — can be re-verified
- **Owner-acknowledged** — human confirmed validity
- **Contradiction-aware** — checked for conflicts with existing behavior

### 4. Evidence Classes (§28.3)
Do not mix:
- Verification evidence (does it work?)
- Release evidence (is it safe to release?)
- Observation evidence (is it working in production?)
- Recovery evidence (can we roll back?)

### 5. Produce Verdict
- `pass` — all checks passed
- `pass_with_conditions` — passed with known limitations (documented)
- `fail` — critical issues found → return to `/build`

### 6. Update Change Card
- `verification_verdict: pass|pass_with_conditions|fail`
- `stage: verify → release` (if passed)
- `gates.verification_go: pending_human`

### 7. Human Gate: Verification Go/No-Go
Present verification evidence to human owner.
- If approved → proceed to `/release`
- If rejected → return to `/build` with feedback

## Output
- Completed verification artifact (Quick Verify / Checklist / Matrix)
- Verification verdict
- Updated Change Card
- Human approval for release

## Forbidden
- ❌ Releasing without verification evidence
- ❌ Self-approving verification on high-risk tracks
- ❌ Empty verification forms ("everything works" without trace)

## Context Budget
- **Class: Medium** — read change card, implementation artifacts, test results
