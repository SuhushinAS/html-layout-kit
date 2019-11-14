// @flow

import {getHref} from 'helpers/href';

class Api {
    config: any;

    getJSON = (response: Response) => response.json();

    fetch = (url: string, options: any) => fetch(url, options).then(this.getJSON);

    configSave = (config: any) => {
        this.config = config;
    };

    configFetch = this.fetch('/api/v1/config').then(this.configSave);

    request = (url: string) => this.configFetch.then(() => this.fetch(this.getUrl(url)));

    getUrl(url: string) {
        return getHref(`${this.config.host}${url}`, this.getParams());
    }

    getParams() {
        return {};
    }
}

export default new Api();
