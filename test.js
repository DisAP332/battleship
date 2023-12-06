const BoardPrototypes = {
  Shoot(i) {
    return (this.Board[i].shot = true);
  },
};

function createBoard(name) {
  const Board = new Array(100).fill({
    isShip: false,
    shot: false,
  });
  return Object.create(BoardPrototypes, {
    Player: { value: name },
    Board: { value: Board },
  });
}

const board = createBoard("player1");

console.log(board.shoot(2)); // player1
