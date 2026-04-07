# Protected Behavior Contract — CHG-V9_1-PILOT-2

> Target: .agent/scripts/emit_release_trace.py
> Shared surface: release pipeline (verify.md → release.md → emit_release_trace)

## Protected Behaviors

- [ ] Script exits with code 0 on success (unchanged)
- [ ] JSON output contains root key "release_trace" (unchanged)
- [ ] All 10 existing JSON fields preserved: chg_id, released_at, git_commit, git_tag, verification_verdict, protected_perimeter_status, memory_sync_status, surfaces_affected, removals, baseline_ref
- [ ] CLI args --change-id, --verdict, --perimeter, --memory-sync, --surfaces, --removals continue to work
- [ ] Output file path = .tmp/traces/{change_id}_release_trace.json (unchanged)
- [ ] sys.stdout.reconfigure(encoding='utf-8') preserved (Windows fix)
- [ ] Baseline ref lookup from .tmp/baselines/{change_id}/baseline_manifest.json preserved
- [ ] Script runs without external dependencies beyond stdlib

## Boundaries

| Можно | Нельзя |
|-------|--------|
| Добавить новое поле в release_trace JSON | Удалять существующие поля |
| Добавить новую функцию check_changelog | Менять exit code (must stay 0) |
| Добавить warning в stdout | Менять root JSON key "release_trace" |
| Добавить import (pathlib уже есть) | Добавлять external dependencies |
| Добавить optional CLI arg | Менять required CLI args |
