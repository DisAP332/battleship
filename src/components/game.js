import Player from "./gameMechanics/player.js";
import enemyAI from "./gameMechanics/enemyAI.js";
import createBoard from "./gameMechanics/board.js";
import openStartScreen from "./UI/startScreen.js";
import shipPlacementScreen from "./UI/shipPlacementScreen.js";
import { clearGameWrapper } from "./UI/clear";
import { finishPlacingShips } from "./mouseHandler.js";
import { gameScreen } from "./UI/gameScreen.js";

export let player;
export let enemy;

export function Game() {
  const playerBoard = createBoard();
  const enemyBoard = createBoard();
  enemy = enemyAI(enemyBoard, playerBoard);
  player = Player(playerBoard, enemyBoard);
  function startGame() {
    // the enemy places their ships
    enemy.placeShips();

    // a promise that resolves when player sets thier name.
    new Promise((resolve) => {
      // open the start screen
      openStartScreen(player);

      // get the name input data
      const nameInput = document.getElementById("nameInput");

      // when enter is pressed and the input is not empty
      nameInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && nameInput.value !== "") {
          // set the players name
          player.name = nameInput.value;
          // clear the game wrapper
          clearGameWrapper();
          // move on
          resolve();
        }
      });
    })
      // second stage for placiing the ships.
      .then(() => {
        // open the ship placement screen
        new Promise((resolve) => {
          // create ship placement screen
          shipPlacementScreen(player);

          // get confirm button;
          const confirmBtn = document.getElementById("confirmBtn");

          // when successful placements are made move on
          confirmBtn.addEventListener("click", () => {
            if (finishPlacingShips() === true) {
              // clear the game wrapper
              clearGameWrapper();
              // move on
              resolve();
            }
          });
        })
          // third stage where the game takes place
          .then(() => {
            // create the game screen
            gameScreen();
          });
      });
  }
  return { startGame };
}
