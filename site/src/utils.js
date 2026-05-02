/* Утилиты — предзаполненные сообщения, ссылки на мессенджеры */

// Telegram-юзернейм Виктора
export const TG_USERNAME = 'victordivepro';

// WhatsApp-номер (международный формат без +)
// TODO: заменить на реальный номер Виктора
export const WA_NUMBER = '84900000000';

// Instagram
export const IG_HANDLE = 'victor.divepro';

// Предзаполненные сообщения
export const MESSAGES = {
  general: 'Здравствуйте! Хочу попробовать дайвинг в Нячанге. Опыта нет, хочу понять программу, цену и ближайшие даты.',
  beginner: 'Здравствуйте! Хочу попробовать первое погружение за 95$. Опыта нет. Подскажите ближайшие даты и что входит в программу.',
  fear: 'Здравствуйте! Хочу попробовать дайвинг, но немного боюсь воды. Подскажите, как всё проходит для новичков?',
  snorkeling: 'Здравствуйте! Хочу узнать про снорклинг в Нячанге. Сколько стоит, что входит и когда можно поехать?',
  couple: 'Здравствуйте! Хочу обсудить дайвинг для пары в Нячанге. Интересует красивый формат и съёмка.',
  family: 'Здравствуйте! Хочу подобрать морскую программу для семьи в Нячанге. Интересует дайвинг и/или снорклинг.',
  course: 'Здравствуйте! Хочу узнать про обучение дайвингу и сертификат в Нячанге. Подскажите программу, сроки и стоимость.',
  funDive: 'Здравствуйте! Я сертифицированный дайвер, хочу узнать про fun dive в Нячанге. Подскажите условия и ближайшие даты.',
  private: 'Здравствуйте! Хочу обсудить индивидуальный формат дайвинга в Нячанге. Подскажите условия и стоимость.',
};

// Создать ссылку на Telegram
export function tgLink(messageKey = 'general') {
  const text = MESSAGES[messageKey] || MESSAGES.general;
  return `https://t.me/${TG_USERNAME}?text=${encodeURIComponent(text)}`;
}

// Создать ссылку на WhatsApp
export function waLink(messageKey = 'general') {
  const text = MESSAGES[messageKey] || MESSAGES.general;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Ссылка на Instagram
export function igLink() {
  return `https://www.instagram.com/${IG_HANDLE}/`;
}

// Аналитика: трекинг событий
export function trackEvent(eventName, params = {}) {
  // Google Analytics 4
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
  // Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, params);
  }
  // Yandex Metrika
  if (typeof window.ym === 'function') {
    window.ym(0, 'reachGoal', eventName, params);
  }
  // Для дебага
  console.log('[Event]', eventName, params);
}
