import {Timer} from 'modules/timer/utils/timer';
import {attachEvent} from 'utils/event';
import template from './index.hbs';
import './style.less';

/**
 * Class TimerLite.
 * Класс для примера.
 */
class TimerLite extends HTMLElement {
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
    this.playEl = this.querySelector('.j-timer-lite-play');
    this.stopEl = this.querySelector('.j-timer-lite-stop');
    this.valueEl = this.querySelector('.j-timer-lite-value');
    this.timer = new Timer(value, this.onTimer);

    attachEvent(this.playEl, 'click', this.onPlay);
    attachEvent(this.stopEl, 'click', this.onStop);
  }

  /**
   * Обработать таймер.
   * @param {*} value Значение.
   */
  onTimer = (value) => {
    this.setAttribute('value', value);
  };

  /**
   * Обработать запуск.
   */
  onPlay = () => {
    this.timer.toggle();
  };

  /**
   * Обработать остановку.
   */
  onStop = () => {
    this.timer.stop();
  };

  /**
   * Срабатывает, когда пользовательскому элементу добавляют, удаляют или изменяют атрибут.
   * @param {*} name Название атрибута.
   * @param {*} oldValue Старое значение.
   * @param {*} value Новое значение.
   */
  attributeChangedCallback(name, oldValue, value) {
    this.valueEl.innerHTML = value;
    this.timer.value = value;
  }

  /**
   * Срабатывает, когда пользовательский элемент удаляется из DOM.
   */
  disconnectedCallback() {
    this.playEl.removeEventListener('click', this.onPlay);
    this.stopEl.removeEventListener('click', this.onStop);
    this.timer.stop();
  }
}

customElements.define('app-timer-lite', TimerLite);
