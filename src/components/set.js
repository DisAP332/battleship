import { createGrid } from './createGrid';
import { mouseHandler, ShipPositions } from './mouseHandler';
import { clearGameWrapper } from './clear';
import { game } from './game';

function setUp(playerName) {
  const gameWrapper = document.getElementById('gameWrapper');
  const greetingbox = document.createElement('div');
  const greeting = document.createElement('h1');
  const boatContRight = document.createElement('div');
  const boatContLeft = document.createElement('div');
  const gridWrapper = document.createElement('div');
  const setUpwrapper = document.createElement('div');
  const content = document.getElementById('content');
  const axisButton = document.createElement('button');
  const resetButton = document.createElement('resetButton');
  const confirmPosition = document.createElement('button');

  const battleshipIMG = document.createElement('div');
  const carrierIMG = document.createElement('img');
  const destroyerIMG = document.createElement('img');
  const patrolIMG = document.createElement('img');
  const subIMG = document.createElement('img');

  gridWrapper.setAttribute('id', 'gridWrapper');
  setUpwrapper.setAttribute('id', 'setUpWrapper');
  boatContLeft.setAttribute('id', 'boatContLeft');
  battleshipIMG.setAttribute('id', 'battleshipIMG');
  carrierIMG.setAttribute('id', 'carrierIMG');
  destroyerIMG.setAttribute('id', 'destroyerIMG');
  patrolIMG.setAttribute('id', 'patrolIMG');
  subIMG.setAttribute('id', 'subIMG');
  greetingbox.setAttribute('id', 'greeting');
  axisButton.setAttribute('id', 'axisBTN');
  resetButton.setAttribute('id', 'resetBtn');

  greeting.setAttribute('style', 'font-size:3rem');
  greeting.textContent = `${playerName} set your cordinates!`;
  gameWrapper.appendChild(greeting);
  gameWrapper.appendChild(setUpwrapper);

  axisButton.textContent = 'AXIS';
  resetButton.textContent = 'RESET';
  confirmPosition.textContent = 'COFIRM';

  setUpwrapper.appendChild(boatContLeft);
  boatContLeft.appendChild(battleshipIMG);
  boatContLeft.appendChild(carrierIMG);
  boatContLeft.appendChild(destroyerIMG);

  setUpwrapper.appendChild(gridWrapper);

  setUpwrapper.appendChild(boatContRight);
  boatContRight.appendChild(patrolIMG);
  boatContRight.appendChild(subIMG);

  let selectedShip = null;

  battleshipIMG.addEventListener('click', () => {
    selectedShip = 1;
    console.log('selected BATTLESHIP');
  });
  carrierIMG.addEventListener('click', () => {
    selectedShip = 2;
    console.log('selected CARRIER');
  });
  destroyerIMG.addEventListener('click', () => {
    selectedShip = 3;
    console.log('selected DESTROYER');
  });
  patrolIMG.addEventListener('click', () => {
    selectedShip = 4;
    console.log('selected PATROL BOAT');
  });

  createGrid();
  gridWrapper.appendChild(axisButton);
  gridWrapper.appendChild(resetButton);
  gridWrapper.appendChild(confirmPosition);

  resetButton.addEventListener('click', () => {
    mouseHandler(null, 'reset');
  });

  axisButton.addEventListener('click', () => {
    mouseHandler(null, 'axis');
  });

  confirmPosition.addEventListener('click', () => {
    if (ShipPositions.length === 17) {
      gameWrapper.remove();
      game();
    }
  });
}

export { setUp };
