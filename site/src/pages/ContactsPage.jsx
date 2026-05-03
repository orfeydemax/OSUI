import { useEffect } from 'react';
import { tgLink, waLink, igLink, trackEvent } from '../utils';

export default function ContactsPage() {
  useEffect(() => {
    trackEvent('ViewContent', { page: 'contacts' });
    document.title = 'Контакты Victor DivePro — дайвинг в Нячанге | Telegram, WhatsApp';
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="section__header">
          <h1>Контакты</h1>
          <p className="section__subtitle">
            Напишите Виктору — подскажем ближайшие даты, программу и формат.
          </p>
        </div>

        <div className="contact-grid">
          <div>
            <h3>Связаться</h3>

            <div className="contact-actions">
              <a href={tgLink('general')} target="_blank" rel="noopener noreferrer"
                className="btn btn--telegram"
                onClick={() => trackEvent('ClickTelegram', { source: 'contacts' })}>
                Написать в Telegram
              </a>
              <a href={waLink('general')} target="_blank" rel="noopener noreferrer"
                className="btn btn--whatsapp"
                onClick={() => trackEvent('ClickWhatsApp', { source: 'contacts' })}>
                Написать в WhatsApp
              </a>
              <a href={igLink()} target="_blank" rel="noopener noreferrer"
                className="btn btn--outline"
                onClick={() => trackEvent('ClickInstagram', { source: 'contacts' })}>
                Открыть Instagram
              </a>
            </div>

            <div className="contact-meta">
              <p><strong>Время ответа:</strong> обычно в течение часа</p>
              <p><strong>Языки:</strong> русский, английский</p>
              <p><strong>Локация:</strong> Нячанг, Вьетнам</p>
              <p><strong>Telegram:</strong> @victordivepro</p>
              <p><strong>Instagram:</strong> @victor.divepro</p>
            </div>
          </div>

          <div>
            <h3>Где мы находимся</h3>
            <div className="map-frame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62467.0!2d109.17!3d12.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170677811cc886f%3A0x5c4bbc0aa81edcb9!2z0J3Rj9GH0LDQvdCz!5e0!3m2!1sru!2s!4v1"
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
