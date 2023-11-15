import { createGrid } from './createGrid';
import { mouseHandler, ShipPositions } from './mouseHandler';
import { clearGameWrapper } from './clear';
import { game } from './game';
import { enemyAI, enemyPositions } from './gameAI';

let playername;

function setUp(playerName) {
  playername = playerName;
  const gameWrapper = document.getElementById('gameWrapper');
  const greetingbox = document.createElement('div');
  const greeting = document.createElement('h1');
  const gridWrapper = document.createElement('div');
  const setUpwrapper = document.createElement('div');
  const axisButton = document.createElement('button');
  const resetButton = document.createElement('resetButton');
  const confirmPosition = document.createElement('button');

  gridWrapper.setAttribute('id', 'gridWrapper');
  setUpwrapper.setAttribute('id', 'setUpWrapper');
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

  setUpwrapper.appendChild(gridWrapper);

  createGrid('secondStage');
  gridWrapper.appendChild(axisButton);
  gridWrapper.appendChild(resetButton);
  gridWrapper.appendChild(confirmPosition);

  resetButton.addEventListener('click', () => {
    mouseHandler(null, 'reset', 'secondStage');
  });

  axisButton.addEventListener('click', () => {
    mouseHandler(null, 'axis', 'secondStage');
  });

  confirmPosition.addEventListener('click', () => {
    if (ShipPositions.length === 17) {
      gameWrapper.remove();
      enemyAI('choosePositions');
      console.log(enemyPositions);
      game('gameSetup');
    }
  });
}

export { playername };
export { setUp };
