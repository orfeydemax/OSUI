# CHG-V9_1-DECIDE-GATES-ROUTING

> Phase 3 — DECIDE: gates, routing и правила строгости
> Дата: 2026-04-08
> Зависимость: Phase 1 (аудит), Phase 2 (memory layer), Step 2.5/2.6 (quality gate + patch)

---

## Файлы изменены

| Файл | Что сделано |
|------|------------|
| `.agent/workflows/route.md` | Добавлены pre-routing gates (Step 0), расширены Forced Escalation triggers, обновлён Routing Decision Record, добавлены 3 новых Forbidden |
| `.agent/rules/GEMINI.md` | Добавлены 4 Forbidden Transitions (v9.1), добавлена секция V9.1 Brownfield Safeguards |

---

## 1. Новые gates

| Gate | Где | Что проверяет |
|------|-----|--------------|
| **Harness Capability Check** (Step 0a) | `route.md` | Читает `HARNESS_CAPABILITIES.yaml`, проверяет `capture_baseline`, `replay_protected_flow`, `run_targeted_verify`. Если capture_baseline = no + brownfield → escalate Extended+. |
| **Baseline Confidence Check** (Step 0b) | `route.md` | Проверяет PRODUCT_SURFACE_STATE (exists/stale/missing), protected_behavior_contract (yes/no), baseline_repo_commit (current/drift). Если missing → STOP. |
| **Agent Legibility Check** (Step 0c) | `route.md` | Проверяет читаемость target, verify path, trace/log path. Выдаёт agent_fit + paired_mode_required + manual_first_required. |

---

## 2. Упрощения убраны

| Было | Стало |
|------|-------|
| route.md начинался с Nano Eligibility check — никаких pre-conditions | Step 0 обязателен ДО Nano check |
| Forced Escalation содержал 6 V8 triggers | Добавлены 4 V9.1 brownfield triggers |
| Routing Decision Record содержал 8 полей | Добавлены 3 новых V9.1 поля: harness_check_result, baseline_confidence, agent_fit |
| Forbidden: 4 записи | Forbidden: 7 записей (+3 V9.1) |
| GEMINI.md Forbidden Transitions: 12 записей (до v8.0.6) | 16 записей (+4 V9.1) |
| GEMINI.md AI GOVERNANCE не имел brownfield safeguards | Секция V9.1 Brownfield Safeguards: 4 жёстких запрета |

---

## 3. Change types, которые теперь эскалируются

| Тип изменения | До Phase 3 | После Phase 3 |
|--------------|------------|---------------|
| Removal (удаление UI/API/feature) | Мог пройти как Nano/Core | **Extended+ minimum** (route.md §4, GEMINI.md v9.1) |
| Visible flow change (навигация, layout главного экрана) | Мог пройти как Core | **Extended+ minimum** (route.md §4) |
| Unknown coupling (модуль без задокументированных зависимостей) | Не отслеживалось | **Extended+ minimum** (route.md §4) |
| Shared UI change без protected_behavior_contract | Не отслеживалось | **Extended+ minimum** (route.md §4, GEMINI.md v9.1) |
| Brownfield enhance без baseline | Не отслеживалось | **STOP — cannot route** (route.md Step 0b) |
| Verify pass без проверки protected perimeter | Не отслеживалось | **Forbidden Transition** (GEMINI.md v9.1) |

---

## 4. Waiver paths — временно допустимые

| Waiver | Причина | Статус | Когда закрыть |
|--------|---------|--------|--------------|
| `replay_protected_flow: not_implemented` → harness gap допускается, НЕ блокирует routing | OSUI — фреймворк, нет E2E target app | **accepted / deferred** | Phase 6 (HARDEN) |
| `collect_surface_diff: not_implemented` → harness gap | Нет скрипта diff | **accepted / deferred** | Phase 6 |
| `validate_registry_freshness: not_implemented` → harness gap | Нет автовалидации | **accepted / deferred** | Phase 6 |
| `manual_first_required: true` допускается как valid output Agent Legibility Check | Для некоторых changes human verification первична | **accepted** | Постоянный |
| `capture_baseline: partial` допускается для Core track (но не ниже) | YAML-файлы есть, скрипт отсутствует | **accepted / deferred** | Phase 6 |

### Формальные waivers

| Поле | W-5 |
|------|-----|
| **id** | W-5 |
| **weakness** | `agent_fit: low` не имеет явного routing consequence. Step 0c выдаёт значение и записывает в Routing Decision Record, но нет правила «agent_fit: low → auto-escalate» |
| **reason accepted** | Значение `agent_fit` доходит до человека через Routing Decision Record и Human Gate: Track Approval (Step 8). AI не принимает решений по рискам — human gate решает. Это соответствует V8 §13. |
| **owner** | Human (Track Approval Gate) |
| **review phase** | Phase 6 (HARDEN) — если появятся данные о частых ошибках при `agent_fit: low`, добавить auto-escalation rule |
| **closure condition** | Либо: (a) добавить правило «agent_fit: low → escalate Extended+» в route.md Step 0c, либо: (b) формально подтвердить, что human gate достаточен, и перевести W-5 в `closed by design` |

---

## 5. Что НЕ тронуто (scope discipline)

- `context.md` — не тронут
- `enhance.md` — не тронут (уже исправлен в Phase 2, дальнейшие изменения — Phase 4)
- `verify.md` — не тронут (Phase 4)
- `release.md` — не тронут (Phase 5)
- `.agent/scripts/` — не тронуты (Phase 6)
- Никакие секреты, серверные данные, приватные SOP не добавлены в GEMINI.md

---

## 6. Вердикт: готовность к Phase 4

### Переход к Phase 4 **допустим**

**Обоснование:**

1. **Route logic стала жёстче.** 3 pre-routing gates обязательны до track selection. AI не может пропустить Step 0.

2. **Human Gate payload усилен.** Routing Decision Record содержит 11 полей (было 8). Human видит harness_check_result, baseline_confidence, agent_fit при Track Approval.

3. **Рискованные change types эскалируются.** Removal → Extended+. Visible flow change → Extended+. Unknown coupling → Extended+. No baseline → STOP.

4. **Brownfield safeguards зафиксированы.** 4 запрета в GEMINI.md §6 + 3 Forbidden в route.md.

5. **Waiver paths явные и привязаны к Phase 6.** 5 waiver, каждый с причиной, статусом `accepted / deferred` и target phase для закрытия.

6. **GEMINI.md не превращён в энциклопедию.** Добавлено 15 строк (4 Forbidden Transitions + блок Brownfield Safeguards).

**Решение о переходе принимает человек.**
