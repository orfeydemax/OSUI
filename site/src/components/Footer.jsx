import { Link } from 'react-router-dom';
import { tgLink, waLink, igLink } from '../utils';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <div className="footer__brand">
              <img src="/images/logo.jpg" alt="Victor DivePro" style={{ height: '56px', borderRadius: '8px' }} />
            </div>
            <p className="footer__desc">
              Персональный дайвинг и снорклинг в Нячанге с русскоговорящим инструктором.
              Для новичков, пар, семей и опытных дайверов.
            </p>
          </div>
          <div>
            <div className="footer__title">Программы</div>
            <ul className="footer__list">
              <li><Link to="/beginner-diving-nha-trang">Дайвинг для новичков</Link></li>
              <li><Link to="/snorkeling-nha-trang">Снорклинг</Link></li>
              <li><Link to="/diving-for-couples-nha-trang">Для пар</Link></li>
              <li><Link to="/family-diving-snorkeling-nha-trang">Для семей</Link></li>
              <li><Link to="/diving-courses-nha-trang">Обучение</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer__title">О нас</div>
            <ul className="footer__list">
              <li><Link to="/about-victor">О Викторе</Link></li>
              <li><Link to="/reviews">Отзывы</Link></li>
              <li><Link to="/contacts">Контакты</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer__title">Связаться</div>
            <ul className="footer__list">
              <li><a href={tgLink('general')} target="_blank" rel="noopener noreferrer">Telegram</a></li>
              <li><a href={waLink('general')} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href={igLink()} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__copy">
          &copy; {new Date().getFullYear()} Victor DivePro. Нячанг, Вьетнам.
        </div>
      </div>
    </footer>
  );
}
