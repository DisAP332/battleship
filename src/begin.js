function begin() {
  const content = document.getElementById('content');
  const headerWrapper = document.createElement('div');
  const headerH1 = document.createElement('h1');
  const gameWrapper = document.createElement('div');
  const nameH1 = document.createElement('h1');
  const nameInput = document.createElement('input');

  headerH1.className = 'header';

  gameWrapper.setAttribute('id', 'gameWrapper');
  nameH1.setAttribute('style', 'margin-top: 15vh');
  nameInput.setAttribute('id', 'nameInput');

  headerH1.textContent = 'BATTLESHIP';
  nameH1.textContent = 'Enter your name Cadet!';

  content.appendChild(headerWrapper);
  headerWrapper.appendChild(headerH1);
  content.appendChild(gameWrapper);
  gameWrapper.appendChild(nameH1);
  gameWrapper.appendChild(nameInput);
}

export { begin };
