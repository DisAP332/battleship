import { clearGameWrapper } from "./clear";

export function winScreen(player) {
  clearGameWrapper();

  const gameWrapper = document.getElementById("gameWrapper");

  const winText = document.createElement("h1");

  winText.textContent = `${player} is the winner!`;

  gameWrapper.appendChild(winText);
}
