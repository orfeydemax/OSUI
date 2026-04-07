---
description: Enhance existing system as a build mode under /build with Current Reality Audit (V9.1 §26.2)
---

# /enhance — Existing System Enhancement Build Mode

> V9.1 Build Mode: **/build → /enhance**
> Reference: §10.6, §26.2, §14

## Purpose

Evolve or improve existing functionality. Requires Warm-Enhance context loading and Current Reality Audit before implementation.

## Prerequisites
- Change has been routed (`/route` completed, including pre-routing gates Step 0)
- `gates.track_approval: approved`
- `stage: build`

## Steps

### 1. Load Warm-Enhance Context (V9.1)

> **ОБЯЗАТЕЛЬНО.** Без Warm-Enhance нельзя переходить к Current Reality Audit.

Execute `/context warm-enhance` automatically:
1. Read `docs/00_Registry/PRODUCT_SURFACE_STATE.yaml`
2. Read `docs/00_Registry/SITE_HISTORY_LOG.md`
3. Read `docs/00_Registry/HARNESS_CAPABILITIES.yaml`
4. Read affected modules (code) + neighboring shared zones
5. Check relevant human gate traces

**Stops:**
- `PRODUCT_SURFACE_STATE.yaml` missing → **STOP. Cannot enhance without baseline.**
- `HARNESS_CAPABILITIES.yaml` missing → **STOP. Cannot assess harness readiness.**

### 2. Current Reality Audit (§14)

Before modifying existing code, answer:
- How does the system actually work now?
- What modules are touched?
- What contracts are active?
- What documents are outdated?
- Where is drift between code, docs, data, and behavior?
- Does the as-is picture affect framing, routing, and build?

Fill template: `docs/_templates/current_reality_snapshot.yaml`

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

### 3. Protected Behavior Contract (V9.1)

> **ОБЯЗАТЕЛЬНО для shared UI/API surfaces.**

Fill template: `docs/_templates/protected_behavior_contract.md`
- List every behavior that MUST NOT break
- For each behavior: how to verify (manual or auto)
- Contract must be filled BEFORE any code write

**Stop:** No protected behavior contract for shared zones → **нельзя переходить к build (Step 6)**

### 4. Assess Removals and Couplings (V9.1)

Check if the enhancement removes, replaces, or deprecates any existing functionality:
- [ ] No removals detected → proceed
- [ ] Removal detected → fill `docs/_templates/removal_delta.md`, escalate to Extended+
- [ ] Unknown coupling detected → flag in change card, escalate to Extended+

### 5. Verify Change Card Reference
- Confirm scope stays within declared boundaries
- If audit reveals scope expansion → re-route via `/route`

### 6. 🚨 ОБЪЯВИТЬ АГЕНТА — ОБЯЗАТЕЛЬНЫЙ HARD STOP

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

### 7. Implement Enhancement
- Follow clean-code standards
- Preserve compatibility with existing code (§6.4)
- Apply compatibility layer / mapping / migration logic if needed
- **Do NOT silently remove neighboring behavior** — any removal requires `removal_delta.md` (v9.1)

### 8. AI Evidence Trail
If `ai_evidence_log_required: true`:
- Prepare `ai_evidence_log.yaml`

### 9. Update Change Card
- `next_action: verify`
- Update risks and blockers

## Output
- Enhanced system (code changes)
- Current Reality Snapshot (filled template)
- Protected Behavior Contract (filled template, if shared surface)
- Removal Delta (if removals detected)
- AI Evidence Log (if applicable)
- Ready for `/verify`

## Forbidden
- ❌ Starting enhance without Warm-Enhance context (v9.1)
- ❌ Skipping Current Reality Audit
- ❌ Code write without Protected Behavior Contract for shared surfaces (v9.1)
- ❌ Silent removal of existing behavior without `removal_delta.md` (v9.1)
- ❌ Skipping agent announcement (Step 6)
- ❌ Scope expansion without re-route

## Context Budget
- **Class: Heavy** — Hot + Warm + Warm-Enhance + existing code, docs, contracts, change card
