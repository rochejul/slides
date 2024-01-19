'use strict';

import SnakeConstants from '../constants/snake-constants.js';

export default Rx.Observable.interval(SnakeConstants.SNAKE_SPEED, Rx.Scheduler.timeout);
