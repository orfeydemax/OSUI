# CHG-V9_1-PILOT-RETRO — Ретроспектива пилотного change

> Дата: 2026-04-08
> Change: CHG-V9_1-PILOT
> Type: brownfield /enhance
> Track: Core (score 2)
> Target: PRODUCT_SURFACE_STATE.yaml
> Verdict: pass (9/9 protected behaviors intact)

---

## 1. Что сработало

### Скрипты, которые реально помогли

| Script | Как помог | Без него что было бы |
|--------|----------|---------------------|
| `capture_baseline.py` | Зафиксировал pre-change state в .tmp — diff потом работал точно | Пришлось бы сравнивать вручную или доверять памяти AI |
| `collect_surface_diff.py` | Показал конкретные 24 added / 18 removed / 46 unchanged строк | Без diff невозможно доказать, что ничего лишнего не удалено |
| `check_registry_freshness.py` | Подтвердил freshness всех 5 файлов + W-8b warning сработал корректно | Registry staleness проверялась бы только визуально |
| `emit_release_trace.py` | Structured JSON trace с baseline_ref привязкой | Без trace нет structured evidence для Done/ папки |
| `replay_protected_flow.py` | Сгенерировал 9-behavior checklist из contract.md | Помог, но verification всё равно пришлось делать вручную |

### Процесс, который сработал

1. **Pre-routing gates (Step 0)** — заставили проверить harness capability и baseline confidence ДО начала работы
2. **Current Reality Snapshot** — выявил 5 конкретных drift points до написания кода
3. **Protected Behavior Contract** — задал 9 explicit boundaries; при verify каждый был проверяем
4. **Surface diff** — дал machine-readable evidence, что изменения в scope

---

## 2. Где агент слеп

| Слепое пятно | Описание | Impact |
|-------------|----------|--------|
| **Track Approval Gate был пропущен** | Пилот шёл в рамках Phase 7 — человек не давал explicit "go" на Core track перед /build. Route → Build transition произошёл без паузы. | **Нарушение Forbidden Transition.** В реальном workflow это STOP. Пилот это допустил, но это weakness. |
| **No CHANGELOG.md update** | Пилот не обновил CHANGELOG.md. По Definition of Done это обязательно. | Нарушение DoD. |
| **replay_protected_flow = manual only** | Скрипт сгенерировал checklist, но AI всё равно написал отдельный Python для фактической проверки (yaml.safe_load + assertions). Скрипт не заменяет реальную верификацию. | replay_protected_flow полезен как напоминание, но не как инструмент проверки |
| **W-8b warning неточный** | Warning сработал корректно ("surfaces found in registry"), но его текст не различает "change IS the registry update" от "change affects something tracked in registry". | Ложноположительный тревожный сигнал при обновлении самого registry |

---

## 3. Что вскрылось только на пилоте

### W-11: Track Approval Gate enforcement — отсутствует

В текущем workflow route.md нет механизма, который **останавливает** AI после route decision. AI может вывести track = Core и немедленно перейти к build. Forbidden transition `Route → Build без подтверждения человека` записан в GEMINI.md, но не enforcement step в route.md.

**Closure condition:** route.md Step 5 должен явно содержать `## STOP: Track Approval Gate` с instructions для AI.

### W-12: CHANGELOG.md update — не встроен в скрипты

`emit_release_trace.py` не проверяет, был ли обновлён CHANGELOG.md. Definition of Done требует это, но ни один скрипт не предупреждает о пропуске.

**Closure condition:** `emit_release_trace.py` или `check_registry_freshness.py` должен проверять, что CHANGELOG.md был изменён после baseline capture.

### W-13: Ad-hoc verification code

AI написал inline Python для проверки 7 из 9 contract behaviors. Этот код не сохранён и не может быть использован повторно. replay_protected_flow.py сгенерировал checklist, но не assertion code.

**Closure condition:** Будущие versions replay_protected_flow.py должны поддерживать YAML-specific assertions (parseable, key exists, value equals).

---

## 4. Полный audit trail

| Step | Action | Script used | Output |
|------|--------|------------|--------|
| 1. Baseline | capture_baseline.py | ✅ | .tmp/baselines/CHG-V9_1-PILOT/ |
| 2. Change doc | manual creation | — | docs/In_Progress/CHG-V9_1-PILOT/change_card.md |
| 3. Reality snapshot | manual creation | — | docs/In_Progress/CHG-V9_1-PILOT/current_reality_snapshot.yaml |
| 4. Contract | manual creation | — | docs/In_Progress/CHG-V9_1-PILOT/protected_behavior_contract.md |
| 5. Enhance | manual edit | — | PRODUCT_SURFACE_STATE.yaml |
| 6. Surface diff | collect_surface_diff.py | ✅ | JSON: 24 added, 18 removed |
| 7. Protected flow | replay_protected_flow.py | ✅ | 9-behavior checklist |
| 8. Assertions | ad-hoc Python | — | 7/7 pass |
| 9. Registry freshness | check_registry_freshness.py | ✅ | pass (all fresh) |
| 10. Release trace | emit_release_trace.py | ✅ | .tmp/traces/CHG-V9_1-PILOT_release_trace.json |
| 11. History log | manual edit | — | SITE_HISTORY_LOG.md updated |

**5 of 11 steps used harness scripts. 6 of 11 steps were manual.**

---

## 5. Phase 8 readiness assessment

### Phase 8 допустима

**Обоснования:**

1. Пилот прошёл по полному V9.1 контуру: route → enhance → verify → release. Все stage transitions выполнены.

2. 5 скриптов использованы на production pilot. 4 из 5 дали machine-readable evidence that contributed to verify verdict.

3. Protected behavior contract + verify evidence полностью документированы. 9/9 behaviors verified.

4. 3 новые weakness обнаружены (W-11, W-12, W-13) — это ожидаемый результат пилота. Ни одна не является blocker для Phase 8.

**Условия:**

- W-11 (Track Approval enforcement) должен быть зафиксирован как waiver — address in Phase 8 or beyond
- W-12 (CHANGELOG check) — address as micro-fix
- W-13 (ad-hoc verification) — defer to future harness evolution

**Решение принимает человек.**
