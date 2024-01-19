'use strict';

import BackgroundLayer from './layers/background-layer.js';
import ApplesLayer from './layers/apples-layer.js';
import SnakeLayer from './layers/snake-layer.js';

import observableWindowResize from './observables/window-resize.js';
import observableRefreshSnake from './observables/refresh-snake.js';
import observableMoveSnake from './observables/move-snake.js';

import Utils from './utils.js';

// Initialize
let applesPosition = Utils.generateApplesPosition();
let score = 0;

let backgroundLayer = new BackgroundLayer(document.querySelector('#layer-background'));
let snakeLayer = new SnakeLayer(document.querySelector('#layer-snake'));
let applesLayer = new ApplesLayer(document.querySelector('#layer-apples'), applesPosition);
let scoreElement = document.querySelector('#score');

// Methods
function resizeAll() {
    backgroundLayer.resize();
    applesLayer.resize();
    snakeLayer.resize();
}

function endGame() {
    subscribeWindowResize.unsubscribe();
    subscribeRefreshSnake.unsubscribe();
    subscribeMoveSnake.unsubscribe();
    subscribeRefreshApple.unsubscribe();
}

// Subcribers
let subscribeWindowResize = observableWindowResize.subscribe(resizeAll);

let subscribeRefreshSnake = observableRefreshSnake.subscribe(() => {
    snakeLayer.move();
    snakeLayer.refresh();

    if (Utils.isIntersect(snakeLayer, snakeLayer.body)) {
        // We have loose
        endGame();
        alert('Finished game');
    }
});

let subscribeMoveSnake = observableMoveSnake.subscribe(
    direction => {
        if (Utils.isValidDirection(direction, snakeLayer.direction)) {
            snakeLayer.directTo(direction);
        }
    },
    error => {
        console.error(error);
    }
);

let subscribeRefreshApple = observableRefreshSnake.subscribe(() => {
    let eatenAppleIndex = applesPosition.findIndex(apple => Utils.isOnSamePosition(apple, snakeLayer));

    if (eatenAppleIndex >= 0) {
        // Increment the score
        score++;
        scoreElement.innerText = score;

        // Increment the snake size
        snakeLayer.incrementBody();
        snakeLayer.refresh();

        // We should remove the eaten apple and generate a new one
        applesPosition = Utils.eatApple(applesPosition, eatenAppleIndex, snakeLayer.getSnakePosition());
        applesLayer.updateApples(applesPosition);
        applesLayer.refresh();
    }
});

// Start !
resizeAll();
