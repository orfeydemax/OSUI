import { useEffect } from 'react';
import { tgLink, waLink, trackEvent } from '../utils';
import FaqSection from '../components/FaqSection';
import CtaFinal from '../components/CtaFinal';

const faq = [
  { q: 'Сколько длится обучение Open Water Diver?', a: 'Обычно 3–4 дня. Включает теорию, навыки в ограниченной воде и открытые погружения.' },
  { q: 'Какой сертификат я получу?', a: 'Международный сертификат SSI, который признаётся во всём мире.' },
  { q: 'Нужен ли предварительный опыт?', a: 'Нет. Курс рассчитан на новичков с нуля.' },
  { q: 'На каком языке обучение?', a: 'На русском языке.' },
];

const courses = [
  { name: 'Open Water Diver', price: '410$', desc: 'Базовый курс для новичков. Вы научитесь погружаться самостоятельно и получите международный сертификат SSI.' },
  { name: 'Advanced Adventurer', price: 'По запросу', desc: 'Для тех, кто хочет расширить навыки: глубокие погружения, навигация, ночной дайвинг.' },
  { name: 'Diver Stress & Rescue', price: 'По запросу', desc: 'Курс по управлению стрессом и спасению под водой. Для продвинутых дайверов.' },
  { name: 'Спецкурсы', price: 'По запросу', desc: 'Подводная фотография, ночной дайвинг, глубокий дайвинг и другие специализации.' },
];

export default function CoursesPage() {
  useEffect(() => {
    trackEvent('ViewContent', { page: 'courses' });
    document.title = 'Обучение дайвингу в Нячанге — курсы и сертификаты SSI | Victor DivePro';
  }, []);

  return (
    <>
      <section className="hero" style={{ minHeight: '80vh' }}>
        <div className="hero__bg">
          <div className="img-placeholder" style={{ width:'100%', height:'100%', borderRadius:0 }}>
            Фото: обучение дайвингу
          </div>
        </div>
        <div className="hero__overlay" />
        <div className="container hero__content">
          <h1>Обучение дайвингу и международные сертификаты в Нячанге</h1>
          <p className="hero__sub">
            Научитесь погружаться правильно с русскоговорящим инструктором.
            Понятная программа, сертификат SSI и поддержка на каждом этапе.
          </p>
          <div className="btn-group">
            <a href={tgLink('course')} target="_blank" rel="noopener noreferrer"
              className="btn btn--primary"
              onClick={() => trackEvent('ClickCourses', { source: 'courses_hero' })}>
              Узнать про обучение
            </a>
            <a href={waLink('course')} target="_blank" rel="noopener noreferrer"
              className="btn btn--whatsapp"
              onClick={() => trackEvent('ClickWhatsApp', { source: 'courses_hero' })}>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header">
            <h2>Курсы и цены</h2>
            <p className="section__subtitle">
              От базового Open Water до продвинутых специализаций.
            </p>
          </div>
          <div className="programs-grid">
            {courses.map((c, i) => (
              <div key={i} className="card">
                <div className="card__price">{c.price}</div>
                <div className="card__title">{c.name}</div>
                <p className="card__desc">{c.desc}</p>
                <a href={tgLink('course')} target="_blank" rel="noopener noreferrer"
                  className="btn btn--primary" style={{ width:'100%' }}
                  onClick={() => trackEvent('ClickCourses', { course: c.name })}>
                  Узнать подробнее
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faq} />
      <CtaFinal messageKey="course" />
    </>
  );
}
