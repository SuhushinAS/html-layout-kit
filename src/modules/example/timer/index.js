import './style.less';
import {attachEvent} from 'helpers/event';
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
        this.innerHTML = template({value: this.value});
        attachEvent(this, 'click', this.onClick);
    }

    /**
     * Обработать клик.
     * @param {*} e Событие.
     */
    onClick = (e) => {
        if (e.target.classList.contains('j-example-timer-play')) {
            this.onPlay();
        }
        if (e.target.classList.contains('j-example-timer-stop')) {
            this.onStop();
        }
    };

    /**
     * Обработать запуск.
     */
    onPlay() {
        if (this.timer) {
            this.timerPause();
        } else {
            this.timerStart();
        }
    }

    /**
     * Обработать остановку.
     */
    onStop() {
        this.timerStop();
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
        this.innerHTML = template({value: newValue});
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
        this.timerStop();
    }
}

customElements.define('app-example-timer', ExampleTimer);
