import { useEffect } from 'react';
import { tgLink, waLink, trackEvent } from '../utils';
import FaqSection from '../components/FaqSection';
import CtaFinal from '../components/CtaFinal';

const faqItems = [
  { q: 'Можно ли нырять, если я не умею плавать?', a: 'Да, для пробного погружения это не обязательно. Инструктор рядом и контролирует процесс. Перед погружением вы проходите инструктаж и учитесь дышать через регулятор.' },
  { q: 'Нужен ли опыт?', a: 'Нет. Пробное погружение рассчитано на новичков без сертификата.' },
  { q: 'Что если я испугаюсь?', a: 'Никто не будет давить. Инструктор помогает адаптироваться постепенно. Если человеку нужно больше времени, темп подстраивается под него.' },
  { q: 'Фото и видео входят?', a: 'Фото и видео — отдельная доп-услуга. На сайте мы не продаём её как обязательную часть программы: менеджер подскажет варианты в переписке.' },
  { q: 'Когда лучший сезон?', a: 'Высокий сезон: март — октябрь. Зимой возможны ограничения по погоде и видимости.' },
  { q: 'Как забронировать?', a: 'Напишите в Telegram или WhatsApp. Мы уточним дату, количество человек, опыт и подберём формат.' },
];

const painPoints = [
  'вы ни разу не погружались',
  'не уверены, что умеете плавать достаточно хорошо',
  'боитесь воды, глубины или дыхания через регулятор',
  'хотите красивый опыт в отпуске без суеты',
  'ищете подарок, свидание или семейный морской день',
  'хотите инструктаж и поддержку на русском языке',
];

const programs = [
  {
    price: '95$',
    title: 'Дайвинг для новичков',
    desc: 'Первое погружение без сертификата: 2 погружения по 35-40 минут, глубина до 12 метров, инструктаж на русском.',
    image: '/images/generated/beginner-dive.svg',
    imageAlt: 'Новичок под водой с инструктором',
    cta: 'Хочу первое погружение',
    key: 'beginner',
    event: 'ClickBeginnerDiving',
  },
  {
    price: '45$',
    title: 'Снорклинг',
    desc: 'Для тех, кто хочет море, лодку и подводный мир без акваланга. Хорошо для семей и тех, кто едет за компанию.',
    image: '/images/generated/snorkeling.svg',
    imageAlt: 'Снорклинг в тропическом море',
    cta: 'Хочу снорклинг',
    key: 'snorkeling',
    event: 'ClickSnorkeling',
  },
  {
    price: 'по запросу',
    title: 'Дайвинг для пары',
    desc: 'Свидание, подарок, день рождения или красивый приватный формат для двоих.',
    image: '/images/generated/couples-dive.svg',
    imageAlt: 'Дайвинг для пары',
    cta: 'Обсудить для двоих',
    key: 'couple',
    event: 'ClickCouples',
  },
  {
    price: 'по запросу',
    title: 'Предложение под водой',
    desc: 'Поможем обсудить спокойный сценарий предложения руки и сердца под водой в Нячанге.',
    image: '/images/generated/couples-dive.svg',
    imageAlt: 'Предложение руки и сердца под водой',
    cta: 'Обсудить предложение',
    key: 'proposal',
    event: 'ClickProposal',
  },
];

const daySteps = [
  ['Контакт', 'Вы пишете команде Victor DivePro в Telegram или WhatsApp. В сообщении уже будет готовая фраза.'],
  ['Диагностика', 'Уточняем опыт, количество людей, страх воды, умение плавать и желаемый формат.'],
  ['Маршрут', 'Подбираем дайвинг, снорклинг, private-день, пару, семью или предложение под водой.'],
  ['Инструктаж', 'На лодке спокойно разбираем дыхание, сигналы, снаряжение и поведение под водой.'],
  ['Погружение', 'Сертифицированный инструктор рядом. Вы не остаётесь один на один с водой или тревогой.'],
  ['Эмоции', 'После погружения можно обсудить впечатления и дополнительные фото/видео в переписке.'],
];

