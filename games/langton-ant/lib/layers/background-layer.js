'use strict';

import Layer from './layer.js';

const BACKGROUND_COLOR = 'white';

class BackgroundLayer extends Layer {
    draw() {
        this.context.save();
        this.context.fillStyle = BACKGROUND_COLOR;
        this.context.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.context.restore();
    }
}

export default BackgroundLayer;
