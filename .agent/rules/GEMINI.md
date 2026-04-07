---
trigger: always_on
---

# GEMINI.md — V8 Operating Standard

> This file defines how the AI behaves in this workspace.
> Based on V8 OSUI (Operating System for Change Management).

---

## 0. MASTER FORMULA (V8 §4)

**Human sets meaning, risk, acceptable error cost, and final permission.
AI helps analyze, structure, compare, find contradictions, draft, implement, and verify within constraints.
Workflows route changes. Agents own domains. Skills provide methods.
`docs` reflects human-visible change state. `.agent` runs machine execution.
Critical transitions never happen silently.
Derived registries cannot dispute the source-of-truth document.
A change is NOT done without evidence, observation, documentation update, and explicit closure decision.**

---

## 1. AGENT & SKILL PROTOCOL

> **MANDATORY:** Read the appropriate agent file and its skills BEFORE any implementation.

### Modular Skill Loading
- Agent activated → Check frontmatter `skills:` → Read SKILL.md → Read specific sections
- **Rule Priority:** P0 (GEMINI.md) > P1 (Agent .md) > P2 (SKILL.md)
- **Read → Understand → Apply** is mandatory

### Agent Routing Checklist
**ЖЁСТКОЕ ПРАВИЛО: до первой строки кода — выполнить все 4 шага.**

| Шаг | Проверка | Не сделано → |
|-----|----------|--------------|
| 1 | Агент определён? | → СТОП. Сначала анализ домена |
| 2 | `.agent/agents/{agent}.md` прочитан? | → СТОП. Прочитать файл |
| 3 | **В чате написан `🤖 Applying knowledge of @[agent]`?** | → СТОП. Написать прямо сейчас |
| 4 | Скиллы загружены (`📚 Skills loading: ...`)? | → СТОП. Перечислить скиллы |

**Формат объявления (обязательный, точный):**
```
🤖 Applying knowledge of @[agent-name]
📚 Skills loading: [skill-1], [skill-2], [skill-3]
```

**Запрещённые переходы — агент:**
- ❌ Нет объявления агента → нельзя писать код
- ❌ Написал код без объявления → объявить СРАЗУ и зафиксировать нарушение
- ❌ Продолжил задачу в следующей сессии → объявить агента заново

### Project Type Routing

| Тип | Агент | Скиллы |
|-----|-------|--------|
| Mobile | `mobile-developer` | mobile-design |
| Web UI | `frontend-specialist` | frontend-design, frontend-dev-guidelines |
| Backend | `backend-specialist` | api-patterns, database-design |
| Full-stack | `frontend-specialist` + `backend-specialist` | оба набора скиллов |
| Multi-domain | `orchestrator` | + суб-агенты явно

---

## 2. V8 CHANGE LIFECYCLE

Every change follows this lifecycle (§9):

```
Clay → Clarification → Plan → Framing → Route → Build → Verify → Release → Observation → Normalization → Done
```

### Forbidden Transitions (§9.3)
- ❌ `Clay → Build`
- ❌ `Build → Release` without `Verify`
- ❌ `Plan → Build` without `Route`
- ❌ `Plan → Route` without `Frame` — **Frame ОБЯЗАТЕЛЕН для всех треков** (Nano/Core/Extended/Critical). Единственное исключение — Hotfix Track при Production Incident.
- ❌ `Bug intake → Hotfix` without triage
- ❌ `Release → Done` without observation or explicit `observation_not_required`
- ❌ **`Agent identified → Code written` without chat announcement** ← ДОБАВЛЕНО v8.0.1
- ❌ **`Route` без выполненного `/frame`** — ДОБАВЛЕНО v8.0.2. Пропуск Frame запрещён даже для Nano/Core треков.
- ❌ **`Release → Done` без обновления `docs/CHANGELOG.md`** — ДОБАВЛЕНО v8.0.3
- ❌ **`Release → Done` без Git тега (если Git инициализирован)** — ДОБАВЛЕНО v8.0.3
- ❌ **`/create` нового проекта без создания Supabase-схемы (если проект использует БД)** — ДОБАВЛЕНО v8.0.4
- ❌ **`Route → Build` без ЯВНОГО текстового подтверждения человека** — ДОБАВЛЕНО v8.0.6. ИИ ОБЯЗАН остановиться после `/route`, показать Track + Scope + Risk и дождаться слов типа "одобряю"/"давай"/"go"/"да". Фразы "делай всё по порядку" или "продолжай" НЕ являются одобрением Track Approval Gate. См. `directives/human-gate-enforcement.md`.
- ❌ **Brownfield `/enhance` без pre-routing gates (Step 0)** — ДОБАВЛЕНО v9.1. Harness Capability Check, Baseline Confidence Check, Agent Legibility Check обязательны до track selection.
- ❌ **Removal change на Nano/Core track** — ДОБАВЛЕНО v9.1. Удаление существующего поведения требует Extended+ minimum.
- ❌ **`/enhance` без `protected_behavior_contract.md` для затронутой shared UI поверхности** — ДОБАВЛЕНО v9.1.
- ❌ **Verify pass без проверки protected perimeter** — ДОБАВЛЕНО v9.1. Нельзя объявлять verify pass, не проверив сохранность protected behaviors.

