'use strict';

import CanvasConstants from './constants/canvas-constants.js';
import SnakeConstants from './constants/snake-constants.js';
import DirectionConstants from './constants/direction-constants.js';

import Apple from './models/apple.js';

const AVAILABLE_POSITIONS = [];
for (let i = 0; i < CanvasConstants.NB_ROWS; ++i) {
    for (let j = 0; j < CanvasConstants.NB_COLUMNS; ++j) {
        AVAILABLE_POSITIONS.push({ 'x': i, 'y': j });
    }
}

class Utils {
    /**
     * @method {Apple[]} applesPosition
     * @method {number} eatenAppleIndex
     * @method {Position[]} unavailablePositions
     * @return {Apple[]}
     */
    static eatApple(applesPosition, eatenAppleIndex, unavailablePositions) {
        let clonedApplesPosition = [...applesPosition];
        clonedApplesPosition.splice(eatenAppleIndex, 1);

        if (unavailablePositions.length === 0) {
            clonedApplesPosition.push(new Apple(
                Math.floor(Math.random() * CanvasConstants.NB_COLUMNS),
                Math.floor(Math.random() * CanvasConstants.NB_ROWS)
            ));

        } else {
            let difference = AVAILABLE_POSITIONS
                .filter(position => !unavailablePositions.find(unPosition => position.x === unPosition.x && position.y === unPosition.y));

            let position = difference[Math.floor(Math.random() * difference.length)];

            clonedApplesPosition.push(new Apple(position.x, position.y));
        }


        return clonedApplesPosition;
    }

    /**
     * @return {Apple[]}
     */
    static generateApplesPosition() {
        return Array(SnakeConstants.NB_APPLES)
            .fill(null)
            .map(() => new Apple(
                Math.floor(Math.random() * CanvasConstants.NB_COLUMNS),
                Math.floor(Math.random() * CanvasConstants.NB_ROWS)
            ));
    }

    /**
     * @param {Position} position
     * @param {Position[]} unavailablePositions
     * @return {boolean}
     */
    static isIntersect(position, unavailablePositions) {
        return !!unavailablePositions.find(unPosition => Utils.isOnSamePosition(position, unPosition));
    }

    /**
     * @param {Position} param1
     * @param {Position} param2
     * @return {boolean}
     */
    static isOnSamePosition({ x: x1, y: y1 }, { x: x2, y: y2 }) {
        return x1 === x2 && y1 === y2;
    }

    /**
     * @param {DirectionConstants} previousDirection
     * @param {DirectionConstants} newDirection
     * @return {boolean}
     */
    static isValidDirection(previousDirection, newDirection) {
        if (!previousDirection) {
            return true;
        }

        return !((previousDirection === DirectionConstants.LEFT && newDirection === DirectionConstants.RIGHT)
            || (newDirection === DirectionConstants.LEFT && previousDirection === DirectionConstants.RIGHT)
            || (previousDirection === DirectionConstants.UP && newDirection === DirectionConstants.DOWN)
            || (newDirection === DirectionConstants.UP && previousDirection === DirectionConstants.DOWN))
    }
}

export default Utils;
