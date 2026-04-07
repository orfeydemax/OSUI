# AGENTS.md — Навигационный справочник агентов

> Читай первым при определении, какой агент нужен для задачи.
> Полные файлы: `.agent/agents/{name}.md` — читать только при активации агента.

## Порядок чтения при старте

1. `PROJECT_BRAIN.yaml` — контекст проекта (Hot)
2. `AGENTS.md` (этот файл) — выбрать агента
3. `.agent/agents/{agent}.md` — прочитать файл выбранного агента
4. Объявить в чате: `🤖 Applying knowledge of @{agent}`

## Маршрутизация по типу задачи

| Задача | Агент | Ключевые скиллы |
|--------|-------|-----------------|
| Web UI/UX | `frontend-specialist` | frontend-design, react-best-practices |
| API/Backend | `backend-specialist` | api-patterns, nodejs-best-practices |
| База данных | `database-architect` | database-design |
| Mobile app | `mobile-developer` | mobile-design |
| Game | `game-developer` | game-development |
| CI/CD/Docker | `devops-engineer` | deployment-procedures |
| Безопасность | `security-auditor` | vulnerability-scanner |
| Тестирование | `test-engineer` | testing-patterns, webapp-testing |
| Баг/отладка | `debugger` | systematic-debugging |
| Производительность | `performance-optimizer` | performance-profiling |
| SEO | `seo-specialist` | seo-fundamentals |
| Планирование | `project-planner` | brainstorming, plan-writing |
| Многоагентная задача | `orchestrator` | parallel-agents |
| Документация | `documentation-writer` | documentation-templates |
| Ревью легаси | `code-archaeologist` | clean-code |
| Разведка кодовой базы | `explorer-agent` | — |
| Требования | `product-manager` | plan-writing |
| Стратегия/MVP | `product-owner` | plan-writing |
| Pentest | `penetration-tester` | red-team-tactics |
| E2E автоматизация | `qa-automation-engineer` | webapp-testing |

## Навигация по ключевым документам

| Что искать | Где читать |
|-----------|-----------|
| Baseline existing system | `docs/00_Registry/PRODUCT_SURFACE_STATE.yaml` |
| Protected behavior | `PROJECT_BRAIN.yaml` → `protected_capabilities` |
| Routing rules | `.agent/workflows/route.md` |
| Verify rules | `.agent/workflows/verify.md` |
| Release rules | `.agent/workflows/release.md` |

## Правила

- НЕ читать все файлы агентов «на всякий случай»
- Читать ТОЛЬКО файл активированного агента
- Объявление агента обязательно ДО любого кода
- Full-stack задачи = `frontend-specialist` + `backend-specialist`
