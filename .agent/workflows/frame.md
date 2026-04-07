---
description: Methodological framing — convert "seemingly clear" tasks into honestly understood changes (V8 §10.3, §12)
---

# /frame — Methodological Framing

> V8 Lifecycle Stage: **Framing**
> Reference: §10.3, §12

## Purpose

Convert a "seemingly clear" task into an honestly understood change that can be legitimately routed. Protects against false clarity, beautiful but wrong problem statements, and premature routing.

## When Required

> **ДИРЕКТИВА v8.0.2: Frame ОБЯЗАТЕЛЕН для всех стандартных воронок.**

- **Mandatory (полный формат)**: Extended Track, Critical Track, любое изменение, затрагивающее пользовательские сценарии, документы, роли/статусы/жизненные циклы
- **Mandatory (сокращённый формат)**: Nano Track, Core Track — допускается упрощённый Briefing Checklist и Six Hats в сокращённом формате. Сокращённый формат включает: Brief Origin Gate + Problem Framing Note + Framing Verdict. Six Hats может быть в формате «3 ключевых риска + вердикт».
- **Единственное исключение**: Hotfix Track при Production Incident — Frame пропускается, выполняется ретроспективно после стабилизации

## Steps

### 1. Brief Origin Gate
Answer:
- Where did the task formulation come from?
- Who formulated the change?
- What facts/observations/complaints/signals is it based on?
- Where is distorting interpretation possible?
- How reliable is the source?
- Primary signal: pain / bug / goal / hypothesis / order / incident / observation

### 2. Run Briefing Checklist
Use template: `docs/_templates/briefing_checklist.md`
- Verify all 12 checkpoints are answered
- Flag any unanswered items as blockers

### 3. Create Problem Framing Note
Use template: `docs/_templates/problem_framing_note.md`
- Problem statement
- Proposed change
- What must not break
- Key assumptions
- Contradiction seeds
- Open questions
- Framing verdict: `ready_for_routing` / `return_to_clarification` / `escalate`

### 4. Execute Six Hats Review
Use template: `docs/_templates/six_hats_review.md`
- White Hat: facts and evidence
- Red Hat: intuition and emotional signals
- Black Hat: risks and failure points
- Yellow Hat: benefits and positive potential
- Green Hat: alternatives and better options
- Blue Hat: management conclusion

Shortened format allowed for Core Track only if: change is local, no product conflict, no history/data/access impact.

### 5. CJM / Product Flow Delta (if applicable)
Use template: `docs/_templates/cjm_product_flow_delta.md`
Required if change affects: user path, screen sequence, decision points, role behavior, visible status transitions.

### 6. Brainstorm (if needed)
If the task is raw, contradictory, or multi-variant → run `/brainstorm` as sub-process.

### 7. Collect Seeds
- Contradiction seeds
- Assumption seeds
- Trade-off seeds
- Track impact notes

### 8. Framing Verdict
Update `change_card.yaml`:
- `framing_status: completed`
- `brief_origin_status: approved|rejected|escalated`
- `six_hats_status: completed|waived`
- `cjm_product_flow_delta_status: completed|not_required`

Decide: proceed to `/route` / return to `/plan` / escalate

## Output
- Problem Framing Note
- Briefing Checklist (completed)
- Six Hats Review
- CJM / Product Flow Delta (if applicable)
- Updated Change Card with framing fields

## Forbidden
- ❌ Routing a change that failed framing
- ❌ Skipping Six Hats on Extended/Critical tracks
- ❌ Marking framing complete without answering the Briefing Checklist

## Context Budget
- **Class: Medium to Heavy** — read change card, relevant source-of-truth docs, affected modules
