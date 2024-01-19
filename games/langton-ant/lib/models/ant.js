'use strict';

import CanvasConstants from '../constants/canvas-constants.js';
import DirectionConstants from "../constants/direction-constants.js";

class Ant {
    /**
     * @param {Position} position
     * @param {DirectionConstants} direction;
     */
    constructor(position, direction) {
        this.position = position;
        this.direction = direction;
    }

    /**
     * @returns {DirectionConstants}
     */
    getDirection() {
        return this.direction;
    }

    /**
     * @returns {Position}
     */
    getPosition() {
        return this.position;
    }

    /**
     * @param {boolean} onABlackCell
     * @returns {boolean} True if ant moved
     */
    move(onABlackCell) {
        let xInc = 0;
        let yInc = 0;
        let nextDirection = this.direction;

        if (onABlackCell) {
            // Right rotate
            switch (this.direction) {
                case DirectionConstants.DOWN:
                    nextDirection = DirectionConstants.LEFT;
                    xInc = -1;
                    break;

                case DirectionConstants.LEFT:
                    nextDirection = DirectionConstants.UP;
                    yInc = -1;
                    break;

                case DirectionConstants.RIGHT:
                    nextDirection = DirectionConstants.DOWN;
                    yInc = 1;
                    break;

                default:
                    nextDirection = DirectionConstants.RIGHT;
                    xInc = 1;
                    break;
            }

        } else {
            // Left rotate
            switch (this.direction) {
                case DirectionConstants.DOWN:
                    nextDirection = DirectionConstants.RIGHT;
                    xInc = 1;
                    break;

                case DirectionConstants.LEFT:
                    nextDirection = DirectionConstants.DOWN;
                    yInc = 1;
                    break;

                case DirectionConstants.RIGHT:
                    nextDirection = DirectionConstants.UP;
                    yInc = -1;
                    break;

                default:
                    nextDirection = DirectionConstants.LEFT;
                    xInc = -1;
                    break;
            }
        }

        const x = this.position.x + xInc;
        const y = this.position.y + yInc;

        if (x < 0 || y < 0 || x >= CanvasConstants.NB_COLUMNS || y >= CanvasConstants.NB_ROWS) {
            return false
        }

        this.direction = nextDirection;
        this.position.x = x;
        this.position.y = y;

        return true;
    }
}

export default Ant;
