import Player from "./classes/Player";
import Board from "./classes/Board";
import Game from "./classes/Game";

const playerNameInput = document.getElementById('player-name');
const markX = document.getElementById('mark-x');
const markO = document.getElementById('mark-o');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const boardContainer = document.getElementById('board');
const currentTurn = document.getElementById('current-turn');
const initialScreen = document.getElementById('initial-screen');
const gameScreen = document.getElementById('game-screen');

let game = null;

const startGame = () => {
  const playerName = playerNameInput.value.trim() || 'Игрок';

  const playerMarker = markX.checked ? 'X' : 'O';
  const computerMarker = playerMarker === 'X' ? 'O' : 'X';

  game = new Game(playerName, playerMarker, computerMarker, boardContainer, currentTurn);

  initialScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  game.start();
}

const restartGame = () => {
  initialScreen.classList.remove('hidden');
  gameScreen.classList.add('hidden');

  playerNameInput.value = '';

  markX.checked = true;
  markO.checked = false;

  currentTurn.textContent = '';
  boardContainer.innerHTML = '';

  game = null;
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
