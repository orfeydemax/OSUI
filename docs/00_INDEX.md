# V8 OSUI — Human Layer Index

> Operating System for Change Management — Document Root

## Structure

```
docs/
├── 00_INDEX.md              # This file
├── CHANGELOG.md             # ⚡ Сжатый реестр ВСЕХ завершённых CHG (AI читает ЭТОТ файл)
├── 00_Registry/             # Manual registries (human decisions only)
│   ├── exception_register.md
│   ├── contradiction_register.md
│   ├── trade_off_register.md
│   ├── escalation_decisions.md
│   ├── normalization_debt_register.md
│   └── methodology_review_log.md
├── _templates/              # 19 canonical templates (§20, §31)
├── Planned/
│   ├── Clay/                # Raw inputs, ideas, signals
│   └── Queue/               # Clarified changes awaiting routing
├── In_Progress/             # Changes under active build/verify
└── Done/                    # Архив полных change_card (ТОЛЬКО для детального доступа по запросу)
```

## Navigation Rules

1. **Source of truth** is always the change document itself (`change_card.yaml` fields), not the folder.
2. If folder location and `stage` field diverge, the `stage` field wins.
3. Derived registries (active changes index, gate summary, etc.) are auto-generated from source-of-truth documents.
4. Manual registries in `00_Registry/` contain only human decisions, interpretations, and consciously accepted compromises.

## ⚡ Token Budget Guard (ОБЯЗАТЕЛЬНО для ИИ)

> **КРИТИЧЕСКОЕ ПРАВИЛО:** `docs/Done/` содержит папки с полными change_card.yaml.
> Чтение всей папки Done/ тратит ~300 000 токенов. Это ЗАПРЕЩЕНО.

| Действие | Источник | Токены |
|----------|----------|--------|
| Обзор истории изменений | `docs/CHANGELOG.md` | ~3 000 |
| Детали конкретного CHG | `docs/Done/{CHG-ID}/change_card.yaml` | ~1 500 |
| ❌ ЗАПРЕЩЕНО: сканировать весь Done/ | — | ~300 000 |

**Правила:**
- В начале сессии → читать `docs/CHANGELOG.md` (один файл)
- Если нужны детали → читать `docs/Done/{конкретный CHG-ID}/` по запросу
- НИКОГДА не читать `docs/Done/**` целиком
- При `/release` → ОБЯЗАТЕЛЬНО обновить `docs/CHANGELOG.md`

## Lifecycle Quick Reference

```
Clay → Clarification → Plan → Framing → Route → Build → Verify → Release → Observation → Normalization → Done
```

## Templates Quick Reference

| Template | Format | When Used |
|----------|--------|-----------|
| `change_card.yaml` | YAML | Every change — source of truth |
| `nano_intent.md` | MD | Nano Track only |
| `economics_gate.yaml` | YAML | Core+ tracks — value gate |
| `change_passport.yaml` | YAML | Core+ tracks — scope & risk |
| `briefing_checklist.md` | MD | Core+ with framing |
| `problem_framing_note.md` | MD | Extended+ or conditional Core |
| `six_hats_review.md` | MD | Extended+ or conditional Core |
| `cjm_product_flow_delta.md` | MD | When user path changes |
| `routing_decision.yaml` | YAML | Every routed change |
| `quick_verify.md` | MD | Nano Track verification |
| `verification_checklist.md` | MD | Core+ verification |
| `verification_matrix.md` | MD | Extended+ verification |
| `release_note.md` | MD | Every release |
| `documentation_update_note.md` | MD | Every released change |
| `ai_evidence_log.yaml` | YAML | When AI materially participated |
| `ai_participation_matrix.md` | MD | Systems with regular AI use |
| `incident_note.yaml` | YAML | Bug intake / incidents |
| `exception_record.yaml` | YAML | Standard deviations |
| `methodology_review_log.md` | MD | Standard self-review |

## Tracks Quick Reference

| Track | When | Artifacts Required |
|-------|------|-------------------|
| **Nano** | Single screen/module, no data/auth/history impact | Nano Intent + Quick Verify + Release Note |
| **Core** | Local change, manageable risk | Economics Gate + Passport + Delta + Verification + Release + Doc Update |
| **Extended** | Multi-layer, scenarios, roles, data | All Core + Framing + 6 Hats + CJM + Domain/Data/UI Deltas + AI Evidence |
| **Critical** | High-risk: auth, migration, history, rollback | All Extended + ADR + Migration Plan + Rollback + Recovery Proof |
| **Hotfix** | Production incident | Incident Note + Fix + Verify + Release + Normalization |
