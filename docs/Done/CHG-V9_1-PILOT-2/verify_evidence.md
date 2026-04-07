# Verify Evidence — CHG-V9_1-PILOT-2

```yaml
change_id: CHG-V9_1-PILOT-2
verified_at: 2026-04-08T02:39:00+07:00
verdict: pass
verdict_type: pass

protected_perimeter:
  status: intact
  behaviors_total: 8
  behaviors_verified: 8
  behaviors_broken: 0
  behaviors_degraded: 0
```

## Protected Behavior Verification

| # | Behavior | Status | Method | Evidence |
|---|----------|--------|--------|----------|
| 1 | Exit code 0 | ✅ PASS | subprocess.run + assert | `EXIT_CODE: 0` |
| 2 | Root key "release_trace" | ✅ PASS | json.loads + assert | `PASS: root key release_trace exists` |
| 3 | 10 original fields | ✅ PASS | field-by-field assert loop | `PASS: all 10 original fields present` |
| 4 | CLI args work | ✅ PASS | 3 arg combos tested | `PASS: all CLI arg combos work` |
| 5 | Output file path | ✅ PASS | file exists check | `.tmp/traces/CHG-V9_1-PILOT-2_release_trace.json` created |
| 6 | sys.stdout.reconfigure | ✅ PASS | source code inspection | Line 19: `sys.stdout.reconfigure(encoding='utf-8', errors='replace')` |
| 7 | Baseline ref lookup | ✅ PASS | runtime test | `baseline_ref.exists: true, status: complete` in output |
| 8 | No external deps | ✅ PASS | import audit | Only: argparse, json, subprocess, sys, datetime, pathlib — all stdlib |

## New Behavior Verification (added by this change)

| Behavior | Status | Evidence |
|----------|--------|----------|
| `changelog_check` field in JSON | ✅ Present | `"changelog_check": {"status": "stale", "warning": "..."}` |
| W-12 warning when CHANGELOG stale | ✅ Fired | `⚠️ W-12 WARNING: CHANGELOG.md was NOT updated after baseline capture` |
| No warning when no baseline | ✅ Works | `changelog_check.status = no_baseline` (test without baseline) |

## Harness Script Evidence

| Script | Result |
|--------|--------|
| capture_baseline.py | ✅ Baseline captured: cc61eaf |
| collect_surface_diff.py | ✅ no_changes (registry not affected by this change — correct) |
| check_registry_freshness.py --strict | ✅ pass (5/5 fresh) |
| replay_protected_flow.py | ✅ 8 behaviors parsed from contract |
| emit_release_trace.py (the target itself) | ✅ runs with new changelog_check |

## Surface Diff

Expected: PRODUCT_SURFACE_STATE.yaml and HARNESS_CAPABILITIES.yaml unchanged (script change does not affect registries).
Actual: `status: no_changes` — correct.
