import {html, LitElement} from 'lit-element';
import {Timer} from 'modules/timer/utils/timer';
import './style.less';

/**
 * Class TimerLit.
 * Класс для примера.
 */
class TimerLit extends LitElement {
  /**
   * Конструктор класса для примера.
   * @return {void}
   */
  constructor() {
    super();
    this.value = 0;
  }

  /**
   * Обработать таймер.
   * @param {*} value Значение.
   */
  onTimer = (value) => {
    this.value = value;
  };

  /**
   * По умолчанию создает Shadow Root для элемента.
   * Если использование Shadow DOM не нужно, то метод должен вернуть this.
   * @return {TimerLit} Корень.
   */
  createRenderRoot() {
    return this;
  }

  /**
   * Реализует описание DOM элемента с помощью lit-html.
   * В идеале, функция render – это чистая функция, которая использует только текущие свойства элемента.
   * Метод render() вызывается функцией update().
   * @return {*} Представление.
   */
  render() {
    return html`<button class="timer-lit__button" @click=${this.onPlay}>&#9199;</button>
      <button class="timer-lit__button" @click=${this.onStop}>&#9209;</button>
      <div class="timer-lit__value">${this.value}</div> `;
  }

  /**
   * Обработать запуск.
   */
  onPlay() {
    this.timer.toggle();
  }

  /**
   * Обработать остановку.
   */
  onStop = () => {
    this.timer.stop();
  };

  /**
   * Вызывается после первого обновления DOM элемента непосредственно перед вызовом updated().
   * Может быть полезен для захвата ссылок на визуализированные статические узлы, с которыми нужно работать напрямую, например, в updated().
   // * @param {*} changedProperties Map, содержащий ключи измененных свойств.
   */
  firstUpdated() {
    this.timer = new Timer(this.value, this.onTimer);
  }

  /**
   * Свойства.
   * @return {*} Свойства.
   */
  static get properties() {
    return {
      value: {
        type: Number,
      },
    };
  }

  /**
   * Вызывается всякий раз, когда DOM элемента обновляется и отображается.
   * Реализация для выполнения задач после обновления через API DOM, например, фокусировка на элементе.
   // * @param {*} changedProperties Map, содержащий ключи измененных свойств.
   */
  updated() {
    this.timer.value = this.value;
  }
}

customElements.define('app-timer-lit', TimerLit);
