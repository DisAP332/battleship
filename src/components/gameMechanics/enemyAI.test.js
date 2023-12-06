import enemyAI from "./enemyAI";
import createBoard from "./board.js";

const AIboard = createBoard();
const enemyBoard = createBoard();

let AI = enemyAI(AIboard, enemyBoard);
AI.placeShips();

let targetingData = AI.testing.targetingData;
let tester = AI.testing;

test("properly places ships", () => {
  let result = false;
  // check if proper lengths.
  expect(AIboard.ships[0].positionsOccupied[0].length).toBe(5);
  expect(AIboard.ships[1].positionsOccupied[0].length).toBe(4);
  expect(AIboard.ships[2].positionsOccupied[0].length).toBe(3);
  expect(AIboard.ships[3].positionsOccupied[0].length).toBe(3);
  expect(AIboard.ships[4].positionsOccupied[0].length).toBe(2);
  AIboard.ships.forEach((ship) => {
    let orginPosition = ship.positionsOccupied[0][0];
    let secondaryPosition = ship.positionsOccupied[0][1];
    if (
      orginPosition - 10 === secondaryPosition ||
      orginPosition + 10 === secondaryPosition ||
      orginPosition - 1 === secondaryPosition ||
      orginPosition + 1 === secondaryPosition
    ) {
      result = true;
    }
  });
  expect(result).toBe(true);
});

// phase 1 test will make 55 a hit. Remember this as used in future tests.
test("phase 1 test", () => {
  // make shot 55 because we arent testing off board misses.
  enemyBoard.placeShips([55]);
  console.log(enemyBoard);
  // Set 55 as ship to ensure hit.
  tester.phase1(55);
  // ensure phase moved to 2
  expect(targetingData.phase).toBe(2);
  // expect first strike orgin to be set
  expect(targetingData.shipFirstStrikeOrgin !== null).toBe(true);
  // test if shot landed
  expect(enemyBoard.board[targetingData.shipFirstStrikeOrgin].hit === true);
});

// we will first test phase 2 targeting logic.
test("phase 2 target and fire test", () => {
  // make shot based off of first strike orgin which should be 55
  expect(targetingData.shipFirstStrikeOrgin).toBe(55);

  // make shot which will calculate targets. First will hit in the up position
  // becoming the second strike origin. The other 3 will be added down, right, left
  // inside of targets array.
  enemyBoard.placeShips([65]);
  tester.phase2();

  console.log(targetingData);

  expect(targetingData.shipSecondStrikeData.cord).toBe(
    targetingData.shipFirstStrikeOrgin + 10
  );

  expect(targetingData.targets[0].cord).toBe(
    targetingData.shipFirstStrikeOrgin - 10
  );

  expect(targetingData.targets[1].cord).toBe(
    targetingData.shipFirstStrikeOrgin + 1
  );

  expect(targetingData.targets[2].cord).toBe(
    targetingData.shipFirstStrikeOrgin - 1
  );

  // test if shot successful
  expect(enemyBoard.board[targetingData.shipSecondStrikeData.cord].shotAt).toBe(
    true
  );
});

// 65 is hit.

// remember targeting in phase two works off top bottom right left.
test("phase 2 right & bottom border test", () => {
  // ensure targeting data is reset.
  targetingData.shipFirstStrikeOrgin = 0;
  targetingData.targets = [];
  targetingData.shipSecondStrikeData = null;

  // make 10 a ship so it will hit. Ensuring that secondStrikeData is set.

  enemyBoard.placeShips([10]);

  // begin phase 2 strike.
  tester.phase2();

  // first strike should be top.
  expect(targetingData.shipSecondStrikeData.cord).toBe(
    targetingData.shipFirstStrikeOrgin + 10
  );

  // first target should be right as bottom will fail.
  expect(targetingData.targets[0].cord).toBe(
    targetingData.shipFirstStrikeOrgin + 1
  );
});

// 10 is hit.

test("phase 2 left & top border test", () => {
  // ensure targeting data is reset.
  targetingData.shipFirstStrikeOrgin = 99;
  targetingData.targets = [];
  targetingData.shipSecondStrikeData = null;

  // make 89 a ship so it will hit. Ensuring that secondStrikeData is set.

  enemyBoard.placeShips([89]);

  tester.phase2();

  // first target should be bottom as top will fail.
  expect(targetingData.shipSecondStrikeData.cord).toBe(
    targetingData.shipFirstStrikeOrgin - 10
  );

  // first target should be left as bottom will fail.
  expect(targetingData.targets[0].cord).toBe(
    targetingData.shipFirstStrikeOrgin - 1
  );

  // targets length will be 1 as rigth will fail.
  expect(targetingData.targets.length).toBe(1);
});

