'use strict';

class PageModel {
    /**
     * @returns {HTMLCanvasElement}
     */
    static getAntCanvas() {
        return document.querySelector('canvas[data-layer="ant"]');
    }

    /**
     * @returns {HTMLCanvasElement}
     */
    static getBackgroundCanvas() {
        return document.querySelector('canvas[data-layer="background"]');
    }

    /**
     * @returns {HTMLCanvasElement}
     */
    static getCellsCanvas() {
        return document.querySelector('canvas[data-layer="cells"]');
    }

    /**
     * @returns {HTMLElement}
     */
    static getIterationCount() {
        return document.querySelector('.app__information__iteration');
    }

    /**
     * @returns {HTMLElement}
     */
    static getRange() {
        return document.querySelector('input[type="range"]');
    }

    /**
     * @returns {HTMLElement}
     */
    static getWrapperCanvas() {
        return document.querySelector('.app__canvas-area');
    }
}

export default PageModel;
