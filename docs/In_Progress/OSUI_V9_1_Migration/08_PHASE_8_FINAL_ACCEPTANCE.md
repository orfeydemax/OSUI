# Фаза 8 — финальная приёмка V9.1 hardening для Antigravity

## Цель
Зафиксировать, что миграция не бумажная, а рабочая.

## Acceptance A — Файлы существуют
- [ ] `PROJECT_BRAIN.yaml`
- [ ] `AGENTS.md`
- [ ] `docs/00_Registry/PRODUCT_SURFACE_STATE.yaml`
- [ ] `docs/00_Registry/SITE_HISTORY_LOG.md`
- [ ] `docs/00_Registry/HARNESS_CAPABILITIES.yaml`
- [ ] `docs/_templates/current_reality_snapshot.yaml`
- [ ] `docs/_templates/protected_behavior_contract.md`
- [ ] `docs/_templates/removal_delta.md`
- [ ] `docs/_templates/regression_guard_matrix.md`
- [ ] `docs/_templates/harness_gap_report.md`
- [ ] `.agent/rules/SANDBOX_FIRST.md`

## Acceptance B — Workflows действительно усилены
- [ ] `.agent/workflows/context.md` имеет `warm-enhance`
- [ ] `.agent/workflows/enhance.md` требует baseline
- [ ] `.agent/workflows/route.md` имеет fit/baseline/legibility gates
- [ ] `.agent/workflows/verify.md` использует verdict model с harness sufficiency
- [ ] `.agent/workflows/release.md` делает memory sync check

## Acceptance C — Rules не врут
- [ ] `GEMINI.md` не разрешает brownfield `/enhance` вслепую
- [ ] `GEMINI.md` не трактует changelog как память сайта
- [ ] `SANDBOX_FIRST.md` требует isolated-first execution
- [ ] privileged execution не является default

## Acceptance D — Scripts не фиктивные
- [ ] `capture_baseline.py` запускается
- [ ] `emit_release_trace.py` запускается
- [ ] хотя бы один verify path реально исполним
- [ ] capability registry отражает реальное состояние scripts

## Acceptance E — Пилотный цикл пройден
- [ ] выполнен пилотный `/enhance`
- [ ] обновлены surface/history registries
- [ ] есть retro report
- [ ] есть открытые хвосты, если они реально остались

## Финальный запрет
Нельзя писать `migration_complete`, если:
- нет рабочего baseline path;
- нет рабочего release trace path;
- verify не умеет честно признать `fail_harness_insufficient`;
- product memory не обновляется вместе с release.

## Финальные статусы
Используй только один из двух:
- `migration_complete`
- `migration_partially_hardened`

Если scripts или verify path ещё недожаты, статус может быть только второй.
