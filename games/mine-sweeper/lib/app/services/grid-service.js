'use strict';

import Position from '../models/position.js';
import PositionService from './position-service.js';

/**
 * @param {Position} cellPosition
 * @param {Position[]} bombPositions
 * @param {{ NB_COLUMNS: number, NB_ROWS: number }} constants
 * @param {Position[]} cellsAlreadyRevealed
 * @returns {Position[]}
 */
function getCellsToReveal(cellPosition, bombPositions, constants, cellsAlreadyRevealed) {
  const potentialPositions = [
    new Position(cellPosition.x - 1, cellPosition.y - 1),
    new Position(cellPosition.x, cellPosition.y - 1),
    new Position(cellPosition.x + 1, cellPosition.y - 1),
    new Position(cellPosition.x - 1, cellPosition.y),
    new Position(cellPosition.x + 1, cellPosition.y),
    new Position(cellPosition.x - 1, cellPosition.y + 1),
    new Position(cellPosition.x, cellPosition.y + 1),
    new Position(cellPosition.x + 1, cellPosition.y + 1)
  ];

  const filteredPositions = potentialPositions
    .filter((position) => position.x >= 0 && position.y >= 0 && position.x < constants.NB_COLUMNS && position.y < constants.NB_ROWS)
    .filter((position) => !PositionService.isIntersect(position, cellsAlreadyRevealed));

  const emptyCells = filteredPositions.filter((position) => GridService.countBombs(position, bombPositions) === 0);
  const allEmptyCells = cellsAlreadyRevealed.concat(filteredPositions);

  if (emptyCells.length === 0) {
    return allEmptyCells;
  }

  return emptyCells.reduce(
    (cells, position) => {
      return getCellsToReveal(position, bombPositions, constants, cells);
    },
    allEmptyCells
  );
}

class GridService {
  /**
   * @param {Position} cellPosition
   * @param {Position[]} bombPositions
   * @returns {number}
   */
  static countBombs(cellPosition, bombPositions) {
    const potentialBombPositions = [
      new Position(cellPosition.x - 1, cellPosition.y - 1),
      new Position(cellPosition.x, cellPosition.y - 1),
      new Position(cellPosition.x + 1, cellPosition.y - 1),
      new Position(cellPosition.x - 1, cellPosition.y),
      new Position(cellPosition.x + 1, cellPosition.y),
      new Position(cellPosition.x - 1, cellPosition.y + 1),
      new Position(cellPosition.x, cellPosition.y + 1),
      new Position(cellPosition.x + 1, cellPosition.y + 1)
    ];

    return bombPositions.reduce(
      (inc, position) => PositionService.isIntersect(position, potentialBombPositions) ? inc + 1 : inc,
      0
    );
  }

  /**
   * @param {Position} cellPosition
   * @param {Position[]} bombPositions
   * @param {{ NB_COLUMNS: number, NB_ROWS: number }} constants
   * @returns {Position[]}
   */
  static getCellsToReveal(cellPosition, bombPositions, constants) {
    return getCellsToReveal(cellPosition, bombPositions, constants, [ cellPosition ]);
  }
}

export default GridService;
