---
description: Accept raw input and convert it into a managed change draft (V8 §9.1, §10.1)
---

# /clay — Raw Input Intake

> V8 Lifecycle Stage: **Clay**
> Reference: §9.1, §10.1

## Purpose

Accept any raw input (idea, note, screenshot, bug symptom, voice transcript, old spec, chat message, monitoring signal) and convert it into a managed draft.

## Steps

### 1. Receive Raw Input
- Accept the raw material from the user
- Identify the input type: idea / bug / enhancement / migration / infra / automation / skill / other
- Create a draft file in `docs/Planned/Clay/`

### 2. Generate Raw Input Summary
- Summarize what was received
- Identify the apparent intent
- Flag obvious gaps, contradictions, or missing context

### 3. Create Change Draft
- Generate a minimal `change_card.yaml` with:
  - `stage: clay`
  - `track:` (leave empty — routing happens later)
  - `change_type:` (best guess)
  - `human_owner:` (ask user if not obvious)
  - `summary:` (from raw input)
  - `project_name:` (если новый проект — человекочитаемое имя)
  - `project_schema:` (автоматически из project_name: snake_case, латиница)
  - `next_action:` → proceed to `/plan` or request clarification

### 3.5. 🗄️ Schema Name Preview (для новых проектов)
- Если `change_type: feature` и это **новый проект/сервис** (а не фича в существующем):
  - Сгенерировать предварительное имя схемы из `project_name`
  - Конвенция: `snake_case`, латиница, без спецсимволов
  - Записать в `project_schema` change_card
  - Фактическое создание схемы произойдёт на этапе `/create` (шаг 4.5)

### 4. List Open Questions
- What is unclear about the input?
- What assumptions are being made?
- What context is missing?

### 5. Git Branch (если Git инициализирован)
- Проверить: `git rev-parse --is-inside-work-tree` → если true:
- Создать ветку: `git checkout -b chg/{CHG-ID}`
- Первый коммит: `git commit --allow-empty -m "🏗️ clay: {CHG-ID} — {краткое описание}"`
- Если Git не инициализирован → пропустить, не блокировать workflow

### 6. Decide Next Step
- If input is clear enough → recommend `/plan`
- If input needs brainstorming → recommend `/brainstorm` then return
- If input is too vague → request clarification from human owner

## Output
- `docs/Planned/Clay/CHG-{date}-{nn}/change_card.yaml` (draft)
- Raw Input Summary (in the change card or as separate note)
- **`project_schema` preview** (если новый проект)
- List of open questions
- **Git branch `chg/{CHG-ID}` created** ← NEW (if git initialized)

## Forbidden
- ❌ Skipping directly to `/build` from clay
- ❌ Assigning a track before `/route`
- ❌ Starting implementation without human owner confirmation

## Context Budget
- **Class: Light** — read only the raw input and template
