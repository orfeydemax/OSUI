---
description: Unified bug intake, triage, and fix pipeline (V8 §26.3, §27)
---

# /debug — Unified Bug Intake and Fix

> V8 Build Mode: **/build → /debug**
> Reference: §10.6, §26.3, §27

$ARGUMENTS

## Purpose

Unified bug intake pipeline for both manual and automated signals. Handles triage, audit, systematic investigation, fix, verification, and release.

## Principle (§27.1)

There are NOT two separate worlds for manual bugs and automated signals. Any signal enters the unified bug-intake contour.

---

## Key Principles

- **Ask before assuming** — получи полный контекст ошибки, не додумывай
- **Test hypotheses** — не угадывай, проверяй каждую гипотезу систематически
- **Explain why** — объясни корневую причину, а не только "что починил"
- **Prevent recurrence** — добавь тесты, валидацию, чтобы баг не повторился
- **Log evidence** — каждый шаг фиксируй, чтобы верификация была traceable

---

## Steps

### 1. Bug Intake — Gather Information
Use template: `docs/_templates/incident_note.yaml`
```yaml
id: BUG-YYYY-MM-DD-XX
source: human|system
severity: unknown|sev3|sev2|sev1
status: candidate
prod_incident: yes|no|unknown
human_owner:
evidence_state: none|partial|sufficient
```

**Обязательно собрать:**
- Сообщение об ошибке (error message)
- Шаги воспроизведения (reproduction steps)
- Ожидаемое поведение vs фактическое (expected vs actual)
- Недавние изменения (recent changes)
- Скриншот/лог если доступен

### 2. Triage (§27.4)
- If signal is unclear → `status: candidate` (do NOT simulate confirmed incident)
- If confirmed → `status: confirmed`
- If production incident → `status: incident`, potentially Hotfix Track

### 3. Current Reality Audit
- How does the system actually behave?
- What is the actual bug vs expected behavior?
- What modules are affected?
- Is there drift between docs and reality?

### 4. Form Hypotheses (ранжировать по вероятности)

Перед тем как бросаться чинить — **сформировать список гипотез**, отсортированных от наиболее вероятной к наименее:

```
1. ❓ [Наиболее вероятная причина] — почему считаем вероятной
2. ❓ [Вторая возможность] — почему возможна
3. ❓ [Менее вероятная] — на всякий случай
```

**Правило:** Каждую гипотезу нужно ПРОВЕРИТЬ, а не просто предположить. Используй метод исключения.

### 5. Investigate Systematically (метод исключения)

Для каждой гипотезы:
```
**Testing hypothesis 1:** [Что проверил] → [Результат: подтвердилась/опровергнута]
**Testing hypothesis 2:** [Что проверил] → [Результат]
...
```

**Инструменты расследования:**
- Логи сервера (`docker logs`, browser console)
- Состояние БД (SQL-запросы через MCP)
- Сетевой трафик (browser DevTools → Network)
- Состояние переменных (добавить temp console.log если нужно)
- Воспроизведение через browser subagent

### 6. Identify Root Cause

🎯 **Зафиксировать корневую причину** — не симптом, а почему это произошло.

Формат:
```
Root Cause: [Конкретное объяснение, что именно сломалось и почему]
Affected files: [Список файлов]
Impact: [Какие функции затронуты]
```

### 7. Framing (if needed)
If the bug reveals a deeper problem:
- Run `/frame` as sub-process
- Identify if the fix requires Core+ track

### 8. Routing
- If simple fix, localized → Nano or Core Track
- If production incident → Hotfix Track (§27.5)
  - Hotfix file created directly in `docs/In_Progress/`
- Run `/route` for track assignment

### 9. Fix Implementation
- Apply the fix
- Track evidence throughout
- Show Before/After diff:
```
// Before (broken)
[код с багом]

// After (fixed)
[исправленный код]
```

### 10. Prevention (предотвращение рецидива)

🛡️ **Обязательный шаг** — ответить на вопрос "Как предотвратить этот баг в будущем?"

Варианты:
- [ ] Добавить юнит-тест
- [ ] Добавить валидацию на входе
- [ ] Обновить типы/интерфейсы
- [ ] Добавить lint-правило
- [ ] Обновить документацию
- [ ] Добавить error boundary / fallback UI

### 11. Verification
- Run verification per track requirements
- For Hotfix: minimal but traceable
- Проверить на production после deploy

### 12. Release and Monitoring
- For Hotfix: release → monitoring → normalization
- For regular bugs: standard `/release` flow

---

## Pipeline Summary (§27.3)
```
Bug detected
→ Gather Information (error, steps, context)
→ Triage (candidate → confirmed → incident)
→ Current Reality Audit
→ Form Hypotheses (ranked by likelihood)
→ Investigate Systematically (test each hypothesis)
→ Identify Root Cause
→ Routing (track assignment)
→ Fix (with before/after diff)
→ Prevention (tests, validation, docs)
→ Verification
→ Release / Monitoring
→ Close / Normalization
```

---

## Output Format

Каждый debug-сеанс должен генерировать отчёт по этому шаблону:

```markdown
## 🔍 Debug: [Краткое описание проблемы]

### 1. Symptom
[Что происходит — конкретно, с деталями]

### 2. Information Gathered
- Error: `[error message]`
- File: `[filepath]`
- Line: [line number]
- Reproduction: [шаги]

### 3. Hypotheses
1. ❓ [Наиболее вероятная причина]
2. ❓ [Вторая возможность]
3. ❓ [Менее вероятная]

### 4. Investigation
**Testing hypothesis 1:** [Что проверил] → [Результат]
**Testing hypothesis 2:** [Что проверил] → [Результат]

### 5. Root Cause
🎯 **[Объяснение корневой причины]**

### 6. Fix
```diff
- [broken code]
+ [fixed code]
```

### 7. Prevention
🛡️ [Как предотвратить рецидив]

### 8. Verification
✅ / ❌ [Результат проверки]
```

---

## Examples

```
/debug login not working
/debug API returns 500
/debug кнопка "Сохранить" зависает
/debug данные не сохраняются в БД
/debug слот не открывается при клике
```

---

## Forbidden
- ❌ `bug intake → Hotfix` without triage
- ❌ Simulating confirmed incident from unclear signal
- ❌ Skipping verification before release
- ❌ Fixing without forming hypotheses first (no "guess and pray")
- ❌ Skipping prevention step
- ❌ Closing bug without explaining root cause

## Context Budget
- **Class: Medium to Heavy** — depending on severity and scope
