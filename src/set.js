import { createGrid } from './createGrid';

function setUp(playerName) {
  const gameWrapper = document.getElementById('gameWrapper');
  const greeting = document.createElement('div');
  greeting.setAttribute('style', 'font-size:2.8vw');
  greeting.textContent = `${playerName} set your cordinates!`;
  gameWrapper.appendChild(greeting);
  createGrid();
}

export { setUp };
