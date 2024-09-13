let board;
let boardWidth = 800;
let boardHeight = 300;
let context;

let playerWidth = 85;
let playerHeight = 85;
let playerX = 50;
let playerY = 215;
let playerImg;
let player = {
    x:playerX,
    y:playerY,
    width:playerWidth,
    height:playerHeight
}
let gameOver = false;
let score = 0;
let time = 0;

let boxImg;
let boxWidth = 40;
let boxHeight = 80;
let boxX = 700;
let boxY = 245;

let boxesArray = [];
let boxSpeed = -5;

let velocityY = 0;
let gravity = 0.25;

let timeon = 60;

let live = 3;

window.onload = function(){
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    playerImg = new Image();
    playerImg.src = "44.png";
    playerImg.onload = function() {
        context.drawImage(playerImg, player.x , player.y , player.width , player.height);
    }

    requestAnimationFrame(update);

    document.addEventListener("keydown", movePlayer);
    document.addEventListener("keydown", refres);
   

    boxImg = new Image();
    boxImg.src = "กำแพง2.png";
    Timelives();

}
function Timelives() {
    let timerandom = Math.floor(Math.random() * (5000)+1000);
    setTimeout(()=>{
        createBox();
        Timelives();
    }, timerandom);
}


function update() {
    requestAnimationFrame(update);
   
    if(gameOver){ 
        return;
    }
   
    context.clearRect(0 , 0 , board.width , board.height); 
    velocityY += gravity;

   
    player.y = Math.min(player.y + velocityY,playerY);
    context.drawImage(playerImg, player.x , player.y , player.width , player.height);
   
    
    for(let i = 0 ; i < boxesArray.length;i++) {
        let box = boxesArray[i];
        box.x += boxSpeed;
        context.drawImage(box.img , box.x , box.y , box.width , box.height);

       
        if(onCollision(player,box)) {
            if(live > 1){
            live--;
            gameOver = true;

            
            context.font = "normal bold 40px Arial";
            context.textAlign = "center";
            context.fillText("Game Over !!",boardWidth/2 , boardHeight/2 );
            context.font = "normal bold 30px Arial";
            context.fillText("Score : " +(score+1),boardWidth/2 , 200 );
            }
           
            else if(live ==1) {
            live--;
            if(live==0) {
            gameOver = true;

            context.font = "normal bold 40px Arial";
            context.textAlign = "center";
            context.fillText("Game Over !!",boardWidth/2 , boardHeight/2 );
            context.font = "normal bold 30px Arial";
            context.fillText("Score : " +(score+1),boardWidth/2 , 200 );
            }
            }
               
            }
    }
score++;
context.font = "normal bold 20px Arial";
context.textAlign = "left";
context.fillText("Score : "+ score , 10 , 30 );
context.fillText("Live : "+ live , 10 , 50 );


time +=0.01;
context.font = "normal bold 20px Arial";
context.textAlign = "right";
context.fillText("Time : "+ (time.toFixed(2)) , 765 , 30 );//

if (time >= timeon) {
    gameOver = true;

    context.font = "normal bold 40px Arial";
    context.textAlign = "center";
    context.fillText("Game Over !!",boardWidth/2 , boardHeight/2 );
    context.font = "normal bold 30px Arial";
    context.fillText("Score : " +(score),boardWidth/2 , 200 );
    }
}




function movePlayer(e) {
    if(gameOver) {
        return;
    }
   
    if(e.code == "Space" && player.y == playerY) {
        velocityY = -10;
    }
}

function createBox() {
    if(gameOver) {
        return;
    }

    let box = {
        img:boxImg,
        x:boxX,
        y:boxY,
        width:boxWidth,
        height:boxHeight
    }

    boxesArray.push(box);

    if(boxesArray.length > 5) {
        boxesArray.shift;
    }
}

function onCollision(obj1 , obj2){
    return obj1.x < (obj2.x + obj2.width) &&
           (obj1.x + obj1.width) > obj2.x 
            &&
           obj1.y < (obj2.y + obj2.height) &&
           (obj1.y + obj1.height) > obj2.y 
}

function restartGame(){
   
    if(live==0){
        location.reload();
    }
}

function refres() {
    if (gameOver==true && live > 0){
        score = 0;
        time = 0;
        gameOver = false;
        boxesArray = [];
    }
}