const reviews = [
  { text: 'Боялась воды всю жизнь, но инструктор так спокойно всё объяснил, что я даже не заметила, как оказалась под водой.', author: 'Анна', tag: 'Первое погружение' },
  { text: 'Дайвинг подарили мужу на день рождения. Команда организовала всё идеально: погружение, темп и формат.', author: 'Екатерина', tag: 'Пара' },
  { text: 'Приехали семьёй: дети на снорклинг, мы с женой на дайвинг. Все довольны, организация на высоте.', author: 'Дмитрий', tag: 'Семья' },
];

const underwaterProof = [
  'живые коралловые участки и мягкие рифовые формы',
  'стайки тропических рыб у рифа',
  'чистая морская вода и лучи света под поверхностью',
  'спокойные маршруты для первого погружения',
  'маска, дыхание и ощущение невесомости — уже само впечатление',
  'локации подбираются по погоде и видимости',
];

export default function HomePage() {
  useEffect(() => {
    trackEvent('ViewContent', { page: 'home' });
    document.title = 'Victor DivePro — Дайвинг в Нячанге для новичков с русским инструктором';
  }, []);

  return (
    <>
      <section className="hero hero--culture" id="hero">
        <div className="culture-hero__stage">
          <div className="culture-hero__nav" aria-label="Hero navigation context">
            <a href="/" className="culture-hero__brand" aria-label="Victor DivePro">
              <img src="/images/logo.jpg" alt="Victor DivePro" />
              <span>Victor DivePro</span>
            </a>
            <div className="culture-hero__links">
              <a href="#main-program">Дайвинг</a>
              <a href="#snorkeling">Снорклинг</a>
              <a href="#programs">Для пары</a>
              <a href="#underwater">Что увидите</a>
              <a href="#reviews">Отзывы</a>
            </div>
            <a href={tgLink('general')} target="_blank" rel="noopener noreferrer" className="culture-hero__nav-cta">
              Написать
            </a>
          </div>

          <div className="culture-hero__copy">
            <p className="culture-hero__eyebrow">Нячанг · персональные погружения · команда инструкторов</p>
            <h1>
              <span>Дайвинг</span>
              <span>без</span>
              <span>суеты</span>
            </h1>
            <p className="culture-hero__text">
              Сертифицированные инструкторы Victor DivePro ведут новичка спокойно:
              объясняют дыхание, проверяют снаряжение и остаются рядом под водой.
            </p>
            <div className="culture-hero__actions">
              <a
                href={tgLink('beginner')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
                onClick={() => trackEvent('ClickTelegram', { source: 'hero' })}
              >
                Узнать даты
              </a>
              <a
                href={waLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline"
                onClick={() => trackEvent('ClickWhatsApp', { source: 'hero' })}
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="culture-hero__collage" aria-label="Форматы дайвинга Victor DivePro">
            <img src="/images/generated/couples-dive.svg" alt="Дайвинг для пары" className="culture-hero__image culture-hero__image--small" />
            <img src="/images/generated/family-boat.svg" alt="Семейный день на лодке" className="culture-hero__image culture-hero__image--wide" />
            <img src="/images/generated/beginner-dive.svg" alt="Первое погружение с инструктором" className="culture-hero__image culture-hero__image--main" />
            <img src="/images/generated/snorkeling.svg" alt="Снорклинг над рифом" className="culture-hero__image culture-hero__image--tall" />
          </div>
        </div>
      </section>

      <section className="section section--slice" id="identify">
        <div className="container split-grid split-grid--wide-left">
          <div>
            <p className="text-meta">Кому подходит</p>
            <h2>Если внутри есть “хочу”, а рядом с ним “страшно” — вы по адресу</h2>
          </div>
          <div>
            <p className="lead">
              Первое погружение не должно быть экзаменом на смелость. Мы строим день так,
              чтобы у новичка было время понять снаряжение, привыкнуть к воде и почувствовать контроль.
            </p>
            <ul className="identify-list">
              {painPoints.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--inverted" id="main-program">
        <div className="container program-feature">
          <div className="program-feature__price">
            <span className="text-meta">Главная программа</span>
            <strong>95$</strong>
            <ul className="price-card__list">
              <li>2 погружения по 35-40 минут</li>
              <li>Инструктаж на русском</li>
              <li>Оборудование и лодка</li>
            </ul>
            <img
              src="/images/generated/beginner-dive.svg"
              alt="Дайвинг для новичков в Нячанге"
              className="price-panel__visual generated-visual"
            />
          </div>
          <div className="program-feature__body">
            <h2>Пробное погружение для новичков в Нячанге</h2>
            <p className="lead">
              2 погружения по 35-40 минут, инструктаж на русском языке и сопровождение
              сертифицированного инструктора рядом. Опыт и сертификат не нужны.
            </p>
            <ul className="feature-lines">
              <li>Глубина до 12 метров, только после адаптации</li>
              <li>Малый формат: до 2 клиентов на 1 инструктора</li>
              <li>Съёмка обсуждается отдельно до поездки</li>
            </ul>
            <a
              href={tgLink('beginner')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
              onClick={() => trackEvent('ClickBeginnerDiving', { source: 'main_program' })}
            >
              Хочу попробовать дайвинг
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="victor">
        <div className="container split-grid split-grid--portrait">
          <div className="portrait-panel">
            <img
              src="/images/generated/victor-portrait.svg"
              alt="Инструктор Victor DivePro"
              className="portrait-panel__image generated-visual"
            />
            <div>
              <p className="text-meta">Инструктор рядом</p>
              <h2>Команда не торопит. Вас проводят через первый страх</h2>
            </div>
          </div>
          <div className="victor-copy">
            <p className="lead">
              Для первого погружения важен не только акваланг. Важен инструктор,
              которому вы доверите первые минуты под водой. В Victor DivePro работают
              квалифицированные дайверы с сертификацией и опытом сопровождения новичков.
            </p>
            <div className="about-victor__facts">
              <div className="fact"><div className="fact__num">11</div><div className="fact__label">лет опыта</div></div>
              <div className="fact"><div className="fact__num">15 600+</div><div className="fact__label">клиентов</div></div>
              <div className="fact"><div className="fact__num">SSI</div><div className="fact__label">сертификация</div></div>
              <div className="fact"><div className="fact__num">2:1</div><div className="fact__label">клиент/инструктор</div></div>
            </div>
            <a href={tgLink('general')} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
              Написать команде
            </a>
          </div>
        </div>
      </section>

      <section className="section section--slice" id="compare">
        <div className="container">
          <div className="section__header section__header--offset">
            <p className="text-meta">Почему не только цена</p>
            <h2>Первое погружение выбирают по спокойствию, а не по самой громкой скидке</h2>
          </div>
          <table className="compare-table">
            <thead>
              <tr><th>Массовый формат</th><th>Victor DivePro</th></tr>
            </thead>
            <tbody>
              <tr><td>Больше людей в группе</td><td>До 2 клиентов на 1 инструктора</td></tr>
              <tr><td>Быстрый общий инструктаж</td><td>Объяснение на русском языке</td></tr>
              <tr><td>Новичку сложнее расслабиться</td><td>Спокойный темп без давления</td></tr>
              <tr><td>Цена — главный аргумент</td><td>Безопасность и личное сопровождение</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" id="underwater">
        <div className="container split-grid">
          <div>
            <p className="text-meta">Что смотреть под водой</p>
            <h2>“Нечего смотреть” — обычно так кажется до первого спуска</h2>
            <p className="lead">
              В Нячанге впечатление создаёт не только один большой объект, а весь подводный
              опыт: риф, рыбы, свет, дыхание и ощущение спокойствия под водой. Локации
              подбираются по погоде и видимости.
            </p>
          </div>
          <ul className="identify-list">
            {underwaterProof.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="section" id="programs">
        <div className="container">
          <div className="section__header">
            <p className="text-meta">Форматы</p>
            <h2>Выберите свой морской сценарий</h2>
            <p className="section__subtitle">
              Можно прийти совсем без опыта, поехать за компанию на снорклинг
              или подготовить особенный формат для пары.
            </p>
          </div>
          <div className="programs-grid">
            {programs.map((program) => (
              <div className="card card--with-media" key={program.title}>
                <img src={program.image} alt={program.imageAlt} className="card__media generated-visual" />
                <div className="card__price">{program.price}</div>
                <div className="card__title">{program.title}</div>
                <p className="card__desc">{program.desc}</p>
                <a
                  href={tgLink(program.key)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                  onClick={() => trackEvent(program.event, { source: 'programs' })}
                >
                  {program.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand" id="media-service">
        <div className="container split-grid">
          <div>
            <p className="text-meta">Фото и видео</p>
            <h2>Съёмка — отдельная доп-услуга, не обязательный пункт программы</h2>
          </div>
          <div>
            <p className="lead">
              На сайте мы не навязываем фото и видео в пакете. Менеджер подскажет варианты
              в переписке: кому-то достаточно самого погружения, а кому-то важно сохранить
              кадры с кораллами, рыбами и первым спокойным дыханием под водой.
            </p>
            <a
              href={tgLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
              onClick={() => trackEvent('ClickTelegram', { source: 'media_service' })}
            >
              Обсудить детали
            </a>
          </div>
        </div>
      </section>

      <section className="section section--inverted" id="how-it-works">
        <div className="container">
          <div className="section__header section__header--offset">
            <p className="text-meta">День без хаоса</p>
            <h2>Как всё проходит</h2>
          </div>
          <div className="steps">
            {daySteps.map(([title, text]) => (
              <div className="step" key={title}>
                <div className="step__title">{title}</div>
                <div className="step__text">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="fear">
        <div className="container split-grid">
          <div>
            <p className="text-meta">Страх воды</p>
            <h2>Ваша задача — не быть героем. Ваша задача — спокойно дышать</h2>
          </div>
          <div>
            <p className="lead">
              Страх перед первым погружением — обычная история. Люди боятся глубины,
              дыхания через регулятор, снаряжения или того, что “не получится”.
              Мы не делаем из этого проблему: объясняем, проверяем и идём в воду постепенно.
            </p>
            <a
              href={tgLink('fear')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
              onClick={() => trackEvent('ClickTelegram', { source: 'fear' })}
            >
              Хочу попробовать, но немного боюсь
            </a>
          </div>
        </div>
      </section>

      <section className="section section--slice" id="snorkeling">
        <div className="container split-grid split-grid--reverse">
          <div className="signal-panel">
            <span className="text-meta">Снорклинг / без акваланга</span>
            <span className="signal-panel__price">45$</span>
            <ul className="price-card__list">
              <li>Лодка до места снорклинга</li>
              <li>Маска, трубка и жилет</li>
              <li>Подходит детям и друзьям дайверов</li>
            </ul>
            <img
              src="/images/generated/snorkeling.svg"
              alt="Снорклинг без акваланга"
              className="signal-panel__visual generated-visual"
            />
          </div>
          <div>
            <h2>Море без глубины: для тех, кто едет за компанию или пока не готов к дайвингу</h2>
            <p className="lead">
              Лёгкий формат с лодкой, маской, трубкой и подводным миром Нячанга.
              Подходит семьям, друзьям дайверов и тем, кто хочет начать мягче.
            </p>
            <a
              href={tgLink('snorkeling')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
              onClick={() => trackEvent('ClickSnorkeling', { source: 'home_snorkeling' })}
            >
              Узнать даты по снорклингу
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="reviews">
        <div className="container">
          <div className="section__header">
            <p className="text-meta">Отзывы</p>
            <h2>Что говорят те, кто тоже боялся в первый раз</h2>
          </div>
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.author} className="review-card">
                <div className="review-card__stars">5/5</div>
                <p className="review-card__text">“{review.text}”</p>
                <div className="review-card__author">{review.author}</div>
                <span className="review-card__tag">{review.tag}</span>
              </div>
            ))}
          </div>
          <a href="/reviews" className="btn btn--outline reviews-link">Все отзывы</a>
        </div>
      </section>

      <FaqSection items={faqItems} />
      <CtaFinal messageKey="general" />
    </>
  );
}
