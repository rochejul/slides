'use strict';

class WindowService {
    /**
     * @returns {number}
     */
    static getIdealHeightWidth() {
        const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        return Math.min(windowHeight, windowHeight);
    }
}

export default WindowService;
