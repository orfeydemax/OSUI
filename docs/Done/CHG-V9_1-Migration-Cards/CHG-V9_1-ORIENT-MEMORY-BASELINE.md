# CHG-V9_1-ORIENT-MEMORY-BASELINE

> Phase 2 — ORIENT: память проекта и baseline
> Дата: 2026-04-08
> Зависимость: результаты Phase 1 (`CHG-V9_1-OBSERVE-REPO-AUDIT.md`)

---

## Файлы созданы

| Файл | Назначение | Закрывает gap |
|------|-----------|---------------|
| `PROJECT_BRAIN.yaml` | Hot Load контекст проекта | H-1 (CRITICAL) |
| `AGENTS.md` | Навигационный справочник агентов | Missing AGENTS.md |
| `docs/00_Registry/PRODUCT_SURFACE_STATE.yaml` | Карта текущего состояния системы | H-2 (CRITICAL) |
| `docs/00_Registry/SITE_HISTORY_LOG.md` | Лог реальных событий (не CHANGELOG) | Требование Phase 2 |
| `docs/00_Registry/HARNESS_CAPABILITIES.yaml` | Реестр harness-возможностей | H-6 |
| `docs/_templates/current_reality_snapshot.yaml` | Шаблон снимка текущей реальности | Требование Phase 2 |
| `docs/_templates/protected_behavior_contract.md` | Контракт защищённых поведений | Требование Phase 2 |
| `docs/_templates/removal_delta.md` | Дельта удалений при enhance | Требование Phase 2 |
| `docs/_templates/regression_guard_matrix.md` | Матрица регрессионной защиты | Требование Phase 2 |
| `docs/_templates/harness_gap_report.md` | Отчёт о harness gaps | Требование Phase 2 |
| `.gitignore` | Git exclusion rules | H-5 (Step 1.5) |

**Итого создано: 11 файлов.**

---

## Файлы обновлены

| Файл | Что изменено |
|------|-------------|
| `.agent/ARCHITECTURE.md` | Заголовок: V8 → V9. Числа: Skills 36→61, Workflows 18→19, Statistics 11→19, Scripts 2→5. |
| `.agent/workflows/enhance.md` | Исправлена дублированная нумерация шагов (два шага "4" → шаги 4, 5, 6). |
| `docs/In_Progress/CHG-V9_1-OBSERVE-REPO-AUDIT.md` | Секция "Recommended Next Step" → "Verdict". Phase 1 = COMPLETE, gaps передаются в Phase 2. |

**Итого обновлено: 3 файла.**

---

## Поля заполнены частично

| Файл | Частичное поле | Причина |
|------|---------------|---------|
| `PROJECT_BRAIN.yaml` → `current_prod_version` | `null` | OSUI — фреймворк, не приложение с production-деплоем |
| `PROJECT_BRAIN.yaml` → `current_prod_commit_or_tag` | `null` | Первый коммит создан, но тегов нет |
| `PROJECT_BRAIN.yaml` → `completed_changes` | `[]` | Ни один CHG не завершён полностью |
| `PRODUCT_SURFACE_STATE.yaml` → `scripts/status` | `active_untested` | Скрипты существуют, но не запускались |
| `HARNESS_CAPABILITIES.yaml` → 4 из 6 capability | `not_implemented` / `partial` | Нет автоматических скриптов для capture_baseline, surface_diff, registry_freshness |
| `SITE_HISTORY_LOG.md` | Только 1 запись (init) | Нет предыдущей истории событий |

---

## Что требует ручного участия

| Что | Почему |
|-----|--------|
| `PROJECT_BRAIN.yaml` → `key_user_flows` | Заполнены generic-потоки OSUI. Для конкретного проекта-потребителя нужно обновить. |
| `HARNESS_CAPABILITIES.yaml` → `replay_protected_flow` | Статус `not_implemented`. Для закрытия нужны E2E тесты или manual replay protocol. |
| `SITE_HISTORY_LOG.md` | Содержит только init-запись. Ретроспективные события (если они были) нужно вносить вручную. |
| `docs/CHANGELOG.md` | Остаётся пустым шаблоном. Первая реальная запись появится при первом `/release`. Это не баг — это ожидаемое состояние для нового проекта. |
| Все 6 реестров V8 в `docs/00_Registry/` | Пустые шаблоны. Заполняются в процессе реальных CHG. |

---

## Переход к Phase 3: допустимость

### ✅ Переход к Phase 3 **ДОПУСТИМ**

**Обоснование:**

1. **Hot Load контур восстановлен.** `PROJECT_BRAIN.yaml` существует, содержит рабочий скелет. GEMINI.md §7, context.md, release.md §9.7 — все ссылки разрешаются.

2. **Current Reality Audit обеспечен.** `PRODUCT_SURFACE_STATE.yaml` содержит карту всех поверхностей с точными подсчётами и статусами.

3. **Baseline/memory слой создан.** 5 новых шаблонов (current_reality_snapshot, protected_behavior_contract, removal_delta, regression_guard_matrix, harness_gap_report) готовы к использованию при safe-enhance.

4. **AGENTS.md — навигационный, не энциклопедический.** 40 строк, таблица маршрутизации, правила.

5. **HARNESS_CAPABILITIES.yaml — честный.** 2 из 6 capability `partial`, 3 `not_implemented`, 1 `partial`. Нет фальшивых "ready".

6. **Нестыковки ARCHITECTURE.md исправлены.** Числа соответствуют реальности: 61 skill, 19 workflow, 20 agents, 5 scripts.

7. **Git baseline создан.** Initial commit сделан. `.gitignore` на месте.

**Оставшиеся частичные заполнения** не блокируют Phase 3: это ожидаемое состояние для фреймворка без предыдущих завершённых CHG.

**Решение о переходе принимает человек.**
