import { ShipPositions, hits } from './mouseHandler';
import { createGrid } from './createGrid';
import { enemyPositions, enemyAI } from './gameAI';
import { playername } from './set';

let playerhits = 0;
let computerHit = 0;

function win(winner) {
  let gridWrapper = document.getElementById('gridWrapper');
  gridWrapper.remove();
  let content = document.getElementById('content');
  let winText = document.createElement('div');
  winText.setAttribute('id', 'winText');
  winText.textContent = `THE WINNER IS ${winner}`;
  content.appendChild(winText);
}

function game(action) {
  if (action === 'gameSetup') {
    const gridWrapper = document.createElement('div');
    const content = document.getElementById('content');
    gridWrapper.setAttribute('id', 'gridWrapper');
    content.appendChild(gridWrapper);
    createGrid('thirdStage');
  }
  if (action === 'playerHit') {
    playerhits += 1;
    if (playerhits >= 17) {
      win(playername);
    }
  }
  if (action === 'computerHit') {
    computerHit += 1;
    if (computerHit >= 17) {
      win('COMPUTER');
    }
  }
}

export { game };
