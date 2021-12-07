import {html, LitElement} from 'lit-element';
import './style.less';

/**
 * Class UserData.
 * Класс для примера.
 */
class UserData extends LitElement {
  /**
   * Свойства.
   * @return {{value: {type: *}}} Свойства.
   */
  static get properties() {
    return {
      value: {
        /**
         * Если свойство hasChanged возвращает false, элемент не обновляется.
         * Иначе планируется обновление путем вызова requestUpdate().
         * @param {*} value Значение.
         * @param oldValue Старое значение.
         * @return {boolean} Нужно ли обновиться.
         */
        // hasChanged(value, oldValue) {
        //     return true;
        // },
        type: String,
      },
    };
  }

  /**
   * Конструктор класса для примера.
   * @return {void}
   */
  constructor() {
    super();
    this.value = 'World';
  }

  /**
   * По умолчанию создает Shadow Root для элемента.
   * Если использование Shadow DOM не нужно, то метод должен вернуть this.
   * @return {UserData} Корень.
   */
  createRenderRoot() {
    return this;
  }

  /**
   * Реализуется, если необходимо контролировать обновление и рендеринг, когда были изменены свойства или вызван requestUpdate().
   * По умолчанию данный метод всегда возвращает true, но логику метода можно изменить, чтобы контролировать обновлением компонента.
   * @param {*} changedProperties Map, содержащий ключи измененных свойств.
   * @return {boolean} Нужно ли обновить?
   */
  // shouldUpdate(changedProperties) {}

  /**
   * Реализуется для контроля времени обновления, например для интеграции с планировщиком.
   */
  // performUpdate() {}

  /**
   * Вызывает render().
   * Также он выполняет обновление атрибутов элемента в соответствии со значением свойства.
   * Установка свойств внутри этого метода не вызовет другое обновление.
   * @param {*} changedProperties Map, содержащий ключи измененных свойств.
   */
  // update(changedProperties) {}

  /**
   * Вызывает запрос асинхронного обновления элемента.
   * Это следует вызывать, когда элемент должен обновляться на основе некоторого состояния, не вызванного установкой свойства.
   * @param {string} name Название.
   * @param {*} oldValue Значение.
   */

  // requestUpdate(name, oldValue) {}

  /**
   * Реализует описание DOM элемента с помощью lit-html.
   * В идеале, функция render – это чистая функция, которая использует только текущие свойства элемента.
   * Метод render() вызывается функцией update().
   * @return {*} Представление.
   */
  render() {
    return html`<div class="example-lit">${this.value}</div>`;
  }

  /**
   * Вызывается после первого обновления DOM элемента непосредственно перед вызовом updated().
   * Может быть полезен для захвата ссылок на визуализированные статические узлы, с которыми нужно работать напрямую, например, в updated().
   * @param {*} changedProperties Map, содержащий ключи измененных свойств.
   */
  // firstUpdated(changedProperties) {}

  /**
   * Вызывается всякий раз, когда DOM элемента обновляется и отображается.
   * Реализация для выполнения задач после обновления через API DOM, например, фокусировка на элементе.
   * @param {*} changedProperties Map, содержащий ключи измененных свойств.
   */
  // updated(changedProperties) {}
}

customElements.define('app-user-data', UserData);
