const fs = require('fs');
const path = require('path');

/**
 * Получить список папок.
 * @param {string} rootPath Путь.
 * @return {string[]|*[]} список папок.
 */
function getPageList(rootPath) {
    const stat = fs.statSync(rootPath);

    if (!stat.isDirectory()) {
        return [];
    }

    return fs.readdirSync(rootPath);
}

/**
 * Получить страницу.
 * @param {string} root Корень.
 * @param {string} folder Путь.
 * @return {string[]} Страница.
 */
function getPage(root, folder) {
    const pageIndex = path.join(root, folder, 'index.js');

    if (fs.existsSync(pageIndex)) {
        return [folder.split('\\').join('/')];
    }

    return [];
}

/**
 * Получить список папок.
 * @param {string} root Корень.
 * @param {string} folder Папка.
 * @returns {*} список папок.
 */
function pages(root, folder = '') {
    const pageList = getPageList(path.join(root, folder));

    return pageList.reduce((acc, item) => {
        const pageFolder = path.join(folder, item);

        return [...acc, ...getPage(root, pageFolder), ...pages(root, pageFolder)];
    }, []);
}

module.exports = pages;
