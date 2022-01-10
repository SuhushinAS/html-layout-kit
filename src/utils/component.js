/**
 * Инициировать компонент.
 * @param className Имя класса.
 * @param ComponentClass Класс компонента.
 */
export function component(className, ComponentClass) {
  document.querySelectorAll(className).forEach((item) => {
    new ComponentClass(item);
  });
}
