function clearGameWrapper() {
  const gameWrapper = document.getElementById("gameWrapper");

  while (gameWrapper.firstChild) {
    gameWrapper.removeChild(gameWrapper.firstChild);
  }
}

export { clearGameWrapper };
