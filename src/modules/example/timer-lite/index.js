import './style.less';
import {attachEvent} from 'helpers/event';
import template from './index.hbs';

/**
 * Class ExampleTimerLite.
 * Класс для примера.
 */
class ExampleTimerLite extends HTMLElement {
    /**
     * Конструктор класса для примера.
     */
    constructor() {
        super();
        this.innerHTML = template({value: this.value});
        this.playEl = this.querySelector('.j-example-timer-lite-play');
        this.stopEl = this.querySelector('.j-example-timer-lite-stop');
        this.valueEl = this.querySelector('.j-example-timer-lite-value');

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
        this.valueEl.innerHTML = value;
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
     * Срабатывает, когда пользовательский элемент удаляется из DOM.
     */
    disconnectedCallback() {
        this.playEl.removeEventListener('click', this.onPlay);
        this.stopEl.removeEventListener('click', this.onStop);
        this.timerStop();
    }
}

customElements.define('app-example-timer-lite', ExampleTimerLite);
