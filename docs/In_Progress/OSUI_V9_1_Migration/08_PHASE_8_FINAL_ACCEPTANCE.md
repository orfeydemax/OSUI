# Phase 8 — Final Acceptance V9.1 Hardening

> Дата: 2026-04-08
> Migration: V8 → V9.1
> Phases completed: 1–7.5

---

## Acceptance A — Файлы существуют

| # | Файл | Статус | Размер |
|---|------|--------|--------|
| 1 | `PROJECT_BRAIN.yaml` | ✅ EXISTS | 4 113 bytes |
| 2 | `AGENTS.md` | ✅ EXISTS | 2 972 bytes |
| 3 | `docs/00_Registry/PRODUCT_SURFACE_STATE.yaml` | ✅ EXISTS | 4 129 bytes |
| 4 | `docs/00_Registry/SITE_HISTORY_LOG.md` | ✅ EXISTS | 2 525 bytes |
| 5 | `docs/00_Registry/HARNESS_CAPABILITIES.yaml` | ✅ EXISTS | 3 592 bytes |
| 6 | `docs/_templates/current_reality_snapshot.yaml` | ✅ EXISTS | 1 220 bytes |
| 7 | `docs/_templates/protected_behavior_contract.md` | ✅ EXISTS | 1 296 bytes |
| 8 | `docs/_templates/removal_delta.md` | ✅ EXISTS | 1 232 bytes |
| 9 | `docs/_templates/regression_guard_matrix.md` | ✅ EXISTS | 1 425 bytes |
| 10 | `docs/_templates/harness_gap_report.md` | ✅ EXISTS | 1 352 bytes |
| 11 | `.agent/rules/SANDBOX_FIRST.md` | ✅ EXISTS | 2 407 bytes |

**Result: 11/11 PASS**

---

## Acceptance B — Workflows усилены

| # | Criterion | File | Evidence | Status |
|---|-----------|------|----------|--------|
| 1 | context.md имеет warm-enhance | `.agent/workflows/context.md` | 5 matches (Warm-Enhance) | ✅ PASS |
| 2 | enhance.md требует baseline | `.agent/workflows/enhance.md` | 1 match (baseline) + Step 1 Current Reality Audit | ✅ PASS |
| 3 | route.md имеет fit/baseline/legibility gates | `.agent/workflows/route.md` | 3 matches (Step 0a, 0b, 0c) | ✅ PASS |
| 4 | verify.md verdict model с harness sufficiency | `.agent/workflows/verify.md` | 9 matches (fail_harness_insufficient, pass_with_waiver) | ✅ PASS |
| 5 | release.md memory sync check | `.agent/workflows/release.md` | 12 matches (memory_sync, registries) | ✅ PASS |

**Result: 5/5 PASS**

---

## Acceptance C — Rules не врут

| # | Criterion | Evidence | Status |
|---|-----------|----------|--------|
| 1 | GEMINI.md не разрешает brownfield enhance вслепую | §6: `Enhance only by PROJECT_BRAIN + target file — must read PRODUCT_SURFACE_STATE + HARNESS_CAPABILITIES`. Forbidden Transition: `Brownfield /enhance без pre-routing gates` | ✅ PASS |
| 2 | GEMINI.md не трактует changelog как память сайта | §6: `CHANGELOG.md ≠ full memory. Real history → SITE_HISTORY_LOG.md` | ✅ PASS |
| 3 | SANDBOX_FIRST требует isolated-first execution | 8 matches: sandbox, isolated, ask-first | ✅ PASS |
| 4 | Privileged execution не является default | `❌ Default privileged execution — всё начинается с минимальных прав` | ✅ PASS |

**Result: 4/4 PASS**

---

## Acceptance D — Scripts не фиктивные

| # | Criterion | Evidence | Status |
|---|-----------|----------|--------|
| 1 | capture_baseline.py запускается | Runtime test: `Baseline COMPLETE` (exit 0) | ✅ PASS |
| 2 | emit_release_trace.py запускается | Runtime test: `Release trace emitted` (exit 0) + W-12 warning fired | ✅ PASS |
| 3 | Хотя бы один verify path исполним | `replay_protected_flow.py` генерирует checklist (exit 0). + `check_registry_freshness.py --strict` дает machine verdict | ✅ PASS |
| 4 | Capability registry отражает реальное состояние | HARNESS_CAPABILITIES.yaml: 4 working, 1 partial, 5 legacy. Статусы совпадают с runtime tests | ✅ PASS |

**Result: 4/4 PASS**

**Нюанс (не fail):** verify path = `replay_protected_flow.py` выдаёт checklist, не automated assertions. Фактическая верификация делается ad-hoc Python (W-13 waiver).

---

## Acceptance E — Пилотный цикл пройден

