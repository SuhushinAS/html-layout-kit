import {Timer} from 'modules/timer/utils/timer';
import {attachEvent} from 'utils/event';
import template from './index.hbs';
import './style.less';

/**
 * Class TimerCustom.
 * Класс для примера.
 */
class TimerCustom extends HTMLElement {
  /**
   * Получить массив атрибутов, за которыми нужно слдедить.
   * @return {string[]} Массив атрибутов, за которыми нужно слдедить.
   */
  static get observedAttributes() {
    return ['value'];
  }

  /**
   * Конструктор класса для примера.
   */
  constructor() {
    super();
    const value = Number(this.getAttribute('value')) || 0;

    this.innerHTML = template({value});
    this.timer = new Timer(value, this.onTimer);

    attachEvent(this, 'click', this.onClick);
  }

  /**
   * Обработать таймер.
   * @param {*} value Значение.
   */
  onTimer = (value) => {
    this.setAttribute('value', value);
  };

  /**
   * Обработать клик.
   * @param {*} e Событие.
   */
  onClick = (e) => {
    if (e.target.classList.contains('j-timer-custom-play')) {
      this.timer.toggle();
    }
    if (e.target.classList.contains('j-timer-custom-stop')) {
      this.timer.stop();
    }
  };

  /**
   * Срабатывает, когда пользовательскому элементу добавляют, удаляют или изменяют атрибут.
   * @param {*} name Название атрибута.
   * @param {*} oldValue Старое значение.
   * @param {*} value Новое значение.
   */
  attributeChangedCallback(name, oldValue, value) {
    this.innerHTML = template({value});
    this.timer.value = value;
  }

  /**
   * Срабатывает, когда пользовательский элемент удаляется из DOM.
   */
  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);
    this.timer.stop();
  }
}

customElements.define('app-timer-custom', TimerCustom);
