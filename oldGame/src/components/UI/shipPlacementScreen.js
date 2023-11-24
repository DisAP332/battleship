import createGrid from "./createGrid.js";
import { changeAxis } from "../mouseHandler.js";
import Player from "../gameMechanics/player.js";

export default function shipPlacementScreen(player) {
  const gameWrapper = document.getElementById("gameWrapper");
  const greetingbox = document.createElement("div");
  const greeting = document.createElement("h1");
  const gridWrapper = document.createElement("div");
  const setUpwrapper = document.createElement("div");
  const axisButton = document.createElement("button");
  const resetButton = document.createElement("resetButton");
  const confirmPosition = document.createElement("button");

  gridWrapper.setAttribute("id", "gridWrapper");
  setUpwrapper.setAttribute("id", "setUpWrapper");
  greetingbox.setAttribute("id", "greeting");
  axisButton.setAttribute("id", "axisBTN");
  resetButton.setAttribute("id", "resetBtn");

  greeting.setAttribute("style", "font-size:3rem");
  greeting.textContent = `${player.name} set your cordinates!`;
  gameWrapper.appendChild(greeting);
  gameWrapper.appendChild(setUpwrapper);

  axisButton.textContent = "AXIS";
  resetButton.textContent = "RESET";
  confirmPosition.textContent = "COFIRM";

  setUpwrapper.appendChild(gridWrapper);

  createGrid("setupStage");
  gridWrapper.appendChild(axisButton);
  gridWrapper.appendChild(resetButton);
  gridWrapper.appendChild(confirmPosition);

  resetButton.addEventListener("click", () => {
    player.resetBoard();
  });

  axisButton.addEventListener("click", () => {
    changeAxis();
  });

  // confirmPosition.addEventListener("click", () => {
  //   if (ShipPositions.length === 17) {
  //     // gameWrapper.remove();
  //     // enemyAI("choosePositions");
  //     // console.log(enemyPositions);
  //     // game("gameSetup");
  //   }
  // });
}
