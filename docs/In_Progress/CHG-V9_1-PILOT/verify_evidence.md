# Verify Evidence — CHG-V9_1-PILOT

## Verification Report

```yaml
change_id: CHG-V9_1-PILOT
verified_at: 2026-04-08T02:30:00+07:00
verdict: pass
verdict_type: pass

protected_perimeter:
  status: intact
  behaviors_total: 9
  behaviors_verified: 9
  behaviors_broken: 0
  behaviors_degraded: 0
  verification_method: "automated YAML parse + 7 assertion checks + manual review"
```

## Protected Behavior Checklist

| # | Behavior | Status | Method |
|---|----------|--------|--------|
| 1 | YAML valid (parseable) | ✅ PASS | `yaml.safe_load()` — no exception |
| 2 | 3 surface groups present | ✅ PASS | assert `set(keys) == {human, machine, root}` |
| 3 | Each surface has status + path/components | ✅ PASS | assert `'status' in s[k]` for all k |
| 4 | known_gaps section exists | ✅ PASS | assert `'known_gaps' in data` |
| 5 | protected_behaviors section exists | ✅ PASS | assert `'protected_behaviors' in data` |
| 6 | product_name = "V9 OSUI" | ✅ PASS | assert `data['product_name'] == 'V9 OSUI'` |
| 7 | last_updated = 2026-04-08 | ✅ PASS | assert `data['last_updated'] == '2026-04-08'` |
| 8 | No active surface deleted | ✅ PASS | all 3 groups + all components present in diff |
| 9 | No path changed | ✅ PASS | `docs/` and `.agent/` paths preserved |

## Surface Diff Evidence

Script: `collect_surface_diff.py --change-id CHG-V9_1-PILOT`

- PRODUCT_SURFACE_STATE.yaml: **changed** (24 lines added, 18 removed, 46 unchanged)
- HARNESS_CAPABILITIES.yaml: **unchanged**

Changes are consistent with scope:
- scripts count 5 → 10
- scripts status active_untested → active (partial/tested breakdown)
- GEMINI.md description updated
- protected behaviors 5 → 9
- known_gaps corrected

## Registry Freshness

Script: `check_registry_freshness.py --strict --check-surfaces machine_layer,product_surface_state`

- Verdict: **pass**
- All 5 files: fresh
- W-8b check: WARNING triggered (surfaces found in registry → confirms change is real, not false no_change)

## Before/After Summary

| Field | Before | After |
|-------|--------|-------|
| surface_version | 9.1.0-alpha | 9.1.0-beta |
| scripts count | 5 | 10 |
| scripts status | active_untested | active (mixed) |
| GEMINI.md desc | "AI behavior rules, P0 priority" | "V9.1 Operating Standard — 6661 bytes, compressed. P0 priority." |
| rules count | (not listed) | 5 |
| protected_behaviors | 5 items | 9 items |
| known_gaps | 4 items (2 stale) | 5 items (all current) |
