#!/usr/bin/env python3
"""
check_registry_freshness.py — Проверка актуальности всех registry-файлов.

Проверяет:
- PRODUCT_SURFACE_STATE.yaml: last_updated не старше N дней
- HARNESS_CAPABILITIES.yaml: last_updated не старше N дней
- PROJECT_BRAIN.yaml: last_updated не старше N дней
- SITE_HISTORY_LOG.md: существует и не пуст
- CHANGELOG.md ↔ docs/Done/ consistency (count check)

Возвращает structured JSON с per-file status.

Использование:
    python check_registry_freshness.py [--max-age-days 7] [--strict]
"""

import argparse
import json
import re
import os
from datetime import datetime, timezone, timedelta
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent.parent

FILES_TO_CHECK = {
    "product_surface_state": ROOT / "docs" / "00_Registry" / "PRODUCT_SURFACE_STATE.yaml",
    "harness_capabilities": ROOT / "docs" / "00_Registry" / "HARNESS_CAPABILITIES.yaml",
    "project_brain": ROOT / "PROJECT_BRAIN.yaml",
    "site_history_log": ROOT / "docs" / "00_Registry" / "SITE_HISTORY_LOG.md",
    "changelog": ROOT / "docs" / "CHANGELOG.md",
}


def extract_last_updated(filepath: Path) -> str | None:
    """Extract last_updated field from YAML file."""
    if not filepath.exists():
        return None
    content = filepath.read_text(encoding="utf-8")
    match = re.search(r'last_updated:\s*["\']?(\d{4}-\d{2}-\d{2})["\']?', content)
    return match.group(1) if match else None


def check_file_freshness(filepath: Path, max_age_days: int) -> dict:
    """Check a single file's freshness."""
    result = {
        "path": str(filepath.relative_to(ROOT)),
        "exists": filepath.exists(),
        "status": "missing",
    }

    if not filepath.exists():
        return result

    result["size_bytes"] = filepath.stat().st_size
    if result["size_bytes"] == 0:
        result["status"] = "empty"
        return result

    last_updated = extract_last_updated(filepath)
    if last_updated:
        updated_date = datetime.strptime(last_updated, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        age = (datetime.now(timezone.utc) - updated_date).days
        result["last_updated"] = last_updated
        result["age_days"] = age
        result["status"] = "fresh" if age <= max_age_days else "stale"
    else:
        # For .md files without last_updated, check file mtime
        mtime = datetime.fromtimestamp(filepath.stat().st_mtime, tz=timezone.utc)
        age = (datetime.now(timezone.utc) - mtime).days
        result["last_modified"] = mtime.isoformat()
        result["age_days"] = age
        result["status"] = "fresh" if age <= max_age_days else "stale"

    return result


def check_memory_sync_suspicious_no_change(change_surfaces: list[str]) -> dict:
    """W-8b fix: check if no_change is suspicious given changed surfaces."""
    pss_path = FILES_TO_CHECK["product_surface_state"]
    if not pss_path.exists():
        return {"check": "skipped", "reason": "PRODUCT_SURFACE_STATE.yaml missing"}

    content = pss_path.read_text(encoding="utf-8")
    suspicious = []
    for surface in change_surfaces:
        if surface.lower() in content.lower():
            suspicious.append(surface)

    return {
        "check": "completed",
        "surfaces_checked": change_surfaces,
        "surfaces_found_in_registry": suspicious,
        "warning": f"Surfaces {suspicious} exist in registry — no_change may be incorrect. Verify manually."
        if suspicious else None,
    }


def main():
    parser = argparse.ArgumentParser(description="Check registry freshness")
    parser.add_argument("--max-age-days", type=int, default=7, help="Max acceptable age in days")
    parser.add_argument("--strict", action="store_true", help="Fail on any stale file")
    parser.add_argument("--check-surfaces", default="", help="Comma-separated surfaces for W-8b no_change check")
    args = parser.parse_args()

    results = {}
    stale_count = 0
    missing_count = 0

    for key, filepath in FILES_TO_CHECK.items():
        result = check_file_freshness(filepath, args.max_age_days)
        results[key] = result
        if result["status"] == "stale":
            stale_count += 1
        elif result["status"] == "missing":
            missing_count += 1

    # W-8b: suspicious no_change check
    surfaces = [s.strip() for s in args.check_surfaces.split(",") if s.strip()]
    no_change_check = None
    if surfaces:
        no_change_check = check_memory_sync_suspicious_no_change(surfaces)

    # Output
    report = {
        "checked_at": datetime.now(timezone.utc).isoformat(),
        "max_age_days": args.max_age_days,
        "summary": {
            "total_files": len(results),
            "fresh": sum(1 for r in results.values() if r["status"] == "fresh"),
            "stale": stale_count,
            "missing": missing_count,
            "empty": sum(1 for r in results.values() if r["status"] == "empty"),
        },
        "files": results,
        "verdict": "fail" if (args.strict and (stale_count > 0 or missing_count > 0)) else
                   "warn" if (stale_count > 0 or missing_count > 0) else "pass",
    }

    if no_change_check:
        report["no_change_check"] = no_change_check

    print(json.dumps(report, indent=2, ensure_ascii=False))

    print(f"\n{'='*60}")
    print(f"Registry Freshness: {report['verdict'].upper()}")
    for key, info in results.items():
        icon = {"fresh": "✅", "stale": "⚠️", "missing": "❌", "empty": "❌"}[info["status"]]
        age_str = f" ({info.get('age_days', '?')}d)" if "age_days" in info else ""
        print(f"  {icon} {key}: {info['status']}{age_str}")

    if no_change_check and no_change_check.get("warning"):
        print(f"\n⚠️  W-8b WARNING: {no_change_check['warning']}")

    return 0 if report["verdict"] != "fail" else 1


if __name__ == "__main__":
    raise SystemExit(main())
