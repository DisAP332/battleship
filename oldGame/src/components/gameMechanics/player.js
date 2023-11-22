export default function Player(board, enemyBoard) {
  let grid = board.board;
  let enemyGrid = enemyBoard.board;
  const name = null;

  function resetBoard() {
    for (let i = 0; i < grid.length; i++) {
      grid[i] = { ...grid[i], isShip: false, shotAt: false, hit: false };
    }
    grid.resetShips();
  }

  function placeShip(position, orientation, size) {
    let positions = [];
    if (orientation === "x") {
      for (let i = 0; i < size; i++) {
        // ships will always be built from start to right
        positions.push(position + i);
      }
    }
    if (orientation === "y") {
      // ships will always be built from start to bottom
      for (let i = 0; i < size; i++) {
        positions.push(position + i * 10);
      }
    }
    // place the ship
    board.placeShips(positions);
    if (size === 5) {
      // set the carrier positions
      board.ships[0].positionsOccupied = positions;
    }
    if (size === 4) {
      // set the battleship positions
      board.ships[1].positionsOccupied = positions;
    }
    if (size === 3) {
      // set the cruiser positions
      board.ships[2].positionsOccupied = positions;
    }
    if (size === 3 && board.ships[2].positionsOccupied.length !== 0) {
      // set the destroyer positions
      board.ships[3].positionsOccupied = positions;
    }
    if (size === 2) {
      // set the submarine positions
      board.ships[4].positionsOccupied = positions;
    }
  }

  return { name, grid, resetBoard, placeShip };
}
