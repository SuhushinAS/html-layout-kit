import {attachEvent} from 'helpers/event';

/**
 * Сделать импорт всего.
 * @param {*} requireContext Контекст импорта.
 * @returns {*} Импорт всего.
 */
function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

attachEvent(document, 'DOMContentLoaded', () => {
    requireAll(require.context('./pages/', true, /index\.js$/u));
});

if (module.hot) {
    requireAll(require.context('./pages/', true, /index\.hbs$/u));
    requireAll(require.context('./modules/', true, /index\.hbs$/u));
}
