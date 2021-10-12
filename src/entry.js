import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import 'style/index.less';

/**
 * Сделать импорт всего.
 * @param {*} requireContext Контекст импорта.
 * @returns {*} Импорт всего.
 */
export const requireAll = (requireContext) => requireContext.keys().map(requireContext);

/**
 * Загрузить скрипты.
 * @returns {*} скрипты.
 */
export const importScripts = () => requireAll(require.context('./pages/', true, /index\.js$/u));
