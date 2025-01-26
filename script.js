const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const newBtn = document.querySelector("#new");
const msgContainer = document.querySelector(".msgContainer");
const msg = document.querySelector("#msg");

let turnO = true;//player0 ,playerX

const winPattern =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];

const reesetGame =()=>{
    turnO =true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            //playerO
            box.innerText="O";
            turnO = false;
        }else{
            //playerX
            box.innerText="X";
            turnO = true;
        }    
        box.disabled = true;

        checkwinner();
    });
});

const enableBoxes =() =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes =() =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const showWinner = (winner)  =>{
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkwinner = () =>{
    for(let pattern of winPattern){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val !=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
}

newBtn.addEventListener("click", reesetGame);
resetBtn.addEventListener("click", reesetGame);