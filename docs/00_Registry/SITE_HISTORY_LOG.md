# SITE_HISTORY_LOG.md — Лог истории живой системы

> Назначение: фиксация фактических событий, которые не попали в CHANGELOG.
> CHANGELOG = релизы CHG. SITE_HISTORY_LOG = реальные инциденты, откаты, внешние события.
> Обновляется при: инцидентах, откатах, миграциях, внешних воздействиях.

---

## Формат записи

```
### YYYY-MM-DD | Тип | Severity
**Событие:** краткое описание
**Причина:** что вызвало
**Последствия:** что изменилось
**Артефакты:** ссылки на файлы/логи
```

---

## Лог

### 2026-04-08 | Init | Info
**Событие:** Создан SITE_HISTORY_LOG.md в рамках Phase 2 миграции V9.1
**Причина:** Phase 1 аудит показал отсутствие памяти о реальных событиях системы
**Последствия:** Установлен формат для фиксации инцидентов и внешних событий
**Артефакты:** `docs/In_Progress/CHG-V9_1-OBSERVE-REPO-AUDIT.md`

### 2026-04-08 | Pilot Change | Info
**Событие:** CHG-V9_1-PILOT — первый brownfield change по V9.1 контуру
**Причина:** Phase 7 — пилотная проверка нового контура (route → enhance → verify → release)
**Последствия:** PRODUCT_SURFACE_STATE.yaml обновлён (scripts 5→10, protected behaviors 5→9, version alpha→beta)
**Артефакты:** `docs/In_Progress/CHG-V9_1-PILOT/` (change_card, reality snapshot, contract, verify evidence)

### 2026-04-08 | Pilot-2 Change | Info
**Событие:** CHG-V9_1-PILOT-2 — честный brownfield pilot (модификация emit_release_trace.py)
**Причина:** Phase 7 — W-12 closure, добавление CHANGELOG check в release pipeline
**Последствия:** emit_release_trace.py расширен: новое поле changelog_check в JSON, warning при stale CHANGELOG
**Артефакты:** `docs/In_Progress/CHG-V9_1-PILOT-2/`, `.tmp/traces/CHG-V9_1-PILOT-2_release_trace.json`

### 2026-04-08 | Migration Closure | Info
**Событие:** V9.1 Migration accepted as `migration_partially_hardened`. Phases 1–8 завершены.
**Причина:** Phase 8 Final Acceptance — 28/28 criteria pass. 9 known waivers (0 blockers).
**Последствия:** Migration folder → `docs/Done/OSUI_V9_1_Migration/`. Backlog → `docs/Planned/OSUI_V9_2_HARDENING_BACKLOG.md`. Version → 9.1.0-beta. Git tag: `osui-v9.1-partially-hardened`.
**Артефакты:** `docs/Done/OSUI_V9_1_Migration/08_PHASE_8_FINAL_ACCEPTANCE.md`

---

> **Правило:** CHANGELOG ≠ SITE_HISTORY_LOG.
> CHANGELOG = завершённые CHG.
> SITE_HISTORY_LOG = реальные инциденты, откаты, внешние факторы, миграции.
