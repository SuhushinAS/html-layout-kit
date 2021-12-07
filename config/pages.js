const fs = require('fs');
const path = require('path');

/**
 * Получить список папок.
 * @param {string} rootPath Путь.
 * @return {string[]|*[]} список папок.
 */
const getPageList = (rootPath) => (fs.statSync(rootPath).isDirectory() ? fs.readdirSync(rootPath) : []);

/**
 * Получить страницу.
 * @param {string} root Корень.
 * @param {string} folder Путь.
 * @return {string[]} Страница.
 */
const getPage = (root, folder) =>
  fs.existsSync(path.join(root, folder, 'index.js')) ? [folder.split('\\').join('/')] : [];

/**
 * Получить список папок.
 * @param {string} root Корень.
 * @param {string} folder Папка.
 * @returns {*} список папок.
 */
const pages = (root, folder = '') =>
  getPageList(path.join(root, folder)).reduce((acc, item) => {
    const pageFolder = path.join(folder, item);

    return [...acc, ...getPage(root, pageFolder), ...pages(root, pageFolder)];
  }, []);

module.exports = pages;
