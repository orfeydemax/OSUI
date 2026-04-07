# Фаза 5 — ACT: verify, release и замыкание памяти продукта

## Цель
Закрыть главную ложь AI-workflow: когда новое поведение вроде проверили, а старое тихо умерло.

## Что переписать
- `.agent/workflows/verify.md`
- `.agent/workflows/release.md`
- verify templates / checklist
- release summary logic
- при необходимости `docs/CHANGELOG.md` usage notes

## Новая логика verify
### Verdict types
- `pass`
- `pass_with_waiver`
- `fail`
- `fail_harness_insufficient`

### Verify обязан проверять
- новое целевое поведение;
- protected behavior;
- removal side-effects;
- before/after evidence;
- surface-level regressions;
- достаточность harness.

### Главный запрет
Если protected perimeter не проверен, verdict не может быть просто `pass`.

## Новая логика release
Перед release обязательно проверь:

```text
Release Memory Sync Check
- PRODUCT_SURFACE_STATE updated?
- SITE_HISTORY_LOG updated?
- PROJECT_BRAIN updated?
- HARNESS_CAPABILITIES fresh?
- release trace emitted?
```

## Что должен обновить Antigravity
1. `verify.md`
2. `release.md`
3. verify checklist
4. release trace logic
5. правила обновления product memory

## Что создать в конце фазы
Создай файл:

`docs/In_Progress/CHG-V9_1-ACT-VERIFY-RELEASE.md`

В нём:
- новый verify verdict model;
- новые release sync rules;
- список файлов, где поменялась логика memory sync.

## Done Criteria
Фаза завершена только если:
- verify перестал быть одноглазым;
- release обновляет product memory;
- trace before/after привязан к release.
