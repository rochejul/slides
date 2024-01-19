'use strict';

class Cell {
    /**
     * @param {Position} position
     * @param {boolean} [isBlack=false]
     */
    constructor(position, isBlack = false) {
        this.position = position;
        this.black = isBlack;
    }

    /**
     * @returns {Position}
     */
    getPosition() {
        return this.position;
    }

    /**
     * @returns {boolean}
     */
    isBlack() {
        return this.black;
    }

    toggleColor() {
        this.black = !this.black;
    }
}

export default Cell;
