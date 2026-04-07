# Фаза 3 — DECIDE: gates, routing и правила строгости

## Цель
После того как память собрана, надо решить **когда агенту вообще можно работать**, а когда он должен быть эскалирован или остановлен.

## Что переписать
### Rules
- `.agent/rules/GEMINI.md`

### Workflows
- `.agent/workflows/route.md`

### При необходимости
- `directives/human-gate-enforcement.md`
- change card / change control шаблоны

## Что должно появиться в route-логике

### Новый обязательный порядок
```text
Harness Capability Check
-> Baseline Confidence Check
-> Legibility Check
-> Agent Fit Decision
-> Track Selection
-> Human Gate Payload
```

## Новые проверки
### Agent Fit Gate
Определи:
- `agent_fit: high|medium|low`
- why_fit
- paired_mode_required
- manual_first_required

### Harness Baseline Gate
Проверь:
- есть ли baseline;
- есть ли protected behavior;
- можно ли честно проверять regression;
- хватает ли legibility.

### Agent Legibility Gate
Проверь:
- есть ли screenshots;
- есть ли DOM/state path;
- есть ли reproducible verify path;
- есть ли trace/log path.

## Жёсткие правила
- если нет `capture_baseline`, live-site `/enhance` не имеет права идти как обычный medium path;
- если нет `Protected Behavior Contract`, shared UI change не может быть fast-tracked;
- removal change обязан эскалироваться;
- visible flow change обязан эскалироваться;
- unknown coupling обязан эскалироваться.

## Что должен обновить Antigravity в `GEMINI.md`
Добавь запреты:
- нельзя стартовать brownfield `/enhance` только по `PROJECT_BRAIN.yaml` и target file;
- нельзя считать `docs/CHANGELOG.md` полной памятью сайта;
- нельзя ставить verify pass без проверки protected perimeter;
- нельзя молча удалять соседнее поведение.

## Что создать в конце фазы
Создай файл:

`docs/In_Progress/CHG-V9_1-DECIDE-GATES-ROUTING.md`

## Структура отчёта
- какие новые gates добавлены;
- какие старые упрощения убраны;
- какие change types теперь эскалируются;
- какие waiver paths ещё временно допустимы.

## Done Criteria
Фаза завершена только если:
- route логика стала жёстче;
- human gate payload усилен;
- явные рискованные типы change больше не проходят как “мелкая правка”.
