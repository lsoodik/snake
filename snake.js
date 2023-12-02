const playingArea = document.querySelector(".playingArea")
const curScore = document.querySelector(".currentScore")
const record = document.querySelector(".highScore")

let foodX, foodY;
let snakeX , snakeY ;
let directionX = 0, directionY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalId;
let score = 0;
let bestScore = localStorage.getItem("highScore") || 0;
record.innerText = `Рекорд: ${bestScore}`;

const generateFood = () => {
  foodX = Math.floor(Math.random() * 20) + 1;
  foodY = Math.floor(Math.random() * 20) + 1;
}

const generateHead = () => {
  snakeX = Math.floor(Math.random() * 20) + 1;
  snakeY = Math.floor(Math.random() * 20) + 1;
}

const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("К сожалению, вы проиграли. Чтобы начать заново нажмите на любую стрелку");
  location.reload()
}

const changeDirection = (e) => {
  if(e.key === "ArrowUp" && directionY != 1){
    directionX = 0;
    directionY = -1;
  } 
  else if(e.key === "ArrowDown" && directionY != -1){
    directionX = 0;
    directionY = 1;
  }
  else if(e.key === "ArrowLeft" && directionX != 1){
    directionX = -1;
    directionY = 0;
  }
  else if(e.key === "ArrowRight" && directionX != -1){
    directionX = 1;
    directionY = 0;
  }
  initGame();
}

const initGame = () => {
  if(gameOver) return handleGameOver();
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  
  if(snakeX === foodX && snakeY === foodY){

    generateFood()
    snakeBody.push([foodX,foodY])
    score++;
    bestScore = score >= bestScore ? score : bestScore;
    localStorage.setItem("highScore", bestScore)

    curScore.innerText = `Текущий счет: ${score}`;
    record.innerText = `Рекорд: ${bestScore}`;

  }
  
  for (let i = snakeBody.length - 1 ; i > 0; i--) {
    snakeBody[i] = snakeBody[i-1]
  }

  snakeBody[0] = [snakeX, snakeY];

  snakeX += directionX;
  snakeY += directionY;

  if (snakeX <= 0 || snakeX > 20 || snakeY <= 0 || snakeY> 20){
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`; 
    if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
      gameOver = true;
    }
  }
	playingArea.innerHTML = htmlMarkup;
}

generateFood();
generateHead();
setIntervalId = setInterval(initGame, 300);
document.addEventListener("keydown", changeDirection);