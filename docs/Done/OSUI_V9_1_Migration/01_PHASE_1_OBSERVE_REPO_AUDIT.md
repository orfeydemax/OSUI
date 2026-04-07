# Фаза 1 — OBSERVE: аудит репозитория и разрывов

## Цель
Не лезть сразу в переписывание, а сначала **увидеть фактическое состояние текущего Antigravity-контура**.

## Роль Antigravity
Ты не должен ничего «улучшать по интуиции».  
Сначала ты делаешь **структурный аудит** того, что уже есть.

## Задача
Проверь, существуют ли физически и в каком состоянии находятся:

### Корневые файлы
- `PROJECT_BRAIN.yaml`
- `AGENTS.md`
- `ARCHITECTURE.md`

### Human Layer
- `docs/00_INDEX.md`
- `docs/CHANGELOG.md`
- `docs/context-loading-rules.md`
- `docs/00_Registry/PRODUCT_SURFACE_STATE.yaml`
- `docs/00_Registry/SITE_HISTORY_LOG.md`
- `docs/_templates/`

### Machine Layer
- `.agent/workflows/context.md`
- `.agent/workflows/route.md`
- `.agent/workflows/enhance.md`
- `.agent/workflows/verify.md`
- `.agent/workflows/release.md`
- `.agent/rules/GEMINI.md`
- `.agent/scripts/`

## Что проверить по смыслу
По каждому найденному файлу ответь:
1. Файл есть или нет.
2. Файл рабочий или фиктивный.
3. Что в нём устарело по отношению к V9/V9.1.
4. Какие места противоречат safe-enhance логике.
5. Какие места уже хорошие и их не надо ломать.

## Что создать в конце фазы
Создай файл:

`docs/In_Progress/CHG-V9_1-OBSERVE-REPO-AUDIT.md`

## Структура этого файла
```md
# CHG-V9_1-OBSERVE-REPO-AUDIT

## Found Files
## Missing Files
## Weak Files
## Contradictions
## Harness Gaps
## Recommended Next Step
```

## Обязательный выход фазы
Antigravity обязан выдать:
- список существующих файлов;
- список отсутствующих файлов;
- список слабых файлов;
- список противоречий;
- список harness gaps;
- решение: можно ли идти в Phase 2 без ручной остановки.

## Что запрещено
- нельзя уже в этой фазе массово переписывать workflow;
- нельзя выдумывать, что файл «логически есть», если его физически нет;
- нельзя писать «всё почти готово» без списка реальных gaps.

## Done Criteria
Фаза завершена только если:
- создан audit file;
- выдан честный gap map;
- понятно, какие missing pieces блокируют safe `/enhance`.
