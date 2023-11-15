export default function createBoard() {
  const ships = [
    {
      name: "Carrier",
      size: 5,
      safeRange: { y: 60, x: 5 },
      positionsOccupied: [],
    },
    {
      name: "Battleship",
      size: 4,
      safeRange: { y: 70, x: 4 },
      positionsOccupied: [],
    },
    {
      name: "Cruiser",
      size: 3,
      safeRange: { y: 80, x: 3 },
      positionsOccupied: [],
    },
    {
      name: "Submarine",
      size: 3,
      safeRange: { y: 80, x: 3 },
      positionsOccupied: [],
    },
    {
      name: "Destroyer",
      size: 2,
      safeRange: { y: 90, x: 2 },
      positionsOccupied: [],
    },
  ];
  const board = new Array(100).fill({
    isShip: false,
    shotAt: false,
    hit: false,
  });
  function isPositionsTaken(positions) {
    let result = false;
    positions.forEach((position) => {
      if (position > 100 || position < 0) {
        result = true;
      } else if (this.board[position].isShip === true) {
        result = true;
      }
    });
    return result;
  }
  function shoot(i) {
    if (this.board[i].isShip === true) {
      this.board[i] = { ...this.board[i], hit: true };
    }
    this.board[i] = { ...this.board[i], shotAt: true };
  }
  function placeShip(positions) {
    positions.forEach((position) => {
      this.board[position] = { ...this.board[position], isShip: true };
    });
  }
  return { board, ships, shoot, placeShip, isPositionsTaken };
}
