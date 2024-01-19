'use strict';

class ElementService {
    /**
     * @param {HTMLElement} element
     * @returns {number}
     */
    static getIdealHeightWidth(element) {
        const { height, width } = element.getBoundingClientRect();
        return Math.min(height, width);
    }
}

export default ElementService;
