---
description: Enhance existing system as a build mode under /build with Current Reality Audit (V8 §26.2)
---

# /enhance — Existing System Enhancement Build Mode

> V8 Build Mode: **/build → /enhance**
> Reference: §10.6, §26.2, §14

## Purpose

Evolve or improve existing functionality. Requires Current Reality Audit before implementation.

## Prerequisites
- Change has been routed (`/route` completed)
- `gates.track_approval: approved`
- `stage: build`

## Steps

### 1. Current Reality Audit (§14)
Before modifying existing code, answer:
- How does the system actually work now?
- What modules are touched?
- What contracts are active?
- What documents are outdated?
- Where is drift between code, docs, data, and behavior?
- Does the as-is picture affect framing, routing, and build?

Minimum output:
- `as_is_summary`
- `implemented_system_snapshot`
- `touched_modules`
- `active_contracts`
- `outdated_docs`
- `drift_findings`
- `contradiction_findings`
- `routing_impact`
- `audit_confidence_level`

Update Change Card:
- `current_reality_audit_status: completed`

### 2. Verify Change Card Reference
- Confirm scope stays within declared boundaries
- If audit reveals scope expansion → re-route

### 3. 🚨 ОБЪЯВИТЬ АГЕНТА — ОБЯЗАТЕЛЬНЫЙ HARD STOP

> **ЗАПРЕЩЕНО писать код или запускать инструменты до выполнения этого шага.**

До любой реализации AI **обязан** в чате написать:

```
🤖 Applying knowledge of @[agent-name]
📚 Skills loading: [список скиллов]
```

Пример для фронтенд+бекенд задачи:
```
🤖 Applying knowledge of @frontend-specialist + @backend-specialist
📚 Skills loading: frontend-design, clean-code, database-design, api-patterns
```

Если объявление пропущено → нарушение P0. Задача считается **не начатой**.

### 4. Implement Enhancement
- Follow clean-code standards
- Preserve compatibility with existing code (§6.4)
- Apply compatibility layer / mapping / migration logic if needed

### 4. AI Evidence Trail
If `ai_evidence_log_required: true`:
- Prepare `ai_evidence_log.yaml`

### 5. Update Change Card
- `next_action: verify`
- Update risks and blockers

## Output
- Enhanced system (code changes)
- Current Reality Audit results
- AI Evidence Log (if applicable)
- Ready for `/verify`

## Context Budget
- **Class: Heavy** — read existing code, docs, contracts, change card
