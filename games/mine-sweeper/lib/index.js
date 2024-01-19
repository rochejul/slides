'use strict';

import { mineSweeper } from './app/components/mine-sweeper.js';
import PageModel from './app/page-model.js';

mineSweeper();

PageModel.getMineSweeper().addEventListener('gameending', (event) => {
  if(event.detail.success) {
    PageModel.getApp().classList.add('app--game-finished');

  } else {
    PageModel.getApp().classList.add('app--game-over');
  }

}, false);
