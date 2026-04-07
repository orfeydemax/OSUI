#!/usr/bin/env python3
"""
emit_release_trace.py — Генерация structured release trace.

Связывает change_id, baseline refs, verify verdict и release info
в единый JSON-артефакт для CHANGELOG и Change Card.

Дополнительно проверяет, был ли обновлён CHANGELOG.md после baseline capture (W-12).

Использование:
    python emit_release_trace.py --change-id CHG-XXXX --verdict pass --surfaces homepage,booking [--removals none]
"""

import argparse
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8', errors='replace')


ROOT = Path(__file__).resolve().parent.parent.parent
TMP_DIR = ROOT / ".tmp" / "traces"


def get_git_tag() -> str:
    """Get latest git tag."""
    try:
        result = subprocess.run(
            ["git", "describe", "--tags", "--abbrev=0"],
            capture_output=True, text=True, cwd=str(ROOT)
        )
        return result.stdout.strip() if result.returncode == 0 else "no_tag"
    except FileNotFoundError:
        return "git_not_available"


def get_git_hash() -> str:
    """Get current git commit."""
    try:
        result = subprocess.run(
            ["git", "rev-parse", "--short", "HEAD"],
            capture_output=True, text=True, cwd=str(ROOT)
        )
        return result.stdout.strip() if result.returncode == 0 else "unknown"
    except FileNotFoundError:
        return "git_not_available"


def check_baseline_exists(change_id: str) -> dict:
    """Check if baseline was captured for this change."""
    baseline_dir = ROOT / ".tmp" / "baselines" / change_id
    manifest_path = baseline_dir / "baseline_manifest.json"
    if manifest_path.exists():
        with open(manifest_path, "r", encoding="utf-8") as f:
            manifest = json.load(f)
        return {
            "exists": True,
            "captured_at": manifest.get("captured_at"),
            "git_commit": manifest.get("git_commit"),
            "status": manifest.get("status"),
        }
    return {"exists": False}


def check_changelog_updated(change_id: str) -> dict:
    """W-12: Check if CHANGELOG.md was modified after baseline capture."""
    changelog_path = ROOT / "docs" / "CHANGELOG.md"
    if not changelog_path.exists():
        return {"status": "missing", "warning": "CHANGELOG.md does not exist"}

    # Get baseline capture time
    baseline_dir = ROOT / ".tmp" / "baselines" / change_id
    manifest_path = baseline_dir / "baseline_manifest.json"

    if not manifest_path.exists():
        # No baseline — cannot compare, just check file exists
        return {"status": "no_baseline", "warning": "No baseline to compare against"}

    with open(manifest_path, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    baseline_time_str = manifest.get("captured_at", "")
    if not baseline_time_str:
        return {"status": "no_baseline_time", "warning": "Baseline has no timestamp"}

    baseline_time = datetime.fromisoformat(baseline_time_str)
    changelog_mtime = datetime.fromtimestamp(
        changelog_path.stat().st_mtime, tz=timezone.utc
    )

    if changelog_mtime > baseline_time:
        return {"status": "updated", "warning": None}
    else:
        return {
            "status": "stale",
            "warning": f"CHANGELOG.md was NOT updated after baseline capture ({baseline_time_str}). Definition of Done requires CHANGELOG update.",
            "changelog_last_modified": changelog_mtime.isoformat(),
            "baseline_captured_at": baseline_time_str,
        }


def emit_trace(change_id: str, verdict: str, perimeter_status: str,
               memory_sync_status: str, surfaces: list[str],
               removals: list[str]) -> dict:
    """Emit a release trace."""
    trace = {
        "release_trace": {
            "chg_id": change_id,
            "released_at": datetime.now(timezone.utc).isoformat(),
            "git_commit": get_git_hash(),
            "git_tag": get_git_tag(),
            "verification_verdict": verdict,
            "protected_perimeter_status": perimeter_status,
            "memory_sync_status": memory_sync_status,
            "surfaces_affected": surfaces,
            "removals": removals if removals else ["none"],
            "baseline_ref": check_baseline_exists(change_id),
            "changelog_check": check_changelog_updated(change_id),
        }
    }

    # Save trace
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    trace_path = TMP_DIR / f"{change_id}_release_trace.json"
    with open(trace_path, "w", encoding="utf-8") as f:
        json.dump(trace, f, indent=2, ensure_ascii=False)

    return trace


def main():
    parser = argparse.ArgumentParser(description="Emit release trace")
    parser.add_argument("--change-id", required=True)
    parser.add_argument("--verdict", required=True, choices=["pass", "pass_with_waiver", "fail", "fail_harness_insufficient"])
    parser.add_argument("--perimeter", default="not_applicable", choices=["intact", "partial", "breached", "not_applicable"])
    parser.add_argument("--memory-sync", default="complete", choices=["complete", "incomplete"])
    parser.add_argument("--surfaces", default="", help="Comma-separated")
    parser.add_argument("--removals", default="", help="Comma-separated")
    args = parser.parse_args()

    surfaces = [s.strip() for s in args.surfaces.split(",") if s.strip()]
    removals = [s.strip() for s in args.removals.split(",") if s.strip()]

    trace = emit_trace(
        args.change_id, args.verdict, args.perimeter,
        args.memory_sync, surfaces, removals
    )

    print(json.dumps(trace, indent=2, ensure_ascii=False))

    # W-12: CHANGELOG warning
    changelog_status = trace["release_trace"]["changelog_check"]
    if changelog_status.get("warning"):
        print(f"\n⚠️  W-12 WARNING: {changelog_status['warning']}")

    print(f"\n✅ Release trace emitted: .tmp/traces/{args.change_id}_release_trace.json")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
