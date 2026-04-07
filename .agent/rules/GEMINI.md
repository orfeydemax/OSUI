---
trigger: always_on
---

# GEMINI.md — V9.1 Operating Standard

> Global policy layer. Extended rules → `.agent/rules/`.

---

## 0. MASTER FORMULA

**Human sets meaning, risk, acceptable error cost, and final permission.
AI analyzes, structures, drafts, implements, and verifies within constraints.
Workflows route changes. Agents own domains. Skills provide methods.
`docs` = human-visible state. `.agent` = machine execution.
Critical transitions never happen silently.
A change is NOT done without evidence, observation, doc update, and explicit closure.**

---

## 1. AGENT & SKILL PROTOCOL

> **MANDATORY:** Read agent file + skills BEFORE any implementation.

**Rule Priority:** P0 (GEMINI.md) > P1 (Agent .md) > P2 (SKILL.md)

**Before first line of code — all 4 steps:**

| Step | Check | Missing → |
|------|-------|-----------| 
| 1 | Agent identified? | STOP |
| 2 | `.agent/agents/{agent}.md` read? | STOP |
| 3 | `🤖 Applying knowledge of @[agent]` written? | STOP |
| 4 | `📚 Skills loading: [...]` listed? | STOP |

**Forbidden:** Code without agent announcement. Resume without re-announcement.

---

## 2. CHANGE LIFECYCLE

```
Clay → Plan → Frame → Route → Build → Verify → Release → Observation → Done
```

### Forbidden Transitions
- ❌ `Clay → Build`
- ❌ `Build → Release` without `Verify`
- ❌ `Plan → Build` without `Route`
- ❌ `Plan → Route` without `Frame` (all tracks, except Hotfix)
- ❌ `Route` без `/frame`
- ❌ `Bug intake → Hotfix` without triage
- ❌ `Release → Done` without observation or `observation_not_required`
- ❌ `Release → Done` без CHANGELOG.md update
- ❌ `Release → Done` без Git tag (если git init)
- ❌ Agent identified → Code without chat announcement
- ❌ `Route → Build` без ЯВНОГО текстового подтверждения человека
- ❌ `/create` без Supabase-схемы (если проект использует БД). См. `rules/supabase-schema-protocol.md`
- ❌ Brownfield `/enhance` без pre-routing gates (Step 0) — v9.1
- ❌ Removal change на Nano/Core track — v9.1, requires Extended+
- ❌ `/enhance` без `protected_behavior_contract.md` для shared UI surface — v9.1
- ❌ Verify pass без проверки protected perimeter — v9.1

---

## 3. REQUEST CLASSIFIER

| Type | Trigger | Workflow | Budget |
|------|---------|----------|--------|
| Question | "what is", "explain" | Direct response | Hot |
| Micro-fix | single file, no risk | `/clay` → `/route` (Nano) → `/build` | Hot+Warm |
| Feature | "build", "create" | `/clay` → `/plan` → `/frame` → `/route` → `/build` | Medium |
| Enhancement | "improve", "enhance" | `/clay` → `/plan` → `/frame` → `/route` → `/enhance` | Medium |
| Bug | "fix", "broken" | `/debug` → triage → `/route` → fix → `/verify` | Medium |
| Prod incident | "down", "critical" | `/debug` → Hotfix Track | Heavy |

---

## 4. TRACK SYSTEM

| Score | Track |
|-------|-------|
| Nano eligible | Nano |
| 0–3 | Core |
| 4–8 | Extended |
| 9+ | Critical |
| Prod incident | Hotfix |

Scoring: multiple layers +2, roles/RLS +3, state-model +2, data migration +3, history risk +4, stateful +3, breaking +5, arch shift +5.

---

## 5. HUMAN GATES

AI cannot close these gates:
1. Problem Definition  2. Brief Origin  3. Business Priority  4. Contradiction Resolution
5. Track Approval  6. Verification Go/No-Go  7. Release Approval  8. Rollback Decision

States: `not_started` | `draft` | `pending_human` | `approved` | `rejected` | `blocked` | `escalated`

---

## 6. AI GOVERNANCE

**AI CAN:** Draft, analyze, compare, code, migrate, test under human control.
**AI CANNOT:** Own documents, accept risk, approve critical decisions, close human gates, declare hotfix safe, set `done` alone.

### V9.1 Brownfield Safeguards
- ❌ Enhance only by `PROJECT_BRAIN.yaml` + target file — must read `PRODUCT_SURFACE_STATE.yaml` + `HARNESS_CAPABILITIES.yaml`
- ❌ `CHANGELOG.md` ≠ full memory. Real history → `SITE_HISTORY_LOG.md`
- ❌ Verify pass without protected perimeter check
- ❌ Silent removal — requires `removal_delta.md` + Extended+

---

## 7. CONTEXT BUDGET

| Level | Contents | When | Tokens |
|-------|----------|------|--------|
| 🔴 Hot | `PROJECT_BRAIN.yaml` | ALWAYS | ~1 500 |
| 🟡 Warm | git log + CHANGELOG + target file | Code tasks | +1 000–5 000 |
| 🟠 Warm-Enhance | + PRODUCT_SURFACE_STATE + SITE_HISTORY_LOG + HARNESS_CAPABILITIES | `/enhance` only | +2 000 |
| 🔵 Cold | ARCHITECTURE.md, change_card, skills, workflows | Extended/Critical | +5 000–30 000 |

**Reading order:** 1. PROJECT_BRAIN.yaml → 2. git log -n 10 → 3. Target file → 4. CHANGELOG → 5. Cold (if needed)

**Forbidden:** Reading `docs/Done/` fully (~300k tokens). Reading ARCHITECTURE.md for Nano/Core. Reading skills/workflows "just in case".

---

## 8. UNIVERSAL RULES

- **Language:** Explanations in Russian. Code comments in English.
- **Server access:** See `.agent/rules/server-access.md`
- **Clean code:** Follow `@[skills/clean-code]`. Concise, direct, no over-engineering.
- **File awareness:** Check dependencies before modifying any file.
- **DB verification:** SQL query first, then assertions. Never claim "empty" without `count(*)`.
- **Supabase isolation:** See `.agent/rules/supabase-schema-protocol.md`
- **System map:** Hot = `PROJECT_BRAIN.yaml`. Warm = `CHANGELOG.md`. Cold = `.agent/ARCHITECTURE.md`.

---

## 9. GIT PROTOCOL

| Stage | Action | Format |
|-------|--------|--------|
| `/clay` | Branch | `git checkout -b chg/{CHG-ID}` |
| `/build` | Commit | `git commit -m "🔨 build: {CHG-ID} — desc"` |
| `/release` | Tag + merge | `git tag -a "release/{CHG-ID}"` + `--no-ff` merge |

Rules: branches = `chg/{CHG-ID}`, tags after Release Approval only, `main` always stable, `.gitignore` mandatory.

---

## 10. DEFINITION OF DONE

A change is complete ONLY when ALL are true:
- Meaning approved, track confirmed, implementation complete
- Verification verdict recorded, release executed
- Observation completed (or `not_required`)
- Documentation updated, source-of-truth current, registries synced
- CHANGELOG.md updated, Git tag created (if git init)
- Change works in declared scope

---

## 11. EXTENDED RULES (read on demand)

| Rule file | When to read |
|-----------|-------------|
| `.agent/rules/server-access.md` | Server/SSH/deploy tasks |
| `.agent/rules/supabase-schema-protocol.md` | `/create` with database |
| `.agent/rules/architecture-reference.md` | Extended/Critical tasks |
| `.agent/rules/SANDBOX_FIRST.md` | Build/test/deploy operations |