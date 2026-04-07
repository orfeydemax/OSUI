# CHG-V9_1-ACT-VERIFY-RELEASE

> Phase 5 — ACT: verify, release и замыкание памяти продукта
> Дата: 2026-04-08
> Зависимость: Phase 1–4, Step 4.5 (quality gate)

---

## Файлы изменены

| Файл | Что сделано |
|------|------------|
| `.agent/workflows/verify.md` | Verdict types 3→4. Steps 5→11 (+4 V9.1). Forbidden 3→7. Добавлены: Step 2 (Protected Perimeter), Step 4 (Removal Side-Effects), Step 5 (Before/After), Step 6 (Harness Sufficiency). |
| `.agent/workflows/release.md` | Steps 9→11.7. Forbidden 5→8. Output 7→9. Добавлены: Step 2 (Memory Sync Check), Step 4 (Release Trace). |

---

## 1. Verdict types в verify

| Verdict | Когда | Было в V8? |
|---------|-------|-----------|
| `pass` | Все checks пройдены + protected perimeter intact + removal ok + harness sufficient | ✅ было |
| `pass_with_waiver` | Degraded protected behavior (acknowledged), insufficient harness (documented), partial before/after | ❌ новый (заменяет `pass_with_conditions`) |
| `fail` | Critical issues или protected behavior broken | ✅ было |
| `fail_harness_insufficient` | Невозможно дать reliable verdict из-за отсутствующих harness capabilities | ❌ новый |

**Правила verdict:**
- `pass` ТРЕБУЕТ `protected_perimeter_status: intact` или `not_applicable`
- `pass` ТРЕБУЕТ `removal_verified: true` или `not_applicable`
- `pass_with_waiver` ТРЕБУЕТ explicit waiver reason
- `fail_harness_insufficient` ТРЕБУЕТ list of missing capabilities

---

## 2. Как verify проверяет protected perimeter

**Step 2 — Check Protected Perimeter (V9.1):**

1. Если `protected_behavior_contract.md` существует → прочитать contract
2. Для КАЖДОГО перечисленного behavior:
   - Верифицировать, что behavior работает (test / manual / screenshot / log)
   - Записать evidence
   - Результат per behavior: `preserved` / `degraded` / `broken`
3. Summary: `protected_perimeter_status: intact | partial | breached`

**Стопы:**
- ANY behavior = `broken` → verdict = `fail`, return to `/build`
- ANY behavior = `degraded` → verdict не может быть `pass`, только `pass_with_waiver`
- Contract missing для shared surface enhance → STOP, return to `/build` Step 3

**W-6 = CLOSED.** verify.md Step 2 явно требует per-behavior verification из contract. Forbidden запись (строка 4 из Forbidden): «Verdict pass when protected perimeter not checked».

---

## 3. Как release делает memory sync check

**Step 2 — Release Memory Sync Check (V9.1):**

| Memory file | Что проверяется | Статусы |
|-------------|----------------|---------|
| `PRODUCT_SURFACE_STATE.yaml` | Новые/изменённые/удалённые surfaces отражены | `updated` / `no_change` / `stale` |
| `SITE_HISTORY_LOG.md` | Новая запись, если был инцидент/откат/значимое событие | `updated` / `no_change` / `not_applicable` |
| `PROJECT_BRAIN.yaml` | Обновлён, если: новый модуль, технология, ADR, stage | `updated` / `no_change` |
| `HARNESS_CAPABILITIES.yaml` | Обновлён, если: новая harness capability или изменение existing | `updated` / `no_change` |

**Стопы:**
- `PRODUCT_SURFACE_STATE.yaml` = `stale` → STOP. Update first.
- `PROJECT_BRAIN.yaml` outdated → STOP. Update first.

**Запись в Change Card:**
```yaml
memory_sync:
  product_surface_state: updated | no_change
  site_history_log: updated | no_change | not_applicable
  project_brain: updated | no_change
  harness_capabilities: updated | no_change
  sync_status: complete | incomplete
```

**Release Trace (Step 4):**
```yaml
release_trace:
  chg_id: {CHG-ID}
  released_at: {timestamp}
  verification_verdict: {verdict}
  protected_perimeter_status: {status}
  memory_sync_status: {complete | incomplete}
  surfaces_affected: [{list}]
  removals: [{list} | none]
```

---

## 4. Shortcuts убраны

| Было (V8) | Стало (V9.1) | Файл |
|-----------|-------------|------|
| Verify: 3 verdict types (pass / pass_with_conditions / fail) | 4 verdict types (+pass_with_waiver, +fail_harness_insufficient) | verify.md |
| Verify: не проверял protected perimeter | Step 2 обязательный, per-behavior check | verify.md |
| Verify: не проверял removal side-effects | Step 4 обязательный, per-removal check | verify.md |
| Verify: не собирал before/after evidence | Step 5 обязательный для brownfield | verify.md |
| Verify: не оценивал harness sufficiency | Step 6 обязательный | verify.md |
| Verify: 3 Forbidden | 7 Forbidden (+4 v9.1) | verify.md |
| Release: не делала memory sync | Step 2 обязательный, 4 файла, 2 STOP | release.md |
| Release: не создавала release trace | Step 4 обязательный, structured trace | release.md |
| Release: 5 Forbidden | 8 Forbidden (+3 v9.1) | release.md |

---

## 5. Что НЕ тронуто (scope discipline)

- `context.md` — не тронут (Phase 4)
- `enhance.md` — не тронут (Phase 4)
- `route.md` — не тронут (Phase 3)
- `GEMINI.md` — не тронут (Phase 3)
- `.agent/scripts/` — не тронуты (Phase 6)

---

## 6. Что осталось weak

| # | Weakness | Статус |
|---|----------|--------|
| W-7 | Memory Sync Check (release Step 2) не имеет автоматической валидации — AI проверяет вручную, нет скрипта. При наличии скрипта из Phase 6 memory sync станет machine-enforced. | **deferred to Phase 6** |

---

## 7. Вердикт: готовность к Phase 6

### Переход к Phase 6 **допустим**

**Обоснование:**

1. **Verify перестал быть одноглазым.** 4 новых Step проверяют: protected perimeter (per-behavior), removal side-effects, before/after evidence, harness sufficiency. Verdict `pass` невозможен без intact protected perimeter.

2. **Release обновляет product memory.** Memory Sync Check проверяет 4 файла с 2 STOP-условиями. Release Trace фиксирует structured record с перечнем surfaces и removals.

3. **W-6 = closed.** verify.md Step 2 явно требует per-behavior verification. Forbidden: «Verdict pass when protected perimeter not checked».

4. **Before/after evidence привязан к release.** verify.md Step 5 собирает before/after. Release Trace содержит `protected_perimeter_status` и `memory_sync_status` — trace from verify to release.

5. **Одна weakness (W-7) deferred.** Memory Sync — manual AI check. Скрипт автоматизации — задача Phase 6 (HARDEN).

**Решение о переходе принимает человек.**
