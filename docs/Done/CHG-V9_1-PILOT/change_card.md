# CHG-V9_1-PILOT — Пилотный brownfield change

## Change Card

```yaml
chg_id: CHG-V9_1-PILOT
title: "Обновление PRODUCT_SURFACE_STATE.yaml — отражение фактического состояния Phase 6"
type: enhancement
track: Core
score: 2
status: in_progress
stage: route

created: 2026-04-08
owner: MAX

surfaces_affected:
  - docs/00_Registry/PRODUCT_SURFACE_STATE.yaml

scope:
  what_changes:
    - "Scripts count: 5 → 10 (5 new Phase 6 scripts)"
    - "Scripts status: active_untested → active_tested (4 of 5 verified)"
    - "GEMINI.md description: отражение V9.1 + compression"
    - "Templates count: 24 → 24 (без изменений)"
    - "Known gaps: обновление после Phase 6 closures"
    - "Protected behaviors: обновление на 16 Forbidden Transitions"
  what_stays:
    - "human_layer structure"
    - "root_files structure"
    - "All existing surfaces remain active"
  removals: none

routing:
  harness_capability_check: pass
  baseline_confidence_check: pass (baseline captured: c487fac)
  agent_legibility_check: pass (documentation-writer / explorer-agent)

gates:
  track_approval: pending_human
  verification_go: not_started
  release_approval: not_started
```

## Route Decision

| Factor | Value |
|--------|-------|
| Layers | 1 (docs only) |
| Roles/RLS | 0 |
| State model | 0 |
| Data migration | 0 |
| History risk | 0 |
| Stateful | 0 |
| Breaking | 0 |
| Arch shift | 0 |
| **Total** | **2** |
| **Track** | **Core** |

## Pre-Routing Gates (Step 0 — V9.1)

| Gate | Status | Evidence |
|------|--------|----------|
| Harness Capability Check | ✅ pass | capture_baseline: working, check_registry_freshness: working |
| Baseline Confidence Check | ✅ pass | Baseline captured: `.tmp/baselines/CHG-V9_1-PILOT/` |
| Agent Legibility Check | ✅ pass | documentation-writer → documentation-templates skill |