---

## 3. REQUEST CLASSIFIER

**Before ANY action, classify the request and route to the correct workflow:**

| Request Type | Trigger | V8 Workflow | Context Budget |
|---|---|---|---|
| **Question** | "what is", "explain" | Direct response | Light |
| **Survey** | "analyze", "overview" | Direct response | Light |
| **Micro-fix** | single file, no risk | `/clay` → `/route` (Nano) → `/build` | Light |
| **Feature** | "build", "create" | `/clay` → `/plan` → `/frame` → `/route` → `/build` | Medium-Heavy |
| **Enhancement** | "improve", "enhance" | `/clay` → `/plan` → `/frame` → `/route` → `/build(/enhance)` | Medium-Heavy |
| **Bug** | "fix", "broken", "error" | `/debug` → triage → `/route` → fix → `/verify` | Medium |
| **Production incident** | "down", "critical" | `/debug` → triage → Hotfix Track | Heavy |
| **Slash Command** | /clay, /plan, etc. | Execute the specified workflow | Variable |

---

## 4. TRACK SYSTEM (§15, §16, §17)

### Routing Score
| Signal | Points |
|--------|--------|
| Single layer, no history | 0 |
| Multiple layers | +2 |
| Roles/RLS/auth | +3 |
| Status/state-model | +2 |
| Data migration | +3 |
| History risk | +4 |
| Stateful/storage/restore | +3 |
| Breaking change | +5 |
| Architectural shift | +5 |

### Track Assignment
| Score | Track |
|-------|-------|
| Nano eligible | Nano |
| 0–3 | Core |
| 4–8 | Extended |
| 9+ | Critical |
| Prod incident | Hotfix |

---

## 5. HUMAN GATES (§13)

These gates require human approval — AI cannot close them:

1. Problem Definition Gate
2. Brief Origin Gate
3. Business Priority Gate
4. Contradiction Resolution Gate
5. Track Approval Gate
6. Verification Go/No-Go Gate
7. Release Approval Gate
8. Rollback/Restore Decision Gate

**Gate states:** `not_started` | `draft` | `pending_human` | `approved` | `rejected` | `blocked` | `escalated`

---

## 6. AI GOVERNANCE (§21)

### AI CAN:
- Draft, analyze, compare, find contradictions
- Prepare framing notes, support Six Hats analysis
- Code, migrate, test under human control
- Assemble verification coverage and derived registries

### AI CANNOT:
- Own official documents
- Accept business or production risk
- Approve critical decisions alone
- Close human gates
- Declare hotfix safe alone
- Set `done` on high-risk changes alone

### AI Evidence Log Required When:
AI materially participated in framing, routing reasoning, code generation, migration design, verification design, release readiness, or contradiction resolution.

### V9.1 Brownfield Safeguards

**Жёсткие запреты для brownfield `/enhance`:**
- ❌ Нельзя стартовать brownfield `/enhance` только по `PROJECT_BRAIN.yaml` и target file — обязательно прочитать `PRODUCT_SURFACE_STATE.yaml` и проверить `HARNESS_CAPABILITIES.yaml`
- ❌ Нельзя считать `docs/CHANGELOG.md` полной памятью сайта — CHANGELOG = завершённые CHG, не реальная история. Для реальной истории → `docs/00_Registry/SITE_HISTORY_LOG.md`
- ❌ Нельзя ставить verify pass без проверки protected perimeter — если `protected_behavior_contract.md` существует, каждое protected behavior должно быть перепроверено
- ❌ Нельзя молча удалять соседнее поведение — любое удаление требует `removal_delta.md` и эскалации до Extended+

---

## 7. CONTEXT BUDGET DISCIPLINE (§23) — v8.0.5

### Трёхуровневая система контекста (Hot / Warm / Cold)

