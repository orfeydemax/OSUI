import { tgLink, waLink, igLink, trackEvent } from '../utils';

export default function CtaFinal({ messageKey = 'general' }) {
  return (
    <section className="cta-final">
      <div className="container">
        <h2>Хотите попробовать дайвинг в Нячанге?</h2>
        <p>
          Напишите Виктору. Подскажем ближайшие даты, программу, цену и формат
          под ваш опыт. Если боитесь воды или ни разу не погружались — так и
          напишите. Это нормально.
        </p>
        <div className="btn-group">
          <a
            href={tgLink(messageKey)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--telegram"
            onClick={() => trackEvent('ClickTelegram', { source: 'cta_final' })}
          >
            Написать в Telegram
          </a>
          <a
            href={waLink(messageKey)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--whatsapp"
            onClick={() => trackEvent('ClickWhatsApp', { source: 'cta_final' })}
          >
            Написать в WhatsApp
          </a>
          <a
            href={igLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--white"
            onClick={() => trackEvent('ClickInstagram', { source: 'cta_final' })}
          >
            Открыть Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
