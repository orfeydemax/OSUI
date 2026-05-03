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
    { to: '/', label: 'Главная' },
    { to: '/beginner-diving-nha-trang', label: 'Дайвинг' },
    { to: '/snorkeling-nha-trang', label: 'Снорклинг' },
    { to: '/diving-for-couples-nha-trang', label: 'Для пары' },
    { to: '/family-diving-snorkeling-nha-trang', label: 'Для семьи' },
    { to: '/reviews', label: 'Отзывы' },
    { to: '/contacts', label: 'Контакты' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${location.pathname === '/' ? 'navbar--home' : ''}`}>
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo">
            <img src="/images/logo.jpg" alt="Victor DivePro" className="navbar__logo-img" />
          </Link>
          <div className="navbar__links">
            {links.map(l => (
              <Link key={l.to} to={l.to}>{l.label}</Link>
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
          <Link key={l.to} to={l.to}>{l.label}</Link>
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
    </>
  );
}
