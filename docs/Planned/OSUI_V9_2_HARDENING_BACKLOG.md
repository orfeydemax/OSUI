# OSUI V9.2 Hardening Backlog

> Источник: Phase 7.5 Pilot Closure Pass + Phase 8 Final Acceptance
> Дата формирования: 2026-04-08
> Статус миграции V9.1: `migration_partially_hardened`

---

## Цель

Собрать все незакрытые weakness из V9.1 миграции в единый backlog.
Каждый item — кандидат на отдельный CHG в рамках обычного V9.1 контура (route → enhance → verify → release).

---

## Backlog Items

### B-1: Assertion mode для replay_protected_flow.py (W-13)

```yaml
source: W-13
priority: medium
type: tooling
status: open
description: "replay_protected_flow.py генерирует checklist, не assertions. Нужен assertion mode для: YAML parse, key-exists, value-equals, exit-code, JSON-schema."
acceptance: "replay_protected_flow.py принимает contract + target file → выполняет assertions → выдаёт pass/fail с evidence"
track_estimate: Core
blocked_by: null
```

### B-2: E2E replay с target application (W-9)

```yaml
source: W-9
priority: low
type: tooling
status: blocked
description: "replay_protected_flow.py не может выполнить E2E replay — нет target application с UI/API."
acceptance: "При наличии target app: скрипт запускает browser/API flows и проверяет protected behaviors"
track_estimate: Extended
blocked_by: "Нет target application в workspace"
```

### B-3: Targeted verify runner (W-10)

```yaml
source: W-10
priority: low
type: tooling
status: blocked
description: "run_targeted_verify не может запускать тесты — нет package.json/test runner в workspace."
acceptance: "При наличии test runner: скрипт запускает npm test / pytest → проверяет результат"
track_estimate: Core
blocked_by: "Нет package.json / test framework в workspace"
```

### B-4: CHANGELOG entry generator (W-15)

```yaml
source: W-15
priority: low
type: automation
status: open
description: "emit_release_trace.py ловит stale CHANGELOG (W-12), но не генерирует entries. CHANGELOG update = ручной шаг."
acceptance: "Скрипт или template генерирует CHANGELOG entry из change_card.md + verify_evidence.md"
track_estimate: Core
blocked_by: null
note: "CHANGELOG format = human-semantic. Risk: автогенерация может давать generic entries."
```

### B-5: Track Approval STOP — live test (post W-11)

```yaml
source: W-11 (closed, but not live-tested)
priority: medium
type: process
status: open
description: "⛔ STOP gate в route.md patched, но ни один change после patch не тестировал его. Оба pilot нарушили gate до patch."
acceptance: "Первый CHG после миграции использует route.md → AI останавливается на STOP → ждёт ответ человека"
track_estimate: Nano
blocked_by: null
note: "Автоматически проверится при первом реальном CHG"
```

---

## Приоритеты

| Priority | Items | Что решают |
|----------|-------|-----------|
| Medium | B-1, B-5 | Assertion mode + STOP gate live test |
| Low | B-2, B-3, B-4 | E2E replay, test runner, CHANGELOG gen |

---

## Правила работы с backlog

1. Каждый item = отдельный CHG
2. Прогоняется через V9.1 контур (route → enhance → verify → release)
3. Не объединять items в один mega-CHG
4. Blocked items переоткрываются, когда external dependency появляется
5. Backlog пересматривается при каждом новом проекте, использующем OSUI
