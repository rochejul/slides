'use strict';

import GridService from '../services/grid-service.js';
import PositionService from '../services/position-service.js';
import Position from '../models/position.js';

// For more details: https://developers.google.com/web/fundamentals/web-components/customelements
// And https://developers.google.com/web/fundamentals/web-components/best-practices

class MineSweeper extends HTMLElement {
  static get observedAttributes() {
    return ['bombs', 'columns', 'rows'];
  }

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.init();
  }

  attributeChangedCallback(/*name, oldValue, newValue*/) {
    this.init();
  }

  clickHandler(event) {
    const cellElement = event.path.find((element) => element.classList && element.classList.contains('grid__cell'));

    if(cellElement && !cellElement.classList.contains('grid__cell--open')) {
      cellElement.classList.add('grid__cell--open');

      const cellPosition = new Position(
        parseInt(cellElement.dataset.positionX, 0),
        parseInt(cellElement.dataset.positionY, 0)
      );

      if (PositionService.isIntersect(cellPosition, this.bombPositions)) {
        // You are a dead man
        cellElement.classList.add('grid__cell--bomb');
        this.dispatchEvent(new CustomEvent('gameending', {
          detail: {
            success: false,
          },
          bubbles: true,
        }));

      } else {
        const countProximityBombs = GridService.countBombs(cellPosition, this.bombPositions);

        if (countProximityBombs > 0) {
          cellElement.classList.add(`grid__cell--proximity-${countProximityBombs}`);
          cellElement.innerText = countProximityBombs;

        } else {
          GridService.getCellsToReveal(cellPosition, this.bombPositions, this.constants).forEach((position) => {
            const revealedCell = this.getGridCell(position);

            if (revealedCell) {
              revealedCell.classList.add('grid__cell--open');

              const countProximityBombs = GridService.countBombs(position, this.bombPositions);

              if (countProximityBombs > 0) {
                revealedCell.classList.add(`grid__cell--proximity-${countProximityBombs}`);
                revealedCell.innerText = countProximityBombs;
              }
            }
          });
        }

        if (this.getUnrevealedCells().length === this.constants.NB_BOMBS) {
          this.dispatchEvent(new CustomEvent('gameending', {
            detail: {
              success: true,
            },
            bubbles: true,
          }));
        }
      }
    }
  }

  connectedCallback() {
    console.log('MineSweeper element added to page.');
  }

  disconnectedCallback() {
    console.log('MineSweeper element removed to page.');
  }

  /**
   * @return {Position[]}
   */
  generateBombPositions() {
    return Array(this.constants.NB_BOMBS)
      .fill(null)
      .map(() => new Position(
        Math.floor(Math.random() * this.constants.NB_COLUMNS),
        Math.floor(Math.random() * this.constants.NB_ROWS)
      ));
  }

  /**
   * @returns {DocumentFragment}
   */
  generateCells() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < this.constants.NB_ROWS; ++i) {
      for (let j = 0; j < this.constants.NB_COLUMNS; ++j) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('grid__cell');
        cellElement.dataset.positionX = i;
        cellElement.dataset.positionY = j;
        fragment.appendChild(cellElement);
      }
    }

    return fragment;
  }

  /**
   * @param {Position} position
   * @returns {HTMLElement}
   */
  getGridCell(position) {
    return this.shadow.querySelector(`.grid__cell[data-position-x="${position.x}"][data-position-y="${position.y}"]`);
  }

  /**
   * @returns {HTMLElement[]}
   */
  getUnrevealedCells() {
    return this.shadow.querySelectorAll('.grid__cell:not(.grid__cell--open)');
  }

  init() {
    this.constants = {
      NB_BOMBS: window.parseInt(this.getAttribute('bombs'), 10),
      NB_COLUMNS: window.parseInt(this.getAttribute('columns'), 10),
      NB_ROWS: window.parseInt(this.getAttribute('rows'), 10)
    };

    this.shadow.innerHTML = '';

    const style = document.createElement('style');
    style.innerText = ` @import "lib/styling/grid.css"; `;

    const wrapper = document.createElement('div');
    wrapper.classList.add('grid');

    wrapper.appendChild(this.generateCells());
    wrapper.style['grid-template-columns'] = `repeat(${this.constants.NB_COLUMNS}, auto)`;
    wrapper.style['grid-template-rows'] = `repeat(${this.constants.NB_ROWS}, ${100 / this.constants.NB_ROWS}%)`;

    this.bombPositions = this.generateBombPositions();

    wrapper.addEventListener('contextmenu', (event) => event.preventDefault(), false);
    wrapper.addEventListener('click', this.clickHandler.bind(this), false);

    this.shadow.appendChild(style);
    this.shadow.appendChild(wrapper);
  }
}

export function mineSweeper() {
  customElements.define('mine-sweeper', MineSweeper);
}
