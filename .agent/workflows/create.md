---
description: Create a new feature or service as a build mode under /build (V8 §26.1)
---

# /create — New Feature Build Mode

> V8 Build Mode: **/build → /create**
> Reference: §10.6, §26.1

$ARGUMENTS

## Purpose

Build a new feature or service. This is a build mode under the `/build` meta-workflow.

---

## Prerequisites
- Change has been routed (`/route` completed)
- `gates.track_approval: approved`
- `stage: build`
- Track and required artifacts determined

---

## Before Starting

Если запрос неясен — задать уточняющие вопросы:

- **Что создаём?** — тип приложения/фичи
- **Какие базовые функции?** — MVP scope
- **Кто будет использовать?** — целевая аудитория
- **Есть ли аналоги/референсы?** — визуальные или функциональные

**Принцип:** Use defaults, add details later. Не перепроектируй.

---

## Steps

### 1. Verify Change Card Reference
- Confirm the change is linked to a valid Change Card
- Confirm track and required artifacts list

### 2. Read Required Context
Based on track:
- **Nano**: Change Card + Nano Intent Note only
- **Core**: Change Card + Passport + Economics Gate
- **Extended+**: Change Card + all framing artifacts + relevant architecture docs

### 3. 🚨 ОБЪЯВИТЬ АГЕНТА — ОБЯЗАТЕЛЬНЫЙ HARD STOP

> **ЗАПРЕЩЕНО писать код или запускать инструменты до выполнения этого шага.**

До любой реализации AI **обязан** в чате написать:

```
🤖 Applying knowledge of @[agent-name]
📚 Skills loading: [список скиллов]
```

Пример:
```
🤖 Applying knowledge of @frontend-specialist
📚 Skills loading: frontend-design, clean-code, frontend-dev-guidelines
```

Выбор агента по домену:
- Frontend / UI → `@frontend-specialist`
- Backend / API / DB → `@backend-specialist`
- Mobile → `@mobile-developer`
- Несколько доменов → `@orchestrator` + явно перечислить суб-агентов

Если объявление пропущено → это нарушение P0 (GEMINI.md §1). Задача считается **не начатой**.

### 4. Project Planning
- Определить tech stack
- Спланировать файловую структуру
- Создать план задачи (task breakdown)
- Получить одобрение перед реализацией

### 4.5. 🗄️ Supabase Schema Provisioning (для новых проектов)

> **ОБЯЗАТЕЛЬНО** если создаётся новый проект/сервис с базой данных.
> Скилл: `@supabase-schema-provisioning`

1. **Сгенерировать имя схемы** из `project_name` (snake_case, латиница)
2. **Проверить уникальность** — схема не должна существовать:
   ```sql
   SELECT schema_name FROM information_schema.schemata WHERE schema_name = '{name}';
   ```
3. **Подтвердить с пользователем** — показать предлагаемое имя схемы
4. **Создать схему** через `mcp_supabase-selfhosted_apply_migration`:
   - `CREATE SCHEMA IF NOT EXISTS {schema_name}`
   - `GRANT USAGE` для `anon`, `authenticated`, `service_role`
   - `ALTER DEFAULT PRIVILEGES` для таблиц и последовательностей
5. **Записать в реестр** `public.project_registry`
6. **Обновить change_card.yaml** — записать `project_schema: {schema_name}`

> ⚠️ Все таблицы проекта создаются **внутри** этой схемы, НЕ в `public`.

### 5. Implement (координация экспертов)

Orchestrate expert agents в правильном порядке:

```
1. database-architect → Schema, migrations, RLS
2. backend-specialist → API endpoints, Server Actions, business logic
3. frontend-specialist → UI components, pages, UX
```

**Правила реализации:**
- Follow clean-code standards
- Adhere to project architecture
- Create code, configs, migrations as needed
- Track evidence for verification

> ⚠️ **КРИТИЧЕСКОЕ ПРАВИЛО — ФАЙЛЫ ПОСЛЕДОВАТЕЛЬНО:**
> Запрещено запускать несколько `write_to_file` или `replace_file_content` параллельно!
> Всегда используй `waitForPreviousTools: true` или запускай по одному файлу за раз.
> Параллельные записи в файлы конкурируют за ресурсы ОС → зависание системы.

### 6. Preview
After implementation complete:
- Start preview server (`/preview` workflow)
- Present URL to user
- Collect feedback and iterate if needed

### 7. AI Evidence Trail
If `ai_evidence_log_required: true`:
- Prepare `docs/_templates/ai_evidence_log.yaml`
- Document materials used, tasks performed, outputs, review status

### 8. Update Change Card
- Update `next_action` as work progresses
- Update `active_risks` and `open_blockers`
- When implementation complete → recommend `/verify`

---

## Usage Examples

```
/create blog site
/create e-commerce app with product listing and cart
/create booking calendar component
/create admin dashboard for client management
/create API endpoint for notifications
```

---

## Output
- Implemented feature (code, config, etc.)
- **Supabase schema created** (if new project with DB)
- Preview URL (if applicable)
- AI Evidence Log (if applicable)
- Ready for `/verify`

## Context Budget
- **Class: Medium to Heavy** — depending on track and scope
