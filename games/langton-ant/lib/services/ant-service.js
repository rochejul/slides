'use strict';

import CanvasConstants from '../constants/canvas-constants.js';

import Cell from '../models/cell.js';

class AntService {
    /**
     * @returns {Cell[]}
     */
    static generateCells() {
        const cells = [];
        let index = 0;

        for (let y = 0; y < CanvasConstants.NB_ROWS; ++y) {
            for (let x = 0; x < CanvasConstants.NB_COLUMNS; ++x) {
                cells[index] = new Cell({ x, y });
                index++;
            }
        }

        return cells;
    }

    /**
     * @param {Ant} ant
     * @param {Cell[]} cells
     * @returns {boolean} True if ant moved
     */
    static moveAnt(ant, cells) {
        const findAntCell = cells.find((cell) => ant.position.x === cell.position.x && ant.position.y === cell.position.y);

        if (findAntCell) {
            const couldMove = ant.move(findAntCell.isBlack());
            findAntCell.toggleColor();
            return couldMove;
        }

        return false;
    }
}

export default AntService;
