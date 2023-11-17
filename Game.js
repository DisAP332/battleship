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
    console.log(enemyBoard.ships[0].positionsOccupied[0][0]);
    enemy.makeShot();
    enemy.makeShot();
    enemy.makeShot();
    enemy.makeShot();
    enemy.makeShot();
    enemy.makeShot();
    enemy.makeShot();
    enemy.makeShot();
    enemy.makeShot();
    enemy.makeShot();
    enemy.makeShot();
    enemy.makeShot();
    enemy.makeShot();
  }
  return { startGame };
}

Game().startGame();
