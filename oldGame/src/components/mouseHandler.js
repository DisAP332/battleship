let axis = "x";

let maxShipSize = 5;

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

export function gridPlacementMouseHandler(startingPosition, event) {
  let value;
  if (event === "mouseover") {
    if (axis === "x") {
      // we dont need to worry about below because it builds from start to right.
      let high = Math.floor(startingPosition / 10) * 10 + 10;
      if (
        startingPosition + (maxShipSize - 1) < 100 &&
        startingPosition + (maxShipSize - 1) < high
      ) {
        for (let i = 0; i < maxShipSize; i++) {
          value = Number(startingPosition) + i;
          styleGridCordinates(value, "green");
        }
      } else {
        // if it is not in the safe range we will color it red.
        for (let i = 0; i < maxShipSize; i++) {
          value = Number(startingPosition) + i;
          // this will ensure it doesnt spill over to the next row.
          if (value < high) {
            styleGridCordinates(value, "red");
          }
        }
      }
    }
    if (axis === "y") {
      // we dont need to worry about below 0 because it builds from start to bottom.
      if (Number(startingPosition) + (maxShipSize - 1) * 10 < 100) {
        for (let i = 0; i < maxShipSize; i++) {
          value = Number(startingPosition) + i * 10;
          styleGridCordinates(value, "green");
        }
      } else {
        // if it is not in the safe range we will color it red.
        for (let i = 0; i < maxShipSize; i++) {
          value = Number(startingPosition) + i * 10;
          if (value < 100) {
            styleGridCordinates(value, "red");
          }
        }
      }
    }
  }
  if (event === "mouseleave") {
    if (axis === "x") {
      for (let i = 0; i < maxShipSize; i++) {
        value = Number(startingPosition) + i;
        if (value < 100) {
          styleGridCordinates(value, "lightblue");
        }
      }
    }
    if (axis === "y") {
      for (let i = 0; i < maxShipSize; i++) {
        value = Number(startingPosition) + i * 10;
        if (value < 100) {
          styleGridCordinates(value, "lightblue");
        }
      }
    }
  }
}
