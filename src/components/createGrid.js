import { mouseHandler } from './mouseHandler';

function createGrid() {
  const gridWrapper = document.getElementById('gridWrapper');
  const grid = document.createElement('div');
  grid.setAttribute('id', 'grid');

  let ship = 1;
  let max;
  let event;

  gridWrapper.appendChild(grid);

  for (let i = 1; i <= 100; i++) {
    let gridCordinate = document.createElement('div');
    let placeHolder = document.createElement('div');
    gridCordinate.value = [i];
    gridCordinate.setAttribute('id', `gridCord${[i]}`);
    placeHolder.setAttribute('id', `placeHolder${[i]}`);
    placeHolder.classList.add('placeholder');
    grid.appendChild(gridCordinate);
    gridCordinate.appendChild(placeHolder);

    gridCordinate.addEventListener('mouseover', () => {
      event = 'mouseover';
      mouseHandler(gridCordinate.value, event);
    });
    gridCordinate.addEventListener('click', () => {
      event = 'click';
      mouseHandler(gridCordinate.value, event);
    });
  }
}

export { createGrid };
