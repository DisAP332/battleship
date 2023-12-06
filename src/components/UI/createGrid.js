import {
  gameMouseHandler,
  gridPlacementMouseHandler,
} from "../mouseHandler.js";

export default function createGrid(mode) {
  const gridWrapper = document.getElementById("gridWrapper");
  const enemyGrid = document.createElement("div");
  const grid = document.createElement("div");
  grid.setAttribute("id", "grid");
  enemyGrid.setAttribute("id", "grid");

  let event;

  gridWrapper.appendChild(grid);

  if (mode === "setupStage") {
    for (let i = 0; i <= 99; i++) {
      // create grid
      let gridCordinate = document.createElement("div");

      // set value and id
      gridCordinate.value = i;
      gridCordinate.setAttribute("id", i);

      grid.appendChild(gridCordinate);

      // add event listeners
      gridCordinate.addEventListener("mouseover", () => {
        event = "mouseover";
        gridPlacementMouseHandler(gridCordinate.value, event);
      });
      gridCordinate.addEventListener("mouseleave", () => {
        event = "mouseleave";
        gridPlacementMouseHandler(gridCordinate.value, event);
      });
      gridCordinate.addEventListener("click", () => {
        event = "click";
        gridPlacementMouseHandler(gridCordinate.value, event);
      });
    }
  }

  if (mode === "gameStage") {
    gridWrapper.appendChild(enemyGrid);
    for (let i = 0; i <= 99; i++) {
      // create grid
      let gridCordinate = document.createElement("div");
      let enemyCordinate = document.createElement("div");

      // set ids this will be for the player;
      gridCordinate.value = i;
      gridCordinate.setAttribute("id", `p${i}`);
      // set ids for the enemy grid;
      enemyCordinate.setAttribute("id", `e${i}`);

      grid.appendChild(gridCordinate);
      enemyGrid.appendChild(enemyCordinate);

      // add event listeners
      gridCordinate.addEventListener("mouseover", () => {
        event = "mouseover";
        gameMouseHandler(gridCordinate.value, event);
      });
      gridCordinate.addEventListener("mouseleave", () => {
        event = "mouseleave";
        gameMouseHandler(gridCordinate.value, event);
      });
      gridCordinate.addEventListener("click", () => {
        event = "click";
        gameMouseHandler(gridCordinate.value, event);
      });
    }
  }

  // if (mode === "thirdStage") {
  //   for (let i = 1; i <= 100; i++) {
  //     let gridCordinate = document.createElement("div");
  //     let enemyCords = document.createElement("div");
  //     let placeHolder = document.createElement("div");
  //     gridCordinate.value = [i];
  //     enemyCords.value = [i];
  //     gridCordinate.setAttribute("id", `gridCord${[i]}`);
  //     enemyCords.setAttribute("id", `enemyCords${[i]}`);
  //     placeHolder.setAttribute("id", `placeHolder${[i]}`);
  //     placeHolder.classList.add("placeholder");
  //     grid.appendChild(gridCordinate);
  //     gridCordinate.appendChild(placeHolder);
  //     gridWrapper.setAttribute("style", "flex-direction: row;");
  //     gridWrapper.appendChild(enemyGrid);
  //     enemyGrid.appendChild(enemyCords);

  //     gridCordinate.addEventListener("mouseover", () => {
  //       event = "mouseover";
  //       mouseHandler(gridCordinate.value, event, mode, enemyPositions);
  //     });
  //     gridCordinate.addEventListener("click", () => {
  //       event = "click";
  //       mouseHandler(gridCordinate.value, event, mode, enemyPositions);
  //     });
  //   }
  // }
}