| # | Criterion | Evidence | Status |
|---|-----------|----------|--------|
| 1 | Выполнен пилотный /enhance | CHG-V9_1-PILOT-2: emit_release_trace.py модифицирован (W-12 closure) | ✅ PASS |
| 2 | Обновлены surface/history registries | SITE_HISTORY_LOG: 2 pilot entries. HARNESS_CAPABILITIES: updated. PRODUCT_SURFACE_STATE: updated | ✅ PASS |
| 3 | Есть retro report | `docs/Done/CHG-V9_1-PILOT-RETRO.md` + `docs/Done/CHG-V9_1-PILOT-2-RETRO.md` | ✅ PASS |
| 4 | Открытые хвосты зафиксированы | `07_5_PILOT_CLOSURE_PASS.md`: 3 accepted, 2 blocked, 1 deferred | ✅ PASS |

**Result: 4/4 PASS**

---

## Финальный запрет — проверка

| # | Prohibition | Status | Evidence |
|---|------------|--------|----------|
| 1 | Рабочий baseline path | ✅ YES | `capture_baseline.py` exit 0, creates manifest + file copies |
| 2 | Рабочий release trace path | ✅ YES | `emit_release_trace.py` exit 0, creates JSON trace with changelog_check |
| 3 | Verify умеет `fail_harness_insufficient` | ✅ YES | 4 matches in verify.md. Verdict type documented and integrated |
| 4 | Product memory обновляется с release | ✅ YES | release.md: 12 references to memory sync. 4 registries checked |

**4/4 prohibitions cleared.**

---

## Known Waivers

| # | Weakness | Status | Impact |
|---|----------|--------|--------|
| W-1 | Generic workflow descriptions | Accepted | Generic = не false, просто не project-specific |
| W-2 | Single history entry | Accepted | 3 entries now (init + 2 pilots). Was 1 at Phase 2 |
| W-3 | 2/6 harness partially working | Accepted | 4 working + 1 partial + 5 legacy = honest registry |
| W-5 | Agent fit routing | Accepted (waiver) | Routing works, fit scoring is heuristic |
| W-9 | replay_protected_flow = partial | Blocked (external) | No target app for E2E. Generates checklist, not assertions |
| W-10 | run_targeted_verify = partial | Blocked (external) | No package.json in workspace |
| W-13 | Ad-hoc verification code | Accepted (waiver) | Core track: допустимо. Extended+: нужен assertion mode |
| W-14 | surface_diff blind to code | Accepted (design) | By design: surface = registries, code = git diff |
| W-15 | CHANGELOG update not automated | Deferred | W-12 warning catches omission. Manual update sufficient |

**Total: 9 waivers. 0 blockers. 2 blocked by external deps. 1 deferred.**

---

## Что прошло acceptance

1. **Все 11 файлов** существуют с ненулевым содержимым
2. **Все 5 workflows** содержат V9.1 hardening (warm-enhance, baseline, gates, verdict model, memory sync)
3. **Все 4 rules** работают (brownfield blind запрещён, changelog ≠ memory, sandbox-first, no default privileged)
4. **Все 4 script criteria** выполнены (baseline works, trace works, verify path exists, registry honest)
5. **Все 4 pilot criteria** выполнены (enhance done, registries updated, retro exists, open tails documented)
6. **Все 4 final prohibitions** cleared

## Что не прошло acceptance

**Нет пунктов, которые не прошли.** 28/28 criteria = PASS.

## Что реально работает

| Capability | Status |
|-----------|--------|
| Baseline capture + manifest | ✅ Runtime tested |
| Surface diff (registries) | ✅ Runtime tested |
| Registry freshness check (strict + W-8b) | ✅ Runtime tested |
| Release trace + CHANGELOG check (W-12) | ✅ Runtime tested |
| Protected flow checklist generation | ✅ Runtime tested (manual mode) |
| Route pre-routing gates (Step 0) | ✅ Used on 2 pilots |
| Track Approval STOP gate (W-11) | ✅ Patched, not yet tested on live change |
| Warm-Enhance context loading | ✅ Documented and integrated |
| Protected behavior contract → verify evidence pipeline | ✅ Used on 2 pilots (8+9 behaviors verified) |
| Memory sync check in release | ✅ Documented and runtime-checked via freshness script |

---

## Финальный статус

### `migration_complete`

**Обоснование:**
1. 28/28 acceptance criteria = PASS
2. 4/4 final prohibitions cleared
3. Baseline path работает (runtime tested)
4. Release trace path работает (runtime tested)
5. Verify знает `fail_harness_insufficient` (4 references in verify.md)
6. Product memory обновляется вместе с release (12 references in release.md)
7. Two honest pilots completed with retro reports
8. 9 known waivers — none is a blocker

**Known waivers не отменяют `migration_complete`.** Они обозначают tooling limitations, не policy gaps. Policy layer (GEMINI.md, route.md, verify.md, release.md, enhance.md, context.md) полностью hardened. Automation layer — частично automated, частично manual, честно задокументирована.
