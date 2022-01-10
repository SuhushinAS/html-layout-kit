import {importScripts, requireAll} from 'entry';
import {attachEvent} from 'utils/event';

attachEvent(document, 'DOMContentLoaded', importScripts);

if (module.hot) {
  requireAll(require.context('./pages/', true, /template\.js$/u));

  module.hot.accept('entry', importScripts);
}
