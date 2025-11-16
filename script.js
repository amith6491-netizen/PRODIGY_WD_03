let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("status");
let resetBtn = document.getElementById("reset");

let currentPlayer = "X"; // Player is X, AI is O
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningPatterns = [
    [0,1,2], [3,4,5], [6,7,8],       // rows
    [0,3,6], [1,4,7], [2,5,8],       // columns
    [0,4,8], [2,4,6]                 // diagonals
];

cells.forEach(cell => {
    cell.addEventListener("click", playerMove);
});

// Player Move
function playerMove() {
    const index = this.getAttribute("data-index");

    if (board[index] !== "" || !gameActive || currentPlayer !== "X") return;

    board[index] = "X";
    this.textContent = "X";

    checkWinner();

    if (gameActive) {
        currentPlayer = "O";
        statusText.textContent = "AI Thinking...";
        setTimeout(AIMove, 500); // delay for realism
    }
}

// AI Move (Medium Difficulty)
function AIMove() {
    if (!gameActive) return;

    let emptyCells = [];
    board.forEach((cell, i) => {
        if (cell === "") emptyCells.push(i);
    });

    // AI picks a random empty index
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    board[randomIndex] = "O";
    cells[randomIndex].textContent = "O";

    checkWinner();

    if (gameActive) {
        currentPlayer = "X";
        statusText.textContent = "Player X's Turn";
    }
}

// Check winner or draw
function checkWinner() {
    for (let pattern of winningPatterns) {
        let [a, b, c] = pattern;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `${board[a]} Wins!`;
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }
}

resetBtn.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's Turn";
});