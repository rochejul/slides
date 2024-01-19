'use strict';

import CanvasConstants from '../constants/canvas-constants.js';

const TRANSPARENT_COLOR = 'rgba(0, 0, 0, 0)';

class Layer {
    /**
     * @param {HTMLCanvasElement} domElement
     */
    constructor(domElement) {
        this.canvasElement = domElement;
        this.context = domElement.getContext('2d');
    }

    clear() {
        this.context.save();
        this.context.fillStyle = TRANSPARENT_COLOR;
        this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.context.rect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.context.fill();
        this.context.restore();
    }

    draw() {
        console.info('Implement me');
    }

    getCellSize() {
        return {
            'height': this.canvasElement.height / CanvasConstants.NB_ROWS,
            'width': this.canvasElement.width / CanvasConstants.NB_COLUMNS
        };
    }

    refresh() {
        this.clear();
        this.draw();
    }

    resize() {
        let { height, width } = this.canvasElement.parentNode.getBoundingClientRect();
        this.canvasElement.height = height;
        this.canvasElement.width = width;

        this.refresh();
    }
}

export default Layer;
