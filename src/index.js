import _ from 'lodash';
import './style.css';
import { begin } from './begin';
import { clearGameWrapper } from './clear';
import { setUp } from './set';

let playerName;

window.onload = begin();

const nameInput = document.getElementById('nameInput');
const gameWrapper = document.getElementById('gameWrapper');

nameInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && nameInput.value !== '') {
    playerName = nameInput.value;
    clearGameWrapper(gameWrapper);
    setUp(playerName);
  }
});
