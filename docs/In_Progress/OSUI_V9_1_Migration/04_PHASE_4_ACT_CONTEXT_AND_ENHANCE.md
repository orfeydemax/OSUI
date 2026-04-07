# Фаза 4 — ACT: context-loading и safe `/enhance`

## Цель
Сделать так, чтобы агент реально читал **baseline existing system**, а не делал вид, что ему хватает changelog и одного файла.

## Что переписать
- `docs/context-loading-rules.md`
- `.agent/workflows/context.md`
- `.agent/workflows/enhance.md`

## Новая модель контекста
### Hot
- `PROJECT_BRAIN.yaml`
- текущий source-of-truth change file
- последний управленческий след

### Warm-Enhance
- `Current Reality Snapshot`
- `Protected Behavior Contract`
- релевантные записи `PRODUCT_SURFACE_STATE.yaml`
- релевантные записи `SITE_HISTORY_LOG.md`
- затронутые модули
- соседние shared zones
- релевантный human gate trace

### Warm-Create
- hot-layer
- целевой шаблон
- целевые модули

### Cold
- архитектурные документы
- кластеры противоречий
- workflow/rules/skills по необходимости

## Новая последовательность `/enhance`
```text
1. Read PROJECT_BRAIN.yaml
2. Read current change document
3. Read Current Reality Snapshot
4. Read Protected Behavior Contract
5. Read relevant PRODUCT_SURFACE_STATE entries
6. Read relevant SITE_HISTORY_LOG entries
7. Run baseline capture or confirm valid baseline ref
8. Assess removals and couplings
9. Build authorization request
10. Human Gate
11. Code write
```

## Обязательные стопы
- без baseline — no code write;
- без protected behavior для brownfield shared zones — no pass to build;
- без explicit removal handling — no destructive delta;
- без relevant surface history — no confidence claim.

## Что должен выдать Antigravity
1. Обновлённый `context.md`
2. Обновлённый `docs/context-loading-rules.md`
3. Обновлённый `enhance.md`
4. Краткий diff-summary, какие именно старые shortcuts убраны

## Что создать в конце фазы
Создай файл:

`docs/In_Progress/CHG-V9_1-ACT-CONTEXT-ENHANCE.md`

## Done Criteria
Фаза завершена только если:
- `warm-enhance` реально существует;
- `/enhance` больше не стартует вслепую;
- baseline и protected behavior встроены в обязательное чтение.
