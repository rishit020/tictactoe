const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const resetButton = document.querySelector('.reset');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.querySelector('.result-message');
const newGameButton = document.querySelector('.new-game');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Handle cell click
function handleCellClick(clickedIndex) {
    if (gameState[clickedIndex] !== '' || !gameActive) return;

    gameState[clickedIndex] = currentPlayer;
    cells[clickedIndex].textContent = currentPlayer;

    if (checkWinner()) {
        gameActive = false;
        resultScreen.style.display = 'block';
        resultMessage.textContent = `Player ${currentPlayer} Wins!`;
        return;
    }

    if (gameState.every(cell => cell !== '')) {
        gameActive = false;
        resultScreen.style.display = 'block';
        resultMessage.textContent = 'It\'s a Draw!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

// Restart the game
resetButton.addEventListener('click', () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    statusDisplay.textContent = 'Player X\'s Turn';
    resultScreen.style.display = 'none';
});

// Start new game
newGameButton.addEventListener('click', () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    statusDisplay.textContent = 'Player X\'s Turn';
    resultScreen.style.display = 'none';
});

// Add event listeners to the cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});
