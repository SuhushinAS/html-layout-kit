import template from './index.hbs';
import './style.less';

/**
 * Class ExampleCustom.
 * Класс для примера.
 */
class ExampleCustom extends HTMLElement {
  /**
   * Конструктор класса для примера.
   */
  constructor() {
    super();
    this.innerHTML = template({value: this.value});
  }

  /**
   * Получить значение.
   * @return {number} Значение.
   */
  get value() {
    return Number(this.getAttribute('value')) || 0;
  }

  /**
   * Задачть значение.
   * @param value Значение.
   */
  set value(value) {
    this.setAttribute('value', value);
  }

  /**
   * Срабатывает, когда пользовательский элемент впервые добавляется в DOM.
   */
  // connectedCallback() {}

  /**
   * Срабатывает, когда пользовательскому элементу добавляют, удаляют или изменяют атрибут.
   * @param {*} name Название атрибута.
   * @param {*} oldValue Старое значение.
   * @param {*} newValue Новое значение.
   */
  // attributeChangedCallback(name, oldValue, newValue) {
  //     console.log({name, newValue, oldValue});
  // }

  /**
   * Получить массив атрибутов, за которыми нужно слдедить.
   * @return {string[]} Массив атрибутов, за которыми нужно слдедить.
   */
  // static get observedAttributes() {
  //     return [];
  // }

  /**
   * Срабатывает, когда пользовательский элемент перемещен в новый документ.
   */
  // adoptedCallback() {}

  /**
   * Срабатывает, когда пользовательский элемент удаляется из DOM.
   */
  // disconnectedCallback() {}
}

customElements.define('app-example-custom', ExampleCustom);
