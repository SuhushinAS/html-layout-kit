import querystring from 'querystring';

/**
 * Получить адрес.
 * @param {string} url Адрес.
 * @param {*} query Параметры.
 * @returns {string} Адрес.
 */
export function getHref(url, query) {
  const hrefParts = getHrefParts(url);
  const hrefList = [hrefParts.path];
  const search = getSearch(hrefParts.search, query);

  if (search) {
    hrefList.push(search);
  }

  return hrefList.join('?');
}

/**
 * Получить части адреса.
 * @param {string} href Адрес.
 * @returns {{path: string, search: string}} Части адреса.
 */
export function getHrefParts(href) {
  const [path, ...searchList] = href.split('?');
  return {
    path,
    search: searchList.join('?'),
  };
}

/**
 * Получить параметры в строке.
 * @param {string} search Параметры в строке.
 * @param {*} query Параметры в объекте.
 * @returns {string} Параметры в строке.
 */
export function getSearch(search, query = {}) {
  return querystring.stringify(getQuery(search, query));
}

/**
 * Получить параметры в объекте.
 * @param {string} search Параметры в строке.
 * @param {*} query Параметры в объекте.
 * @returns {*} Параметры в объекте.
 */
export function getQuery(search, query = {}) {
  return getQueryClean({...querystring.parse(search), ...query});
}

/**
 * Очистить параметры.
 * @param {*} query Параметры в объекте.
 * @returns {*} Параметры в объекте.
 */
export function getQueryClean(query) {
  return Object.keys(query).reduce((prev, key) => {
    if ('undefined' !== typeof query[key]) {
      return {...prev, [key]: query[key]};
    }

    return prev;
  }, {});
}
