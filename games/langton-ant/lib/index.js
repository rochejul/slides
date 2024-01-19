'use strict';

import DirectionConstants from "./constants/direction-constants.js";

import BackgroundLayer from './layers/background-layer.js';
import AntLayer from './layers/ant-layer.js';
import CellsLayer from './layers/cells-layer.js';

import ElementService from './services/element-service.js';
import AntService from './services/ant-service.js';
import CanvasService from "./services/canvas-service.js";

import PageModel from './page-model.js';
import Ant from "./models/ant.js";

// Initialize
const cells = AntService.generateCells();
const ant = new Ant(CanvasService.getMiddlePosition(), DirectionConstants.UP);
let count = 0;
let nextTickDelay = 5;

const iterationCountElement = PageModel.getIterationCount();
const rangeElement = PageModel.getRange();
const canvasWrapperElement = PageModel.getWrapperCanvas();
const backgroundLayer = new BackgroundLayer(PageModel.getBackgroundCanvas());
const cellsLayer = new CellsLayer(PageModel.getCellsCanvas(), cells);
const antLayer = new AntLayer(PageModel.getAntCanvas(), ant);
const layers = [backgroundLayer, cellsLayer, antLayer];

// Methods
function refreshApp() {
    const idealSize = ElementService.getIdealHeightWidth(canvasWrapperElement);

    for(const layer of layers) {
        layer.resize(idealSize, idealSize);
    }
}

function moveAnt() {
    if (AntService.moveAnt(ant, cells)) {
        count++;
        iterationCountElement.innerText = count;

        refreshApp();
        setTimeout(moveAnt, nextTickDelay);

    } else {
        console.info('We cannot move the ant anymore');
    }
}

// Subscribers
const ro = new ResizeObserver(refreshApp);
ro.observe(canvasWrapperElement);

rangeElement.addEventListener('input', () => nextTickDelay = rangeElement.value, false);

// Start !
refreshApp();
setTimeout(function () {
    console.info('Let\'s move the ant');
    moveAnt();
}, 2000);
