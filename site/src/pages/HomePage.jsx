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

const reviews = [
  { text: 'Боялась воды всю жизнь, но Виктор так спокойно всё объяснил, что я даже не заметила, как оказалась под водой. Это был лучший день отпуска!', author: 'Анна', tag: 'Новичок' },
  { text: 'Дайвинг подарили мужу на день рождения. Виктор организовал всё идеально — и погружение, и съёмку. Муж до сих пор пересматривает видео.', author: 'Екатерина', tag: 'Пара' },
  { text: 'Приехали семьёй — дети на снорклинг, мы с женой на дайвинг. Все довольны, организация на высоте.', author: 'Дмитрий', tag: 'Семья' },
];

export default function HomePage() {
  useEffect(() => {
    trackEvent('ViewContent', { page: 'home' });
    document.title = 'Victor DivePro — Дайвинг в Нячанге для новичков с русским инструктором';
  }, []);

  return (
    <>
      {/* === HERO === */}
      <section className="hero" id="hero">
        <div className="hero__bg">
          <div className="img-placeholder" style={{ width:'100%', height:'100%', borderRadius:0 }}>
            Фото: Виктор с клиентом под водой / hero.jpg
          </div>
        </div>
        <div className="hero__overlay" />
        <div className="container hero__content">
          <h1>Первое погружение в Нячанге без опыта и умения плавать</h1>
          <p className="hero__sub">
            С русскоговорящим инструктором Виктором. Спокойно объясним, проведём
            под водой рядом и поможем получить первый красивый опыт без суеты и страха.
          </p>
          <div className="hero__proof">
            <span className="hero__proof-item">11 лет опыта</span>
            <span className="hero__proof-item">15 600+ клиентов</span>
            <span className="hero__proof-item">SSI инструктор</span>
            <span className="hero__proof-item">2 клиента на 1 инструктора</span>
          </div>
          <div className="btn-group">
            <a href={tgLink('beginner')} target="_blank" rel="noopener noreferrer"
              className="btn btn--primary"
              onClick={() => trackEvent('ClickTelegram', { source: 'hero' })}>
              Узнать ближайшие даты
            </a>
            <a href={tgLink('general')} target="_blank" rel="noopener noreferrer"
              className="btn btn--telegram"
              onClick={() => trackEvent('ClickTelegram', { source: 'hero_tg' })}>
              Telegram
            </a>
            <a href={waLink('general')} target="_blank" rel="noopener noreferrer"
              className="btn btn--whatsapp"
              onClick={() => trackEvent('ClickWhatsApp', { source: 'hero' })}>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* === Узнали себя === */}
      <section className="section" id="identify">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', alignItems:'center' }}>
            <div>
              <h2>Подойдёт, если вы хотите попробовать дайвинг, но немного волнуетесь</h2>
              <p style={{ color:'var(--text-muted)', marginTop:'16px' }}>
                Первое погружение почти всегда начинается с сомнений. Кто-то не умеет плавать.
                Кто-то боится глубины. Кто-то думает, что не справится с дыханием. Это нормально.
                Для этого и нужен инструктор, который спокойно объяснит каждый шаг и будет рядом под водой.
              </p>
              <ul className="identify-list" style={{ marginTop:'24px' }}>
                <li>вы ни разу не погружались</li>
                <li>не умеете плавать</li>
                <li>боитесь воды или глубины</li>
                <li>хотите красивый опыт в отпуске</li>
                <li>ищете необычный подарок или свидание</li>
                <li>хотите, чтобы всё объяснили по-русски</li>
              </ul>
            </div>
            <div className="img-placeholder" style={{ aspectRatio:'4/3' }}>
              Фото: счастливые новички после погружения
            </div>
          </div>
        </div>
      </section>

      {/* === Главная программа === */}
      <section className="section section--sand" id="main-program">
        <div className="container">
          <div className="section__header">
            <h2>Пробное погружение для новичков</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', alignItems:'start' }}>
            <div className="card" style={{ borderTop:'4px solid var(--teal)' }}>
              <div className="card__price">95$</div>
              <div className="card__title">Дайвинг для новичков</div>
              <ul className="card__features">
                <li>Формат: для новичков без сертификата</li>
                <li>Глубина: до 12 метров</li>
                <li>2 погружения по 35–40 минут</li>
                <li>Инструктор рядом на каждом этапе</li>
                <li>Инструктаж на русском языке</li>
                <li>Съёмка: оплачивается отдельно</li>
              </ul>
              <a href={tgLink('beginner')} target="_blank" rel="noopener noreferrer"
                className="btn btn--primary" style={{ width:'100%' }}
                onClick={() => trackEvent('ClickBeginnerDiving', { source: 'main_program' })}>
                Хочу попробовать дайвинг
              </a>
            </div>
            <div>
              <p style={{ fontSize:'1.1rem', lineHeight:'1.8' }}>
                Это программа для тех, кто хочет впервые попробовать дайвинг в Нячанге.
                Опыт не нужен. Перед погружением вы проходите инструктаж на русском языке,
                разбираете снаряжение, учитесь спокойно дышать и только потом заходите в воду
                с инструктором.
              </p>
              <div className="img-placeholder" style={{ marginTop:'24px', aspectRatio:'16/9' }}>
                Фото: инструктаж на лодке
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Виктор === */}
      <section className="section" id="victor">
        <div className="container">
          <div className="about-victor">
            <div className="about-victor__img">
              <div className="img-placeholder" style={{ width:'100%', height:'100%', borderRadius:0 }}>
                Фото: портрет Виктора
              </div>
            </div>
            <div>
              <h2>Кто будет рядом с вами под водой</h2>
              <p style={{ marginTop:'16px', fontSize:'1.05rem' }}>
                Для первого погружения важен не только акваланг. Важен человек, которому
                вы доверите первые минуты под водой. Виктор спокойно объясняет, не торопит
                и помогает пройти первый опыт без лишнего стресса.
              </p>
              <p style={{ color:'var(--text-muted)' }}>
                Виктор ушёл из офисной жизни в Москве и сделал дайвинг делом жизни.
                Сейчас он помогает людям в Нячанге впервые увидеть подводный мир
                спокойно и безопасно.
              </p>
              <div className="about-victor__facts">
                <div className="fact"><div className="fact__num">11</div><div className="fact__label">лет опыта</div></div>
                <div className="fact"><div className="fact__num">15 600+</div><div className="fact__label">клиентов</div></div>
                <div className="fact"><div className="fact__num">SSI</div><div className="fact__label">сертификат</div></div>
                <div className="fact"><div className="fact__num">2:1</div><div className="fact__label">клиент/инструктор</div></div>
              </div>
              <Link to="/about-victor" className="btn btn--outline" style={{ marginTop:'24px' }}>
                Подробнее о Викторе
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === Сравнение === */}
      <section className="section section--sand" id="compare">
        <div className="container">
          <div className="section__header">
            <h2>Первое погружение лучше выбирать не только по цене</h2>
            <p className="section__subtitle">
              Дешевле — не всегда спокойнее. В первом погружении важны инструктор,
              объяснение, темп и внимание к человеку.
            </p>
          </div>
          <div style={{ maxWidth:'800px', margin:'0 auto' }}>
            <table className="compare-table">
              <thead>
                <tr><th>Массовый формат</th><th>Victor DivePro</th></tr>
              </thead>
              <tbody>
                <tr><td>Больше людей в группе</td><td>До 2 клиентов на 1 инструктора</td></tr>
                <tr><td>Меньше личного внимания</td><td>Инструктор рядом и ведёт процесс</td></tr>
                <tr><td>Быстрый общий инструктаж</td><td>Объяснение на русском языке</td></tr>
                <tr><td>Новичку сложнее расслабиться</td><td>Спокойный темп без давления</td></tr>
                <tr><td>Цена — главный аргумент</td><td>Безопасность и личное сопровождение</td></tr>
              </tbody>
            </table>
          </div>
          <div style={{ textAlign:'center', marginTop:'32px' }}>
            <a href={tgLink('beginner')} target="_blank" rel="noopener noreferrer"
              className="btn btn--primary"
              onClick={() => trackEvent('ClickTelegram', { source: 'compare' })}>
              Подобрать спокойный формат
            </a>
          </div>
        </div>
      </section>

      {/* === Программы и цены === */}
      <section className="section" id="programs">
        <div className="container">
          <div className="section__header">
            <h2>Выберите свой формат</h2>
            <p className="section__subtitle">
              Можно прийти совсем без опыта, поехать за компанию на снорклинг
              или пройти обучение на сертификат.
            </p>
          </div>
          <div className="programs-grid">
            {/* Дайвинг для новичков */}
            <div className="card">
              <div className="card__price">95$</div>
              <div className="card__title">Дайвинг для новичков</div>
              <p className="card__desc">Для тех, кто хочет впервые попробовать дайвинг. 2 погружения, инструктаж, сопровождение инструктора.</p>
              <a href={tgLink('beginner')} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{width:'100%'}}
                onClick={() => trackEvent('ClickBeginnerDiving')}>Хочу первое погружение</a>
            </div>
            {/* Снорклинг */}
            <div className="card">
              <div className="card__price">45$</div>
              <div className="card__title">Снорклинг</div>
              <p className="card__desc">Море, лодка и подводный мир без погружения с аквалангом. Подходит тем, кто боится дайвинга или едет за компанию.</p>
              <a href={tgLink('snorkeling')} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{width:'100%'}}
                onClick={() => trackEvent('ClickSnorkeling')}>Хочу снорклинг</a>
            </div>
            {/* Fun dive */}
            <div className="card">
              <div className="card__price" style={{fontSize:'1.2rem',color:'var(--navy)'}}>По запросу</div>
              <div className="card__title">Fun Dive</div>
              <p className="card__desc">Для сертифицированных дайверов, которые уже погружались и хотят нырнуть в Нячанге.</p>
              <a href={tgLink('funDive')} target="_blank" rel="noopener noreferrer" className="btn btn--outline" style={{width:'100%'}}
                onClick={() => trackEvent('ClickFunDive')}>Узнать условия</a>
            </div>
            {/* Обучение */}
            <div className="card">
              <div className="card__price">410$</div>
              <div className="card__title">Open Water Diver</div>
              <p className="card__desc">Для тех, кто хочет научиться погружаться и получить международный сертификат.</p>
              <a href={tgLink('course')} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{width:'100%'}}
                onClick={() => trackEvent('ClickCourses')}>Узнать про обучение</a>
            </div>
            {/* Private */}
            <div className="card">
              <div className="card__price" style={{fontSize:'1.2rem',color:'var(--navy)'}}>Индивидуально</div>
              <div className="card__title">Private-формат</div>
              <p className="card__desc">Для пар, семей, подарков, дней рождения и тех, кто хочет больше приватности.</p>
              <a href={tgLink('private')} target="_blank" rel="noopener noreferrer" className="btn btn--outline" style={{width:'100%'}}
                onClick={() => trackEvent('ClickPrivate')}>Обсудить формат</a>
            </div>
          </div>
        </div>
      </section>

      {/* === Как проходит день === */}
      <section className="section section--dark" id="how-it-works">
        <div className="container">
          <div className="section__header">
            <h2>Как всё проходит</h2>
          </div>
          <div className="steps">
            <div className="step"><div className="step__title">Вы пишете Виктору</div><div className="step__text">Нажимаете кнопку Telegram или WhatsApp. В сообщении уже будет готовая фраза.</div></div>
            <div className="step"><div className="step__title">Уточняем ваш опыт</div><div className="step__text">Сколько вас человек, есть ли опыт, умеете ли плавать, есть ли страх воды.</div></div>
            <div className="step"><div className="step__title">Подбираем формат</div><div className="step__text">Дайвинг, снорклинг, программа для пары, семьи или обучение.</div></div>
            <div className="step"><div className="step__title">Получаете программу</div><div className="step__text">Время, место, что входит, что взять с собой и как всё будет проходить.</div></div>
            <div className="step"><div className="step__title">Инструктаж на русском</div><div className="step__text">Виктор объясняет дыхание, сигналы, снаряжение и поведение под водой.</div></div>
            <div className="step"><div className="step__title">Погружение</div><div className="step__text">Инструктор рядом. Вы не остаётесь один на один с водой.</div></div>
            <div className="step"><div className="step__title">Эмоции и съёмка</div><div className="step__text">После погружения можно получить фото и видео. Съёмка обсуждается отдельно.</div></div>
          </div>
        </div>
      </section>

      {/* === Страх воды === */}
      <section className="section" id="fear">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'center'}}>
            <div>
              <h2>Если вы боитесь воды — это нормально</h2>
              <p style={{marginTop:'16px',fontSize:'1.05rem'}}>
                Страх перед первым погружением — обычная история. Люди боятся глубины,
                дыхания через регулятор, снаряжения или того, что «не получится».
                Мы не делаем из этого проблему. Сначала спокойно объясняем, потом проверяем,
                потом идём в воду постепенно.
              </p>
              <p style={{fontWeight:600,color:'var(--navy)',fontSize:'1.1rem',marginTop:'8px'}}>
                Ваша задача — не быть героем. Ваша задача — спокойно дышать и слушать
                инструктора. Всё остальное мы берём на себя.
              </p>
              <a href={tgLink('fear')} target="_blank" rel="noopener noreferrer"
                className="btn btn--primary" style={{marginTop:'24px'}}
                onClick={() => trackEvent('ClickTelegram',{source:'fear'})}>
                Хочу попробовать, но немного боюсь
              </a>
            </div>
            <div className="img-placeholder" style={{aspectRatio:'4/3'}}>
              Фото: инструктор помогает новичку
            </div>
          </div>
        </div>
      </section>

      {/* === Снорклинг === */}
      <section className="section section--sand" id="snorkeling">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'center'}}>
            <div className="img-placeholder" style={{aspectRatio:'4/3'}}>
              Фото: снорклинг в Нячанге
            </div>
            <div>
              <h2>Снорклинг в Нячанге для тех, кто хочет море без акваланга</h2>
              <p style={{marginTop:'16px'}}>
                Если вы не хотите погружаться с аквалангом или едете за компанию с дайверами,
                можно выбрать снорклинг. Это более лёгкий формат: море, лодка, маска, трубка
                и подводный мир без глубины.
              </p>
              <div style={{fontSize:'2rem',fontWeight:800,color:'var(--teal)',margin:'16px 0'}}>45$</div>
              <a href={tgLink('snorkeling')} target="_blank" rel="noopener noreferrer"
                className="btn btn--primary"
                onClick={() => trackEvent('ClickSnorkeling',{source:'home_snorkeling'})}>
                Узнать даты по снорклингу
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === Для пар === */}
      <section className="section" id="couples">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'center'}}>
            <div>
              <h2>Дайвинг как подарок, свидание или день рождения</h2>
              <p style={{marginTop:'16px'}}>
                Если хочется не просто экскурсию, а день, который запомнится, дайвинг
                можно упаковать как подарок: для пары, дня рождения, годовщины или предложения.
              </p>
              <ul className="identify-list" style={{marginTop:'16px'}}>
                <li>свидание</li><li>подарок на день рождения</li>
                <li>годовщина</li><li>предложение руки</li>
                <li>красивый контент из отпуска</li>
              </ul>
              <a href={tgLink('couple')} target="_blank" rel="noopener noreferrer"
                className="btn btn--primary" style={{marginTop:'24px'}}
                onClick={() => trackEvent('ClickCouples')}>
                Обсудить формат для двоих
              </a>
            </div>
            <div className="img-placeholder" style={{aspectRatio:'4/3'}}>
              Фото: пара под водой
            </div>
          </div>
        </div>
      </section>

      {/* === Для семьи === */}
      <section className="section section--sand" id="family">
        <div className="container">
          <div className="section__header">
            <h2>Морской день для семьи</h2>
            <p className="section__subtitle">
              Не все обязаны погружаться. Кто-то может выбрать дайвинг, кто-то снорклинг,
              а кто-то просто провести день на лодке. Мы поможем подобрать формат.
            </p>
          </div>
          <div style={{textAlign:'center'}}>
            <a href={tgLink('family')} target="_blank" rel="noopener noreferrer"
              className="btn btn--primary"
              onClick={() => trackEvent('ClickFamily')}>
              Подобрать семейный формат
            </a>
          </div>
        </div>
      </section>

      {/* === Отзывы === */}
      <section className="section" id="reviews">
        <div className="container">
          <div className="section__header">
            <h2>Что говорят те, кто тоже боялся в первый раз</h2>
          </div>
          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-card__stars">★★★★★</div>
                <p className="review-card__text">«{r.text}»</p>
                <div className="review-card__author">{r.author}</div>
                <span className="review-card__tag">{r.tag}</span>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'32px'}}>
            <Link to="/reviews" className="btn btn--outline">Все отзывы</Link>
          </div>
        </div>
      </section>

      {/* === FAQ === */}
      <FaqSection items={faqItems} />

      {/* === Финальный CTA === */}
      <CtaFinal messageKey="general" />
    </>
  );
}
