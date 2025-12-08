import Board from "./Board.js";
import Player from "./Player.js";

export default class Game {
  constructor(playerName, playerMarker, computerMarker, boardContainer, currentTurnElement) {
    this.board = new Board(boardContainer);
    this.player = new Player(playerName, playerMarker)
    this.computer = new Player('Компьютер', computerMarker);
    this.currentTurnElement = currentTurnElement;
    this.currentPlayer = this.player;
    this.isGameOver = false;
  }

  start() {
    this.isGameOver = false;
    this.board.create(i => this.handleCellClick(i));

    // Правильное определение, кто ходит первым
    this.currentPlayer = this.player.marker === 'X' ? this.player : this.computer;
    this.updateTurnText();

    // Если первым ходит компьютер, запускаем его ход
    if (this.currentPlayer === this.computer) {
      this.currentTurnElement.textContent = 'Компьютер думает...';
      setTimeout(() => this.handleComputerMove(), 1000);
    }
  }

  updateTurnText() {
    this.currentTurnElement.textContent = `Ход: ${this.currentPlayer.name} (${this.currentPlayer.marker})`;
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.player ? this.computer : this.player;
  }

  setPlayers(playerName, playerMarker) {
    if (playerMarker !== 'X' && playerMarker !== 'O') {
      playerMarker = 'X';
    }
    
    const computerMarker = playerMarker === 'X' ? 'O' : 'X';

    this.player = new Player(playerName, playerMarker);
    this.computer = new Player('Компьютер', computerMarker);

    this.currentPlayer = playerMarker === 'X'
      ? this.player
      : this.computer;
  }

  handleCellClick(index) {
    if (this.isGameOver) return;
    if (this.currentPlayer === this.computer) return;
    if (this.board.state[index] !== '') return;

    this.board.setMarker(index, this.currentPlayer.marker);

    const winCombo = this.board.checkWin(this.currentPlayer.marker);
    if (winCombo) {
      this.board.highlightWinningCells(winCombo);
      this.currentTurnElement.textContent = `${this.currentPlayer.name} победил! 🎉`;
      this.isGameOver = true;
      this.board.disable();
      return;
    }

    if (this.board.isFull()) {
      this.currentTurnElement.textContent = 'Ничья 🤝';
      this.isGameOver = true;
      this.board.disable();
      return;
    }

    this.switchPlayer()

    if (this.currentPlayer === this.computer) {
      this.currentTurnElement.textContent = 'Компьютер думает...';
      setTimeout(() => this.handleComputerMove(), 1000);
    } else {
      this.updateTurnText();
    }
  }

  handleComputerMove() {
    if (this.isGameOver) return;

    const emptyIndices = this.board.getEmptyIndices();
    if (emptyIndices.length === 0) return;

    const computer = this.computer.marker;
    const player = this.player.marker;

    let moveIndex = null;

    for (let i of emptyIndices) {
      this.board.state[i] = computer;
      if (this.board.checkWin(computer)) {
        moveIndex = i;
        this.board.state[i] = '';
        break;
      }
      this.board.state[i] = '';
    }

    if (moveIndex === null) {
      for (let i of emptyIndices) {
        this.board.state[i] = player;
        if (this.board.checkWin(player)) {
          moveIndex = i;
          this.board.state[i] = '';
          break;
        }
        this.board.state[i] = '';
      }
    }

    if (moveIndex === null) {
      moveIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    this.board.setMarker(moveIndex, computer);

    const winCombo = this.board.checkWin(computer);
    if (winCombo) {
      this.board.highlightWinningCells(winCombo);
      this.currentTurnElement.textContent = `Компьютер (${computer}) победил 🤖`;
      this.board.disable();
      this.isGameOver = true;
      return;
    }

    if (this.board.isFull()) {
      this.currentTurnElement.textContent = 'Ничья 🤝';
      this.board.disable();
      this.isGameOver = true;
      return;
    }

    this.currentPlayer = this.player;
    this.updateTurnText();
  }
}
