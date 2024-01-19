'use strict';

import Position from '../models/position.js';

class PositionService {
    /**
     * @param {Position} position
     * @param {Position[]} unavailablePositions
     * @return {boolean}
     */
    static isIntersect(position, unavailablePositions) {
        return !!unavailablePositions.find(unPosition => PositionService.isOnSamePosition(position, unPosition));
    }

    /**
     * @param {Position} param1
     * @param {Position} param2
     * @return {boolean}
     */
    static isOnSamePosition({ x: x1, y: y1 }, { x: x2, y: y2 }) {
        return x1 === x2 && y1 === y2;
    }
}

export default PositionService;
