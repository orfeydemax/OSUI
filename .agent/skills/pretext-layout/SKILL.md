---
name: pretext-layout
description: Библиотека для точного измерения и разбиения многострочного текста в JS/TS без затрат на DOM reflow.
---

# Pretext: Multiline Text Layout & Measurement

## Обзор (Overview)

Библиотека `@chenglou/pretext` — это производительное решение на чистом TypeScript/JavaScript для вычисления макета текста и его геометрических характеристик. Она позволяет рассчитать занимаемую текстом высоту или ширину без обращения к DOM, что позволяет избежать дорогостоящих операций "reflow" браузера. Основана на внутреннем движке шрифтов браузера (весьма дружественна к искусственному интеллекту, идеальна для SSR/Canvas расчетов).

### Когда использовать
- Для виртуализации и скроллинга (знание высоты блоков до их рендеринга).
- Специфичные планировки интерфейса, такие как Masonry, где нужны точные высоты до отрисовки.
- Избежание Layout Shifts (Сдвигов макета) на старте.
- Программный макет для Canvas, SVG, WebGL или расчетов на стороне сервера.
- Динамический подбор шрифта или shrink-wrap контейнера по ширине текста.

---

## Паттерны использования (API)

### 1. Измерение высоты блока без DOM

Самый частый кейс для веб-разработки (UI-виртуализация, Masonry).

```ts
import { prepare, layout } from '@chenglou/pretext';

// 1. Тяжелый этап (выполнять ОДИН раз для текста/шрифта)
// `font` должен точно совпадать с CSS-параметрами (например: '600 16px Inter')
const prepared = prepare('Это длинный текст, который мы хотим разместить...', '16px Inter');

// 2. Этап вычисления размеров (выполняется мгновенно, можно делать на resize)
// Аргументы: prepared-объект, ширина контейнера (maxWidth), высота строки CSS (lineHeight)
const { height, lineCount } = layout(prepared, 320, 20);
```

**Опции:**
Для поддержки переносов строк и табуляций (аналог `textarea`), передайте параметр `whiteSpace`:
`prepare(textValue, '16px Inter', { whiteSpace: 'pre-wrap' })`

### 2. Рендеринг и ручной макет по строкам (Canvas/SVG)

Позволяет извлечь сырые строки текста после разбиения для ручной отрисовки (Canvas `fillText`).

```ts
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

// Точно так же готовим структуру, но с сохранением сегментов
const prepared = prepareWithSegments('Арабский текст بدأت الرحلة 🚀 или любой другой', '18px "Helvetica Neue"');

// Вычисляем строки
const { lines, height, lineCount } = layoutWithLines(prepared, 320, 26);

// lines содержит массив объектов строк 
// { text: string, width: number, start: LayoutCursor, end: LayoutCursor }
for (let i = 0; i < lines.length; i++) {
  ctx.fillText(lines[i].text, 0, i * 26);
}
```

---

## Продвинутые низкоуровневые API

Для узкоспециализированных кейсов в `@chenglou/pretext` есть следующие функции (используются вместе с `prepareWithSegments`):

1. **`walkLineRanges(prepared, maxWidth, onLine)`**
   Позволяет посчитать плотную («shrink-wrap») ширину многострочного текста без выделения строк в память.
   ```ts
   let maxW = 0;
   walkLineRanges(prepared, 320, line => { if (line.width > maxW) maxW = line.width });
   ```

2. **`layoutNextLine(prepared, startCursor, maxWidth)`**
   Полезен при обтекании картинок, когда каждая следующая строка может иметь новую ширину (`maxWidth`).

3. **Модуль `inline-flow`** 
   Экспериментальный субмодуль `@chenglou/pretext/inline-flow` для инлайн-элементов с разными стилями текста.
   ```ts
   import { prepareInlineFlow, walkInlineFlowLines } from '@chenglou/pretext/inline-flow';
   const prepared = prepareInlineFlow([
     { text: 'Hello ', font: '16px Inter' },
     { text: '@world', font: 'bold 16px Inter', break: 'never' }
   ]);
   ```

---

## Лучшие практики и Ограничения

- **Разделение вычислений:** Обязательно кэшируйте результат `prepare()`. Все тяжелые расчеты нормализации и сегментации происходят в нём. `layout()` — это чистая математика (0.09мс на 500 текстов), которую можно смело дергать в `ResizeObserver`.
- **Шрифт `system-ui`:** На macOS этот шрифт ведет себя небезопасно с точки зрения точности. Желательно передавать именованные шрифты.
- **Ограничения CSS:** На данный момент скрипт жестко основывается на CSS правилах: `white-space: normal`, `word-break: normal`, `overflow-wrap: break-word`, `line-break: auto` (или `white-space: pre-wrap` при дополнительной настройке).
- **Экстремально узко:** Если ширина слишком узкая для слова (в режиме `break-word`), библиотека разорвет слово без дефисов только на границах графем.
- **Очистка памяти:** Если сгенерировано слишком много вариантов шрифтов, вы можете вызвать встроенную утилиту очистки: `clearCache()`. Выбор языка/локали осуществляется через `setLocale(locale)`.
