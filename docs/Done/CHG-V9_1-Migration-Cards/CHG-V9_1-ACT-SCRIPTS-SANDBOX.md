# CHG-V9_1-ACT-SCRIPTS-SANDBOX

> Phase 6 — ACT: scripts, sandbox и минимальный исполнимый harness
> Дата: 2026-04-08
> Зависимость: Phase 1–5, W-7, W-8b

---

## Файлы созданы / изменены

| Файл | Действие | Статус |
|------|---------|--------|
| `.agent/rules/SANDBOX_FIRST.md` | Создан | **working** |
| `.agent/scripts/capture_baseline.py` | Создан | **working** — tested ✅ |
| `.agent/scripts/check_registry_freshness.py` | Создан | **working** — tested ✅ |
| `.agent/scripts/emit_release_trace.py` | Создан | **working** — tested ✅ |
| `.agent/scripts/collect_surface_diff.py` | Создан | **working** — tested ✅ |
| `.agent/scripts/replay_protected_flow.py` | Создан | **partial** — manual checklist generator |
| `docs/00_Registry/HARNESS_CAPABILITIES.yaml` | Обновлён | Фактические статусы |

---

## 1. Scripts — честный статус каждого

| Script | Статус | Запускается? | Что делает | Что НЕ делает |
|--------|--------|-------------|-----------|--------------|
| `capture_baseline.py` | **working** | ✅ exit 0 | Копирует 3 registry-файла, фиксирует git hash, создаёт manifest.json | — |
| `check_registry_freshness.py` | **working** | ✅ exit 0 | Проверяет 5 файлов на freshness, --strict режим, W-8b suspicious no_change | — |
| `emit_release_trace.py` | **working** | ✅ exit 0 | Генерирует structured JSON trace, привязывает baseline_ref | — |
| `collect_surface_diff.py` | **working** | ✅ exit 0 | Line-level diff baseline vs current state | Не сравнивает DOM/screenshot |
| `replay_protected_flow.py` | **partial** | ✅ exit 0 | Парсит contract.md, генерирует JSON checklist для ручной проверки | Не выполняет автоматический E2E replay |

---

## 2. Waiver closures

### W-7: Memory Sync — manual-only → partially executable

**До Phase 6:** Memory Sync Check в release.md = AI проверяет вручную, нет скрипта.
**После Phase 6:** `check_registry_freshness.py --strict` может быть вызван перед release. Проверяет freshness 5 файлов, fail on stale. AI вызывает скрипт, не полагается на ручную оценку.

**W-7 = closed.** Переведён из manual-only в executable automation.

### W-8b: no_change без контрольного вопроса

**До Phase 6:** `no_change` в memory sync не проверялся на подозрительность.
**После Phase 6:** `check_registry_freshness.py --check-surfaces homepage,booking` проверяет, упоминаются ли changed surfaces в PRODUCT_SURFACE_STATE.yaml. Если да — выдаёт warning: "Surfaces found in registry — no_change may be incorrect."

**W-8b = closed.** Скрипт выполняет контрольный вопрос автоматически.

---

## 3. HARNESS_CAPABILITIES.yaml — обновление

| Capability | Было | Стало |
|-----------|------|-------|
| `capture_baseline` | partial | **working** |
| `replay_protected_flow` | not_implemented | **partial** |
| `run_targeted_verify` | partial | partial (без изменений) |
| `collect_surface_diff` | not_implemented | **working** |
| `validate_registry_freshness` | not_implemented | **working** |
| `emit_release_trace` | partial | **working** |

**Итого:** 4 working, 2 partial (было: 2 partial, 3 not_implemented).

---

## 4. SANDBOX_FIRST rule

Создан `.agent/rules/SANDBOX_FIRST.md` с приоритетом P0.

Три категории операций:
- **Sandbox-first:** npm/pip install, E2E тесты, replay flows, preview
- **Host-allowed:** чтение файлов, git, lint, скрипты из .agent/scripts/
- **Prod-restricted:** SSH, Docker deploy, DB migration — только с Human Gate

Forbidden:
- npm/pip install на host без обоснования
- prod deployment без Release Approval
- SSH на prod без triage
- default privileged execution

---

## 5. Что НЕ тронуто (scope discipline)

- route.md, context.md, enhance.md, verify.md, release.md — не тронуты
- GEMINI.md — не тронут
- Тестовые данные в .tmp/ удалены (CHG-V9_1-TEST, CHG-V9_1-TEST2)

---

## 6. Что осталось weak

| # | Weakness | Статус |
|---|----------|--------|
| W-9 | `replay_protected_flow.py` = partial. Генерирует manual checklist, не автоматический E2E replay. Автоматизация заблокирована отсутствием target application. | **blocked** — не может быть закрыт без target app |

---

## 7. Вердикт: готовность к Phase 7

### Переход к Phase 7 **допустим**

**Обоснование:**

1. **SANDBOX_FIRST создан.** P0 rule с тремя категориями операций и 4 Forbidden.

2. **Минимум один реально запускаемый baseline/trace path существует.** capture_baseline.py → collect_surface_diff.py → emit_release_trace.py — полный pipeline от baseline до release trace. 4 из 5 скриптов = working, tested.

3. **Capability registry отражает фактическую готовность.** 4 working (с tested: true), 2 partial (с конкретными gaps и blocked_by). Ни одного not_implemented.

4. **W-7 и W-8b закрыты.** Memory sync = executable. Suspicious no_change = detectable.

5. **Одна weakness (W-9) = blocked.** replay_protected_flow требует target app. Не может быть закрыт на уровне OSUI-фреймворка.

**Решение о переходе принимает человек.**
