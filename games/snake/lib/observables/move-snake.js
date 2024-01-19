'use strict';

import observableKeyDown from './key-down-type.js';
import observableKeyLeft from './key-left-type.js';
import observableKeyRight from './key-right-type.js';
import observableKeyUp from './key-up-type.js';

export default Rx.Observable
    .merge(
        observableKeyDown,
        observableKeyLeft,
        observableKeyRight,
        observableKeyUp
    )
    .distinctUntilChanged();
