let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
let humanVsComputer = false;

function startGame() {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
    document.querySelector("#mode-toggle").style.display = "inline";
}

function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    document.querySelector(".bg").style.left = turn === "X" ? "0" : "85px";
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " is winner 🎉";
            document.querySelector("#play-again").style.display = "inline";
            document.querySelector("#mode-toggle").style.display = "none";
            condition.forEach(index => {
                boxes[index].style.backgroundColor = "#803D3B";
                boxes[index].style.color = "#000";
            });
            return;
        }
    }
}

function checkDraw() {
    if (!isGameOver) {
        let isDraw = Array.from(boxes).every(e => e.innerHTML !== "");
        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
            document.querySelector("#mode-toggle").style.display = "none";
        }
    }
}

function handleClick(e) {
    if (!isGameOver && e.target.innerHTML === "") {
        e.target.innerHTML = turn;
        checkWin();
        checkDraw();
        changeTurn();
        if (humanVsComputer && !isGameOver && turn === "O") {
            computerMove();
        }
    }
}

function computerMove() {
    let emptyBoxes = Array.from(boxes).filter(box => box.innerHTML === "");
    if (emptyBoxes.length > 0) {
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.innerHTML = "O";
        checkWin();
        checkDraw();
        changeTurn();
    }
}

function toggleMode() {
    humanVsComputer = !humanVsComputer;
    document.querySelector("#mode-toggle").innerText = humanVsComputer ? "Switch to Human vs Human" : "Switch to Human vs Computer";
    startGame();
}

document.querySelector("#play-again").addEventListener("click", startGame);
document.querySelector("#mode-toggle").addEventListener("click", toggleMode);

boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", handleClick);
});

startGame();
