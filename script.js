const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const newBtn = document.querySelector("#new");
const msgContainer = document.querySelector(".msgContainer");
const msg = document.querySelector("#msg");
const gameContainer = document.querySelector("#gameContainer");
const introScreen = document.querySelector("#introScreen");
const startBtn = document.querySelector("#startBtn");
const turnDisplay = document.querySelector("#turnDisplay");
const scoreO = document.querySelector("#scoreO");
const scoreX = document.querySelector("#scoreX");

let turnO = true;
let playerO = "Player O";
let playerX = "Player X";
let score = { O: 0, X: 0 };

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

// Start game
startBtn.addEventListener("click", () => {
  const oName = document.querySelector("#playerO").value.trim() || "Player O";
  const xName = document.querySelector("#playerX").value.trim() || "Player X";

  playerO = oName;
  playerX = xName;

  introScreen.classList.add("hide");
  gameContainer.classList.remove("hide");
  updateTurnDisplay();
});

const updateTurnDisplay = () => {
  turnDisplay.textContent = `Turn: ${turnO ? playerO : playerX} (${turnO ? "O" : "X"})`;
};

const resetGame = () => {
  turnO = true;
  boxes.forEach((box) => {
    box.disabled = false;
    box.textContent = "";
    box.classList.remove("winner");
    box.style.color = ""; // reset color
  });
  msgContainer.classList.add("hide");
  updateTurnDisplay();
};

const disableBoxes = () => boxes.forEach(b => b.disabled = true);

const highlightWinner = (pattern, winner) => {
  const color = winner === "O" ? "#2563eb" : "#dc2626";
  pattern.forEach(i => {
    boxes[i].classList.add("winner");
    boxes[i].style.color = color;
  });
};

const showWinner = (winner, pattern) => {
  msg.textContent = `🎉 ${winner === "O" ? playerO : playerX} Wins!`;
  msgContainer.classList.remove("hide");
  highlightWinner(pattern, winner);
  disableBoxes();
  score[winner]++;
  scoreO.textContent = `O: ${score.O}`;
  scoreX.textContent = `X: ${score.X}`;
};

const checkDraw = () => [...boxes].every(b => b.textContent !== "");

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    const val1 = boxes[a].textContent;
    const val2 = boxes[b].textContent;
    const val3 = boxes[c].textContent;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1, pattern);
      return true;
    }
  }
  if (checkDraw()) {
    msg.textContent = "🤝 It's a Draw!";
    msgContainer.classList.remove("hide");
  }
  return false;
};

// Set click events with colors
boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.textContent = "O";
      box.style.color = "#2563eb"; // 💙 Blue O
      turnO = false;
    } else {
      box.textContent = "X";
      box.style.color = "#dc2626"; // ❤️ Red X
      turnO = true;
    }
    box.disabled = true;
    if (!checkWinner()) updateTurnDisplay();
  });
});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", () => {
  score = { O: 0, X: 0 };
  scoreO.textContent = "O: 0";
  scoreX.textContent = "X: 0";
  resetGame();
});
