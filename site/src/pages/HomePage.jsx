import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tgLink, waLink, trackEvent } from '../utils';
import FaqSection from '../components/FaqSection';
import CtaFinal from '../components/CtaFinal';

const faqItems = [
  { q: 'Можно ли нырять, если я не умею плавать?', a: 'Да, для пробного погружения это не обязательно. Инструктор рядом и контролирует процесс. Перед погружением вы проходите инструктаж и учитесь дышать через регулятор.' },
  { q: 'Нужен ли опыт?', a: 'Нет. Пробное погружение рассчитано на новичков без сертификата.' },
  { q: 'Что если я испугаюсь?', a: 'Никто не будет давить. Инструктор помогает адаптироваться постепенно. Если человеку нужно больше времени, темп подстраивается под него.' },
  { q: 'Фото и видео входят?', a: 'Съёмка оплачивается отдельно. Её можно обсудить заранее.' },
  { q: 'Когда лучший сезон?', a: 'Высокий сезон: март — октябрь. Зимой возможны ограничения по погоде и видимости.' },
  { q: 'Как забронировать?', a: 'Напишите в Telegram или WhatsApp. Мы уточним дату, количество человек, опыт и подберём формат.' },
];

const proofItems = ['11 лет опыта', '15 600+ клиентов', 'SSI инструктор', '2 клиента на 1 инструктора'];

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
    desc: '2 погружения, русский инструктаж, сопровождение рядом на каждом этапе.',
    image: '/images/generated/beginner-dive.svg',
    imageAlt: 'Новичок под водой с инструктором',
    cta: 'Хочу первое погружение',
    key: 'beginner',
    event: 'ClickBeginnerDiving',
  },
  {
    price: '45$',
    title: 'Снорклинг',
    desc: 'Лодка, море, маска и подводный мир без акваланга и глубины.',
    image: '/images/generated/snorkeling.svg',
    imageAlt: 'Снорклинг в тропическом море',
    cta: 'Хочу снорклинг',
    key: 'snorkeling',
    event: 'ClickSnorkeling',
  },
  {
    price: '410$',
    title: 'Open Water Diver',
    desc: 'Обучение для тех, кто хочет нырять самостоятельно и получить сертификат.',
    image: '/images/generated/dive-course.svg',
    imageAlt: 'Обучение дайвингу',
    cta: 'Узнать про обучение',
    key: 'course',
    event: 'ClickCourses',
  },
  {
    price: 'Private',
    title: 'Пары и семьи',
    desc: 'Спокойный формат для подарка, дня рождения, годовщины или поездки с детьми.',
    image: '/images/generated/couples-dive.svg',
    imageAlt: 'Пара под водой',
    cta: 'Обсудить формат',
    key: 'private',
    event: 'ClickPrivate',
  },
];

const daySteps = [
  ['Контакт', 'Вы пишете Виктору в Telegram или WhatsApp. В сообщении уже будет готовая фраза.'],
  ['Диагностика', 'Уточняем опыт, количество людей, страх воды, умение плавать и желаемый формат.'],
  ['Маршрут', 'Подбираем дайвинг, снорклинг, private-день, пару, семью или обучение.'],
  ['Инструктаж', 'На лодке спокойно разбираем дыхание, сигналы, снаряжение и поведение под водой.'],
  ['Погружение', 'Инструктор рядом. Вы не остаётесь один на один с водой или тревогой.'],
  ['Эмоции', 'После погружения можно обсудить фото, видео и следующий морской день.'],
];

const reviews = [
  { text: 'Боялась воды всю жизнь, но Виктор так спокойно всё объяснил, что я даже не заметила, как оказалась под водой.', author: 'Анна', tag: 'Первое погружение' },
  { text: 'Дайвинг подарили мужу на день рождения. Виктор организовал всё идеально: погружение, темп и съёмку.', author: 'Екатерина', tag: 'Пара' },
  { text: 'Приехали семьёй: дети на снорклинг, мы с женой на дайвинг. Все довольны, организация на высоте.', author: 'Дмитрий', tag: 'Семья' },
];

