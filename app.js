let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let score = 0;
let h2 = document.querySelector("h2");
let btns = ["red", "green", "yellow", "blue"];

let name = prompt("Enter your name here : ");
let h1Name = document.querySelector("#name");
h1Name.innerText = ` Hello ${name} Lets play`;

function startGame() {
    if (!started) {
        console.log("Game Started.");
        started = true;
        levelUp();
    }
}

// Start on keypress (for desktop/laptop)
document.addEventListener("keypress", startGame);

// Start on click/tap anywhere (for mobile/tablet)
document.addEventListener("click", startGame);

function btnFlast(btn) {
    // Get color name from button id
    let color = btn.id;

    // Create and play the .wav audio
    let audio = new Audio(`sounds/${color}.wav`);
    audio.play();

    // Flash effect
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");


    }, 250);
}


function levelUp() {
    userSeq = [];
    level++;
    score++;
    h2.innerText = `Level ${level}`;
    // Selecting Random Button to flash.. 
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);
    console.log(gameSeq);
    let randBtn = document.querySelector(`.${randColor}`);
    btnFlast(randBtn);
}

function gameOver() {
    setTimeout(function () {
        let body = document.querySelector("body");
        body.style.backgroundColor = "aqua";
    }, 250);
    userSeq = [];
    gameSeq = [];
    started = false;
    level = 0;
    score = 0;

}

function checkResult(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `<h2>Game Over! Your score was ${score} <br>  Press any key to start.<h2>`;
        // Create and play the .wav audio
        let audio = new Audio(`sounds/gameover.mp3`);
        audio.play();
        let body = document.querySelector("body");
        body.style.backgroundColor = "red";
        setTimeout(() => {
            gameOver();
        },2000)
    }
}



function btnPress() {

    btnFlast(this);

    let userColor = this.id;
    userSeq.push(userColor);


    checkResult(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

setTimeout(function () {
    let hint = document.querySelector(".hintBtn");
    hint.addEventListener("click", function () {
        this.style.opacity = "0";
        let h3 = document.createElement("h3");
        let container = document.querySelector(".hint");
        let hintData = gameSeq.toString();
        h3.innerText = hintData;
        container.appendChild(h3);
        setTimeout(function () {
            h3.remove();
            let hint = document.querySelector(".hintBtn");
            hint.style.opacity = '1';
        }, 1500);
    });
}, 1000);


