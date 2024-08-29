// Select DOM elements for the grid and score display
const grid = document.querySelector("[data-id]");
const score = document.querySelector(".score");
const player1 = document.querySelector(".x");
const player2 = document.querySelector(".o");

// Gameboard module
const Gameboard = () => {
  let rows = 3;
  let columns = 3;
  let gameBoard = [];

  // Create the game board
  function createBoard() {
    for (let row = 0; row < rows; row++) {
      gameBoard[row] = [];
      for (let col = 0; col < columns; col++) {
        gameBoard[row][col] = "";
        let square = document.createElement("button");
        square.classList.add("square");
        square.setAttribute("id", `${row}${col}`);
        square.addEventListener("click", fire);
        grid.appendChild(square);
      }
    }
  }

  // Handle a player's move
  const fire = (e) => {
    game.playRound(e.target.id, e);
  };

  // Update the board with the player's move
  const draw = (activeplayer, cell, e) => {
    let a, b;
    if (typeof cell === "string") {
      a = parseInt(cell.charAt(0));
      b = parseInt(cell.charAt(1));
    } else if (typeof cell === "number") {
      a = Math.floor(cell / 10);
      b = cell % 10;
    }
    gameBoard[a][b] = activeplayer.mark;
    e.target.textContent = activeplayer.mark;
    e.disabled = true;
    e.target.removeEventListener("click", fire);
    return true;
  };

  // Get the current game board
  const getBoard = () => gameBoard;

  // Print the board to the console
  const printBoard = () => {
    for (let row = 0; row < gameBoard.length; row++) {
      let rowString = "";
      for (let col = 0; col < gameBoard[row].length; col++) {
        rowString += gameBoard[row][col] + " ";
      }
      console.log(rowString);
    }
  };

  // Reset the game board
  const resetBoard = () => {
    grid.innerHTML = "";
    score.textContent = "score:";
    game.setDefaultPlayer();
    createBoard();
  };

  return { getBoard, createBoard, draw, printBoard, resetBoard };
};

// Check for a tie on the board
function checkTie(board) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "") return false;
    }
  }
  return true;
}

// Check for a win on the board
function checkWind(board, mark) {
  return (
    horizontalCheck(board, mark) ||
    verticalCheck(board, mark) ||
    diagonalCheck(board, mark)
  );
}

// Check for a vertical win
function verticalCheck(board, mark) {
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] == mark &&
      board[1][col] == mark &&
      board[2][col] == mark
    ) {
      return true;
    }
  }
  return false;
}

// Check for a horizontal win
function horizontalCheck(board, mark) {
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] == mark &&
      board[row][1] == mark &&
      board[row][2] == mark
    ) {
      return true;
    }
  }
  return false;
}

// Check for a diagonal win
function diagonalCheck(board, mark) {
  if (
    (board[0][0] == mark && board[1][1] == mark && board[2][2] == mark) ||
    (board[0][2] == mark && board[1][1] == mark && board[2][0] == mark)
  ) {
    return true;
  }
  return false;
}

// Game controller module
const GameController = (
  playerOneName = "player One",
  playerTwoName = "player Two"
) => {
  let Game = Gameboard();
  Game.createBoard();
  let reset = Game.resetBoard;
  let board = Game.getBoard();
  const player = [
    {
      name: playerOneName,
      mark: "X",
    },
    {
      name: playerTwoName,
      mark: "O",
    },
  ];

  let activeplayer = player[0];

  // Switch the active player
  function switchPlayer() {
    activeplayer = activeplayer === player[0] ? player[1] : player[0];
  }

  // Play a round of the game
  function playRound(cell, e) {
    Game.draw(activeplayer, cell, e);
    if (checkWind(game.board, activeplayer.mark)) {
      score.innerText = `${activeplayer.name} with ${activeplayer.mark}, is the winner`;

      if (activeplayer.mark === "X") {
        player1.textContent = parseInt(player1.textContent) + 1;
      } else {
        player2.textContent = parseInt(player2.textContent) + 1;
      }
      setTimeout(() => {
        game.reset();
      }, 2000);
    }
    if (
      parseInt(player1.textContent) > 4 ||
      parseInt(player2.textContent) > 4
    ) {
      score.textContent =
        parseInt(player1.textContent) > 4
          ? "X is the winner of the game"
          : "O is the winner of the game";
      player1.textContent = "0";
      player2.textContent = "0";
      return;
    }
    if (checkTie(game.board)) {
      alert("TIE!!!");
      game.reset();
      return;
    }
    game.switchPlayer();
  }

  // Set the default player
  let setDefaultPlayer = () => {
    activeplayer = player[0];
  };

  return {
    playRound,
    activeplayer,
    switchPlayer,
    board,
    reset,
    setDefaultPlayer,
  };
};

// Update module
const Update = () => {
  const render = () => {};
  const updateScore = (e) => {
    e.textContent = parseInt(e.textContent) + 1;
  };

  return { render, updateScore };
};

// Start the game
const game = GameController();
