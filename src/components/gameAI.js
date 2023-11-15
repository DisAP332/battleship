import { initial } from "lodash";
import { game } from "./game";
import { ShipPositions } from "./mouseHandler";

const shotAtArray = [];
let stage = "1";
let FoundAxis = "";
let queuedHit = 0;
let gridCord;
let hits = 0;
let initHit;
let shipSizeMax = 5;
const enemyPositions = [];
let ship = 1;
let shipSize = 5;
let num;
let max;
let xOrY;
let hitOrMiss = "miss";
let hitQueue = [];
let direction;

function miss(cord) {
  shotAtArray.push(cord);
  gridCord.setAttribute("style", "background-color: blue;");
}

function setGridCord(cord) {
  gridCord = document.getElementById(`enemyCords${Number(cord)}`);
}

function check() {
  if (enemyPositions.length === 0) {
    return true;
  }
  if (xOrY === "x") {
    for (let i = 0; i <= enemyPositions.length - 1; i++) {
      for (let y = 0; y <= shipSize - 1; y++) {
        if (num + [y] == enemyPositions[i]) {
          return false;
        }
      }
      max = (Math.floor(num * 0.1) + 1) * 10;
      if (num + shipSize > max) {
        return false;
      }
    }
  }
  if (xOrY === "y") {
    for (let i = 0; i <= enemyPositions.length - 1; i++) {
      for (let y = 0; y <= shipSize - 1; y++) {
        if (num + [y] * 10 == enemyPositions[i]) {
          return false;
        }
      }
    }
  }
  return true;
}

function checkShotAt(cord) {
  for (let i = 0; i <= shotAtArray.length - 1; i++) {
    if (cord === shotAtArray[i]) {
      return true;
    }
  }
}

function CheckHit(cord) {
  for (let i = 0; i <= ShipPositions.length - 1; i++) {
    if (cord === ShipPositions[i]) {
      gridCord.setAttribute("style", "background-color: red");
      shotAtArray.push(cord);
      game("computerHit");
      hitOrMiss = "hit";
      hits++;
    }
  }
}

function shipSunk() {
  stage = "1";
  if (hits === shipSizeMax) {
    shipSizeMax--;
  }
  console.log("sunk");
}

function stage1TargetLogic() {
  num = Math.floor(Math.random() * 100);
  if (!checkShotAt(num) && num > 0 && num <= 50) {
    setGridCord(num);
    CheckHit(num);
    return 1;
  }
  stage1TargetLogic();
}

function stage2TargetLogic() {
  if (!checkShotAt(num - 1) && num - 1 >= Math.floor(num / 10) * 10) {
    hitQueue.push(num - 1);
    hitQueue.push("x");
    hitQueue.push("left");
  }
  if (!checkShotAt(num + 1) && num + 1 <= Math.floor(num / 10) * 10 + 10) {
    hitQueue.push(num + 1);
    hitQueue.push("x");
    hitQueue.push("leftInvalid");
  }
  if (!checkShotAt(num + 10) && num + 10 <= 100) {
    hitQueue.push(num + 10);
    hitQueue.push("y");
    hitQueue.push("up");
  }
  if (!checkShotAt(num - 10) && num - 10 > 0) {
    hitQueue.push(num - 10);
    hitQueue.push("y");
    hitQueue.push("upInvalid");
  }
}

function stage3TargetLogic() {
  if (FoundAxis === "x") {
    if (direction === "leftInvalid") {
      if (
        !checkShotAt(initHit + 1) &&
        initHit + 1 <= Math.floor(initHit / 10) * 10 + 10
      ) {
        hitQueue.push(initHit + 1);
        hitQueue.push("right");
        initHit += 1;
      }
    }
    if (direction === "left") {
      if (
        !checkShotAt(queuedHit - 1) &&
        queuedHit - 1 >= Math.floor(queuedHit / 10) * 10
      ) {
        hitQueue.push(queuedHit - 1);
        hitQueue.push("left");
      }
      if (
        !checkShotAt(initHit + 1) &&
        initHit + 1 <= Math.floor(initHit / 10) * 10 + 10
      ) {
        hitQueue.push(initHit + 1);
        hitQueue.push("right");
      }
    }
    if (direction === "right") {
      if (
        !checkShotAt(initHit + 1) &&
        initHit + 1 <= Math.floor(initHit / 10) * 10 + 10
      ) {
        hitQueue.push(initHit + 1);
        hitQueue.push("right");
        initHit += 1;
      } else {
        shipSunk();
      }
    }
  }
  if (FoundAxis === "y") {
    if (direction === "upInvalid") {
      if (!checkShotAt(queuedHit - 10) && queuedHit - 10 > 0) {
        hitQueue.push(queuedHit - 10);
        hitQueue.push("down");
      }
    }
    if (direction === "up") {
      if (!checkShotAt(queuedHit + 10) && queuedHit + 10 <= 100) {
        hitQueue.push(queuedHit + 10);
        hitQueue.push("up");
      } else {
        direction = "upInvalid";
      }
      if (!checkShotAt(initHit - 10) && initHit - 10 > 0) {
        hitQueue.push(initHit - 10);
        hitQueue.push("down");
      } else {
        shipSunk();
      }
    }
  }
}

