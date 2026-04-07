# Architecture Reference — Cold Context

> Вынесено из GEMINI.md (бывшая секция 10).
> Это Cold-контекст. Читать ТОЛЬКО при Extended/Critical задачах.

## Two Layers (§7)
- **Human Layer (`docs/`):** change documents, plans, decisions, registries, templates
- **Machine Layer (`.agent/`):** workflows, agents, skills, rules, scripts, registry

## Workflows (18 total)
**Lifecycle:** `/clay`, `/plan`, `/frame`, `/route`, `/build`, `/verify`, `/release`, `/status`, `/skill-intake`
**Build modes:** `/create`, `/enhance`, `/debug`, `/orchestrate`, `/preview`
**Support:** `/brainstorm`, `/deploy`, `/test`, `/ui-ux-pro-max`

## Key Agents
`orchestrator`, `project-planner`, `security-auditor`, `backend-specialist`, `frontend-specialist`, `mobile-developer`, `debugger`, `game-developer`

## Key Skills
`clean-code`, `brainstorming`, `app-builder`, `frontend-design`, `mobile-design`, `plan-writing`, `behavioral-modes`, `supabase-schema-provisioning`

## Verification Scripts
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

## Design Rules
Design rules live in specialist agents:
- Web UI/UX → `.agent/agents/frontend-specialist.md`
- Mobile UI/UX → `.agent/agents/mobile-developer.md`
