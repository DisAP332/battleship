function createGrid() {
  const gameWrapper = document.getElementById('gameWrapper');
  const grid = document.createElement('div');
  grid.setAttribute('id', 'grid');

  gameWrapper.appendChild(grid);

  for (let i = 1; i <= 100; i++) {
    let gridCordinate = document.createElement('div');
    gridCordinate.setAttribute('value', [i]);
    // gridCordinate.setAttribute('style', 'border:1px solid rgba(0, 0, 0, 0.253);background-color:lightblue;');
    gridCordinate.setAttribute('id', 'gridCord');
    grid.appendChild(gridCordinate);
  }
}

export { createGrid };
