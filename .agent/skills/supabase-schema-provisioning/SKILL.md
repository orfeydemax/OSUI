---
name: supabase-schema-provisioning
description: Автоматическое создание изолированных Supabase-схем для новых проектов. Конвенция именования, RLS, права доступа.
allowed-tools: Read, Write, Edit, MCP
---

# Supabase Schema Provisioning

> **Каждый проект живёт в своей схеме. Без исключений.**

## 🎯 Суть

Когда через OSUI создаётся новый проект (change_type: feature → новый продукт/сервис),
система ОБЯЗАНА создать отдельную PostgreSQL-схему в Supabase для изоляции данных.

---

## Конвенция именования схем

| Правило | Формат | Пример |
|---------|--------|--------|
| Имя схемы | `snake_case`, латиница, без спецсимволов | `booking_app`, `apdif_bot` |
| Префикс (опционально) | домен проекта | `hh`, `kineziolog` |
| Запрещено | пробелы, кириллица, заглавные буквы в начале | ❌ `My Project`, ❌ `Проект_1` |

**Генерация имени:**
1. Взять `project_name` из change_card
2. Транслитерировать кириллицу → латиницу
3. Привести к `snake_case`
4. Убрать спецсимволы
5. Если уже существует — добавить суффикс `_v2`, `_v3`

---

## SQL-миграция для создания схемы

```sql
-- 1. Создать схему
CREATE SCHEMA IF NOT EXISTS {schema_name};

-- 2. Выдать права для Supabase-ролей
GRANT USAGE ON SCHEMA {schema_name} TO anon, authenticated, service_role;

-- 3. Права на будущие таблицы (автоматически)
ALTER DEFAULT PRIVILEGES IN SCHEMA {schema_name}
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA {schema_name}
  GRANT USAGE, SELECT ON SEQUENCES TO anon, authenticated, service_role;

-- 4. Экспоуз через PostgREST (чтобы API видел схему)
-- ВАЖНО: это требует обновления конфигурации PostgREST/Supabase
-- Добавить схему в PGRST_DB_SCHEMAS (через .env или Dashboard)

-- 5. Метаданные проекта (запись в реестр)
INSERT INTO public.project_registry (schema_name, project_name, chg_id, created_at)
VALUES ('{schema_name}', '{project_name}', '{CHG-ID}', NOW())
ON CONFLICT (schema_name) DO NOTHING;
```

---

## Реестр проектов (project_registry)

Создаётся один раз в `public` схеме:

```sql
CREATE TABLE IF NOT EXISTS public.project_registry (
  id SERIAL PRIMARY KEY,
  schema_name TEXT UNIQUE NOT NULL,
  project_name TEXT NOT NULL,
  chg_id TEXT,
  status TEXT DEFAULT 'active', -- active | archived | deleted
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.project_registry ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_read_project_registry"
  ON public.project_registry FOR SELECT
  USING (true);

CREATE POLICY "allow_service_role_manage"
  ON public.project_registry FOR ALL
  USING (auth.role() = 'service_role');
```

---

## Контроль перед созданием

Перед созданием схемы — **ОБЯЗАТЕЛЬНО проверить:**

1. ✅ Схема с таким именем ещё НЕ существует
   ```sql
   SELECT schema_name FROM information_schema.schemata WHERE schema_name = '{name}';
   ```
2. ✅ Имя соответствует конвенции (snake_case, латиница)
3. ✅ Пользователь подтвердил имя проекта

---

## Интеграция с OSUI Workflows

### В `/clay`:
- Добавить в `change_card.yaml` поля:
  - `project_name:` — имя проекта (человекочитаемое)
  - `project_schema:` — имя схемы в Supabase (генерируется автоматически)

### В `/create` (шаг 4.5 — после планирования, до реализации):
1. Сгенерировать `project_schema` из `project_name`
2. Проверить уникальность
3. Создать схему через `mcp_supabase-selfhosted_apply_migration`
4. Записать в `project_registry`
5. Обновить `change_card.yaml` с подтверждённым именем схемы

### В `/build`:
- Все таблицы проекта создаются **внутри** проектной схемы
- `search_path` включает проектную схему

---

## Анти-паттерны

❌ Создавать таблицы нового проекта в `public` schema
❌ Использовать кириллицу в имени схемы
❌ Создавать схему без записи в `project_registry`
❌ Пропускать GRANT для Supabase-ролей
❌ Создавать схему без подтверждения пользователем
