'use strict';

let keyDowns = Rx.Observable.fromEvent(document, 'keydown');
let keyUps = Rx.Observable.fromEvent(document, 'keyup');

export default Rx.Observable
    .merge(keyDowns, keyUps)
    .filter(event => event.type + (event.key || event.which));
