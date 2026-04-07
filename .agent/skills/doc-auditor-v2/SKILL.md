---
name: doc-auditor-v2
description: Аудит проектной документации и кода по стандарту V8 OSUI. Проверка Source of Truth, Human Gates, Change Cards и соответствия реализации смысловому и техническому слоям.
skills: 
  - clean-code
  - software-architecture
---

# Documentation & Code Delivery Auditor v2 (V8 OSUI Standard)

## Purpose
Этот скилл предназначен для надзора за исполнением операционного стандарта V8 OSUI. Он проверяет, что разработка и документация соответствуют принципам V8: код согласуется с Единым Источником Правды (Source of Truth), все изменения маршрутизируются по строгим трекам (Tracks), проходят обязательные человеческие гейты (Human Gates) и правильно меняют свои состояния (stage).

## Trigger Phrases
- "проведи аудит документов"
- "сделай аудит change card"
- "проверь гейты"
- "проверь соответствие V8"
- "создай реестр документации"
- "doc-auditor audit"

## Core Capabilities
1. **Анализ Source of Truth (Два Уровня Истины)**: В V8 истина не живет в одном ТЗ. Она находится на стыке **Смысловой истины** (потребность, продуктовые правила, CJM) и **Технической истины** (код, API, БД, RLS). Ни старый документ, ни код сами по себе не признаются единственной истиной. Аудитор проверяет их схождение.
2. **Аудит V8 Lifecycle**: Валидация пути изменения (`/clay` → `/plan` → `/frame` → `/route` → `/build` → `/verify` → `/release` → `Done`).
3. **Change Card Audit**: Проверка обязательного `change_card.yaml` по каждому изменению на наличие: `stage`, `track`, списка рисков, блокеров, следующего действия и source-of-truth документа.
4. **Human Gates Checking**: Проверка прохождения "человеческих гейтов" (Problem Definition Gate, Track Approval, Release Approval и др.). Отлов ситуаций, когда ИИ принял решение сам без человека.
5. **Framing Layer & 6 Hats**: Контроль наличия качественных артефактов `six_hats_review.md`, `briefing_checklist.md` на этапе `/frame`. Оценка системы через метод "6 шляп" при глобальном аудите.
6. **Code Alignment**: Сверка кода с документами. Обнаружение дрейфа в матрице отклонений (Drift Matrix).

## Operating Modes

### Mode 1: V8 Lifecycle & Process Audit
- Проверка наличия основного Change Document для каждого активного change.
- Убедиться, что местоположение файла (например `Planned/Clay`, `In_Progress`, `Done`) совпадает со значением поля `stage` в `change_card.yaml`.
- Проверка наличия фрейминг-артефактов (Brief Origin, Checklist, 6 Hats) для проектов Extended/Critical трека. Запрет на переход в Build без Route/Frame.

### Mode 2: Code / Truth Alignment (Сверка слоёв)
- Сравнение Data Layer, Backend и UI с задекларированным Source of Truth документом (продуктовым смыслом).
- Категоризация отклонений: `aligned` (норма), `partially_aligned`, `documented_but_not_implemented`, `implemented_but_not_documented` (теневой код), `contradictory` (конфликт).

### Mode 3: Registry Synchronization
- Автоматическая сборка derived индексов из `change_card.yaml`.
- Генерация реестра противоречий (`contradiction_register.md`) и отчета по гейтам (`gate_summary`). По правилам V8 ручные реестры создаются только для исключений/противоречий. То, что выводится автоматически — не должно поддерживаться вручную.

## Rules & Principles

### The "Done" Definition (Definition of Done)
Задача переведена в папку `Done` легально только при условиях:
1. Утвержден Meaning (смысл), выбран Track.
2. Реализация завершена и код покрыт верификацией (`verification verdict`).
3. Релиз осуществлен, пройдены ручные гейты `Release Approval`.
4. Официальная документация (Source-of-truth) обновлена.

### Human Ownership Constraint
Никогда не утверждать автоматически бизнес-приоритеты, релизы в production, rollback-решения или разрешение противоречий. Аудитор только подсвечивает отсутствие Human Approval.

## Workflow 
1. **Сканирование контура**: Прочесть `docs`, индексы `00_Registry` и актуальные `change_card.yaml`. Сравнить с ключевым кодом.
2. **Проверка по V8**: Пройтись по циклу жизни изменений, проверить треки, гейты и "6 шляп". Выявить дрейфы.
3. **Формирование Вывода**: Сгенерировать Executive Verdict (Аналитика здоровья контура документации/кода) с четким планом по Next Actions.
