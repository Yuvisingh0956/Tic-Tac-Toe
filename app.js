let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; //playerX, player0
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const showWinner = (winner) => {
    if (winner == "Draw"){
        msg.innerText = `Match Drawn`;
        msgContainer.classList.remove("hide");
        disabledBoxes();
        count = 0;
    }
    else{
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disabledBoxes();
        count = 0;
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0) {
            box.innerHTML = "O";
            turn0 = false;
            box.style.color = '#b041b0';
            count = count + 1;
        } else {
            box.innerHTML = "X";
            turn0 = true;
            box.style.color = 'green';
            count = count + 1;
        }
        box.disabled = true;

        if(count == 9) {
            showWinner("Draw");
        } else{
            checkWinner();
        }
        console.log(count);
    });
});

const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const checkWinner= () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner", pos1Val);
                showWinner(pos1Val);
            }
        }
    }
}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);