export default function enemyAI(Board, EnemyBoard) {
  let board = Board.board;
  let enemyBoard = EnemyBoard.board;
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
          // check if positions are taken
          if (board.isPositionsTaken(positionsToTake) === false) {
            // place ship
            board.placeShip(positionsToTake);
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
            board.placeShip(positionsToTake);
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
  const targetingData = {
    shipFirstStrikeOrgin: null,
    foundShipPositioning: null,
    phase: 1,
    targets: [],
  };

  function makeShot() {
    // phase 1 of enemy AI shooting function _____________________________
    if (targetingData.phase === 1) {
      let randomShot = Math.floor(Math.random() * 100);
      // check if shot has been made
      if (enemyBoard[randomShot].shot === false) {
        enemyBoard.shoot(randomShot);
        // check if shot hit
        if (enemyBoard[randomShot].hit === true) {
          // shot hit so move to phase 2 and set First Strike Orgin
          shipFirstStrikeOrgin = randomShot;
          targetingData.phase = 2;
        }
      }
    }
    // phase 2 of enemy AI shooting function_______________________________
    if (targetingData.phase === 2) {
      function targetFactory(cord, positioning, direction) {
        return { cord, positioning, direction };
      }
      // caculate targets.
      if (targetingData.targets.length === 0) {
        // caculate possible targets
        let targetUp = targetFactory(shipFirstStrikeOrgin + 10, "vertical");
        let targetDown = targetFactory(shipFirstStrikeOrgin - 10, "vertical");
        let targetRight = targetFactory(shipFirstStrikeOrgin + 1, "horizontal");
        let targetLeft = targetFactory(shipFirstStrikeOrgin - 1, "horizontal");
        // check if targets are valid and not already shot
        if (targetUp.cord > 100 && enemyBoard[targetUp.cord].shot === false) {
          targetingData.targets.push(targetUp);
        }
        if (targetDown.cord < 0 && enemyBoard[targetDown.cord].shot === false) {
          targetingData.targets.push(targetDown);
        }
        // the Math floor is to prevent the ship from shooting over the edge of the board
        if (
          targetRight.cord > Math.floor(shipFirstStrikeOrgin / 10) + 10 &&
          enemyBoard[targetRight.cord].shot === false
        ) {
          targetingData.targets.push(targetRight);
        }
        if (
          targetLeft.cord < Math.floor(shipFirstStrikeOrgin / 10) &&
          enemyBoard[targetLeft.cord].shot === false
        ) {
          targetingData.targets.push(targetLeft);
        }
      } else {
        // make shot and remove target from array
        let shotToMake = targetingData.targets.splice(0, 1)[0];
        enemyBoard.shoot(shotToMake.cord);
        if (enemyBoard[shotToMake.cord].hit === true) {
          // shot hit so move to phase 3 and set found ships positioning
          targetingData.foundShipPositioning = shotToMake.positioning;
          targetingData.phase = 3;
        }
      }
      // phase 3 of enemy AI shooting function_______________________________
      if (targetingData.phase === 3) {
        if (targetingData.foundShipPositioning === "vertical") {
        }
      }
    }
  }

  return { placeShips };
}
