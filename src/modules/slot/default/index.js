import template from './index.hbs';

/**
 * Class SlotDefault.
 * Класс для примера.
 */
class SlotDefault extends HTMLElement {
  /**
   * Конструктор класса для примера.
   */
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.innerHTML = template();
  }
}

customElements.define('app-slot-default', SlotDefault);