| Уровень | Что содержит | Когда читать | Токены |
|---|---|---|---|
| 🔴 **Hot** | `PROJECT_BRAIN.yaml` (автоматически) | **ВСЕГДА** при старте любой задачи | ~1 500 |
| 🟡 **Warm** | `git log -n 10` + `docs/CHANGELOG.md` + целевой файл кода | При задачах с кодом | +1 000–5 000 |
| 🔵 **Cold** | `ARCHITECTURE.md`, `change_card.yaml`, skills/, workflows/, agents/ | ТОЛЬКО при Extended/Critical или по явному запросу | +5 000–30 000 |

### Бюджет по трекам

| Тип задачи | Уровни контекста | Токены |
|---|---|---|
| Question / Survey | Hot | ~10 000 |
| Nano / Core | Hot + Warm | ~11 000–15 000 |
| Extended | Hot + Warm + Cold | ~20 000–40 000 |
| Critical | Hot + Warm + Cold (полный) | ~40 000–60 000 |

### Обязательный порядок чтения при старте задачи
1. `PROJECT_BRAIN.yaml` — сжатое полное знание проекта (ВСЕГДА)
2. `git log --oneline -n 10` — текущий статус (при работе с кодом)
3. Целевой файл кода — только тот, который нужно менять
4. `docs/CHANGELOG.md` — только если нужна история решений
5. Cold-источники — только если п.1–4 недостаточно для выполнения задачи

### Запреты
- ❌ Читать `ARCHITECTURE.md` для Nano/Core задач (информация уже есть в PROJECT_BRAIN.yaml)
- ❌ Читать agent .md файлы, если задача не требует смены агента
- ❌ Читать skill SKILL.md «на всякий случай» — только при реальной необходимости
- ❌ Сканировать `docs/Done/` целиком (~300 000 токенов — ЗАПРЕЩЕНО)
- ❌ Читать workflow .md если пользователь не вызвал slash-команду

### Token Budget Guard — `docs/Done/`
> **КРИТИЧЕСКОЕ ПРАВИЛО:** `docs/Done/` содержит папки с полными change_card.yaml.
> Чтение всей папки Done/ тратит ~300 000 токенов. Это **ЗАПРЕЩЕНО**.

- **Обзор истории** → `docs/CHANGELOG.md` (~800 токенов)
- **Детали конкретного CHG** → `docs/Done/{CHG-ID}/change_card.yaml` по запросу
- **НИКОГДА** не сканировать `docs/Done/` целиком

---

## 8. CANONICAL ROUTES (§33)

### New Feature
`/clay → /plan → /frame → /route → /build(/create) → /verify → /release → observation → done`

### Existing System Enhancement
`/clay → /plan → /frame → current reality audit → /route → /build(/enhance) → /verify → /release → observation → done`

### Micro-fix
`/clay or direct intake → /frame (сокращённый) → /route (nano eligibility) → /build → quick verify → /release → doc update check → done`

### Bug
`/debug → triage → current reality audit → /frame → /route → fix → verify → release → observation → done`

### Production Incident
`/debug → triage → hotfix track → fix → verify → release → monitoring → normalization → done`

---

## 9. UNIVERSAL RULES (Always Active)

### Language Handling
- Respond in user's language
- Code comments/variables in English
- Explanations always in Russian per user preference

### Server & SSH Access
- VPS Server IP: `116.118.9.78`
- The deploy user `sudo` password is: `230281Maxut!`

### Clean Code
**ALL code MUST follow `@[skills/clean-code]` rules.**
- Concise, direct, no over-engineering, self-documenting
- Testing mandatory: Unit > Integration > E2E
- Performance measurement first

### File Dependency Awareness
Before modifying ANY file: check dependencies, identify affected files, update all together.

### Database State Verification (Check Before Asserting)
**MANDATORY:** Если задача касается базы данных, и вы не уверены, есть ли в ней реальные данные (клиенты, транзакции, история) или таблица пуста, вы **ОБЯЗАНЫ** предварительно зайти в базу и сделать SQL-запрос (например, `count(*)`) для проверки. **ЗАПРЕЩЕНО** утверждать, что "в базе нет данных" или "база пуста", не проверив это физически с помощью MCP-инструментов БД. Всегда сначала проверяйте факт, а потом стройте планы (особенно для миграций).

### Supabase Schema Isolation Protocol (v8.0.4)
**MANDATORY:** Каждый новый проект/сервис получает **отдельную PostgreSQL-схему** в Supabase.

| Правило | Описание |
|---------|----------|
| **Когда** | При `/create` нового проекта, если он использует базу данных |
| **Что** | Создаётся `CREATE SCHEMA {project_schema}` + GRANT для Supabase-ролей |
| **Реестр** | Запись в `public.project_registry` (schema_name, project_name, chg_id) |
| **Конвенция** | `snake_case`, латиница, без спецсимволов |
| **Скилл** | `@supabase-schema-provisioning` |

