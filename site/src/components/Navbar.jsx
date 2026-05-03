import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { tgLink, trackEvent } from '../utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Закрываем мобильное меню при навигации
  useEffect(() => { setMenuOpen(false); }, [location]);

  const links = [
    { to: '/#main-program', label: 'Дайвинг' },
    { to: '/#snorkeling', label: 'Снорклинг' },
    { to: '/#programs', label: 'Для пары' },
    { to: '/#how-it-works', label: 'Как проходит' },
    { to: '/#reviews', label: 'Отзывы' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${location.pathname === '/' ? 'navbar--home' : ''}`}>
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo">
            <img src="/images/logo.jpg" alt="Victor DivePro" className="navbar__logo-img" />
            <span className="navbar__logo-text">VICTOR DIVEPRO</span>
          </Link>
          <div className="navbar__links">
            {links.map(l => (
              l.to.startsWith('/#') ? (
                <a key={l.to} href={l.to.replace('/', '')}>{l.label}</a>
              ) : (
                <Link key={l.to} to={l.to}>{l.label}</Link>
              )
            ))}
            <a
              href={tgLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary navbar__cta"
              onClick={() => trackEvent('ClickTelegram', { source: 'navbar' })}
            >
              Написать
            </a>
          </div>
          <button
            className="navbar__burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Мобильное меню */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          l.to.startsWith('/#') ? (
            <a key={l.to} href={l.to.replace('/', '')} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ) : (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</Link>
          )
        ))}
        <a
          href={tgLink('general')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--telegram"
          onClick={() => trackEvent('ClickTelegram', { source: 'mobile_menu' })}
        >
          Написать в Telegram
        </a>
      </div>

      {/* Sticky Bottom Bar for Mobile */}
      <div className="mobile-bottom-bar">
        <a
          href={tgLink('beginner')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
          onClick={() => trackEvent('ClickTelegram', { source: 'mobile_bottom_bar' })}
        >
          Узнать даты
        </a>
        <a
          href={waLink('general')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--outline"
          onClick={() => trackEvent('ClickWhatsApp', { source: 'mobile_bottom_bar' })}
        >
          Написать
        </a>
      </div>
    </>
  );
}
