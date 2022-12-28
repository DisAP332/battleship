const ships = () => {
  let carrier = {
    shipSize: 5,
    hits: 0,
    locations: [],
    sunk: false,
  };
  let battleship = {
    shipSize: 4,
    hits: 0,
    locations: [],
    sunk: false,
  };
  let destroyer = {
    shipSize: 3,
    hits: 0,
    locations: [],
    sunk: false,
  };
  let submarine = {
    shipSize: 3,
    hits: 0,
    locations: [],
    sunk: false,
  };
  let patrolBoat = {
    shipSize: 2,
    hits: 0,
    locations: [],
    sunk: false,
  };
  return carrier, battleship, destroyer, submarine, patrolBoat;
};
