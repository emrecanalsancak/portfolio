const borderColor = document.querySelectorAll(".border-color");
const cells = document.querySelectorAll(".cell");
const playerX = "X";
const playerO = "O";
let currentPlayer = playerX;

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(event) {
  const cell = event.target;

  if (cell.textContent === "") {
    cell.textContent = currentPlayer;
    if (checkWin()) {
      winningTimeout();
    } else if (checkTie()) {
      tiedDelay();
    } else {
      currentPlayer = currentPlayer === playerX ? playerO : playerX;
      if (currentPlayer === playerO) {
        setTimeout(() => {
          computerMove();
        }, 300);
      }
    }
  }
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
    [2, 4, 6],
  ];
  return winConditions.some((condition) => {
    const [a, b, c] = condition;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent
    ) {
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
    }
    return (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent
    );
  });
}

function checkTie() {
  return [...cells].every((cell) => cell.textContent !== "");
}

function resetGame() {
  borderColor.forEach((border) => {
    border.style.border = "1px solid lightblue";
    border.style.boxShadow = "none";
  });

  cells.forEach((cell) => {
    cell.classList.remove("hidden", "winner", "letter");
    cell.style.opacity = 1;
    cell.textContent = "";
  });
  currentPlayer = playerX;
}

function hideNonWinningCells() {
  borderColor.forEach((border) => {
    border.style.border = "1px solid #0ef";
    border.style.boxShadow = "0px 0px 5px 3px rgba(0, 238, 255, 0.85)";
  });

  cells.forEach((cell) => {
    if (!cell.classList.contains("winner")) {
      cell.style.opacity = 0;
      cell.textContent = "";
    }
  });
}

function hideWinningCell() {
  const winningCell = document.querySelector(".winner");
  winningCell.classList.add("hidden");
  winningCell.classList.remove("winner");
}

function computerMove() {
  const emptyCells = [];
  cells.forEach((cell, index) => {
    if (cell.textContent === "") {
      emptyCells.push(index);
    }
  });
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const cellIndex = emptyCells[randomIndex];
  cells[cellIndex].textContent = playerO;
  if (checkWin()) {
    winningTimeout();
  } else if (checkTie()) {
    tiedDelay();
  } else {
    currentPlayer = playerX;
  }
}

function tiedGame() {
  borderColor.forEach((border) => {
    border.style.border = "1px solid #0ef";
    border.style.boxShadow = "0px 3px 5px 3px rgba(0, 238, 255, 0.85)";
  });
  cells.forEach((cell) => {
    cell.style.textShadow = "1px 1px 6px #0ef";
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function winningTimeout() {
  await delay(200);
  hideNonWinningCells();

  let animateDelay = 100;
  document.querySelectorAll(".winner").forEach((cell, i) => {
    setTimeout(() => {
      cell.classList.add("letter");
    }, animateDelay + i * 100);
  });
  await delay(1500);
  hideWinningCell();
  resetGame();
}

async function tiedDelay() {
  await delay(300);
  tiedGame();
  await delay(1000);
  resetGame();
}
