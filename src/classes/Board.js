

export default class Board {
  constructor(boardContainer) {
    this.boardContainer = boardContainer;
    this.state = Array(9).fill('');
    this.cells = [];
  }

  create(onClickCell) {
    this.boardContainer.innerHTML = '';
    this.state = Array(9).fill('');
    this.cells = [];

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', () => onClickCell(i), { once: true });

      this.boardContainer.appendChild(cell);
      this.cells.push(cell);
    }
  }

setMarker(index, marker) {
  this.state[index] = marker;
  const cell = this.cells[index];
  if (!cell) return;

  cell.textContent = marker;
  cell.classList.add(marker);
}

isBoardFull() {
  return this.state.every(v => v !== '');
}

disable() {
  this.cells.forEach((cell, index) => {
    const clone = cell.cloneNode(true);
    cell.replaceWith(clone);
    this.cells[index] = clone;
  });
}

getEmptyIndices() {
  const emptyIndices = this.state
  .map((v, i) => v === '' ? i : null)
  .filter(i => i !== null);

  return emptyIndices;
}

checkWin(marker) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]

  const findWinningPattern = winPatterns
  .find(pattern => pattern
    .every(index => this.state[index] === marker)
  );

  return findWinningPattern || null;
}

highlightWinningCells(pattern) {
  if (!pattern) return;

  pattern.forEach(i => this.state[i]?.classList.add('win'));
  //... ?. — опциональная цепочка, значит: «если слева не null/undefined — сделай то, что справа, иначе ничего не делай».
}
}
