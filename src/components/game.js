import { ShipPositions } from './mouseHandler';
import { createGrid } from './createGrid';

function game() {
  const gridWrapper = document.createElement('div');
  const content = document.getElementById('content');
  gridWrapper.setAttribute('id', 'gridWrapper');
  content.appendChild(gridWrapper);
  createGrid();
}

export { game };
