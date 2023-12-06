import { winScreen } from "../UI/winScreen";

export default function createBoard() {
  let hits = 0;
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
      name: "Destroyer",
      size: 3,
      safeRange: { y: 80, x: 3 },
      positionsOccupied: [],
    },
    {
      name: "submarine",
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
    console.log(`shot at ${i}`);
    if (this.board[i].isShip === true) {
      this.board[i] = { ...this.board[i], hit: true };
      this.hits += 1;
    }
    this.board[i] = { ...this.board[i], shotAt: true };
  }
  function placeShips(positions) {
    positions.forEach((position) => {
      this.board[position] = { ...this.board[position], isShip: true };
    });
  }
  function resetShips() {
    ships.forEach((ship) => {
      ship.positionsOccupied = [];
    });
  }
  function clearGridCosmetically() {
    for (let i = 0; i < 100; i++) {
      const cord = document.getElementById(i);
      cord.setAttribute("style", "background-color: lightblue;");
    }
  }
  return {
    board,
    ships,
    hits,
    shoot,
    placeShips,
    isPositionsTaken,
    resetShips,
    clearGridCosmetically,
  };
}
