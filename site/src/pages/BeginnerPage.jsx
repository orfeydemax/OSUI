import { useEffect } from 'react';
import { tgLink, waLink, trackEvent } from '../utils';
import FaqSection from '../components/FaqSection';
import CtaFinal from '../components/CtaFinal';

const faq = [
  { q: 'Можно ли нырять, если я не умею плавать?', a: 'Да. Инструктор рядом и контролирует процесс. Перед погружением вы проходите инструктаж и учитесь дышать через регулятор.' },
  { q: 'Нужен ли опыт?', a: 'Нет. Пробное погружение рассчитано на новичков без сертификата.' },
  { q: 'Что если я испугаюсь?', a: 'Никто не будет давить. Инструктор помогает адаптироваться постепенно.' },
  { q: 'Сколько длится программа?', a: 'Уточняйте у Виктора — зависит от формата и погодных условий.' },
  { q: 'Что входит в цену 95$?', a: '2 погружения, инструктаж, сопровождение инструктора, оборудование, лодка. Съёмка и трансфер — отдельно.' },
  { q: 'Фото и видео входят?', a: 'Съёмка оплачивается отдельно. Её можно обсудить заранее.' },
];

export default function BeginnerPage() {
  useEffect(() => {
    trackEvent('ViewContent', { page: 'beginner' });
    document.title = 'Дайвинг для новичков в Нячанге — первое погружение без опыта | Victor DivePro';
  }, []);

  return (
    <>
      <section className="hero" style={{ minHeight: '80vh' }}>
        <div className="hero__bg">
          <img
            src="/images/generated/beginner-dive.svg"
            alt="Новичок под водой с инструктором"
            className="generated-visual"
          />
        </div>
        <div className="hero__overlay" />
        <div className="container hero__content">
          <h1>Первое погружение в Нячанге без опыта и умения плавать</h1>
          <p className="hero__sub">
            С русскоговорящим инструктором Виктором. Спокойно объясним, проведём
            под водой рядом и поможем получить первый красивый опыт.
          </p>
          <div className="hero__proof">
            <span className="hero__proof-item">Опыт не нужен</span>
            <span className="hero__proof-item">Плавать не обязательно</span>
            <span className="hero__proof-item">Инструктор рядом</span>
          </div>
          <div className="btn-group">
            <a href={tgLink('beginner')} target="_blank" rel="noopener noreferrer"
              className="btn btn--primary"
              onClick={() => trackEvent('ClickBeginnerDiving', { source: 'beginner_hero' })}>
              Хочу первое погружение
            </a>
            <a href={waLink('beginner')} target="_blank" rel="noopener noreferrer"
              className="btn btn--whatsapp"
              onClick={() => trackEvent('ClickWhatsApp', { source: 'beginner_hero' })}>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header">
            <h2>Для кого эта программа</h2>
          </div>
          <ul className="identify-list content-list">
            <li>Вы ни разу не погружались с аквалангом</li>
            <li>Не умеете плавать — это не проблема</li>
            <li>Боитесь воды или глубины</li>
            <li>Хотите красивый опыт в отпуске</li>
            <li>Хотите, чтобы всё объяснили на русском</li>
          </ul>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <div className="section__header"><h2>Что входит в программу</h2></div>
          <div className="card price-card">
            <div className="card__price">95$</div>
            <ul className="card__features">
              <li>2 погружения по 35–40 минут</li>
              <li>Глубина до 12 метров</li>
              <li>Полный инструктаж на русском языке</li>
              <li>Всё оборудование включено</li>
              <li>Инструктор рядом на каждом этапе</li>
              <li>Лодка до места погружения</li>
            </ul>
            <p className="note-text">
              Съёмка, трансфер и питание оплачиваются отдельно.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header"><h2>Почему не страшно</h2></div>
          <div className="center-content">
            <p className="page-lede">
              Перед первым погружением волнуются почти все. Мы не торопим.
              Сначала спокойно объясняем, потом проверяем снаряжение,
              потом идём в воду постепенно. Ваша задача — спокойно дышать
              и слушать инструктора. Всё остальное мы берём на себя.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section__header"><h2>Как проходит день</h2></div>
          <div className="steps">
            <div className="step"><div className="step__title">Пишете Виктору</div><div className="step__text">В Telegram или WhatsApp с готовой фразой.</div></div>
            <div className="step"><div className="step__title">Уточняем детали</div><div className="step__text">Опыт, количество людей, дата.</div></div>
            <div className="step"><div className="step__title">Инструктаж</div><div className="step__text">Дыхание, сигналы, снаряжение — всё на русском.</div></div>
            <div className="step"><div className="step__title">Погружение</div><div className="step__text">Инструктор рядом, спокойный темп.</div></div>
            <div className="step"><div className="step__title">Эмоции</div><div className="step__text">Фото и видео — по договорённости.</div></div>
          </div>
        </div>
      </section>

      <FaqSection items={faq} />
      <CtaFinal messageKey="beginner" />
    </>
  );
}
