import { useState } from 'react';
import { trackEvent } from '../utils';

export default function FaqSection({ items, id }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    const newIndex = openIndex === i ? null : i;
    setOpenIndex(newIndex);
    if (newIndex !== null) {
      trackEvent('FAQOpen', { question: items[i].q });
    }
  };

  return (
    <section className="section" id={id || 'faq'}>
      <div className="container">
        <div className="section__header">
          <h2>Частые вопросы</h2>
        </div>
        <div className="faq-list">
          {items.map((item, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
              <button className="faq-item__q" onClick={() => toggle(i)}>
                {item.q}
                <span className="faq-item__icon">+</span>
              </button>
              <div className="faq-item__a">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
