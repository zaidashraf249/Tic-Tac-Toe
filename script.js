const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const newBtn = document.querySelector("#new");
const msgContainer = document.querySelector(".msgContainer");
const msg = document.querySelector("#msg");

let turnO = true; // true => O, false => X

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.textContent = "";
  });
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const showWinner = (winner) => {
  msg.textContent = alert(`Congratulations! Winner is ${winner}`);
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkDraw = () => {
  let filled = 0;
  boxes.forEach((box) => {
    if (box.textContent !== "") filled++;
  });
  if (filled === 9) {
    msg.textContent = "It's a Draw!";
    msgContainer.classList.remove("hide");
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const val1 = boxes[a].textContent;
    const val2 = boxes[b].textContent;
    const val3 = boxes[c].textContent;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1);
      return;
    }
  }

  // If no winner yet, check for draw
  checkDraw();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.textContent = "O";
      turnO = false;
    } else {
      box.textContent = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
