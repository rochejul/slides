'use strict';

import CanvasConstants from '../constants/canvas-constants.js';

/**
 * @class Position
 * @property {number} x
 * @property {number} y
 */

/**
 * @class Dimension
 * @property {number} height
 * @property {number} width
 */

class CanvasService {
    /**
     * @param {number} height
     * @param {number} width
     * @returns {Dimension}
     */
    static getCellSize(height, width) {
        return {
            height: width / CanvasConstants.NB_COLUMNS,
            width: height / CanvasConstants.NB_ROWS
        };
    }

    /**
     * @returns {Position}
     */
    static getMiddlePosition() {
        return {
            x: Math.round(CanvasConstants.NB_COLUMNS / 2),
            y: Math.round(CanvasConstants.NB_ROWS / 2)
        };
    }

    /**
     * @param {Dimension} cellDimension
     * @param {number} cellOffsetX
     * @returns {number}
     */
    static getX(cellDimension, cellOffsetX) {
        return cellDimension.width * cellOffsetX;
    }

    /**
     * @param {Dimension} cellDimension
     * @param {Position} position
     * @returns {Position}
     */
    static getXY(cellDimension, { x: cellOffsetX, y: cellOffsetY }) {
        return {
            x: CanvasService.getX(cellDimension, cellOffsetX),
            y: CanvasService.getY(cellDimension, cellOffsetY)
        };
    }

    /**
     * @param {Dimension} cellDimension
     * @param {number} cellOffsetY
     * @returns {number}
     */
    static getY(cellDimension, cellOffsetY) {
        return cellDimension.height * cellOffsetY;
    }
}

export default CanvasService;
