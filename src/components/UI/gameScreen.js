import createGrid from "./createGrid";

export function gameScreen() {
  const gameWrapper = document.getElementById("gameWrapper");
  const gridWrapper = document.createElement("div");

  gridWrapper.setAttribute("class", "desktopCorrector");
  gridWrapper.setAttribute("id", "gridWrapper");

  gameWrapper.appendChild(gridWrapper);

  createGrid("gameStage");
}
