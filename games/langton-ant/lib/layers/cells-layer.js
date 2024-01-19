'use strict';

import Layer from './layer.js';
import CanvasService from "../services/canvas-service.js";

const CELL_COLOR = '#040404';

class CellsLayer extends Layer {
    /**
     * @param {HTMLCanvasElement} domElement
     * @param {Cell[]} cells
     */
    constructor(domElement, cells) {
        super(domElement);
        this.cells = cells;
    }

    draw() {
        this.context.save();
        this.context.fillStyle = CELL_COLOR;

        this.cells
            .filter((cell) => cell.isBlack())
            .forEach((cell) => {
                const cellPosition = CanvasService.getXY(this.cellDimension, cell.getPosition());
                this.context.fillRect(cellPosition.x, cellPosition.y, this.cellDimension.width, this.cellDimension.height);
            });

        this.context.restore();
    }
}

export default CellsLayer;
