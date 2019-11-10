// @flow

export const template = (html: string) => (data: Object = {}) => {
    return Object.keys(data).reduce((acc, key) => acc.split(`<%${key}%>`).join(data[key] || ''), html);
};

export const getItem = (id: number) => ({data}: any) => data[id];
