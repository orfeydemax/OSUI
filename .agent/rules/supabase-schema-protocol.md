# Supabase Schema Isolation Protocol (v8.0.4)

> Вынесено из GEMINI.md. Применяется ТОЛЬКО при `/create` нового проекта с БД.

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
