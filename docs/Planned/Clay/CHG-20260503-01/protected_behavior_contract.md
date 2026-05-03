# Protected Behavior Contract
# CHG-20260503-01 — Hero Redesign Victor DivePro
# Created: 2026-05-03

## Защищённые поведения (что НЕЛЬЗЯ сломать)

### 1. Навигация
- Клик по логотипу → переход на `/`
- Меню «Дайвинг» → якорь `#main-program` на главной
- Меню «Снорклинг» → якорь `#snorkeling`
- Меню «Для пары» → якорь `#programs`
- Меню «Как проходит» → якорь `#how-it-works`
- Меню «Отзывы» → якорь `#reviews`
- Кнопка «Написать» → Telegram-ссылка (внешняя, target=_blank)

### 2. CTA-кнопки на главном экране
- «Узнать свободные даты» → Telegram с параметром `beginner`, target=_blank
- «Написать инструктору» → WhatsApp с общим параметром, target=_blank
- Sticky bottom bar «Узнать даты» → Telegram `beginner`
- Sticky bottom bar «Написать» → WhatsApp

### 3. Трекинг событий
- `trackEvent('ClickTelegram', { source: 'hero' })` при клике на primary CTA
- `trackEvent('ClickWhatsApp', { source: 'hero' })` при клике на secondary CTA
- `trackEvent('ClickTelegram', { source: 'navbar' })` при клике «Написать» в navbar
- `trackEvent('ViewContent', { page: 'home' })` при загрузке страницы

### 4. Scroll behavior
- `ScrollToTop` при смене роута — не трогать
- `AnimationObserver` для `.fade-up` — не трогать

### 5. Мобильное меню
- Кнопка-бургер открывает/закрывает `mobile-menu`
- При навигации (смена location) меню автоматически закрывается

### 6. Остальные секции главной (не затронуты)
- `#identify` — «Кому подходит»
- `#main-program` — «Пробное погружение»
- `#compare` — таблица сравнения
- `#underwater` — «Что смотреть под водой»
- `#programs` — карточки программ
- `#media-service` — фото и видео
- `#fear` — «Страх воды»
- `#snorkeling` — снорклинг
- `#reviews` — отзывы
- FaqSection, CtaFinal — без изменений

## Что разрешено изменить

- Hero section (`hero hero--new`): разметка, текст, структура
- Navbar: лого + текст, ссылки меню, sticky bottom bar
- CSS классы: `hero--new`, `hero-new__*`, `route-card*`, `trust-item*`, `mobile-bottom-bar`
- Заголовок и подзаголовок hero
- Порядок блоков в hero (badge → h1 → subtitle → CTA → trust → route-cards)

## Критерии прохождения verify

- [ ] Все якорные ссылки работают (прокрутка к секции)
- [ ] Telegram/WhatsApp кнопки открывают правильные URL
- [ ] trackEvent вызывается при кликах
- [ ] Страница не имеет горизонтального скролла на 375px
- [ ] Sticky bottom bar виден на мобиле
- [ ] Нет JS-ошибок в консоли
- [ ] Логотип кликабелен, ведёт на `/`
