# Фаза 6 — ACT: scripts, sandbox и минимальный исполнимый harness

## Цель
Сделать так, чтобы V9.1 была не только документом, но и **реальным исполнимым контуром**.

## Что создать
### Новый rules-файл
- `.agent/rules/SANDBOX_FIRST.md`

### Новый scripts minimum set
- `.agent/scripts/capture_baseline.py`
- `.agent/scripts/replay_protected_flow.py`
- `.agent/scripts/collect_surface_diff.py`
- `.agent/scripts/check_registry_freshness.py`
- `.agent/scripts/emit_release_trace.py`

## Принцип SANDBOX_FIRST
Любая операция build/test/replay/install/preview сначала идёт в sandbox/devcontainer/temp workspace.  
Выход в host/prod контур — только после ask-first и отдельного обоснования.

## Что должен делать каждый script
### capture_baseline.py
- собирать screenshot/DOM/API-state baseline;
- привязывать baseline к `change_id` и surface.

### replay_protected_flow.py
- проигрывать критический защищённый сценарий;
- возвращать structured pass/fail.

### collect_surface_diff.py
- собирать before/after diff по surface и visible actions.

### check_registry_freshness.py
- проверять stale state по registry-файлам;
- валить release при критическом drift.

### emit_release_trace.py
- связывать `change_id`, baseline refs, verify refs и release tag.

## Что допускается
Если весь набор сразу не готов, Antigravity имеет право:
- сначала сделать working stub only for non-critical scripts;
- но `capture_baseline.py` и `emit_release_trace.py` должны получить хотя бы минимально рабочую реализацию.

## Что запрещено
- нельзя писать “automation complete”, если это только обещание;
- нельзя прятать отсутствие scripts за красивыми документами;
- нельзя разрешать privileged execution как default.

## Что создать в конце фазы
Создай файл:

`docs/In_Progress/CHG-V9_1-ACT-SCRIPTS-SANDBOX.md`

## Done Criteria
Фаза завершена только если:
- создан SANDBOX_FIRST rule;
- есть минимум один реально запускаемый baseline/trace path;
- capability registry отражает фактическую, а не выдуманную готовность.
