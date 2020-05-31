// @flow
import './style.less';

/**
 * Class Example.
 * Класс для примера.
 */
class Example {
    /**
     * Конструктор класса для примера.
     * @param {*} example Элемент.
     * @return {void}
     */
    constructor(example) {
        this.example = example;
    }
}

const exampleList = document.querySelectorAll('.j-example');

exampleList.forEach((example) => {
    new Example(example);
});
