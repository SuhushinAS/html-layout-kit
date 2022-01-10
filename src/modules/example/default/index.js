import {component} from 'utils/component';
import './style.less';

component(
  '.example-default',
  class {
    /**
     * Конструктор класса для примера.
     * @param {*} exampleDefault Элемент.
     * @return {void}
     */
    constructor(exampleDefault) {
      this.exampleDefault = exampleDefault;
    }
  }
);
