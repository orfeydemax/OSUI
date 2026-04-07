#!/usr/bin/env python3
"""
replay_protected_flow.py — Проигрывание protected behavior contract.

СТАТУС: STUB (partial).

Этот скрипт читает protected_behavior_contract.md и генерирует
structured checklist для ручной верификации каждого behavior.

Автоматический replay (E2E / Playwright) требует:
- target application с running dev server
- Playwright-конфигурацию
- определённые selectors для каждого behavior

Текущая реализация:
- Парсит contract
- Генерирует JSON checklist для manual verification
- НЕ выполняет автоматический replay

Использование:
    python replay_protected_flow.py --contract path/to/protected_behavior_contract.md
"""

import argparse
import json
import re
from pathlib import Path
from datetime import datetime, timezone


def parse_contract(contract_path: Path) -> list[dict]:
    """Parse protected_behavior_contract.md into structured behaviors."""
    if not contract_path.exists():
        return []

    content = contract_path.read_text(encoding="utf-8")
    behaviors = []

    # Parse markdown list items or table rows as behaviors
    # Pattern: "- [ ] behavior description" or "- behavior description"
    lines = content.splitlines()
    for line in lines:
        stripped = line.strip()
        # Match checkbox items
        match = re.match(r'^[-*]\s*\[[ x]\]\s*(.+)$', stripped)
        if match:
            behaviors.append({
                "behavior": match.group(1).strip(),
                "source_line": stripped,
                "verification": "manual",
                "status": "not_verified",
            })
            continue
        # Match plain list items that look like behaviors
        match = re.match(r'^[-*]\s+(?!#)(.{10,})$', stripped)
        if match and not stripped.startswith("- **"):
            behaviors.append({
                "behavior": match.group(1).strip(),
                "source_line": stripped,
                "verification": "manual",
                "status": "not_verified",
            })

    return behaviors


def generate_checklist(behaviors: list[dict], contract_path: str) -> dict:
    """Generate verification checklist from parsed behaviors."""
    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "contract_source": contract_path,
        "total_behaviors": len(behaviors),
        "auto_verifiable": 0,
        "manual_required": len(behaviors),
        "mode": "manual_checklist",
        "note": "Automated replay not available. Use this checklist for manual verification.",
        "behaviors": behaviors,
    }


def main():
    parser = argparse.ArgumentParser(description="Replay protected flow (stub — generates manual checklist)")
    parser.add_argument("--contract", required=True, help="Path to protected_behavior_contract.md")
    args = parser.parse_args()

    contract_path = Path(args.contract)
    behaviors = parse_contract(contract_path)

    if not behaviors:
        print(f"❌ No behaviors found in {args.contract}")
        print("   Contract may be empty or in unexpected format.")
        return 1

    checklist = generate_checklist(behaviors, args.contract)
    print(json.dumps(checklist, indent=2, ensure_ascii=False))

    print(f"\n{'='*60}")
    print(f"📋 Manual Verification Checklist ({len(behaviors)} behaviors)")
    print(f"   Mode: MANUAL (automated replay not available)")
    for i, b in enumerate(behaviors, 1):
        print(f"   {i}. [ ] {b['behavior']}")
    print(f"{'='*60}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
