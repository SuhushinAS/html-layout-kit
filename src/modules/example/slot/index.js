import './style.less';
import template from './index.hbs';

/**
 * Class ExampleSlot.
 * Класс для примера.
 */
class ExampleSlot extends HTMLElement {
    /**
     * Конструктор класса для примера.
     */
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.innerHTML = template();
    }
}

customElements.define('app-example-slot', ExampleSlot);
