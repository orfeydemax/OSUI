---
description: Release a change with observation contract, memory sync, and documentation update (V9.1 §10.8, §29)
---

# /release — Release, Memory Sync, and Observation

> V9.1 Lifecycle Stage: **Release → Observation → Normalization → Done**
> Reference: §10.8, §29

## Purpose

Release the change to production (or target environment), synchronize product memory, establish the observation contract, update documentation, and close the change lifecycle.

## Prerequisites
- `verification_verdict: pass|pass_with_waiver`
- `gates.verification_go: approved`

## Steps

### 1. Pre-Release Checks (§29.1)
- [ ] Release approval obtained
- [ ] Rollback/restore plan clear (if stateful change)
- [ ] Release Note prepared
- [ ] Observation owner assigned
- [ ] Documentation update plan ready

### 2. Release Memory Sync Check (V9.1)

> **ОБЯЗАТЕЛЬНО.** Без memory sync нельзя закрыть change.

Before release, verify all product memory is current:

| Memory file | Check | Status |
|-------------|-------|--------|
| `docs/00_Registry/PRODUCT_SURFACE_STATE.yaml` | Reflects new/changed surfaces, removed surfaces marked | `updated` / `no_change` / `stale` |
| `docs/00_Registry/SITE_HISTORY_LOG.md` | New entry added if: incident, rollback, significant event occurred during build | `updated` / `no_change` / `not_applicable` |
| `PROJECT_BRAIN.yaml` | Updated if: new module, new technology, architecture decision, stage change | `updated` / `no_change` |
| `docs/00_Registry/HARNESS_CAPABILITIES.yaml` | Updated if: new harness capability added or existing one changed | `updated` / `no_change` |

**Stops:**
- `PRODUCT_SURFACE_STATE.yaml` = `stale` → **STOP. Update surface state first.**
- `PROJECT_BRAIN.yaml` stage/modules outdated → **STOP. Update brain first.**

Record in Change Card:
```yaml
memory_sync:
  product_surface_state: updated | no_change
  site_history_log: updated | no_change | not_applicable
  project_brain: updated | no_change
  harness_capabilities: updated | no_change
  sync_status: complete | incomplete
```

### 3. Create Release Note
Use template: `docs/_templates/release_note.md`
- What was released
- Where released
- Risk level
- Observation owner
- Normal signal (what indicates success)
- Escalation trigger (what triggers rollback/investigation)

### 4. Create Release Trace (V9.1)

Record a release trace entry:
```yaml
release_trace:
  chg_id: {CHG-ID}
  released_at: {timestamp}
  released_by: {who}
  verification_verdict: {pass | pass_with_waiver}
  protected_perimeter_status: {intact | partial | not_applicable}
  memory_sync_status: {complete | incomplete}
  surfaces_affected: [{list}]
  removals: [{list} | none]
```

This trace is stored in the Change Card and referenced in CHANGELOG.md.

### 5. Human Gate: Release Approval
- `gates.release_approval: pending_human`
- Present release note, memory sync status, and risk assessment
- If approved → execute release
- If rejected → return to `/build` or `/verify`

### 6. Execute Release
- Deploy to target environment
- Update `stage: release`
- Record release timestamp

### 7. Establish Observation Contract (§29.2)
Define:
- `observation_owner`
- `observation_window` (timeframe)
- Normal signals (expected behavior)
- Escalation triggers (anomaly indicators)
- Closure criteria (when observation can end)

### 8. Monitor and Observe
- `observation_status: in_progress`
- If normal signals present → proceed to closure
- If escalation trigger fires → investigate, potentially rollback

### 9. Documentation Update (§29.3)
Use template: `docs/_templates/documentation_update_note.md`
- Which documents were updated
- Which were intentionally not updated (and why)
- Confirmation that official state is current

### 10. Normalization (§29.4, if applicable)
Required if:
- Change went through hotfix contour
- Temporary compromise was made
- Managed debt was created
- Documents simplified for speed
- Exception that can't remain permanent

If normalization needed:
- `normalization_status: planned|in_progress|closed`
- Record in `docs/00_Registry/normalization_debt_register.md`

### 11. Close Change
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

### 11.5 Update CHANGELOG (ОБЯЗАТЕЛЬНО)
- Добавить запись в `docs/CHANGELOG.md` в секцию текущего месяца
- Формат записи строго:
```markdown
### {CHG-ID} | {Track} | ✅ Done | {Дата}
**Тема:** {Краткое описание в 1 строку}
**Файлы:** {Затронутые модули через запятую}
**Результат:** {Что изменилось для пользователя/системы}
```
- Если секции текущего месяца нет → создать её

### 11.6 Git Tag (если Git инициализирован)
- Закоммитить финальное состояние: `git add . && git commit -m "✅ release: {CHG-ID} — {краткое описание}"`
- Создать тег: `git tag -a "release/{CHG-ID}" -m "{summary из change_card}"`
- Push: `git push origin main --tags` (если remote настроен)

### 11.7 Обновить PROJECT_BRAIN.yaml (ОБЯЗАТЕЛЬНО)
- Перенести CHG из `active_changes` в `completed_changes`
- Если принято архитектурное решение → добавить в `decisions` (новый ADR)
- Если добавлена новая технология → обновить `stack`
- Если добавлен новый модуль → обновить `architecture.core_modules`
- Обновить `last_updated` на текущую дату
- **Файл должен оставаться компактным: ≤100 строк, ≤1 500 токенов**

## Output
- Release Note
- Release Trace (V9.1)
- Memory Sync Record (V9.1)
- Documentation Update Note
- Observation record
- Normalization record (if applicable)
- Change Card with `stage: done`
- **CHANGELOG.md updated**
- **Git tag created** (if git initialized)

## Forbidden
- ❌ `Release → Done` without observation or explicit `observation_not_required`
- ❌ Closing change without documentation update
- ❌ Skipping normalization after hotfix
- ❌ **Moving root infrastructure folders** (like `docs/Clay`) into `docs/Done/`. Only exact CHG-* folders may be archived.
- ❌ **Closing change without updating `docs/CHANGELOG.md`**
- ❌ **Closing change without Memory Sync Check (Step 2)** (v9.1)
- ❌ **Releasing with `PRODUCT_SURFACE_STATE.yaml` = stale** (v9.1)
- ❌ **Closing change without release trace** (v9.1)

## Context Budget
- **Class: Medium** — read change card, verification evidence, deployment config, PRODUCT_SURFACE_STATE.yaml, PROJECT_BRAIN.yaml
