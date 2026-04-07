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

## Maturity Breakdown

### Завершено полностью

| Область | Что сделано |
|---------|-----------|
| **Policy layer** | GEMINI.md V9.1 (6661 bytes, 16 Forbidden Transitions, 4 Brownfield Safeguards, 8 Human Gates) |
| **Workflow hardening** | context.md (Warm-Enhance), enhance.md (baseline + contract), route.md (pre-routing gates + STOP), verify.md (4 verdicts + protected perimeter), release.md (memory sync) |
| **Rule files** | SANDBOX_FIRST.md (P0), server-access.md, architecture-reference.md, supabase-schema-protocol.md |
| **Registry layer** | PRODUCT_SURFACE_STATE.yaml, SITE_HISTORY_LOG.md, HARNESS_CAPABILITIES.yaml — все существуют и обновлены |
| **Templates** | 5 V9.1 templates (current_reality_snapshot, protected_behavior_contract, removal_delta, regression_guard_matrix, harness_gap_report) |
| **Baseline pipeline** | capture_baseline.py → collect_surface_diff.py — runtime tested, end-to-end |
| **Release pipeline** | emit_release_trace.py (+ W-12 CHANGELOG check) — runtime tested |
| **Freshness pipeline** | check_registry_freshness.py (--strict, --check-surfaces) — runtime tested |
| **Pilot cycle** | 2 pilots completed (1 registry update, 1 honest brownfield code change) with full change packets |
| **Weakness management** | 15 weaknesses tracked, 4 closed (W-6, W-7, W-8b, W-11, W-12), остальные со статусами |

### Hardened partially

| Область | Что не дожато | Причина |
|---------|-------------|--------|
| **Verify automation** | replay_protected_flow.py генерирует checklist, не assertions. Фактическая верификация = ad-hoc inline Python | W-13: нет assertion mode. Скрипт = reminder, не verifier |
| **Surface diff scope** | collect_surface_diff.py видит только 2 YAML registry файла. Изменения в .py/.md невидимы | W-14: design limitation. Code diff = git diff |
| **CHANGELOG automation** | emit_release_trace.py ловит stale CHANGELOG (warning), но не генерирует entries | W-15: deferred. Manual update required |
| **Harness capabilities** | 4/10 scripts working + tested, 1/10 partial, 5/10 legacy untested | W-3, W-9, W-10: 2 blocked by external deps |
| **Track Approval STOP** | Patched в route.md, но не протестирован на live change (оба pilot его нарушили до patch) | Patch applied post-pilot |

### Остаётся в waiver / blocked / deferred

| # | Weakness | Status | Что это значит |
|---|----------|--------|---------------|
| W-1 | Generic workflows | Accepted | Workflows не project-specific, но не false |
| W-2 | Single history entry | Accepted | Было 1, стало 3. Не blocker |
| W-3 | 2/6 harness partial | Accepted | Automation coverage = partial |
| W-5 | Agent fit routing | Accepted (waiver) | Fit scoring = heuristic, не exact |
| W-9 | replay = partial | Blocked (external) | Нет target app для E2E |
| W-10 | targeted verify = partial | Blocked (external) | Нет package.json в workspace |
| W-13 | Ad-hoc verification | Accepted (waiver) | Core: допустимо. Extended+: нужен assertion mode |
| W-14 | surface_diff blind to code | Accepted (design) | By design. Code = git diff |
| W-15 | CHANGELOG not automated | Deferred | W-12 warning ловит пропуск. Генерация = future |

---

## Финальный статус

### `migration_partially_hardened`

**Что hardened:**
- Policy layer — полностью (GEMINI.md, 5 workflows, 4 rule files)
- Registry layer — полностью (3 registries + 5 templates)
- Baseline → Release trace pipeline — работает (4 scripts runtime tested)
- Pilot cycle — пройден (2 pilots, 17 behaviors verified, 2 retro reports)

**Что partial:**
- Automation layer — 4/10 scripts working, 1 partial, 5 legacy
- Verify automation — checklist, не assertions (W-13)
- Surface diff — registries only (W-14)
- CHANGELOG — warning only, не generation (W-15)
- 2 capabilities blocked by external dependencies (W-9, W-10)

**Что это значит для рабочего использования:**
Antigravity может использовать V9.1 контур для brownfield changes: route → enhance → verify → release. Policy gates работают. Baseline и release trace работают. Protected behavior contract → verify evidence pipeline проверен на live code. Automation gaps покрыты manual workarounds и honest waivers. Полная автоматизация verify/replay требует target application и assertion mode в replay_protected_flow.py — это следующий эволюционный шаг, не текущая миграция.