export default function HomePage() {
  useEffect(() => {
    trackEvent('ViewContent', { page: 'home' });
    document.title = 'Victor DivePro — Дайвинг в Нячанге для новичков с русским инструктором';
  }, []);

  return (
    <>
      <section className="hero hero--editorial" id="hero">
        <div className="hero__watermark">NHA TRANG</div>
        <div className="hero__sonar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="container hero__grid">
          <div className="hero__kicker text-meta">Victor DivePro / персональный дайвинг</div>
          <div className="hero__copy">
            <h1>Первое погружение без геройства</h1>
            <p className="hero__sub">
              Русскоговорящий инструктор Виктор ведёт новичка спокойно: объясняет дыхание,
              проверяет снаряжение, держит темп и остаётся рядом под водой.
            </p>
            <div className="btn-group">
              <a
                href={tgLink('beginner')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
                onClick={() => trackEvent('ClickTelegram', { source: 'hero' })}
              >
                Узнать ближайшие даты
              </a>
              <a
                href={waLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline"
                onClick={() => trackEvent('ClickWhatsApp', { source: 'hero' })}
              >
                Написать в WhatsApp
              </a>
            </div>
          </div>
          <aside className="hero__manifest">
            <p>Для тех, кто хочет увидеть море изнутри, но не хочет, чтобы его торопили.</p>
            <img
              src="/images/generated/beginner-dive.svg"
              alt="Первое погружение с инструктором"
              className="hero__visual generated-visual"
            />
            <div className="hero__depth">
              <span>0m</span>
              <span>6m</span>
              <span>12m</span>
            </div>
          </aside>
          <div className="hero__proof" aria-label="Ключевые факты">
            {proofItems.map((item) => (
              <span key={item} className="hero__proof-item">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--slice" id="identify">
        <div className="container split-grid split-grid--wide-left">
          <div>
            <p className="text-meta">Кому подходит</p>
            <h2>Если внутри есть “хочу”, а рядом с ним “страшно” — вы как раз по адресу</h2>
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
              инструктора рядом. Опыт и сертификат не нужны.
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
              alt="Инструктор Виктор"
              className="portrait-panel__image generated-visual"
            />
            <div>
              <p className="text-meta">Инструктор рядом</p>
              <h2>Виктор не торопит. Он проводит через первый страх</h2>
            </div>
          </div>
          <div>
            <p className="lead">
              Для первого погружения важен не только акваланг. Важен человек, которому
              вы доверите первые минуты под водой. Виктор спокойно объясняет, проверяет
              состояние и помогает пройти первый опыт без лишнего стресса.
            </p>
            <div className="about-victor__facts">
              <div className="fact"><div className="fact__num">11</div><div className="fact__label">лет опыта</div></div>
              <div className="fact"><div className="fact__num">15 600+</div><div className="fact__label">клиентов</div></div>
              <div className="fact"><div className="fact__num">SSI</div><div className="fact__label">сертификат</div></div>
              <div className="fact"><div className="fact__num">2:1</div><div className="fact__label">клиент/инструктор</div></div>
            </div>
            <Link to="/about-victor" className="btn btn--outline">
              Подробнее о Викторе
            </Link>
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

      <section className="section" id="programs">
        <div className="container">
          <div className="section__header">
            <p className="text-meta">Форматы</p>
            <h2>Выберите свой морской сценарий</h2>
            <p className="section__subtitle">
              Можно прийти совсем без опыта, поехать за компанию на снорклинг
              или пройти обучение на международный сертификат.
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
          <Link to="/reviews" className="btn btn--outline reviews-link">Все отзывы</Link>
        </div>
      </section>

      <FaqSection items={faqItems} />
      <CtaFinal messageKey="general" />
    </>
  );
}
