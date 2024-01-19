'use strict';

import CanvasService from "../services/canvas-service.js";

const TRANSPARENT_COLOR = 'rgba(0, 0, 0, 0)';

class Layer {
    /**
     * @param {HTMLCanvasElement} domElement
     */
    constructor(domElement) {
        this.canvasElement = domElement;
        this.context = domElement.getContext('2d');
        this.cellDimension = null;

        this.calculateCellDimension();
    }

    calculateCellDimension() {
        this.cellDimension = CanvasService.getCellSize(this.canvasElement.height, this.canvasElement.width);
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

    refresh() {
        this.calculateCellDimension();
        this.clear();
        this.draw();
    }

    /**
     * @param {number} height
     * @param {number} width
     */
    resize(height, width) {
        this.canvasElement.height = height;
        this.canvasElement.width = width;

        this.refresh();
    }
}

export default Layer;
