import { useEffect } from 'react';
import { tgLink, waLink, trackEvent } from '../utils';
import FaqSection from '../components/FaqSection';
import CtaFinal from '../components/CtaFinal';

const faq = [
  { q: 'С какого возраста можно детям?', a: 'Уточняйте у Виктора — зависит от формата (снорклинг или дайвинг).' },
  { q: 'Обязательно ли всем погружаться?', a: 'Нет. Кто-то может выбрать снорклинг, кто-то просто провести день на лодке.' },
  { q: 'Безопасно ли для детей?', a: 'Виктор подберёт формат под возраст и опыт каждого участника.' },
];

export default function FamilyPage() {
  useEffect(() => {
    trackEvent('ViewContent', { page: 'family' });
    document.title = 'Дайвинг и снорклинг для семьи в Нячанге | Victor DivePro';
  }, []);

  return (
    <>
      <section className="hero" style={{ minHeight: '80vh' }}>
        <div className="hero__bg">
          <img
            src="/images/generated/family-boat.svg"
            alt="Семья на лодке"
            className="generated-visual"
          />
        </div>
        <div className="hero__overlay" />
        <div className="container hero__content">
          <h1>Дайвинг и снорклинг для семьи в Нячанге</h1>
          <p className="hero__sub">
            Не все обязаны погружаться. Кто-то может выбрать дайвинг, кто-то снорклинг,
            а кто-то просто провести день на лодке. Мы поможем подобрать формат.
          </p>
          <div className="btn-group">
            <a href={tgLink('family')} target="_blank" rel="noopener noreferrer"
              className="btn btn--primary"
              onClick={() => trackEvent('ClickFamily', { source: 'family_hero' })}>
              Подобрать семейный формат
            </a>
            <a href={waLink('family')} target="_blank" rel="noopener noreferrer"
              className="btn btn--whatsapp"
              onClick={() => trackEvent('ClickWhatsApp', { source: 'family_hero' })}>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header"><h2>Как совместить дайвинг и снорклинг</h2></div>
          <div className="center-content">
            <p className="page-lede">
              Каждый член семьи выбирает свой формат. Дети могут плавать с маской,
              родители — попробовать дайвинг. Все едут на одной лодке и проводят
              день вместе.
            </p>
          </div>
          <div className="programs-grid programs-grid--spaced">
            <div className="card">
              <div className="card__price">95$</div>
              <div className="card__title">Дайвинг</div>
              <p className="card__desc">Для тех, кто хочет попробовать погружение.</p>
            </div>
            <div className="card">
              <div className="card__price">45$</div>
              <div className="card__title">Снорклинг</div>
              <p className="card__desc">Для тех, кто хочет море без акваланга.</p>
            </div>
            <div className="card">
              <div className="card__price card__price--request">По запросу</div>
              <div className="card__title">Индивидуальный формат</div>
              <p className="card__desc">Обсудим состав семьи и подберём оптимальный вариант.</p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={faq} />
      <CtaFinal messageKey="family" />
    </>
  );
}
