# CHG-V9_1-PILOT-2 — Пилотный brownfield change (честный)

## Change Card

```yaml
chg_id: CHG-V9_1-PILOT-2
title: "Встроить CHANGELOG check в emit_release_trace.py (closure W-12)"
type: enhancement
track: pending_route
score: pending
status: in_progress
stage: route

created: 2026-04-08
owner: MAX

surfaces_affected:
  - .agent/scripts/emit_release_trace.py

scope:
  what_changes:
    - "Новая функция check_changelog_updated(): проверяет, изменился ли CHANGELOG.md после baseline capture"
    - "Новое поле в release_trace JSON: changelog_check: {status, warning}"
    - "Warning output в stdout при stale CHANGELOG"
  what_stays:
    - "Существующий JSON output формат (release_trace root key)"
    - "Все существующие поля: chg_id, released_at, git_commit, git_tag, verdict, perimeter, memory_sync, surfaces, removals, baseline_ref"
    - "Все существующие CLI args: --change-id, --verdict, --perimeter, --memory-sync, --surfaces, --removals"
    - "Exit code: 0 (always)"
    - "Output path: .tmp/traces/{change_id}_release_trace.json"
  removals: none

why_not_toy:
  - "Модификация working Python скрипта — реальный код, не YAML/MD"
  - "Скрипт используется в release pipeline — поломка = broken release"
  - "Closure реальной weakness W-12 обнаруженной только на пилоте"
  - "Coupling: emit_release_trace ↔ CHANGELOG.md ↔ capture_baseline"
```
