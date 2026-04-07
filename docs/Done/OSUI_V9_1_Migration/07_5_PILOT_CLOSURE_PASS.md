# Phase 7 — Pilot Closure Pass (Step 7.5)

## Weakness Registry

### W-11: Track Approval Gate enforcement
```yaml
status: closed (via patch)
weakness: "AI skips Route → Build without human approval"
fix_applied: "route.md Step 7→8 replaced with explicit ⛔ STOP block. AI instructed to STOP, present 5 items, wait for response. Stage stays 'route' until human approves."
patch_file: ".agent/workflows/route.md"
patch_type: "minimal — 13 lines replaced with 28 lines"
owner: MAX
closed_at: 2026-04-08
verified_by: "source inspection (no runtime test — workflow file, not script)"
```

### W-12: CHANGELOG check in release pipeline
```yaml
status: closed
weakness: "No CHANGELOG.md update verification in release pipeline"
fix_applied: "emit_release_trace.py now contains check_changelog_updated(). New JSON field changelog_check. Warning output if stale."
patch_file: ".agent/scripts/emit_release_trace.py"
closed_at: 2026-04-08
verified_by: "runtime test on CHG-V9_1-PILOT-2 — stale warning fired correctly"
```

### W-13: Ad-hoc verification code
```yaml
status: accepted_waiver
weakness: "replay_protected_flow.py generates checklist, not assertions. AI writes inline Python for actual verification."
owner: MAX
review_phase: "next harness evolution cycle"
closure_condition: "replay_protected_flow.py gains assertion mode for common patterns: YAML parse, key-exists, value-equals, exit-code, JSON-schema"

where_acceptable:
  - "YAML/MD data updates — manual checklist is sufficient"
  - "Non-critical Core track changes — ad-hoc Python is fast and correct"

where_not_acceptable:
  - "Extended/Critical track code changes with >5 behaviors"
  - "Changes to shared pipeline scripts (verify.md, release.md, harness scripts)"
  - "Changes where behavior regression has production impact"

mitigation: "AI documents ad-hoc verification code in verify_evidence.md. Code is not saved as reusable script, but evidence is preserved."
```

### W-14: collect_surface_diff blind to code changes
```yaml
status: accepted_design_limitation
weakness: "collect_surface_diff.py compares only PRODUCT_SURFACE_STATE.yaml and HARNESS_CAPABILITIES.yaml. Code (.py, .md) changes invisible."
owner: MAX
rationale: "Surface diff = registry tracking by design. Code diff = git diff. These are separate concerns."
future_hardening: false
mitigation: "For code changes, verify_evidence.md must include git diff or inline before/after. This is a documentation requirement, not an automation requirement."
```

### W-15: CHANGELOG.md update not automated
```yaml
status: deferred
weakness: "emit_release_trace.py warns about stale CHANGELOG but cannot generate entries. AI must update manually."
owner: MAX
review_phase: "Phase 8 or future automation cycle"
closure_condition: "Script or template that generates CHANGELOG entry from change_card.md + verify_evidence.md"
deferred_reason: "CHANGELOG format is human-semantic. Automated generation risks producing generic entries that don't meet quality bar."
mitigation: "W-12 warning catches omission. AI is reminded to update CHANGELOG before marking Done."
```

---

## Active Weakness Summary

| # | Weakness | Status | Blocker? |
|---|----------|--------|----------|
| W-1 | Generic workflow flow descriptions | accepted | No |
| W-2 | Single history entry in log | accepted | No |
| W-3 | 2/6 harness partial | accepted | No |
| W-5 | Agent fit routing | accepted (waiver) | No |
| W-9 | replay_protected_flow = partial | blocked (external) | No |
| W-10 | run_targeted_verify = partial | blocked (external) | No |
| W-11 | Track Approval Gate enforcement | **closed** (patched) | — |
| W-12 | CHANGELOG check | **closed** (patched) | — |
| W-13 | Ad-hoc verification | accepted (waiver) | No |
| W-14 | surface_diff blind to code | accepted (design) | No |
| W-15 | CHANGELOG update not automated | deferred | No |

**Closed: 2 (W-11, W-12)**
**Accepted: 5 (W-1, W-2, W-3, W-5, W-14)**
**Accepted waiver: 2 (W-13, W-9 via W-3)**
**Blocked: 2 (W-9, W-10)**
**Deferred: 1 (W-15)**

---

## Readiness Verdict

### `ready_for_phase_8_with_known_waivers`

**Facts supporting readiness:**
1. Two pilots completed — one honest brownfield (code modification with coupling)
2. Two critical weaknesses closed on pilot (W-11, W-12)
3. 5 of 5 harness scripts used in production pilot
4. Protected behavior contract + verify evidence pipeline works end-to-end
5. All blocking weaknesses are external dependencies (W-9, W-10) — cannot be resolved at OSUI level
6. No blocker weakness exists among remaining open items

**Known waivers carried into Phase 8:**
- W-13: ad-hoc verification acceptable for Core, not for Extended+
- W-14: surface_diff = registries only, code = git diff
- W-15: CHANGELOG update manual, warning exists

**These waivers do not prevent Phase 8 from starting. They limit automation depth, not correctness.**
