# Фаза 7 — OODA цикл на пилотном change

## Цель
Проверить новый контур **не на бумаге, а на одном реальном пилотном change**.

## Какой change брать
Выбери change, который:
- не самый критичный;
- но затрагивает существующую поверхность системы;
- требует `/enhance`, а не greenfield `/create`.

## Последовательность
### Observe
- зафиксируй текущую поверхность;
- собери snapshot;
- проверь protected behavior.

### Orient
- подними `PROJECT_BRAIN.yaml`;
- проверь `PRODUCT_SURFACE_STATE.yaml`;
- проверь `SITE_HISTORY_LOG.md`;
- проверь capability registry.

### Decide
- route change;
- оцени agent fit;
- оцени baseline confidence;
- подготовь human gate.

### Act
- выполни `/enhance`;
- затем `/verify`;
- затем `/release`;
- обнови product memory и release trace.

## Что должен создать Antigravity
### Change packet
- change doc
- current reality snapshot
- protected behavior contract
- при необходимости removal delta
- verify evidence
- release trace

### Retro report
Создай:

`docs/Done/CHG-V9_1-PILOT-RETRO.md`

## В этом retro report должно быть
- что сработало;
- где агент всё ещё слеп;
- какие scripts не хватили;
- где route/gate logic была слишком мягкой;
- какие правила надо усилить в следующем цикле.

## Done Criteria
Фаза завершена только если:
- пилотный change прошёл по новому контуру;
- после него обновлены registries;
- выпущен honest retro report.