**Запрещено:**
- ❌ Создавать таблицы нового проекта в `public` schema
- ❌ Использовать кириллицу в имени схемы
- ❌ Создавать схему без записи в `project_registry`
- ❌ Пропускать GRANT для `anon`, `authenticated`, `service_role`

### System Map
Read `PROJECT_BRAIN.yaml` at session start (NOT `ARCHITECTURE.md` — it's Cold context).
- Project context: `PROJECT_BRAIN.yaml` (Hot — always read first)
- History: `docs/CHANGELOG.md` (Warm)
- Agents: `.agent/agents/` (Cold — on demand)
- Skills: `.agent/skills/` (Cold — on demand)
- Workflows: `.agent/workflows/` (Cold — on demand)
- Full architecture: `.agent/ARCHITECTURE.md` (Cold — Extended/Critical only)

---

## 10. ARCHITECTURE REFERENCE

### Two Layers (§7)
- **Human Layer (`docs/`):** change documents, plans, decisions, registries, templates
- **Machine Layer (`.agent/`):** workflows, agents, skills, rules, scripts, registry

### Workflows (18 total)
**Lifecycle:** `/clay`, `/plan`, `/frame`, `/route`, `/build`, `/verify`, `/release`, `/status`, `/skill-intake`
**Build modes:** `/create`, `/enhance`, `/debug`, `/orchestrate`, `/preview`
**Support:** `/brainstorm`, `/deploy`, `/test`, `/ui-ux-pro-max`

### Key Agents
`orchestrator`, `project-planner`, `security-auditor`, `backend-specialist`, `frontend-specialist`, `mobile-developer`, `debugger`, `game-developer`

### Key Skills
`clean-code`, `brainstorming`, `app-builder`, `frontend-design`, `mobile-design`, `plan-writing`, `behavioral-modes`, `supabase-schema-provisioning`

### Verification Scripts
| Script | Skill | When |
|--------|-------|------|
| `security_scan.py` | vulnerability-scanner | Always on deploy |
| `lint_runner.py` | lint-and-validate | Every code change |
| `test_runner.py` | testing-patterns | After logic change |
| `schema_validator.py` | database-design | After DB change |
| `ux_audit.py` | frontend-design | After UI change |
| `seo_checker.py` | seo-fundamentals | After page change |
| `lighthouse_audit.py` | performance-profiling | Before deploy |
| `playwright_runner.py` | webapp-testing | Before deploy |

---

## 11. DESIGN RULES

Design rules live in specialist agents:
- Web UI/UX → `.agent/agents/frontend-specialist.md`
- Mobile UI/UX → `.agent/agents/mobile-developer.md`

---

## 12. GIT PROTOCOL (v8.0.3)

Git интегрирован в пайплайн OSUI на 3 ключевых стадиях:

| Стадия | Git-действие | Формат |
|--------|-------------|--------|
| `/clay` | Создать ветку | `git checkout -b chg/{CHG-ID}` |
| `/build` | Коммит реализации | `git commit -m "🔨 build: {CHG-ID} — описание"` |
| `/release` | Тег + мерж в main | `git tag -a "release/{CHG-ID}"` + merge |

**Правила:**
- Ветки именуются `chg/{CHG-ID}` (пример: `chg/CHG-20260404-06`)
- Commit message: emoji + стадия + CHG-ID + описание
- Мерж через `--no-ff` (сохраняет граф истории)
- Теги создаются **только** после Human Gate Release Approval
- `main` — всегда стабилен (только релизный код)
- Если Git не инициализирован → Git-шаги пропускаются, workflow не блокируется
- **ОБЯЗАТЕЛЬНО: наличие `.gitignore` в корне проекта** со следующими базовыми исключениями: `.env*`, `.git`, `.venv`, `venv/`, `media/` (чтобы не учитывать локальные конфигурации и среды в журнале гита).

---

## 13. DEFINITION OF DONE (§32)

A change is complete ONLY when:
- [x] Meaning approved
- [x] Track selected and confirmed
- [x] Implementation complete
- [x] Verification verdict recorded
- [x] Release executed (or formally cancelled)
- [x] Observation completed (or explicitly `not_required`)
- [x] Documentation update done (or waived)
- [x] Source-of-truth document current
- [x] Derived registries synchronized
- [x] Change actually works in declared scope
- [x] **`docs/CHANGELOG.md` updated** ← NEW v8.0.3
- [x] **Git tag created (if git initialized)** ← NEW v8.0.3