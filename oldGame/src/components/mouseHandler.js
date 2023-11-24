import { max } from "lodash";
import { player } from "./game.js";

let axis = "x";
let maxShipSize = 5;
let repeat3 = false;
let high;

export function changeAxis() {
  if (axis === "x") {
    axis = "y";
  } else {
    axis = "x";
  }
}

function styleGridCordinates(position, color) {
  const gridCordinate = document.getElementById(position);
  gridCordinate.setAttribute("style", `background-color: ${color};`);
}

function checkIfInSafeRange(position) {
  let result = false;
  if (axis === "x") {
    // we dont need to worry about below because it builds from start to right.
    high = Math.floor(position / 10) * 10 + 10;
    if (
      position + (maxShipSize - 1) < 100 &&
      position + (maxShipSize - 1) < high
    ) {
      result = true;
    }
  }
  if (axis === "y") {
    if (position + (maxShipSize - 1) * 10 < 100) {
      result = true;
    }
  }
  return result;
}

function checkIfShip(position) {
  let result = false;
  let checkPosition;
  if (axis === "x") {
    for (let i = 0; i < maxShipSize; i++) {
      checkPosition = position + i;
      if (checkPosition < 100 && player.grid[checkPosition].isShip === true) {
        result = true;
      }
    }
  }
  if (axis === "y") {
    for (let i = 0; i < maxShipSize; i++) {
      checkPosition = position + i * 10;
      if (checkPosition < 100 && player.grid[checkPosition].isShip === true) {
        result = true;
      }
    }
  }
  return result;
}

function individualShipCheck(position) {
  let result = false;
  if (player.grid[position].isShip === true) {
    result = true;
  }
  return result;
}

export function gridPlacementMouseHandler(startingPosition, event) {
  let value;
  if (event === "mouseover") {
    if (axis === "x") {
      for (let i = 0; i < maxShipSize; i++) {
        value = startingPosition + i;
        if (
          checkIfInSafeRange(startingPosition) &&
          !checkIfShip(startingPosition)
        ) {
          styleGridCordinates(value, "green");
        } else {
          if (value < high && !individualShipCheck(value)) {
            styleGridCordinates(value, "red");
          }
        }
      }
    }
    if (axis === "y") {
      // we dont need to worry about below 0 because it builds from start to bottom.
      if (
        checkIfInSafeRange(startingPosition) &&
        !checkIfShip(startingPosition)
      ) {
        for (let i = 0; i < maxShipSize; i++) {
          value = startingPosition + i * 10;
          styleGridCordinates(value, "green");
        }
      } else {
        // if it is not in the safe range we will color it red.
        for (let i = 0; i < maxShipSize; i++) {
          value = startingPosition + i * 10;
          if (value < 100 && !individualShipCheck(value)) {
            styleGridCordinates(value, "red");
          }
        }
      }
    }
  }
  if (event === "mouseleave") {
    if (axis === "x") {
      for (let i = 0; i < maxShipSize; i++) {
        value = startingPosition + i;
        if (value < 100 && !individualShipCheck(value)) {
          styleGridCordinates(value, "lightblue");
        }
      }
    }
    if (axis === "y") {
      for (let i = 0; i < maxShipSize; i++) {
        value = startingPosition + i * 10;
        if (value < 100 && !individualShipCheck(value)) {
          styleGridCordinates(value, "lightblue");
        }
      }
    }
  }
  if (event === "click") {
    if (axis === "x") {
      if (
        checkIfInSafeRange(startingPosition) &&
        !checkIfShip(startingPosition)
      ) {
        for (let i = 0; i < maxShipSize; i++) {
          value = startingPosition + i;
          styleGridCordinates(value, "yellow");
        }
        player.placeShip(startingPosition, axis, maxShipSize);
        if (maxShipSize === 3 && repeat3 === false) {
          repeat3 = true;
        } else {
          maxShipSize--;
        }
        console.log(player.board.ships);
      }
    }
    if (axis === "y") {
      if (
        checkIfInSafeRange(startingPosition) &&
        !checkIfShip(startingPosition)
      ) {
        for (let i = 0; i < maxShipSize; i++) {
          value = Number(startingPosition) + i * 10;
          if (value < 100) {
            styleGridCordinates(value, "yellow");
          }
        }
        player.placeShip(startingPosition, axis, maxShipSize);
        if (maxShipSize === 3 && repeat3 === false) {
          repeat3 = true;
        } else {
          maxShipSize--;
        }
      }
    }
  }
}

//! write yourself test to prove this works and add the ships to the board for
//! declaration later in game
