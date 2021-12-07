import template from './index.hbs';

/**
 * Class SlotName.
 * Класс для примера.
 */
class SlotName extends HTMLElement {
  /**
   * Конструктор класса для примера.
   */
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.innerHTML = template();
  }
}

customElements.define('app-slot-name', SlotName);
