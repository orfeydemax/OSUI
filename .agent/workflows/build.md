---
description: Meta-workflow for implementing a change — wraps /create, /enhance, /debug, /orchestrate, /preview (V8 §10.6, §26)
---

# /build — Change Implementation

> V8 Lifecycle Stage: **Build**
> Reference: §10.6, §26

$ARGUMENTS

## Purpose

Implement the change according to the assigned track and required artifacts. This is a meta-workflow that dispatches to the appropriate build mode.

---

## Prerequisites
- Change must have a valid `track` (assigned by `/route`)
- `gates.track_approval: approved`
- `stage: build`

---

## ⛔ ОБЯЗАТЕЛЬНЫЙ ШАГ 0: ФИЗИЧЕСКОЕ ПЕРЕМЕЩЕНИЕ ПАПКИ (выполнить ДО любого кода)

> **ЗАПРЕЩЁННЫЙ ПЕРЕХОД:** `Route → Build` без перемещения папки CHG = нарушение OSUI V8
> Это правило не может быть пропущено, отложено или выполнено после реализации.

**Алгоритм (выполнить немедленно при входе в /build):**

```
ИЗ: docs/Planned/Queue/{CHG-ID}/
В:  docs/In_Progress/{CHG-ID}/
```

**Команда PowerShell:**
```powershell
Move-Item 'docs\Planned\Queue\{CHG-ID}' 'docs\In_Progress\{CHG-ID}' -Force
```

**После перемещения — ОБЯЗАТЕЛЬНО обновить в `change_card.yaml`:**
```yaml
source_of_truth: docs/In_Progress/{CHG-ID}/change_card.yaml
updated_at: "{текущее время}"
```

> **Проверка:** Если после входа в `/build` папка всё ещё лежит в `Planned/Queue/` — это активное нарушение директивы. Исправить немедленно.

---

## Step 0: Request Analysis (Before Dispatch)

Перед выбором build mode — **понять что именно нужно сделать:**

1. **Понять запрос пользователя**
   - Если информации недостаточно — задать уточняющие вопросы (не додумывать!)
   - Тип задачи? (новая фича, улучшение, баг, мульти-домен)
   - Какие функции затронуты?
   - Кто пользователь этой функциональности?

2. **Определить tech stack**
   - Фронтенд, бэкенд, БД, инфра?
   - Какие существующие модули затронуты?

3. **Defaults-first подход**
   - Используй значения по умолчанию проекта
   - Детали добавляй по мере необходимости
   - Не перепроектируй раньше времени

---

## Build Modes (§26)

### `/create` — New Feature or Service
For building something entirely new. See `workflows/create.md`.

**Координация агентов при создании:**
```
database-architect → Schema / Migrations
backend-specialist → API / Server Actions
frontend-specialist → UI / Components
```

### `/enhance` — Existing System Evolution
For improving or extending existing functionality. See `workflows/enhance.md`.

### `/debug` — Bug Fix
For bug intake, triage, audit, fix, verify, release path. See `workflows/debug.md`.

### `/orchestrate` — Multi-Domain Tasks
Only for genuinely multi-domain tasks. See `workflows/orchestrate.md`.

### `/preview` — Visual and Assembly Check
For preview before release. See `workflows/preview.md`.

---

## Build Rules

### 1. Scope Discipline
- Implementation must stay within the scope declared in the Change Card
- If scope creep is detected → stop, update the change card, re-route if necessary

### 2. Change Delta Pack
Allowed if (§25):
- Change is local or medium
- No heavy independent contracts needed
- No critical drift risk
- Perceivable as a single package

Forbidden if:
- Change is critical
- Dangerous migration involved
- Auth/RLS/rollback/restore/compatibility contours affected
- Multi-owner disagreement exists

### 3. AI Governance During Build
- AI can draft code, suggest refactors, generate tests
- AI cannot make unreviewed high-risk changes alone
- If AI materially participated → prepare `ai_evidence_log.yaml`

### 4. Current Reality Audit
If change touches an existing system → run Current Reality Audit (§14):
- How does the system actually work now?
- What modules are touched?
- What contracts are active?
- Where is drift between code, docs, data, and behavior?

### 5. Auto-Preview After Build
After implementation is complete:
- Start preview server (`/preview` workflow)
- Present URL to user for verification
- Collect feedback before proceeding to `/verify`

### 6. Update Change Card
- `stage: build`
- Track progress in `next_action`
- Update `active_risks` and `open_blockers` as they emerge

### 7. Git Commit (если Git инициализирован)
- После завершения реализации:
- `git add . && git commit -m "🔨 build: {CHG-ID} — {краткое описание изменений}"`
- Если при `/clay` была создана ветка `chg/{CHG-ID}` — коммитить в неё
- Если Git не инициализирован → пропустить

---

## Usage Examples

```
/build                          # Interactive — определяет mode автоматически
/build create new booking page  # Прямой dispatch на /create
/build enhance admin calendar   # Прямой dispatch на /enhance
/build debug save button hangs  # Прямой dispatch на /debug
```

---

## Output
- Implemented change (code, config, data, etc.)
- Updated Change Card
- AI Evidence Log (if applicable)
- Preview URL (if applicable)
- Ready for `/verify`

## Context Budget
- **Class: Medium to Heavy** — depending on the build mode and track
