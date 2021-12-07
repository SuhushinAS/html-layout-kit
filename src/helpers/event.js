/**
 * Привязать событие.
 * @param {*} el Елемент.
 * @param {*} event Событие.
 * @param {*} handler Обработчик.
 */
export const attachEvent = (el, event, handler) => {
  if (el && el.removeEventListener && el.addEventListener) {
    el.removeEventListener(event, handler);
    el.addEventListener(event, handler);
  } else {
    console.warn(`No el`);
  }
};
