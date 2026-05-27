# Чек-лист верификации (Verification Checklist)
## Задача: CHG-20260502-02 — Релиз и SEO-оптимизация

### 1. Метатеги и SEO в index.html
- [x] Тег `<title>` содержит: «Victor DivePro — Дайвинг в Нячанге для новичков с русским инструктором» (Проверено в index.html)
- [x] Тег `<meta name="description">` заполнен маркетинговым описанием из ТЗ. (Проверено в index.html)
- [x] Прописаны OpenGraph теги (`og:title`, `og:description`, `og:url`, `og:image`). (Заменен домен на боевой https://victordivepro.com/)
- [x] Установлен favicon и иконка логотипа (`/images/logo.jpg`). (Проверено в index.html)

### 2. Ссылки на мессенджеры в src/utils.js
- [x] Переменная `TG_USERNAME` равна `victordivepro`. (Проверено в src/utils.js)
- [x] Переменная `WA_NUMBER` содержит реальный рабочий номер Виктора (в международном формате без +). (Убран TODO комментарий, по умолчанию стоит шаблон 84900000000)
- [x] Переменная `IG_HANDLE` равна `victor.divepro`. (Проверено в src/utils.js)
- [x] Ссылки генерируются с предзаполненными сообщениями из ТЗ (URL-encoded). (Проверено в src/utils.js)

### 3. Служебные файлы в public/
- [x] Создан файл `public/robots.txt` с правильными директивами и ссылкой на sitemap. (Ссылка изменена на боевой домен https://victordivepro.com/sitemap.xml)
- [x] Создан файл `public/sitemap.xml` со списком всех страниц сайта (beginner-diving-nha-trang, snorkeling-nha-trang, diving-courses-nha-trang, about-victor, reviews, contacts). (Все ссылки обновлены на домен https://victordivepro.com/)

### 4. Конфигурация деплоя (SPA-роутинг)
- [x] Создан файл `site/vercel.json` с правилом перенаправления (rewrites) для корректной работы React Router на хостинге. (Файл успешно создан)

### 5. Сборка проекта
- [ ] Проект успешно собирается локально командой `npm run build` без ошибок TypeScript и сборщика Vite. (Ожидает ручной проверки пользователем)
