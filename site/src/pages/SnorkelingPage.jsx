import { useEffect } from 'react';
import { tgLink, waLink, trackEvent } from '../utils';
import FaqSection from '../components/FaqSection';
import CtaFinal from '../components/CtaFinal';

const faq = [
  { q: 'Чем снорклинг отличается от дайвинга?', a: 'Снорклинг — это плавание на поверхности с маской и трубкой. Вы видите подводный мир, но не погружаетесь с аквалангом.' },
  { q: 'Нужно ли уметь плавать?', a: 'Желательно, но не обязательно. Вы будете в спасательном жилете на поверхности воды.' },
  { q: 'Можно ли совместить с дайвингом?', a: 'Да! Кто-то из компании может нырять, а кто-то плавать с маской.' },
  { q: 'Подходит ли детям?', a: 'Уточняйте возрастные ограничения у Виктора.' },
];

export default function SnorkelingPage() {
  useEffect(() => {
    trackEvent('ViewContent', { page: 'snorkeling' });
    document.title = 'Снорклинг в Нячанге — море без акваланга | Victor DivePro';
  }, []);

  return (
    <>
      <section className="hero" style={{ minHeight: '80vh' }}>
        <div className="hero__bg">
          <div className="img-placeholder" style={{ width:'100%', height:'100%', borderRadius:0 }}>
            Фото: снорклинг в тропическом море
          </div>
        </div>
        <div className="hero__overlay" />
        <div className="container hero__content">
          <h1>Снорклинг в Нячанге для тех, кто хочет море без акваланга</h1>
          <p className="hero__sub">
            Лёгкий формат морского дня: лодка, маска, трубка и подводный мир без погружения.
            Подходит тем, кто боится дайвинга или едет за компанию.
          </p>
          <div className="hero__proof">
            <span className="hero__proof-item">45$</span>
            <span className="hero__proof-item">Без акваланга</span>
            <span className="hero__proof-item">Для всех</span>
          </div>
          <div className="btn-group">
            <a href={tgLink('snorkeling')} target="_blank" rel="noopener noreferrer"
              className="btn btn--primary"
              onClick={() => trackEvent('ClickSnorkeling', { source: 'snorkeling_hero' })}>
              Узнать даты по снорклингу
            </a>
            <a href={waLink('snorkeling')} target="_blank" rel="noopener noreferrer"
              className="btn btn--whatsapp"
              onClick={() => trackEvent('ClickWhatsApp', { source: 'snorkeling_hero' })}>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header"><h2>Для кого подходит</h2></div>
          <ul className="identify-list" style={{ maxWidth:'600px', margin:'0 auto' }}>
            <li>Вы не хотите погружаться с аквалангом</li>
            <li>Едете за компанию с дайверами</li>
            <li>Хотите просто красивый день на море</li>
            <li>Семья с детьми</li>
            <li>Боитесь глубины, но хотите увидеть рыб</li>
          </ul>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <div className="section__header"><h2>Что входит</h2></div>
          <div className="card" style={{ maxWidth:'600px', margin:'0 auto', borderTop:'4px solid var(--teal)' }}>
            <div className="card__price">45$</div>
            <ul className="card__features">
              <li>Лодка до места снорклинга</li>
              <li>Маска и трубка</li>
              <li>Спасательный жилет</li>
              <li>Сопровождение</li>
              <li>Красивые локации в Нячанге</li>
            </ul>
          </div>
        </div>
      </section>

      <FaqSection items={faq} />
      <CtaFinal messageKey="snorkeling" />
    </>
  );
}
