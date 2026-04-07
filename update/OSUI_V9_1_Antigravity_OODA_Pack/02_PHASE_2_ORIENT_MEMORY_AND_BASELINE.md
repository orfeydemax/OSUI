# Фаза 2 — ORIENT: память проекта и baseline живой системы

## Цель
Собрать **рабочую память проекта** и минимальный baseline existing system, чтобы агент перестал жить догадками.

## Почему эта фаза обязательна
Если нет repo-local памяти и baseline existing system, любой `/enhance` по живой системе остаётся лотереей.

## Что нужно сделать

### 1. Создать или довести до рабочего состояния:
- `PROJECT_BRAIN.yaml`
- `AGENTS.md`
- `docs/00_Registry/PRODUCT_SURFACE_STATE.yaml`
- `docs/00_Registry/SITE_HISTORY_LOG.md`

### 2. Создать новые шаблоны:
- `docs/_templates/current_reality_snapshot.yaml`
- `docs/_templates/protected_behavior_contract.md`
- `docs/_templates/removal_delta.md`
- `docs/_templates/regression_guard_matrix.md`
- `docs/_templates/harness_gap_report.md`

### 3. Создать новый registry:
- `docs/00_Registry/HARNESS_CAPABILITIES.yaml`

## Обязательные поля `PROJECT_BRAIN.yaml`
```yaml
project_name:
current_prod_version:
current_prod_commit_or_tag:
last_verified_baseline_at:
last_verified_baseline_source:
key_user_flows: []
protected_capabilities: []
active_ui_surfaces: []
known_couplings: []
active_risks: []
latest_decisions: []
source_of_truth_docs: []
active_changes: []
completed_changes: []
last_updated:
```

## Обязательные capability в `HARNESS_CAPABILITIES.yaml`
- `capture_baseline`
- `replay_protected_flow`
- `run_targeted_verify`
- `collect_surface_diff`
- `validate_registry_freshness`
- `emit_release_trace`

## Что должен сделать Antigravity
1. Не просто создать файлы-заглушки.
2. Заполнить минимально рабочий скелет.
3. Прописать в `AGENTS.md`, что читать первым.
4. Явно указать, что `CHANGELOG.md` не равен памяти текущего сайта.
5. Указать, где baseline, где protected behavior, где routing/verify/release rules.

## Что создать в конце фазы
Создай файл:

`docs/In_Progress/CHG-V9_1-ORIENT-MEMORY-BASELINE.md`

В нём:
- что создано;
- что обновлено;
- какие поля заполнены пока частично;
- какие registries ещё требуют человека.

## Что запрещено
- нельзя оставлять `PROJECT_BRAIN.yaml` как «focus + risks»;
- нельзя делать `AGENTS.md` энциклопедией;
- нельзя считать changelog достаточной памятью.

## Done Criteria
Фаза завершена только если:
- созданы memory-файлы;
- есть шаблоны baseline/protected/removal/regression;
- создан registry capability;
- `AGENTS.md` действительно навигационный и короткий.
