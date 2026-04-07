---
description: Controlled skill evolution — manage capability gaps through reviewed intake (V8 §10.10, §22)
---

# /skill-intake — Controlled Skill Evolution

> V8 Reference: §10.10, §22

## Purpose

Manage capability gaps through a controlled intake pipeline. The system seeks specific capability gaps, not "one more skill."

## Pipeline (§22.1)

```
capability gap
→ skill intake
→ review
→ approval
→ incubation
→ evidence of value
→ registry mapping
→ activation
```

## Steps

### 1. Identify Capability Gap
- What can the system NOT do that it should?
- Is this a real gap or a preference?
- Would an existing skill cover this with configuration?

### 2. Skill Intake Review
- Check for duplicate/conflicting skills
- Verify the gap is genuine
- Assess integration impact on existing workflows

### 3. Approval Gate
- Human owner must approve the new skill intake
- Document the rationale

### 4. Incubation
- Create the skill in a non-production state
- Test in isolation
- Verify no conflicts with existing skills

### 5. Evidence of Value
- Does the skill deliver real value?
- Is it used or is it dead weight?

### 6. Registry Mapping
- Map the skill to workflows and agents that should use it
- Update ARCHITECTURE.md

### 7. Activation
- Promote to active status
- Update `.agent/skills/` directory

## Forbidden (§22.3)
- ❌ Importing external skills directly into production workflow
- ❌ Activating internal skills without review
- ❌ Creating skill duplicates without conflict/duplicate check

## Context Budget
- **Class: Medium** — read existing skills list, architecture docs, gap analysis
