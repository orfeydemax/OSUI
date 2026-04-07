# SANDBOX_FIRST — Правило изолированного выполнения (V9.1)

> **Приоритет: P0.** Это правило действует всегда, без исключений.

## Принцип

Любая операция build / test / replay / install / preview сначала выполняется в изолированной среде (sandbox, devcontainer, temp workspace).
Выход в host / prod контур — только после явного обоснования и ask-first подтверждения.

## Правила

### Sandbox-first операции (ВСЕГДА изолировано)
- `npm install`, `pip install` — в sandbox / venv / temp dir
- Запуск E2E/integration тестов — в sandbox / docker
- Replay protected flows — в sandbox / staging
- Preview сборки — через `npm run dev` на локальном порту, не на prod
- Любая операция с внешними API — sandbox credentials

### Host-allowed операции (можно на host напрямую)
- Чтение файлов (grep, view, list)
- Git операции (add, commit, tag, log, diff)
- Lint и статический анализ (read-only)
- Генерация/редактирование файлов в рабочем workspace
- Запуск Python-скриптов из `.agent/scripts/` (они read-only по продакшену)

### Prod-restricted операции (ТОЛЬКО с явным разрешением)
- SSH на prod сервер
- Docker build/deploy на prod
- Database migration на prod
- DNS/SSL/infra изменения

## Обоснование для выхода из sandbox

Если операция требует host или prod доступ, AI обязан:
1. Назвать операцию
2. Объяснить, почему sandbox недостаточен
3. Указать risk level: `low` / `medium` / `high`
4. Дождаться явного подтверждения человека

## Forbidden
- ❌ `npm install` или `pip install` на host без обоснования
- ❌ Запуск prod deployment без Human Gate Release Approval
- ❌ Прямой SSH на prod для «быстрого фикса» без triage
- ❌ Default privileged execution — всё начинается с минимальных прав
