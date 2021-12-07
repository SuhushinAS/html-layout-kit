import {render} from 'lit-html';

/**
 * Включить слоты без Shadow DOM.
 * @param Base Базовый класс.
 * @return {*} Базовый с поддержкой слотов.
 */
export const shadowless = (Base) =>
  class extends Base {
    static render = render;

    templateMap = new Map();

    /**
     * Отключить Shadow DOM.
     * @return {*} Компонент.
     */
    createRenderRoot() {
      return this;
    }

    /**
     * Получить слот для шаблона.
     * @param {*} template Шаблона.
     * @return {string} слот для шаблона.
     */
    getSlotForTemplate(template) {
      return template.contentFor || template.getAttribute('content-for') || '';
    }

    /**
     * Проверить ноду на пустоту.
     * @param {*} child Нода.
     * @return {boolean} Пустая ли нода.
     */
    isEmptyTextNode(child) {
      return child instanceof Text && (!child.textContent || !child.textContent.trim());
    }

    /**
     * Сохранить шаблоны.
     */
    saveTemplates() {
      const childNodes = [];

      Array.from(this.childNodes).forEach((child) => {
        if (child instanceof HTMLTemplateElement) {
          const slot = this.getSlotForTemplate(child);

          if (!this.templateMap.has(slot)) {
            this.templateMap.set(slot, child);
          }
        } else {
          childNodes.push(child);
        }
      });

      const shouldSlotChildren = 2 < childNodes.length || childNodes.some((child) => !this.isEmptyTextNode(child));

      if (shouldSlotChildren) {
        const fragment = document.createDocumentFragment();

        childNodes.forEach((child) => {
          fragment.appendChild(child);
        });

        this.templateMap.set('', fragment);
      }
    }

    /**
     * Вызывается всякий раз, когда DOM элемента обновляется и отображается.
     * Реализация для выполнения задач после обновления через API DOM, например, фокусировка на элементе.
     * @param {*} changedProperties Map, содержащий ключи измененных свойств.
     */
    update(changedProperties) {
      if (!this.hasUpdated) {
        this.saveTemplates();
      }

      super.update(changedProperties);
    }

    /**
     * Получить содержимое для слота.
     * @param {string} slot Название слота.
     * @param {*} defaultContent Содержимое по-умолчанию, если шаблон не найден.
     * @return {*} Содержимое для слота.
     */
    yield(slot = '', defaultContent) {
      const slotContent = this.templateMap.get(slot);

      if (slotContent instanceof HTMLTemplateElement) {
        return slotContent.content;
      }

      if (slotContent instanceof DocumentFragment) {
        return slotContent;
      }

      return defaultContent;
    }
  };
