// @flow
import './style.less';
import {attachEvent} from 'helpers/event';
import template from './index.hbs';

/**
 * Class ExampleTimer2.
 * Класс для примера.
 */
class ExampleTimer2 extends HTMLElement {
    /**
     * Конструктор класса для примера.
     */
    constructor() {
        super();
        this.innerHTML = template({value: this.value});
        this.playEl = this.querySelector('.j-example-timer-2-play');
        this.stopEl = this.querySelector('.j-example-timer-2-stop');
        this.valueEl = this.querySelector('.j-example-timer-2-value');

        attachEvent(this.playEl, 'click', this.onPlay);
        attachEvent(this.stopEl, 'click', this.onStop);
    }

    /**
     * Обработать запуск.
     */
    onPlay = () => {
        if (this.timer) {
            this.timerPause();
        } else {
            this.timerStart();
        }
    };

    /**
     * Обработать остановку.
     */
    onStop = () => {
        this.timerStop();
    };

    /**
     * Срабатывает, когда пользовательский элемент впервые добавляется в DOM.
     */
    // connectedCallback() {}

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
     * Запустить таймер.
     */
    timerStart() {
        this.timer = setTimeout(this.tick, 1000);
    }

    /**
     * Остановить таймер.
     */
    timerPause() {
        clearTimeout(this.timer);
        delete this.timer;
    }

    /**
     * Сбросить таймер.
     */
    timerStop() {
        this.timerPause();
        this.value = 0;
    }

    /**
     * Тик таймера.
     */
    tick = () => {
        this.value++;
        this.timer = setTimeout(this.tick, 1000);
    };

    /**
     * Срабатывает, когда пользовательскому элементу добавляют, удаляют или изменяют атрибут.
     * @param {*} name Название атрибута.
     * @param {*} oldValue Старое значение.
     * @param {*} newValue Новое значение.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        this.valueEl.innerHTML = newValue;
    }

    /**
     * Получить массив атрибутов, за которыми нужно слдедить.
     * @return {string[]} Массив атрибутов, за которыми нужно слдедить.
     */
    static get observedAttributes() {
        return ['value'];
    }

    /**
     * Срабатывает, когда пользовательский элемент перемещен в новый документ.
     */
    // adoptedCallback() {}

    /**
     * Срабатывает, когда пользовательский элемент удаляется из DOM.
     */
    disconnectedCallback() {
        this.playEl.removeEventListener('click', this.onPlay);
        this.stopEl.removeEventListener('click', this.onStop);
        this.timerStop();
    }
}

customElements.define('app-example-timer-2', ExampleTimer2);
