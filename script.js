let currentPlayer = "X";
let cells = document.querySelectorAll('.cell');
let message = document.getElementById('message');
let againstAI = false; 

function makeMove(cellIndex) {
    if (!cells[cellIndex].innerText) {
        cells[cellIndex].innerText = currentPlayer;
        if (checkWin()) {
            message.innerText = `${currentPlayer} wins!`;
            disableCells();
        } else if (checkDraw()) {
            message.innerText = "It's a draw!";
            disableCells();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            message.innerText = `Player ${currentPlayer}'s turn`;
            if (againstAI && currentPlayer === "O") {
                makeAIMove();
            }
        }
    }
}

function makeAIMove() {
    // Simple AI: Randomly select an empty cell
    let emptyCells = Array.from(cells).filter(cell => cell.innerText === "");
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let randomCell = emptyCells[randomIndex];
    let cellIndex = Array.from(cells).indexOf(randomCell);
    makeMove(cellIndex);
}

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winConditions.some(combination => {
        return combination.every(index => cells[index].innerText === currentPlayer);
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.innerText !== "") && !checkWin();
}

function disableCells() {
    cells.forEach(cell => cell.onclick = null);
}

function enableCells() {
    cells.forEach(cell => {
        cell.innerText = "";
        cell.onclick = () => makeMove(Array.from(cells).indexOf(cell));
    });
}

function resetGame() {
    message.innerText = "";
    currentPlayer = "X";
    enableCells();
    if (againstAI && currentPlayer === "O") {
        makeAIMove(); 
    }
}

function toggleAI() {
    againstAI = !againstAI;
    resetGame();
}
