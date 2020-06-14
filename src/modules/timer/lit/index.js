import {Timer} from 'helpers/timer';
import {LitElement, html} from 'lit-element';
import './style.less';

/**
 * Class TimerLit.
 * Класс для примера.
 */
class TimerLit extends LitElement {
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
        return html`<button class="timer-custom__button" @click=${this.onPlay}>&#9199;</button>
            <button class="timer-custom__button" @click=${this.onStop}>&#9209;</button>
            <div class="timer-custom__value">${this.value}</div> `;
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
}

customElements.define('app-timer-lit', TimerLit);
