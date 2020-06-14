import './style.less';
import {attachEvent} from 'helpers/event';
import {Timer} from 'helpers/timer';
import template from './index.hbs';

/**
 * Class ExampleTimer.
 * Класс для примера.
 */
class ExampleTimer extends HTMLElement {
    /**
     * Конструктор класса для примера.
     */
    constructor() {
        super();
        const value = Number(this.getAttribute('value')) || 0;

        this.innerHTML = template({value});
        this.timer = new Timer(value, this.handleTimer);

        attachEvent(this, 'click', this.onClick);
    }

    /**
     * Обработать таймер.
     * @param {*} value Значение.
     */
    handleTimer = (value) => {
        this.setAttribute('value', value);
    };

    /**
     * Обработать клик.
     * @param {*} e Событие.
     */
    onClick = (e) => {
        if (e.target.classList.contains('j-example-timer-play')) {
            this.timer.toggle();
        }
        if (e.target.classList.contains('j-example-timer-stop')) {
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
    }

    /**
     * Получить массив атрибутов, за которыми нужно слдедить.
     * @return {string[]} Массив атрибутов, за которыми нужно слдедить.
     */
    static get observedAttributes() {
        return ['value'];
    }

    /**
     * Срабатывает, когда пользовательский элемент удаляется из DOM.
     */
    disconnectedCallback() {
        this.removeEventListener('click', this.onClick);
        this.timer.stop();
    }
}

customElements.define('app-example-timer', ExampleTimer);
