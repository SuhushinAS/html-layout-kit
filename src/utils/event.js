/**
 * Привязать событие.
 * @param {HTMLElement} el Елемент.
 * @param {string} event Событие.
 * @param {Function} handler Обработчик.
 */
export const attachEvent = (el, event, handler) => {
  if (el && el.removeEventListener && el.addEventListener) {
    el.removeEventListener(event, handler);
    el.addEventListener(event, handler);
  } else {
    console.warn(`No el`);
  }
};
