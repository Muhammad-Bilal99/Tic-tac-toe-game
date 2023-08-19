const gameCells = document.querySelectorAll('.cell');
const winningText = document.querySelector('.winning-text');
const winningMessage = document.querySelector('.winning-message');
const restartBtn = document.querySelector('.restartBtn');

let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

const startGame = () => {
  gameCells.forEach(cell => {
  cell.addEventListener('click', (e) => {
    if (cell.textContent === '') {
    e.target.textContent = playerTurn;
    if (checkWin()) {
      winningMessage.style.display = 'flex';
      winningText.innerText = `${playerTurn}'s Won!`;
    }
    else if(checkTie()){
      winningMessage.style.display = 'flex';
      winningText.innerText = `It's a tie!`
    }
    swapTurns()
  }
  })
})
};

const swapTurns = () => {
  if (playerTurn === currentPlayer) {
    playerTurn = nextPlayer
  }
  else{
    playerTurn = currentPlayer
  }
}

const checkWin = () => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < winningCombinations.length; i++) {
    const [pos1, pos2, pos3] = winningCombinations[i];
    if (gameCells[pos1].textContent !== '' &&
        gameCells[pos1].textContent === gameCells[pos2].textContent &&
        gameCells[pos2].textContent === gameCells[pos3].textContent) {
      return true
    }
  }
  return false
}

const checkTie = () => {
  let emptycellsCount = 0
  gameCells.forEach(cell => {
    if (cell.textContent === '') {
      emptycellsCount ++;
    }
  })
  return emptycellsCount === 0 && !checkWin()
}

const restartGame = () => {
  winningMessage.style.display = 'none'
  gameCells.forEach(cell => {
    cell.textContent = ''
  })
  startGame()
}
restartBtn.addEventListener('click',restartGame)
startGame();