test("phase 2 targeting another shot location test", () => {
  // ensure targets and ship second strike data is reset.
  targetingData.shipFirstStrikeOrgin = 79;
  targetingData.targets = [];
  targetingData.shipSecondStrikeData = null;

  // place ship on 69 so it will be a hit.
  enemyBoard.placeShips([69]);

  // when it targets 89 it should fail because we shot there in previous test.
  tester.phase2();

  // expect strike to hit bottom as top should fail as it is another ship which will be 69.
  expect(targetingData.shipSecondStrikeData.cord).toBe(
    targetingData.shipFirstStrikeOrgin - 10
  );
});

test("ships sunk test", () => {
  // test battleship sunk.
  targetingData.successfulShots = 4;

  tester.determinShipDestroyed();

  expect(targetingData.shipsDestroyed.includes("battleship")).toBe(true);
  // only battleship destroyed so far. max ship size should be 5 still.
  expect(targetingData.maxShipSize).toBe(5);

  targetingData.successfulShots = 5;

  tester.determinShipDestroyed();

  // carrier and destroyer destroyed.
  expect(targetingData.shipsDestroyed.includes("carrier")).toBe(true);
  // expect the new max ship size to be 3.
  expect(targetingData.maxShipSize).toBe(3);

  // test destroyer sunk.
  targetingData.successfulShots = 3;

  tester.determinShipDestroyed();

  expect(targetingData.shipsDestroyed.includes("destroyer")).toBe(true);
  // since cruiser is still left max ship size should be 3.
  expect(targetingData.maxShipSize).toBe(3);

  // test cruiser sunk.

  tester.determinShipDestroyed();

  expect(targetingData.shipsDestroyed.includes("cruiser")).toBe(true);
  // since cruiser and destroyer gone expect max ship size to be 2.

  targetingData.successfulShots = 2;

  expect(targetingData.maxShipSize).toBe(2);
  tester.determinShipDestroyed();
  // since all ships gone expect max ship size to be 1 which is win condition.
  expect(targetingData.maxShipSize).toBe(1);
});

// reset the board.

AI = enemyAI(AIboard, enemyBoard);
console.log(enemyBoard.board);
targetingData = AI.testing.targetingData;
tester = AI.testing;

test("phase 3 target calculate up", () => {
  // we will test if the up calculation works properly.
  targetingData.shipSecondStrikeData = { cord: 56 };
  tester.calculateUp(3);
  expect(targetingData.phase3Targets.higher[0]).toBe(66);
  expect(targetingData.phase3Targets.higher[1]).toBe(76);
  expect(targetingData.phase3Targets.higher[2]).toBe(86);

  targetingData.phase3Targets.higher = [];

  enemyBoard.placeShips([76]);
  enemyBoard.shoot(76);
  tester.calculateUp(3);
  // make 75 a shot ship and test if it intefears with the up calculation. it should.
  expect(targetingData.phase3Targets.higher.length).toBe(1);
});

test("phase 3 target calculate down", () => {
  // we will test if the up calculation works properly.
  targetingData.shipSecondStrikeData = { cord: 55 };
  tester.calculateDown(3);
  console.log(targetingData);
  expect(targetingData.phase3Targets.lower[0]).toBe(45);
  expect(targetingData.phase3Targets.lower[1]).toBe(35);
  expect(targetingData.phase3Targets.lower[2]).toBe(25);

  targetingData.phase3Targets.lower = [];

  enemyBoard.placeShips([35]);
  enemyBoard.shoot(35);
  tester.calculateDown(3);
  // make 75 a shot ship and test if it intefears with the up calculation. it should.
  expect(targetingData.phase3Targets.lower.length).toBe(1);
});

test("phase 3 target calculate right", () => {
  // we will test if the up calculation works properly.
  targetingData.phase3Targets.higher = [];
  targetingData.shipSecondStrikeData = { cord: 55 };
  tester.calculateRight(3);
  console.log(targetingData);
  expect(targetingData.phase3Targets.higher[0]).toBe(56);
  expect(targetingData.phase3Targets.higher[1]).toBe(57);
  expect(targetingData.phase3Targets.higher[2]).toBe(58);

  targetingData.phase3Targets.higher = [];

  enemyBoard.placeShips([57]);
  enemyBoard.shoot(57);
  tester.calculateRight(3);
  // make 75 a shot ship and test if it intefears with the up calculation. it should.
  expect(targetingData.phase3Targets.higher.length).toBe(1);
});

