import './style.less';

/**
 * Class ExampleDefault.
 * Класс для примера.
 */
class ExampleDefault {
  /**
   * Конструктор класса для примера.
   * @param {*} exampleDefault Элемент.
   * @return {void}
   */
  constructor(exampleDefault) {
    this.exampleDefault = exampleDefault;
  }
}

const exampleDefaultList = document.querySelectorAll('.j-example-default');

exampleDefaultList.forEach((exampleDefault) => {
  new ExampleDefault(exampleDefault);
});
