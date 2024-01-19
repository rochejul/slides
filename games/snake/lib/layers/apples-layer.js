'use strict';

import Layer from './layer.js';

const APPLE_COLOR = 'red';

class ApplesLayer extends Layer {
    constructor(domElement, applesPosition) {
        super(domElement);

        this.applesPosition = applesPosition;
    }

    draw() {
        this.context.save();
        this.context.fillStyle = APPLE_COLOR;

        let cellSize = this.getCellSize();

        for(let apple of this.applesPosition) {
            this.context.fillRect(
                Math.floor(cellSize.width * apple.x),
                Math.floor(cellSize.height * apple.y),
                cellSize.width,
                cellSize.height
            );
        }

        this.context.restore();
    }

    updateApples(applesPosition) {
        this.applesPosition = applesPosition;
    }
}

export default ApplesLayer;
