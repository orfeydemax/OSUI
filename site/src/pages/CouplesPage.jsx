import { useEffect } from 'react';
import { tgLink, waLink, trackEvent } from '../utils';
import CtaFinal from '../components/CtaFinal';

export default function CouplesPage() {
  useEffect(() => {
    trackEvent('ViewContent', { page: 'couples' });
    document.title = 'Дайвинг для пар в Нячанге — свидание, подарок, съёмка | Victor DivePro';
  }, []);

  return (
    <>
      <section className="hero" style={{ minHeight: '80vh' }}>
        <div className="hero__bg">
          <img
            src="/images/generated/couples-dive.svg"
            alt="Пара под водой"
            className="generated-visual"
          />
        </div>
        <div className="hero__overlay" />
        <div className="container hero__content">
          <h1>Морское свидание в Нячанге: дайвинг, эмоции и подводная съёмка</h1>
          <p className="hero__sub">
            Подарите себе или любимому человеку день, который запомнится.
            Дайвинг как подарок, свидание или предложение руки.
          </p>
          <div className="btn-group">
            <a href={tgLink('couple')} target="_blank" rel="noopener noreferrer"
              className="btn btn--primary"
              onClick={() => trackEvent('ClickCouples', { source: 'couples_hero' })}>
              Обсудить формат для двоих
            </a>
            <a href={waLink('couple')} target="_blank" rel="noopener noreferrer"
              className="btn btn--whatsapp"
              onClick={() => trackEvent('ClickWhatsApp', { source: 'couples_hero' })}>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header"><h2>Сценарии</h2></div>
          <div className="programs-grid">
            {['Свидание под водой', 'Подарок на день рождения', 'Годовщина', 'Предложение руки', 'Романтическая поездка', 'Красивый контент из отпуска'].map((s, i) => (
              <div key={i} className="card card--simple card--center">
                <div className="card__title">{s}</div>
                <p className="card__desc">Обсудим формат, съёмку и организацию заранее.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <div className="center-content">
            <h2>Как организовать</h2>
            <p className="page-lede">
              Напишите Виктору в Telegram или WhatsApp. Расскажите, что за повод,
              сколько вас, нужна ли съёмка. Мы подберём формат, дату и локацию.
            </p>
            <a href={tgLink('couple')} target="_blank" rel="noopener noreferrer"
              className="btn btn--primary"
              onClick={() => trackEvent('ClickCouples', { source: 'couples_organize' })}>
              Обсудить формат для двоих
            </a>
          </div>
        </div>
      </section>

      <CtaFinal messageKey="couple" />
    </>
  );
}
