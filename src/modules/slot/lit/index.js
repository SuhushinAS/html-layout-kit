import {shadowless} from 'helpers/shadowless';
import {html, LitElement} from 'lit-element';
import './style.less';

/**
 * Class SlotLit.
 * Класс для примера.
 */
class SlotLit extends shadowless(LitElement) {
  /**
   * Реализует описание DOM элемента с помощью lit-html.
   * В идеале, функция render – это чистая функция, которая использует только текущие свойства элемента.
   * Метод render() вызывается функцией update().
   * @return {*} Представление.
   */
  render() {
    return html`<span class="slot-lit">${this.yield('', 'Default content')}</span>`;
  }
}

customElements.define('app-slot-lit', SlotLit);