function enemyAI(event) {
  if (event === "choosePositions") {
    if (enemyPositions.length >= 17) {
      return 1;
    }
    num = Math.floor(Math.random() * 100);
    xOrY = Math.random();
    if (xOrY > 0.5) {
      xOrY = "x";
    } else {
      xOrY = "y";
    }
    if (xOrY === "x") {
      if (num > 0 && num + shipSize <= 100 && check(num, shipSize)) {
        if (ship === 1) {
          for (let i = 0; i <= 4; i++) {
            enemyPositions.push(num + i);
          }
        }
        if (ship === 2) {
          shipSize--;
          for (let i = 0; i <= 3; i++) {
            enemyPositions.push(num + i);
          }
        }
        if (ship === 3) {
          shipSize--;
          for (let i = 0; i <= 2; i++) {
            enemyPositions.push(num + i);
          }
        }
        if (ship === 4) {
          for (let i = 0; i <= 2; i++) {
            enemyPositions.push(num + i);
          }
        }
        if (ship === 5) {
          shipSize--;
          for (let i = 0; i <= 1; i++) {
            enemyPositions.push(num + i);
          }
        }
        ship++;
      }
      enemyAI("choosePositions");
    }
    if (xOrY === "y") {
      if (num > 0 && num + shipSize * 10 <= 100 && check(num, shipSize)) {
        if (ship === 1) {
          for (let i = 0; i <= 4; i++) {
            enemyPositions.push(num + i * 10);
          }
        }
        if (ship === 2) {
          shipSize--;
          for (let i = 0; i <= 3; i++) {
            enemyPositions.push(num + i * 10);
          }
        }
        if (ship === 3) {
          shipSize--;
          for (let i = 0; i <= 2; i++) {
            enemyPositions.push(num + i * 10);
          }
        }
        if (ship === 4) {
          for (let i = 0; i <= 2; i++) {
            enemyPositions.push(num + i * 10);
          }
        }
        if (ship === 5) {
          shipSize--;
          for (let i = 0; i <= 1; i++) {
            enemyPositions.push(num + i * 10);
          }
        }
        ship++;
      }
      enemyAI("choosePositions");
    }
  }
  if (event === "attack") {
    if (stage === "3") {
      stage3TargetLogic();
      console.log(hitQueue);
      queuedHit = hitQueue.shift();
      direction = hitQueue.shift();
      setGridCord(queuedHit);
      CheckHit(queuedHit);
      if (hitOrMiss === "hit") {
        hitQueue = [];
        hitOrMiss = "";
      } else if (hitOrMiss === "miss") {
        miss(queuedHit);
      }
    }
    if (stage === "2") {
      queuedHit = hitQueue.shift();
      FoundAxis = hitQueue.shift();
      direction = hitQueue.shift();
      setGridCord(queuedHit);
      CheckHit(queuedHit);
      if (hitOrMiss === "hit") {
        hitQueue = [];
        stage = "3";
        hitOrMiss = "";
      } else {
        miss(queuedHit);
      }
    }
    if (stage === "1") {
      stage1TargetLogic();
      if (hitOrMiss === "miss") {
        miss(num);
      }
      if (hitOrMiss === "hit") {
        stage2TargetLogic();
        hitOrMiss = "";
        initHit = num;
        stage = "2";
      }
    }
  }
}
enemyAI();

export { enemyPositions };
export { enemyAI };
