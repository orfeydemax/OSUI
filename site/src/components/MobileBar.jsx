import { tgLink, waLink, trackEvent } from '../utils';
import { Link } from 'react-router-dom';

export default function MobileBar() {
  return (
    <div className="mobile-bar">
      <div className="mobile-bar__inner">
        <a
          href={tgLink('general')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--telegram"
          onClick={() => trackEvent('ClickTelegram', { source: 'mobile_bar' })}
        >
          Telegram
        </a>
        <a
          href={waLink('general')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--whatsapp"
          onClick={() => trackEvent('ClickWhatsApp', { source: 'mobile_bar' })}
        >
          WhatsApp
        </a>
        <Link to="/#programs" className="btn btn--white" style={{ color: 'var(--navy)' }}>
          Цены
        </Link>
      </div>
    </div>
  );
}
