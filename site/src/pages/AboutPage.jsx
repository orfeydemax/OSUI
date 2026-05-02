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
      <section className="section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <div className="about-victor">
            <div className="about-victor__img">
              <div className="img-placeholder" style={{ width:'100%', height:'100%', borderRadius:0 }}>
                Фото: портрет Виктора
              </div>
            </div>
            <div>
              <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>
                Виктор: инструктор, который помогает новичкам спокойно сделать первое погружение
              </h1>
              <p style={{ marginTop:'20px', fontSize:'1.1rem', lineHeight:'1.8' }}>
                Для Виктора дайвинг — не просто работа на море. Это способ показать человеку,
                что страх можно пройти спокойно. Особенно в первый раз, когда под водой важны
                не глубина и не красивые слова, а доверие к инструктору.
              </p>
              <p style={{ color:'var(--text-muted)' }}>
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
          <div style={{ maxWidth:'700px', margin:'0 auto' }}>
            <p style={{ fontSize:'1.1rem', textAlign:'center' }}>
              Для первого погружения важен не только акваланг. Важен человек,
              который будет рядом, когда вы впервые окажетесь под водой.
              Виктор спокойно объясняет, не торопит и помогает пройти первый
              опыт без лишнего стресса.
            </p>
            <p style={{ textAlign:'center', color:'var(--text-muted)', marginTop:'16px' }}>
              Это не потоковый формат, где вас быстро провели по программе.
              Здесь новичка ведут рядом и по-человечески.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header"><h2>Сертификаты</h2></div>
          <div className="img-placeholder" style={{ maxWidth:'600px', margin:'0 auto', aspectRatio:'16/9' }}>
            Фото: сертификаты Виктора (SSI)
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <div className="section__header"><h2>Программы</h2></div>
          <div className="programs-grid" style={{ maxWidth:'800px', margin:'0 auto' }}>
            <Link to="/beginner-diving-nha-trang" className="card" style={{ textDecoration:'none' }}>
              <div className="card__title">Дайвинг для новичков</div>
              <p className="card__desc">95$ · 2 погружения</p>
            </Link>
            <Link to="/snorkeling-nha-trang" className="card" style={{ textDecoration:'none' }}>
              <div className="card__title">Снорклинг</div>
              <p className="card__desc">45$ · Море без акваланга</p>
            </Link>
            <Link to="/diving-courses-nha-trang" className="card" style={{ textDecoration:'none' }}>
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
