// @flow

import querystring from 'querystring';

export type TQuery = {
    [string]: mixed,
};

export function getHref(url: string, query: TQuery): string {
    const hrefParts = getHrefParts(url);
    const hrefList = [hrefParts.path];
    const search = getSearch(hrefParts.search, query);

    if (search) {
        hrefList.push(search);
    }

    return hrefList.join('?');
}

export function getHrefParts(href: string) {
    const [path, ...searchList] = href.split('?');
    return {
        path,
        search: searchList.join('?'),
    };
}

export function getSearch(search: string, query: TQuery = {}): string {
    return querystring.stringify(getQuery(search, query));
}

export function getQuery(search: string, query: TQuery = {}): TQuery {
    return getQueryClean({...querystring.parse(search), ...query});
}

export function getQueryClean(query: TQuery) {
    return Object.keys(query).reduce((prev, key) => {
        if ('undefined' !== typeof query[key]) {
            return {...prev, [key]: query[key]};
        }

        return prev;
    }, {});
}
