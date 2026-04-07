#!/usr/bin/env python3
"""
capture_baseline.py — Скрипт фиксации baseline состояния перед /enhance.

Собирает snapshot текущего состояния:
- PRODUCT_SURFACE_STATE.yaml (копия)
- PROJECT_BRAIN.yaml (копия)
- HARNESS_CAPABILITIES.yaml (копия)
- git commit hash
- timestamp

Привязывает baseline к change_id и surface.
Сохраняет в .tmp/baselines/{change_id}/

Использование:
    python capture_baseline.py --change-id CHG-XXXX [--surface homepage,booking]
"""

import argparse
import os
import shutil
import subprocess
import json
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent.parent  # project root
REGISTRY_DIR = ROOT / "docs" / "00_Registry"
TMP_DIR = ROOT / ".tmp" / "baselines"

SOURCE_FILES = {
    "product_surface_state": REGISTRY_DIR / "PRODUCT_SURFACE_STATE.yaml",
    "harness_capabilities": REGISTRY_DIR / "HARNESS_CAPABILITIES.yaml",
    "project_brain": ROOT / "PROJECT_BRAIN.yaml",
}


def get_git_hash() -> str:
    """Получить текущий git commit hash."""
    try:
        result = subprocess.run(
            ["git", "rev-parse", "HEAD"],
            capture_output=True, text=True, cwd=str(ROOT)
        )
        return result.stdout.strip() if result.returncode == 0 else "unknown"
    except FileNotFoundError:
        return "git_not_available"


def capture(change_id: str, surfaces: list[str]) -> dict:
    """Захватить baseline snapshot."""
    baseline_dir = TMP_DIR / change_id
    baseline_dir.mkdir(parents=True, exist_ok=True)

    manifest = {
        "change_id": change_id,
        "captured_at": datetime.now(timezone.utc).isoformat(),
        "git_commit": get_git_hash(),
        "surfaces": surfaces,
        "files_captured": {},
        "status": "complete",
    }

    for key, src_path in SOURCE_FILES.items():
        dst_path = baseline_dir / src_path.name
        if src_path.exists():
            shutil.copy2(src_path, dst_path)
            manifest["files_captured"][key] = {
                "source": str(src_path.relative_to(ROOT)),
                "captured": True,
                "size_bytes": src_path.stat().st_size,
            }
        else:
            manifest["files_captured"][key] = {
                "source": str(src_path.relative_to(ROOT)),
                "captured": False,
                "reason": "file_not_found",
            }
            manifest["status"] = "partial"

    # Write manifest
    manifest_path = baseline_dir / "baseline_manifest.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    return manifest


def main():
    parser = argparse.ArgumentParser(description="Capture baseline snapshot")
    parser.add_argument("--change-id", required=True, help="Change ID (e.g., CHG-20260408-01)")
    parser.add_argument("--surface", default="", help="Comma-separated surfaces (e.g., homepage,booking)")
    args = parser.parse_args()

    surfaces = [s.strip() for s in args.surface.split(",") if s.strip()]
    result = capture(args.change_id, surfaces)

    print(f"\n{'='*60}")
    print(f"Baseline captured: {result['status']}")
    print(f"Change ID: {result['change_id']}")
    print(f"Git commit: {result['git_commit']}")
    print(f"Timestamp: {result['captured_at']}")
    print(f"Location: .tmp/baselines/{args.change_id}/")
    print(f"{'='*60}")

    for key, info in result["files_captured"].items():
        status = "✅" if info["captured"] else "❌"
        print(f"  {status} {key}: {info['source']}")

    if result["status"] != "complete":
        print("\n⚠️  Baseline PARTIAL — some files missing.")
        return 1
    else:
        print("\n✅ Baseline COMPLETE.")
        return 0


if __name__ == "__main__":
    raise SystemExit(main())