test("phase 3 target calculate left", () => {
  // we will test if the up calculation works properly.
  targetingData.phase3Targets.lower = [];
  targetingData.shipSecondStrikeData = { cord: 55 };
  tester.calculateLeft(3);
  expect(targetingData.phase3Targets.lower[0]).toBe(54);
  expect(targetingData.phase3Targets.lower[1]).toBe(53);
  expect(targetingData.phase3Targets.lower[2]).toBe(52);

  targetingData.phase3Targets.lower = [];

  enemyBoard.placeShips([53]);
  enemyBoard.shoot(53);
  tester.calculateLeft(3);
  // make 75 a shot ship and test if it intefears with the up calculation. it should.
  expect(targetingData.phase3Targets.lower.length).toBe(1);
});

test("phase 3 vertical targeting test", () => {
  // reset maxship size for phase 3 testing. Assume carrier isnt sunk.
  targetingData.maxShipSize = 5;
  targetingData.phase3Targets.higher = [];
  targetingData.phase3Targets.lower = [];

  targetingData.shipFirstStrikeOrgin = 40;

  // a up direction means we will execute down targeting as well.
  // this is due to the nature of phase 2 targeting which always strikes up first.
  targetingData.shipSecondStrikeData = {
    cord: 50,
    positioning: "vertical",
    direction: "up",
  };

  tester.calculatePhase3Targets();
  // we should get back higher: 60, 70, 80. lower: 30, 20, 10.
  expect(targetingData.phase3Targets.higher[0]).toBe(60);
  expect(targetingData.phase3Targets.higher[1]).toBe(70);
  expect(targetingData.phase3Targets.higher[2]).toBe(80);
  expect(targetingData.phase3Targets.lower[0]).toBe(30);
  expect(targetingData.phase3Targets.lower[1]).toBe(20);
  // we shot a ship in position 10 in previous test so it should skip as target.
  expect(targetingData.phase3Targets.lower.length).toBe(2);
});

test("phase 3 horizontal targeting test", () => {
  // reset maxship size for phase 3 testing. Assume carrier isnt sunk.
  targetingData.maxShipSize = 5;
  targetingData.phase3Targets.higher = [];
  targetingData.phase3Targets.lower = [];

  targetingData.shipFirstStrikeOrgin = 35;

  // a right direction means we will execute down targeting as well.
  // this is due to the nature of phase 2 targeting which always strikes right before left.
  targetingData.shipSecondStrikeData = {
    cord: 35,
    positioning: "horizontal",
    direction: "right",
  };

  // make shot on 32 to test if it is skipped.
  enemyBoard.placeShips([32]);
  enemyBoard.shoot(32);

  tester.calculatePhase3Targets();
  // we should get back higher: 36, 37, 38. lower: 34, 33, 32.
  expect(targetingData.phase3Targets.higher[0]).toBe(36);
  expect(targetingData.phase3Targets.higher[1]).toBe(37);
  expect(targetingData.phase3Targets.higher[2]).toBe(38);
  expect(targetingData.phase3Targets.lower[0]).toBe(34);
  expect(targetingData.phase3Targets.lower[1]).toBe(33);
  // we shot a ship in position 32 so it should skip as target.
  expect(targetingData.phase3Targets.lower.length).toBe(2);
});

test("phase 3 shooting test", () => {
  console.log(targetingData.phase3Targets);

  // place ship to make a hit.
  enemyBoard.placeShips([36]);
  tester.phase3();

  // test firing of higher.
  expect(enemyBoard.board[36].hit).toBe(true);
  expect(targetingData.phase3Targets.higher.length).toBe(2);
  tester.phase3();
  expect(enemyBoard.board[37].shotAt).toBe(true);
  // length will be zero as 38 is a miss.
  expect(targetingData.phase3Targets.higher.length).toBe(0);

  // make 33 a ship to test lower.
  enemyBoard.placeShips([34]);
  tester.phase3();

  expect(enemyBoard.board[34].hit).toBe(true);
  expect(targetingData.phase3Targets.lower.length).toBe(1);
  tester.phase3();
  expect(enemyBoard.board[33].shotAt).toBe(true);
  // length will be zero as 32 is a miss.
  expect(targetingData.phase3Targets.lower.length).toBe(0);

  // shots exhausted check for phase reset
  expect(targetingData.phase).toBe(1);
  expect(targetingData.shipFirstStrikeOrgin).toBe(null);
  expect(targetingData.shipSecondStrikeData).toBe(null);
  expect(targetingData.successfulShots).toBe(0);
});
