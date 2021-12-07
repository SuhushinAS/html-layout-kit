/**
 * Таймер.
 */
export class Timer {
  /**
   * Конструктор класса для примера.
   * @param {*} value Значение.
   * @param {*} onChange Коллбэк на изменение.
   * @param {*} interval Интервал.
   */
  constructor(value, onChange, interval = 1000) {
    this.interval = interval;
    this.value = value;
    this.onChange = onChange;
  }

  interval;

  onChange;

  _timer;

  _value;

  /**
   * Получить значение.
   * @return {*} Значение.
   */
  get value() {
    return this._value;
  }

  /**
   * Задачть значение.
   * @param {*} value Значение.
   */
  set value(value) {
    const intValue = Number(value);
    if (intValue !== this._value) {
      this._value = intValue;

      if ('function' === typeof this.onChange) {
        this.onChange(intValue);
      }
    }
  }

  /**
   * Остановить таймер.
   */
  pause() {
    clearTimeout(this._timer);
    delete this._timer;
  }

  /**
   * Запустить таймер.
   */
  start() {
    this._timer = setTimeout(this.tick, this.interval);
  }

  /**
   * Сбросить таймер.
   */
  stop() {
    this.pause();
    this.value = 0;
  }

  /**
   * Тик таймера.
   */
  tick = () => {
    this.value++;
    this._timer = setTimeout(this.tick, this.interval);
  };

  /**
   * Переключить таймер.
   */
  toggle() {
    if (this._timer) {
      this.pause();
    } else {
      this.start();
    }
  }
}
