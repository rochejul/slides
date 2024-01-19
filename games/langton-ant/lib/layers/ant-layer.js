'use strict';

import Layer from './layer.js';

import CanvasService from '../services/canvas-service.js';

import DirectionConstants from '../constants/direction-constants.js';

const ANT_COLOR = '#D42434';

class AntLayer extends Layer {
    /**
     * @param {HTMLCanvasElement} domElement
     * @param {Ant} ant
     */
    constructor(domElement, ant) {
        super(domElement);
        this.ant = ant;
    }

    draw() {
        const basePosition = CanvasService.getXY(this.cellDimension, this.ant.getPosition());
        const halfCellHeight = this.cellDimension.height / 2;
        const halfCellWidth = this.cellDimension.width / 2;

        this.context.save();
        this.context.fillStyle = ANT_COLOR;
        this.context.beginPath();

        switch(this.ant.getDirection()) {
            case DirectionConstants.DOWN:
                this.context.moveTo(basePosition.x, basePosition.y);
                this.context.lineTo(basePosition.x + this.cellDimension.width, basePosition.y);
                this.context.lineTo(basePosition.x + halfCellWidth, basePosition.y + this.cellDimension.height);
                break;

            case DirectionConstants.LEFT:
                this.context.moveTo(basePosition.x, basePosition.y + halfCellHeight);
                this.context.lineTo(basePosition.x + this.cellDimension.width, basePosition.y);
                this.context.lineTo(basePosition.x + this.cellDimension.width, basePosition.y + this.cellDimension.height);
                break;

            case DirectionConstants.RIGHT:
                this.context.moveTo(basePosition.x, basePosition.y);
                this.context.lineTo(basePosition.x + this.cellDimension.width, basePosition.y + halfCellHeight);
                this.context.lineTo(basePosition.x, basePosition.y + this.cellDimension.height);
                break;

            default:
                this.context.moveTo(basePosition.x + halfCellWidth, basePosition.y);
                this.context.lineTo(basePosition.x + this.cellDimension.width, basePosition.y + this.cellDimension.height);
                this.context.lineTo(basePosition.x, basePosition.y + this.cellDimension.height);
                break;
        }

        this.context.fill();
        this.context.restore();
    }

    /**
     * @returns {Ant}
     */
    getAnt() {
        return this.ant;
    }
}

export default AntLayer;
