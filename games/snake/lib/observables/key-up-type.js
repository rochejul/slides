'use strict';

import DirectionConstants from '../constants/direction-constants.js';

import observableKeyType from './key-type.js';

export default observableKeyType
    .filter(event => event.keyCode === 38)
    .map(() => DirectionConstants.UP);