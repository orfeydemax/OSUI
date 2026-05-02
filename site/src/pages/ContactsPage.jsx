import { useEffect } from 'react';
import { tgLink, waLink, igLink, trackEvent } from '../utils';

export default function ContactsPage() {
  useEffect(() => {
    trackEvent('ViewContent', { page: 'contacts' });
    document.title = 'Контакты Victor DivePro — дайвинг в Нячанге | Telegram, WhatsApp';
  }, []);

  return (
    <section className="section" style={{ paddingTop: '120px' }}>
      <div className="container">
        <div className="section__header">
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)' }}>Контакты</h1>
          <p className="section__subtitle">
            Напишите Виктору — подскажем ближайшие даты, программу и формат.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', maxWidth:'900px', margin:'0 auto' }}>
          <div>
            <h3 style={{ marginBottom:'24px' }}>Связаться</h3>

            <div style={{ marginBottom:'16px' }}>
              <a href={tgLink('general')} target="_blank" rel="noopener noreferrer"
                className="btn btn--telegram" style={{ width:'100%', marginBottom:'12px' }}
                onClick={() => trackEvent('ClickTelegram', { source: 'contacts' })}>
                Написать в Telegram
              </a>
              <a href={waLink('general')} target="_blank" rel="noopener noreferrer"
                className="btn btn--whatsapp" style={{ width:'100%', marginBottom:'12px' }}
                onClick={() => trackEvent('ClickWhatsApp', { source: 'contacts' })}>
                Написать в WhatsApp
              </a>
              <a href={igLink()} target="_blank" rel="noopener noreferrer"
                className="btn btn--outline" style={{ width:'100%' }}
                onClick={() => trackEvent('ClickInstagram', { source: 'contacts' })}>
                Открыть Instagram
              </a>
            </div>

            <div style={{ marginTop:'32px', color:'var(--text-muted)', fontSize:'0.95rem' }}>
              <p><strong>Время ответа:</strong> обычно в течение часа</p>
              <p><strong>Языки:</strong> русский, английский</p>
              <p><strong>Локация:</strong> Нячанг, Вьетнам</p>
              <p><strong>Telegram:</strong> @victordivepro</p>
              <p><strong>Instagram:</strong> @victor.divepro</p>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom:'24px' }}>Где мы находимся</h3>
            <div style={{ borderRadius:'var(--radius-lg)', overflow:'hidden', boxShadow:'var(--shadow-md)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62467.0!2d109.17!3d12.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170677811cc886f%3A0x5c4bbc0aa81edcb9!2z0J3Rj9GH0LDQvdCz!5e0!3m2!1sru!2s!4v1"
                width="100%"
                height="400"
                style={{ border:0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Нячанг на карте"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
