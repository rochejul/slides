'use strict';

import Layer from './layer.js';

import DirectionConstants from '../constants/direction-constants.js';
import CanvasConstants from '../constants/canvas-constants.js';

const SNAKE_HEAD_COLOR = 'yellow';
const SNAKE_BODY_COLOR = 'orange';

class SnakeLayer extends Layer {
    constructor(domElement) {
        super(domElement);

        this.x = 0;
        this.y = 0;
        this.direction = DirectionConstants.DOWN;
        this.body = [];
    }

    directTo(direction = DirectionConstants.DOWN) {
        this.direction = direction;
    }

    draw() {
        let cellSize = this.getCellSize();

        // Draw body
        this.context.save();
        this.context.fillStyle = SNAKE_BODY_COLOR;
        for (let position of this.body) {
            this.context.fillRect(
                Math.floor(cellSize.width * position.x),
                Math.floor(cellSize.height * position.y),
                cellSize.width,
                cellSize.height
            );
        }
        this.context.restore();

        // Draw head
        this.context.save();
        this.context.fillStyle = SNAKE_HEAD_COLOR;
        this.context.fillRect(
            Math.floor(cellSize.width * this.x),
            Math.floor(cellSize.height * this.y),
            cellSize.width,
            cellSize.height
        );
        this.context.restore();
    }

    getSnakePosition() {
        return this.body.concat({ x: this.x, y: this.y })
    }

    incrementBody() {
        let clonedPosition = { ...(this.body.length === 0 ? { x: this.x, y: this.y } : this.body[0]) };

        switch(this.direction) {
            case DirectionConstants.DOWN:
                clonedPosition.y -= 1;
                break;

            case DirectionConstants.UP:
                clonedPosition.y += 1;
                break;

            case DirectionConstants.RIGHT:
                clonedPosition.x -= 1;
                break;

            case DirectionConstants.LEFT:
                clonedPosition.x += 1;
                break;
        }

        if (clonedPosition.y < 0) {
            clonedPosition.y = CanvasConstants.NB_ROWS;

        } else if (this.y > CanvasConstants.NB_ROWS) {
            clonedPosition.y = 0;
        }

        if (clonedPosition.x < 0) {
            clonedPosition.x = CanvasConstants.NB_COLUMNS;

        } else if (this.x > CanvasConstants.NB_COLUMNS) {
            clonedPosition.x = 0;
        }

        this.body.unshift(clonedPosition);
    }

    move() {
        for (let i = 0, position; i < this.body.length; ++i) {
            position = this.body[i];

            if (i === this.body.length - 1) {
                position.x = this.x;
                position.y = this.y;

            } else {
                position.x = this.body[i + 1].x;
                position.y = this.body[i + 1].y;
            }
        }

        switch(this.direction) {
            case DirectionConstants.DOWN:
                this.y = this.y + 1 > CanvasConstants.NB_ROWS ? 0 : this.y + 1;
                break;

            case DirectionConstants.UP:
                this.y = this.y - 1 < 0 ? CanvasConstants.NB_ROWS : this.y - 1;
                break;

            case DirectionConstants.RIGHT:
                this.x = this.x + 1 > CanvasConstants.NB_COLUMNS ? 0 : this.x + 1;
                break;

            case DirectionConstants.LEFT:
                this.x = this.x - 1 < 0 ? CanvasConstants.NB_COLUMNS : this.x - 1;
                break;
        }
    }
}

export default SnakeLayer;
