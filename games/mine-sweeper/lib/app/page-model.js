'use strict';

class PageModel {
  /**
   * @returns {HTMLElement}
   */
  static getApp() {
    return document.querySelector('.app');
  }

  static getMineSweeper() {
    return document.querySelector('mine-sweeper');
  }
}

export default PageModel;
