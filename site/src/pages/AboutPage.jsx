import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tgLink, trackEvent } from '../utils';
import CtaFinal from '../components/CtaFinal';

export default function AboutPage() {
  useEffect(() => {
    trackEvent('ViewContent', { page: 'about' });
    document.title = 'О Викторе — инструктор по дайвингу в Нячанге | Victor DivePro';
  }, []);

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="about-victor">
            <div className="about-victor__img">
              <img
                src="/images/generated/victor-portrait.svg"
                alt="Портрет инструктора Виктора"
                className="generated-visual"
              />
            </div>
            <div>
              <h1>
                Виктор: инструктор, который помогает новичкам спокойно сделать первое погружение
              </h1>
              <p className="page-lede">
                Для Виктора дайвинг — не просто работа на море. Это способ показать человеку,
                что страх можно пройти спокойно. Особенно в первый раз, когда под водой важны
                не глубина и не красивые слова, а доверие к инструктору.
              </p>
              <p className="page-lede page-lede--muted">
                Виктор ушёл из офисной жизни в Москве и сделал дайвинг делом жизни.
                Сейчас он помогает людям в Нячанге впервые увидеть подводный мир
                спокойно и безопасно. Его подход простой: сначала человек должен
                почувствовать доверие, а уже потом идти глубже.
              </p>
              <div className="about-victor__facts">
                <div className="fact"><div className="fact__num">11</div><div className="fact__label">лет опыта</div></div>
                <div className="fact"><div className="fact__num">15 600+</div><div className="fact__label">клиентов</div></div>
                <div className="fact"><div className="fact__num">SSI</div><div className="fact__label">сертификат</div></div>
                <div className="fact"><div className="fact__num">2:1</div><div className="fact__label">клиент/инструктор</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <div className="section__header"><h2>Подход к новичкам</h2></div>
          <div className="center-content">
            <p className="page-lede">
              Для первого погружения важен не только акваланг. Важен человек,
              который будет рядом, когда вы впервые окажетесь под водой.
              Виктор спокойно объясняет, не торопит и помогает пройти первый
              опыт без лишнего стресса.
            </p>
            <p className="page-lede page-lede--muted">
              Это не потоковый формат, где вас быстро провели по программе.
              Здесь новичка ведут рядом и по-человечески.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header"><h2>Сертификаты</h2></div>
          <img
            src="/images/generated/certificates.svg"
            alt="Сертификаты Виктора SSI"
            className="generated-visual generated-visual--certificate"
          />
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <div className="section__header"><h2>Программы</h2></div>
          <div className="programs-grid programs-grid--compact">
            <Link to="/beginner-diving-nha-trang" className="card card--simple">
              <div className="card__title">Дайвинг для новичков</div>
              <p className="card__desc">95$ · 2 погружения</p>
            </Link>
            <Link to="/snorkeling-nha-trang" className="card card--simple">
              <div className="card__title">Снорклинг</div>
              <p className="card__desc">45$ · Море без акваланга</p>
            </Link>
            <Link to="/diving-courses-nha-trang" className="card card--simple">
              <div className="card__title">Обучение</div>
              <p className="card__desc">410$ · Open Water Diver</p>
            </Link>
          </div>
        </div>
      </section>

      <CtaFinal messageKey="general" />
    </>
  );
}
