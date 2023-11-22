import Player from "./player.js";
import createBoard from "./board.js";

const playerBoard = createBoard();
const enemyBoard = createBoard();

const player = Player(playerBoard, enemyBoard);

test("place ship test", () => {
  // to test we will place a ship at position 0, orientation x, size 5.
  // this will be the carrier
  player.placeShip(0, "x", 5);

  // check placement
  expect(playerBoard.board[0].isShip).toBe(true);
  expect(playerBoard.board[1].isShip).toBe(true);
  expect(playerBoard.board[2].isShip).toBe(true);
  expect(playerBoard.board[3].isShip).toBe(true);
  expect(playerBoard.board[4].isShip).toBe(true);

  // check if the carriers positions were set.
  expect(playerBoard.ships[0].positionsOccupied.length).toEqual(5);

  // check y position ship placement.
  player.placeShip(10, "y", 4);

  console.log(playerBoard.board[10]);

  expect(playerBoard.board[10].isShip).toBe(true);
  expect(playerBoard.board[20].isShip).toBe(true);
  expect(playerBoard.board[30].isShip).toBe(true);
  expect(playerBoard.board[40].isShip).toBe(true);

  // check if the battleships positions were set.
  expect(playerBoard.ships[1].positionsOccupied.length).toEqual(4);
});
