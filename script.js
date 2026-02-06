//get board
const board = document.querySelector(".board");
const hitele = document.querySelector(".hit span");
const highscore = document.querySelector('.highscore span');
const scorele = document.querySelector(".score span");
const timeele = document.querySelector(".time span");
const start_btn = document.querySelector('.start-btn');
const start_screen = document.querySelector('.game-start');
const end_btn = document.querySelector('.end-btn');
const end_screen = document.querySelector('.game-end');
const game_screen = document.querySelector('.box');
const restart_btn = document.querySelector('.restart-btn');
const sc = document.querySelector('.sc span');
const hc = document.querySelector('.hc span');
//game constants
const cellSize = 50;
const incScore = 10;

//game states
let currentHitNum = null;
let score = 0;
let highScore = Number(localStorage.getItem("highScore")) || 0;
highscore.textContent=highScore;
let timerid = null;
let timeleft = 7;
let isgamerunning = false;

//no of row and column in board, acc to cell size
let no_of_row = 0;
let no_of_col = 0;

let cellnum=[];  //cell=[div, div, div]
//let cells=[];//to get random number present in board
//Grid Creation using Fragments
let cells=[];
function buildGrid(){
    const rows = Math.floor((board.clientHeight-32)/cellSize);
    const cols = Math.floor((board.clientWidth-32)/cellSize);

    cells = [];
    board.innerHTML = "";

    const frag = document.createDocumentFragment();

    for(let i = 0; i < rows; i++){
        cells[i] = [];
        for(let j = 0; j < cols; j++){
            const div = document.createElement('div');
            div.classList.add('cell');
            cells[i][j] = div;
            frag.append(div);
        }
    }
    board.append(frag);
    no_of_col = cols;
    no_of_row = rows;
}

//Helper Functions
function generateBoardNum(){
    for(let i = 0; i<no_of_row; i++){
        for(let j = 0; j<no_of_col; j++){
            cells[i][j].textContent = getRandomNum();
            cellnum.push(Number(cells[i][j].textContent));
        }
    }
}

function getRandomNum(){
    return Math.floor(Math.random()*(no_of_col)+1);
}

function generateNum(){
    return cellnum[Math.floor(Math.random()*(cellnum.length))];
}

board.addEventListener('click', (e)=>{
    onClickcell(e);
})

function startGame(){
    start_screen.style.display="none";
    game_screen.style.display = "flex";
    buildGrid();
    score = 0;
    isgamerunning = true;
    startRound();
}

function startRound(){
    cellnum.length=0;
    generateBoardNum();
    currentHitNum = generateNum();
    hitele.textContent=currentHitNum;
    startTimer();
}

function onClickcell(e){
    if(!isgamerunning) return;
    if(!e.target.classList.contains('cell')) return;
    let clickednum = Number(e.target.textContent);
    if(clickednum===currentHitNum){
        onCorrectHit();
    }else{
        endGame();
    }
}

function onCorrectHit(){
    score+=incScore;
    scorele.textContent=score;
    clearInterval(timerid);
    startRound();
}

function startTimer(){
    clearInterval(timerid)
    timeleft = 7;
    timeele.textContent=timeleft;
    timerid = setInterval(()=>{
        timeleft--;
        timeele.textContent=timeleft;
        if(timeleft===0){
            clearInterval(timerid);
            endGame();
        }
    },1000);
}

function endGame(){
    game_screen.style.display = "none";
    end_screen.style.display = "flex";
    clearInterval(timerid);
    isgamerunning=false;
    if(score>highScore){
        highScore=score;
    }
    highscore.textContent = highScore;
    sc.textContent=score;
    hc.textContent=highScore;
    localStorage.setItem("highScore", highScore.toString());
    score=0;
}

function reGame(){
    clearInterval(timerid);
    end_screen.style.display="none";
    game_screen.style.display="flex";
    scorele.textContent=0;
    startGame();
}



// startGame();
start_btn.addEventListener('click', startGame);
restart_btn.addEventListener('click', reGame);
end_btn.addEventListener('click', ()=>{
    clearInterval(timerid);
    end_screen.style.display="none";
    start_screen.style.display="flex";
    score=0;
})


const rulebtn = document.querySelector(".rulebtn");
const rules = document.querySelector('.rules');
let displayOn = false;
rulebtn.addEventListener('click', ()=>{
    if(displayOn){
        displayOn=false;
        rules.style.display = 'none';
        rulebtn.textContent="How To Play";
    }else{
        displayOn=true;
        rules.style.display = 'block';
        rulebtn.textContent="Close";
    }
});




