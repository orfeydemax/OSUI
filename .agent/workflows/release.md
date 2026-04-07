---
description: Release a change with observation contract and documentation update (V8 §10.8, §29)
---

# /release — Release and Observation

> V8 Lifecycle Stage: **Release → Observation → Normalization → Done**
> Reference: §10.8, §29

## Purpose

Release the change to production (or target environment), establish the observation contract, update documentation, and close the change lifecycle.

## Prerequisites
- `verification_verdict: pass|pass_with_conditions`
- `gates.verification_go: approved`

## Steps

### 1. Pre-Release Checks (§29.1)
- [ ] Release approval obtained
- [ ] Rollback/restore plan clear (if stateful change)
- [ ] Release Note prepared
- [ ] Observation owner assigned
- [ ] Documentation update plan ready

### 2. Create Release Note
Use template: `docs/_templates/release_note.md`
- What was released
- Where released
- Risk level
- Observation owner
- Normal signal (what indicates success)
- Escalation trigger (what triggers rollback/investigation)

### 3. Human Gate: Release Approval
- `gates.release_approval: pending_human`
- Present release note and risk assessment
- If approved → execute release
- If rejected → return to `/build` or `/verify`

### 4. Execute Release
- Deploy to target environment
- Update `stage: release`
- Record release timestamp

### 5. Establish Observation Contract (§29.2)
Define:
- `observation_owner`
- `observation_window` (timeframe)
- Normal signals (expected behavior)
- Escalation triggers (anomaly indicators)
- Closure criteria (when observation can end)

### 6. Monitor and Observe
- `observation_status: in_progress`
- If normal signals present → proceed to closure
- If escalation trigger fires → investigate, potentially rollback

### 7. Documentation Update (§29.3)
Use template: `docs/_templates/documentation_update_note.md`
- Which documents were updated
- Which were intentionally not updated (and why)
- Confirmation that official state is current

### 8. Normalization (§29.4, if applicable)
Required if:
- Change went through hotfix contour
- Temporary compromise was made
- Managed debt was created
- Documents simplified for speed
- Exception that can't remain permanent

If normalization needed:
- `normalization_status: planned|in_progress|closed`
- Record in `docs/00_Registry/normalization_debt_register.md`

### 9. Close Change
- `stage: done`
- All gates closed
- Source-of-truth document reflects final state
- Derived registries synchronized
- **Физически переместить папку CHG из `In_Progress` в `Done`:**
  ```powershell
  Move-Item 'docs\In_Progress\{CHG-ID}' 'docs\Done\{CHG-ID}' -Force
  ```
- **Обновить `source_of_truth` в `change_card.yaml`:**
  ```yaml
  source_of_truth: docs/Done/{CHG-ID}/change_card.yaml
  ```
- Только конкретная папка `CHG-*`. Никогда не перемещать системные папки (`Clay`, `00_Registry`).

### 9.5 Update CHANGELOG (ОБЯЗАТЕЛЬНО)
- Добавить запись в `docs/CHANGELOG.md` в секцию текущего месяца
- Формат записи строго:
```markdown
### {CHG-ID} | {Track} | ✅ Done | {Дата}
**Тема:** {Краткое описание в 1 строку}
**Файлы:** {Затронутые модули через запятую}
**Результат:** {Что изменилось для пользователя/системы}
```
- Если секции текущего месяца нет → создать её

### 9.6 Git Tag (если Git инициализирован)
- Закоммитить финальное состояние: `git add . && git commit -m "✅ release: {CHG-ID} — {краткое описание}"`
- Создать тег: `git tag -a "release/{CHG-ID}" -m "{summary из change_card}"`
- Push: `git push origin main --tags` (если remote настроен)

### 9.7 Обновить PROJECT_BRAIN.yaml (ОБЯЗАТЕЛЬНО) ← NEW v8.0.5
- Перенести CHG из `active_changes` в `completed_changes`
- Если принято архитектурное решение → добавить в `decisions` (новый ADR)
- Если добавлена новая технология → обновить `stack`
- Если добавлен новый модуль → обновить `architecture.core_modules`
- Обновить `last_updated` на текущую дату
- **Файл должен оставаться компактным: ≤100 строк, ≤1 500 токенов**

## Output
- Release Note
- Documentation Update Note
- Observation record
- Normalization record (if applicable)
- Change Card with `stage: done`
- **CHANGELOG.md updated** ← NEW
- **Git tag created** ← NEW (if git initialized)

## Forbidden
- ❌ `Release → Done` without observation or explicit `observation_not_required`
- ❌ Closing change without documentation update
- ❌ Skipping normalization after hotfix
- ❌ **Moving root infrastructure folders** (like `docs/Clay`) into `docs/Done/`. Only exact CHG-* folders may be archived.
- ❌ **Closing change without updating `docs/CHANGELOG.md`** ← NEW

## Context Budget
- **Class: Medium** — read change card, verification evidence, deployment config
