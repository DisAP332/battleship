import { winScreen } from "../UI/winScreen";

export default function enemyAI(board, enemyBoard) {
  let grid = board.board;
  let enemyGrid = enemyBoard.board;
  // ---------------------------- place ships ---------------------------------------
  function placeShips() {
    console.log("placing ships");

    board.ships.forEach((ship) => {
      // randomly choose vertical or horizontal
      let ifVertical = Math.random() > 0.5;
      function calculatePositions() {
        console.log(`calculating positions for ${ship.name}`);
        if (ifVertical === true) {
          // choose number within safe range for ship for vertically placed ships
          let chooseLocation = Math.floor(Math.random() * ship.safeRange.y);
          let positionsToTake = [];
          for (let i = 0; i < ship.size; i++) {
            // add 10 to each position to get vertical positions
            positionsToTake.push(chooseLocation + Number(`${i}0`));
          }
          // check if positions are taken and if cordinate is on board
          if (board.isPositionsTaken(positionsToTake) === false) {
            // place ship
            board.placeShips(positionsToTake);
            ship.positionsOccupied.push(positionsToTake);
            return;
          } else {
            // critiera not met, try again. Ship placement conflicting with another ship
            console.log("conflict");
            calculatePositions();
          }
        } else if (ifVertical === false) {
          // choose number within safe range for ship for horizontally placed ships
          let chooseLocation =
            Math.floor(Math.random() * 100) - ship.safeRange.x;
          let positionsToTake = [];
          // add 1 to each position to get horizontal positions
          for (let i = 0; i < ship.size; i++) {
            positionsToTake.push(chooseLocation + i);
          }
          // check if positions are taken
          if (board.isPositionsTaken(positionsToTake) === false) {
            // place ship
            board.placeShips(positionsToTake);
            ship.positionsOccupied.push(positionsToTake);
            return;
          } else {
            // critiera not met, try again. Ship placement conflicting with another ship
            console.log("conflict");
            calculatePositions();
          }
        }
      }
      calculatePositions();
    });
  }

  // ---------------------------- shoot ---------------------------------------
  // place target data outside function to be passed for testing
  const targetingData = {
    shipsDestroyed: [],
    shipFirstStrikeOrgin: null,
    shipSecondStrikeData: null,
    phase: 1,
    targets: [],
    phase3Targets: {
      higher: [],
      lower: [],
    },
    maxShipSize: 5,
    successfulShots: 0,
  };

  function displayShot(cord, color) {
    const cordinate = document.getElementById(`e${cord}`);
    cordinate.setAttribute("style", `background-color: ${color};`);
  }

  const checkered = [
    0, 2, 4, 6, 8, 11, 13, 15, 17, 19, 22, 24, 26, 28, 31, 33, 35, 37, 39, 42,
    44, 46, 48, 51, 53, 55, 57, 59, 62, 64, 66, 68, 71, 73, 75, 77, 79, 82, 84,
    86, 88, 91, 93, 95, 97, 99,
  ];

  function makeShot() {
    switch (targetingData.phase) {
      case 3:
        phase3();
        break;
      case 2:
        phase2();
        break;
      case 1:
        let randomShot = Math.floor(Math.random() * 46);
        let shot = checkered[randomShot];
        phase1(shot);
        break;
    }
  }

  function phase1(target) {
    console.log(target);
    // phase 1 of enemy AI shooting function _____________________________
    // check if shot has been made
    if (enemyGrid[target].shotAt === false) {
      enemyBoard.shoot(target);
      // check if shot hit
      if (enemyGrid[target].hit === true) {
        // shot hit so move to phase 2 and set First Strike Orgin
        targetingData.shipFirstStrikeOrgin = target;
        targetingData.successfulShots++;
        targetingData.phase = 2;
      }
    } else {
      // shot already made so try again with new random shot.
      let randomShot = Math.floor(Math.random() * 46);
      let shot = checkered[randomShot];
      return makeShot(shot);
    }
    // show on UI if hit or miss
    if (targetingData.phase === 2) {
      // if phase 2 we can assume hit
      displayShot(target, "red");
    } else {
      displayShot(target, "green");
    }
    return;
  }

  function phase2() {
    let target = targetingData.shipFirstStrikeOrgin;

    function targetFactory(cord, positioning, direction) {
      return { cord, positioning, direction };
    }
    // caculate targets.
    if (targetingData.targets.length === 0) {
      // caculate possible targets
      let targetUp = targetFactory(target + 10, "vertical", "up");
      let targetDown = targetFactory(target - 10, "vertical", "down");
      let targetRight = targetFactory(target + 1, "horizontal", "right");
      let targetLeft = targetFactory(target - 1, "horizontal", "left");
      // check if targets are valid and not already shot
      // validate up shot
      if (targetUp.cord < 100 && enemyGrid[targetUp.cord].shotAt === false) {
        targetingData.targets.push(targetUp);
      }
      // validate down shot
      if (targetDown.cord >= 0 && enemyGrid[targetDown.cord].shotAt === false) {
        targetingData.targets.push(targetDown);
      }
      // validate right shot
      // the Math floor is to prevent the ship from shooting over the edge of the board
      if (
        targetRight.cord <= Math.floor((target / 10) * 10) + 10 &&
        targetRight.cord <= 99 &&
        enemyGrid[targetRight.cord].shotAt === false
      ) {
        targetingData.targets.push(targetRight);
      }
      // validate left shot
      if (
        targetLeft.cord > Math.floor(target / 10) * 10 &&
        enemyGrid[targetLeft.cord].shotAt === false
      ) {
        targetingData.targets.push(targetLeft);
      }
      // calculations finished, now make shot
    }
    // load target and take away from targets array
    let shotToMake = targetingData.targets.shift();
    // make shot
    enemyBoard.shoot(shotToMake.cord);
    // check if hit
    if (enemyGrid[shotToMake.cord].hit === true) {
      // display UI that shot hit
      displayShot(shotToMake.cord, "red");
      // shot hit so move to phase 3, reset targets, and set found ships positioning
      targetingData.shipSecondStrikeData = shotToMake;
      targetingData.phase = 3;
      targetingData.successfulShots++;
    } else {
      // miss so display that it was a miss
      displayShot(shotToMake.cord, "green");
    }
    console.log(targetingData.shipSecondStrikeData);
    console.log("turn over");
    return;
  }

  function determinShipDestroyed() {
    if (targetingData.successfulShots === 5) {
      console.log("carrier destroyed");
      targetingData.shipsDestroyed.push("carrier");
    }
    if (targetingData.successfulShots === 4) {
      console.log("battleship destroyed");
      targetingData.shipsDestroyed.push("battleship");
    }
    if (targetingData.successfulShots === 3) {
      // if destroyer is not included we destroyed the destroyer
      if (targetingData.shipsDestroyed.includes("destroyer") === false) {
        targetingData.shipsDestroyed.push("destroyer");
        console.log("destroyer destroyed");
      } else {
        // destroyer has been destroyed therefore we destroyed the cruiser
        targetingData.shipsDestroyed.push("cruiser");
        console.log("cruiser destroyed");
      }
    }
    if (targetingData.successfulShots === 2) {
      targetingData.shipsDestroyed.push("submarine");
      console.log("submarine destroyed");
    }
    // determine max ship size
    if (
      targetingData.shipsDestroyed.includes("carrier") === true &&
      targetingData.shipsDestroyed.includes("battleship") === true &&
      targetingData.shipsDestroyed.includes("destroyer") === true &&
      targetingData.shipsDestroyed.includes("cruiser") === true &&
      targetingData.shipsDestroyed.includes("submarine") === true
    ) {
      // this will give win condition for AI
      console.log("setting win");
      targetingData.maxShipSize = 1;
    } else if (
      targetingData.shipsDestroyed.includes("carrier") === true &&
      targetingData.shipsDestroyed.includes("battleship") === true &&
      targetingData.shipsDestroyed.includes("destroyer") === true &&
      targetingData.shipsDestroyed.includes("cruiser") === true
    ) {
      targetingData.maxShipSize = 2;
    } else if (
      targetingData.shipsDestroyed.includes("carrier") === true &&
      targetingData.shipsDestroyed.includes("battleship") === true
    ) {
      targetingData.maxShipSize = 3;
    } else if (targetingData.shipsDestroyed.includes("carrier") === true) {
      targetingData.maxShipSize = 4;
    }
  }

  // phase 3 targeting logic ------------------------------------------------
  let target;
  function calculateUp(range) {
    for (let i = 1; i <= range; i++) {
      target = targetingData.shipSecondStrikeData.cord + Number(`${i}0`);
      console.log(target);
      if (target < 100 && enemyGrid[target].shotAt === false) {
        targetingData.phase3Targets.higher.push(target);
      } else {
        // break because already hit ship, shot at spot before, or off board
        break;
      }
    }
  }
  function calculateDown(range) {
    console.log("calculating down");
    for (let i = 1; i <= range; i++) {
      // we target from first strike if direction is up due to the lowest position
      // being the origin.
      if (targetingData.shipSecondStrikeData.direction === "up") {
        target = targetingData.shipFirstStrikeOrgin - Number(`${i}0`);
      } else {
        target = targetingData.shipSecondStrikeData.cord - Number(`${i}0`);
      }
      if (target > 0 && enemyGrid[target].shotAt === false) {
        targetingData.phase3Targets.lower.push(target);
      } else {
        // break because already hit ship, shot at spot before, or off board
        break;
      }
    }
  }
  function calculateRight(range) {
    console.log("calculating right");
    for (let i = 1; i <= range; i++) {
      target = targetingData.shipSecondStrikeData.cord + i;
      // the Math floor is to prevent the ship from shooting over the edge of the board
      console.log(target);
      if (
        target <
          Math.floor(targetingData.shipSecondStrikeData.cord / 10) * 10 + 10 &&
        enemyGrid[target].shotAt === false
      ) {
        targetingData.phase3Targets.higher.push(target);
      } else {
        // break because already hit ship, shot at spot before, or off board
        break;
      }
    }
  }
  function calculateLeft(range) {
    for (let i = 1; i <= range; i++) {
      // we target from first strike if direction is right due to the lowest position
      // being the origin.
      if (targetingData.shipSecondStrikeData.direction === "right") {
        target = targetingData.shipFirstStrikeOrgin - i;
      } else {
        target = targetingData.shipSecondStrikeData.cord - i;
      }
      // the Math floor is to prevent the ship from shooting over the edge of the board
      if (
        target >
          Math.floor(targetingData.shipSecondStrikeData.cord / 10) * 10 &&
        enemyGrid[target].shotAt === false
      ) {
        targetingData.phase3Targets.lower.push(target);
      } else {
        // break because already hit ship, shot at spot before, or off board
        break;
      }
    }
  }
  function calculatePhase3Targets() {
    if (targetingData.shipSecondStrikeData.positioning === "vertical") {
      if (targetingData.shipSecondStrikeData.direction === "up") {
        calculateUp(targetingData.maxShipSize - 2);
        calculateDown(targetingData.maxShipSize - 2);
      }
      if (targetingData.shipSecondStrikeData.direction === "down") {
        // we wont calculate up because we already know the strike was unsuccessful
        calculateDown(targetingData.maxShipSize - 2);
      }
    }
    if (targetingData.shipSecondStrikeData.positioning === "horizontal") {
      if (targetingData.shipSecondStrikeData.direction === "right") {
        calculateRight(targetingData.maxShipSize - 2);
        calculateLeft(targetingData.maxShipSize - 2);
      }
      if (targetingData.shipSecondStrikeData.direction === "left") {
        // we wont calculate right because we already know the strike was unsuccessful
        calculateLeft(targetingData.maxShipSize - 2);
      }
    }
  }
  function phase3() {
    targetingData.targets = [];
    // if we have not calculated any phase 3 targets. Do so now.
    if (
      targetingData.phase3Targets.higher.length === 0 &&
      targetingData.phase3Targets.lower.length === 0
    ) {
      calculatePhase3Targets();
    }
    // load target and take away from targets array
    if (targetingData.phase3Targets.higher.length !== 0) {
      let shotToMake = targetingData.phase3Targets.higher.shift();
      // make shot
      enemyBoard.shoot(shotToMake);
      // check if hit
      if (enemyGrid[shotToMake].hit === true) {
        console.log("hit");
        displayShot(shotToMake, "red");
        targetingData.successfulShots++;
      } else {
        console.log("miss");
        displayShot(shotToMake, "green");
        // shot was unsuccessful so reset targets as we know the ship is not in this direction
        targetingData.phase3Targets.higher = [];
      }
    } else if (targetingData.phase3Targets.lower.length !== 0) {
      let shotToMake = targetingData.phase3Targets.lower.splice(0, 1)[0];
      // make shot
      enemyBoard.shoot(shotToMake);
      // check if hit
      if (enemyGrid[shotToMake].hit === true) {
        displayShot(shotToMake, "red");
        targetingData.successfulShots++;
      } else {
        // shot was unsuccessful so reset targets as we know the ship is not in this direction
        console.log("miss");
        displayShot(shotToMake, "green");
        targetingData.phase3Targets.lower = [];
      }
    }
    // if shots exhausted we have sunk a ship and need to reset phase and targeting data
    if (
      targetingData.phase3Targets.higher.length === 0 &&
      targetingData.phase3Targets.lower.length === 0
    ) {
      // we can assume the ship is sunk so reset phase and targeting data
      // determin ship destroyed and add to destroyed array
      console.log("ship destroyed");
      console.log(targetingData.maxShipSize);
      determinShipDestroyed();
      if (targetingData.maxShipSize === 1) {
        winScreen("The computer");
      }
      targetingData.phase = 1;
      targetingData.successfulShots = 0;
      targetingData.shipFirstStrikeOrgin = null;
      targetingData.shipSecondStrikeData = null;
    }
    console.log("turn over");
    return;
  }
  const testing = {
    phase1,
    phase2,
    phase3,
    calculatePhase3Targets,
    determinShipDestroyed,
    calculateUp,
    calculateDown,
    calculateRight,
    calculateLeft,
    targetingData,
  };
  return { placeShips, makeShot, grid, board, testing };
}
