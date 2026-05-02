import { useEffect } from 'react';
import { trackEvent } from '../utils';
import CtaFinal from '../components/CtaFinal';

const reviewGroups = [
  {
    title: 'Новички',
    items: [
      { text: 'Боялась воды всю жизнь, но Виктор так спокойно всё объяснил, что я даже не заметила, как оказалась под водой. Это был лучший день отпуска!', author: 'Анна' },
      { text: 'Первый раз в жизни нырнул с аквалангом. Виктор всё объяснил, не торопил, был рядом. Ощущения невероятные!', author: 'Сергей' },
      { text: 'Не умею плавать от слова совсем. Думала, откажут. Но Виктор сказал — это нормально, и провёл всё погружение рядом. Я справилась!', author: 'Мария' },
    ],
  },
  {
    title: 'Страх воды',
    items: [
      { text: 'У меня была паника при мысли о глубине. Виктор не давил, дал время привыкнуть. В итоге я нырнула и увидела такую красоту, что забыла про страх.', author: 'Ольга' },
      { text: 'Боялся дышать через регулятор. Виктор показал всё на суше, потом в мелкой воде, потом уже погружение. Никакого стресса.', author: 'Алексей' },
    ],
  },
  {
    title: 'Пары',
    items: [
      { text: 'Дайвинг подарили мужу на день рождения. Виктор организовал всё идеально — и погружение, и съёмку. Муж до сих пор пересматривает видео.', author: 'Екатерина' },
      { text: 'Делал предложение под водой с помощью Виктора. Всё прошло как в кино. Она сказала да!', author: 'Игорь' },
    ],
  },
  {
    title: 'Семьи',
    items: [
      { text: 'Приехали семьёй — дети на снорклинг, мы с женой на дайвинг. Все довольны, организация на высоте.', author: 'Дмитрий' },
      { text: 'Дочке 12 лет, она хотела попробовать. Виктор подобрал формат, объяснил всё ей отдельно. Ребёнок в восторге.', author: 'Наталья' },
    ],
  },
  {
    title: 'Обучение',
    items: [
      { text: 'Прошёл курс Open Water Diver у Виктора. Всё на русском, понятно, без лишней воды (каламбур). Сертификат получил, теперь ныряю по всему миру.', author: 'Павел' },
      { text: 'Обучение было интенсивным, но Виктор объяснял всё терпеливо. Чувствуешь себя уверенно после курса.', author: 'Светлана' },
    ],
  },
];

export default function ReviewsPage() {
  useEffect(() => {
    trackEvent('ViewContent', { page: 'reviews' });
    document.title = 'Отзывы о дайвинге с Виктором в Нячанге | Victor DivePro';
  }, []);

  return (
    <>
      <section className="section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <div className="section__header">
            <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)' }}>
              Что говорят те, кто тоже боялся в первый раз
            </h1>
            <p className="section__subtitle">
              Реальные отзывы клиентов Victor DivePro — новички, пары, семьи и ученики.
            </p>
          </div>

          {reviewGroups.map((group, gi) => (
            <div key={gi} style={{ marginBottom: '56px' }}>
              <h2 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>{group.title}</h2>
              <div className="reviews-grid">
                {group.items.map((r, ri) => (
                  <div key={ri} className="review-card">
                    <div className="review-card__stars">★★★★★</div>
                    <p className="review-card__text">«{r.text}»</p>
                    <div className="review-card__author">{r.author}</div>
                    <span className="review-card__tag">{group.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaFinal messageKey="general" />
    </>
  );
}
