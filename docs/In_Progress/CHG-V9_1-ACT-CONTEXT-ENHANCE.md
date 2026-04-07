# CHG-V9_1-ACT-CONTEXT-ENHANCE

> Phase 4 — ACT: context-loading и safe `/enhance`
> Дата: 2026-04-08
> Зависимость: Phase 1–3, Step 2.5/2.6, Step 3.5/3.6

---

## Файлы изменены

| Файл | Что сделано |
|------|------------|
| `docs/context-loading-rules.md` | 3 уровня → 4 уровня. Добавлен 🟠 Warm-Enhance. Обновлена таблица бюджета. Добавлены 2 запрета (v9.1). |
| `.agent/workflows/context.md` | Добавлен уровень 2.5 Warm-Enhance Load. 7 обязательных действий, 3 стопа, 2 новых Forbidden. Автоматический вызов при `/enhance`. |
| `.agent/workflows/enhance.md` | 6 шагов → 9 шагов. Добавлены: Step 1 (Warm-Enhance), Step 3 (Protected Behavior Contract), Step 4 (Removals/Couplings). Добавлена секция Forbidden (6 записей). Output расширен на 3 артефакта. |
| `docs/In_Progress/CHG-V9_1-DECIDE-GATES-ROUTING.md` | Step 3.6: добавлен формальный waiver W-5 с полными полями. |

---

## 1. Shortcuts убраны

| Было (V8) | Стало (V9.1) | Файл |
|-----------|-------------|------|
| Context system: 3 уровня (Hot/Warm/Cold) | 4 уровня (Hot/Warm/Warm-Enhance/Cold) | context-loading-rules.md |
| `/enhance` начинался с Current Reality Audit, контекст не формализован | Step 1 обязывает загрузить Warm-Enhance ДО аудита | enhance.md |
| `/enhance` не требовал protected behavior contract | Step 3 обязывает заполнить contract для shared surfaces | enhance.md |
| `/enhance` не проверял removals и couplings | Step 4 обязывает проверить и заполнить removal_delta.md | enhance.md |
| `/enhance` не имел секции Forbidden | 6 Forbidden записей | enhance.md |
| `/enhance` мог стартовать по Hot + target file | Forbidden: «Starting enhance without Warm-Enhance context» | enhance.md |
| CHANGELOG.md считался достаточной памятью | Forbidden: «CHANGELOG ≠ полная память. Реальная история → SITE_HISTORY_LOG.md» | context-loading-rules.md, context.md |
| context.md: 3 уровня, 3 Forbidden | 4 уровня, 5 Forbidden (+2 v9.1) | context.md |
| `/enhance` output: 3 артефакта | 6 артефактов (+Current Reality Snapshot, +Protected Behavior Contract, +Removal Delta) | enhance.md |

---

## 2. Warm-Enhance — существует ли реально?

### Да. Warm-Enhance существует как формализованный уровень контекста.

**Определён в трёх файлах:**

| Файл | Где определён | Что содержит |
|------|-------------|-------------|
| `docs/context-loading-rules.md` | Секция «🟠 WARM-ENHANCE» (строки 31–56) | 7 обязательных файлов, 4 стопа, бюджет +3000–8000 токенов |
| `.agent/workflows/context.md` | Уровень 2.5 Warm-Enhance Load | 7 действий, 3 стопа, автовызов при `/enhance` |
| `.agent/workflows/enhance.md` | Step 1 «Load Warm-Enhance Context» | 5 конкретных файлов для чтения, 2 стопа |

**Конкретные файлы, которые Warm-Enhance обязывает прочитать:**
1. `PRODUCT_SURFACE_STATE.yaml` — exists, working
2. `SITE_HISTORY_LOG.md` — exists, working
3. `HARNESS_CAPABILITIES.yaml` — exists, working
4. Затронутые модули (code) — зависит от конкретного change
5. Human gate traces — зависит от конкретного change

**Конкретные шаблоны, которые Warm-Enhance обязывает заполнить:**
1. `current_reality_snapshot.yaml` — exists, template ready
2. `protected_behavior_contract.md` — exists, template ready

**Стопы, которые блокируют продвижение:**
1. PRODUCT_SURFACE_STATE.yaml missing → STOP
2. Protected behavior contract не заполнен для shared zones → STOP
3. Removal detected без removal_delta.md → STOP

---

## 3. Что НЕ тронуто (scope discipline)

- `verify.md` — не тронут (Phase 5)
- `release.md` — не тронут (Phase 5)
- `.agent/scripts/` — не тронуты (Phase 6)
- `route.md` — не тронут (уже обновлён Phase 3)
- `GEMINI.md` — не тронут (уже обновлён Phase 3)

---

## 4. Вердикт: готовность к Phase 5

### Переход к Phase 5 **допустим**

**Обоснование:**

1. **Warm-Enhance существует.** Определён в трёх файлах. Содержит 7 обязательных файлов для чтения, 3 стопа, бюджет.

2. **`/enhance` не стартует вслепую.** Step 1 загружает Warm-Enhance. Step 2 выполняет Current Reality Audit. Step 3 создаёт Protected Behavior Contract. Step 4 проверяет removals. Код пишется в Step 7 — после 6 подготовительных шагов.

3. **Baseline и protected behavior встроены в обязательное чтение.** PRODUCT_SURFACE_STATE.yaml и protected_behavior_contract.md — STOP-условия в двух файлах (context.md и enhance.md).

4. **Shortcuts убраны.** 9 конкретных shortcuts заменены на формализованные шаги и запреты.

**Решение о переходе принимает человек.**
