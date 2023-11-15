import enemyAI from "./enemyAI.js";
import createBoard from "./board.js";

function Game() {
  const playerBoard = createBoard();
  const enemyBoard = createBoard();
  const enemy = enemyAI(enemyBoard, playerBoard);
  const player = enemyAI(playerBoard, enemyBoard);
  function startGame() {
    enemy.placeShips();
    player.placeShips();
    enemy.makeShot();
    player.makeShot();
    enemy.makeShot();
    player.makeShot();
    enemy.makeShot();
    player.makeShot();
    enemy.makeShot();
    player.makeShot();
    enemy.makeShot();
    player.makeShot();
    enemy.placeShips();
    player.placeShips();
    enemy.makeShot();
    player.makeShot();
    enemy.makeShot();
    player.makeShot();
    enemy.makeShot();
    player.makeShot();
    enemy.makeShot();
    player.makeShot();
    enemy.makeShot();
    player.makeShot();
  }
  return { startGame };
}

Game().startGame();
