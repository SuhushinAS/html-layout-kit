/**
 * Получение списка.
 * @param {*} data .
 * @returns {function(*): *} .
 */
export const getList = (data) => (id) => data[id];

/**
 * Получить Идентификатор.
 * @param {*} item Элемент.
 * @returns {*} Идентификатор.
 */
export const getId = (item) => item.id;

/**
 * Получить объект.
 * @param {*} acc Аккумулятор.
 * @param {*} item Элемент.
 * @return {*} Объект.
 */
export const getData = (acc, item) => ({...acc, [getId(item)]: item});
