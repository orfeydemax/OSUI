#!/usr/bin/env python3
"""
collect_surface_diff.py — Сбор before/after diff по surface state.

Сравнивает baseline snapshot с текущим состоянием registry-файлов.
Показывает, какие surface изменились, добавились, удалились.

Требует: предварительный capture_baseline.py для создания baseline.

Использование:
    python collect_surface_diff.py --change-id CHG-XXXX
"""

import argparse
import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8', errors='replace')


ROOT = Path(__file__).resolve().parent.parent.parent
BASELINE_DIR = ROOT / ".tmp" / "baselines"
REGISTRY_DIR = ROOT / "docs" / "00_Registry"

COMPARE_FILES = {
    "PRODUCT_SURFACE_STATE.yaml": REGISTRY_DIR / "PRODUCT_SURFACE_STATE.yaml",
    "HARNESS_CAPABILITIES.yaml": REGISTRY_DIR / "HARNESS_CAPABILITIES.yaml",
}


def load_file_content(filepath: Path) -> str | None:
    """Load file content or return None."""
    if filepath.exists():
        return filepath.read_text(encoding="utf-8")
    return None


def simple_line_diff(before: str | None, after: str | None) -> dict:
    """Compute simple line-level diff stats."""
    if before is None and after is None:
        return {"status": "both_missing"}
    if before is None:
        return {"status": "new_file", "lines_added": len(after.splitlines())}
    if after is None:
        return {"status": "deleted", "lines_removed": len(before.splitlines())}

    before_lines = set(before.splitlines())
    after_lines = set(after.splitlines())

    added = after_lines - before_lines
    removed = before_lines - after_lines
    unchanged = before_lines & after_lines

    if not added and not removed:
        return {"status": "unchanged"}

    return {
        "status": "changed",
        "lines_added": len(added),
        "lines_removed": len(removed),
        "lines_unchanged": len(unchanged),
        "sample_added": list(added)[:5],
        "sample_removed": list(removed)[:5],
    }


def collect_diff(change_id: str) -> dict:
    """Collect diff between baseline and current state."""
    baseline_path = BASELINE_DIR / change_id
    manifest_path = baseline_path / "baseline_manifest.json"

    if not manifest_path.exists():
        return {
            "change_id": change_id,
            "status": "no_baseline",
            "error": f"No baseline found at {baseline_path}. Run capture_baseline.py first.",
        }

    with open(manifest_path, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    diffs = {}
    for filename, current_path in COMPARE_FILES.items():
        baseline_file = baseline_path / filename
        before = load_file_content(baseline_file)
        after = load_file_content(current_path)
        diffs[filename] = simple_line_diff(before, after)

    has_changes = any(d["status"] not in ("unchanged", "both_missing") for d in diffs.values())

    return {
        "change_id": change_id,
        "baseline_captured_at": manifest.get("captured_at"),
        "baseline_git_commit": manifest.get("git_commit"),
        "compared_at": __import__("datetime").datetime.now(__import__("datetime").timezone.utc).isoformat(),
        "status": "changes_detected" if has_changes else "no_changes",
        "diffs": diffs,
    }


def main():
    parser = argparse.ArgumentParser(description="Collect surface diff")
    parser.add_argument("--change-id", required=True)
    args = parser.parse_args()

    result = collect_diff(args.change_id)
    print(json.dumps(result, indent=2, ensure_ascii=False))

    if result["status"] == "no_baseline":
        print(f"\n❌ {result['error']}")
        return 1
    elif result["status"] == "changes_detected":
        print(f"\n⚠️  Surface changes detected since baseline.")
        for fname, diff in result["diffs"].items():
            icon = "📝" if diff["status"] == "changed" else "✅"
            print(f"  {icon} {fname}: {diff['status']}")
    else:
        print(f"\n✅ No surface changes detected since baseline.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
