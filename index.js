let canvas = document.getElementById("myCanvas")
let gameOverText = document.querySelector('.gameOverText')
let scoreNumber = document.getElementById('scoreNumber')
let context = canvas.getContext("2d")
// context ki jagah pat gettext("2d") karke dekha hai
 ////context.font = "bold 30px"



let scrollCounter, camerY, current,mode,xSpeed

let ySpeed=4;
let height=50;

let boxes = [];
boxes[0] = {
    x:300,
    y:300,
    width:200,
}
let debris ={
    x: 0,
    width: 0
}

function newBox(){
    //console.log('new box ' ,boxes)
    boxes[current]= {
        x: 0,
        y:(current + 10) * height,
        width:boxes[current -  1].width
    }
}
function gameOver(){
    ////show game over text
    gameOverText.style.display ='block'
    mode = 'gameOver'
}
function animate(){
  // console.log(mode)
    if(mode != 'gameOver'){
       
        context.clearRect(0, 0, canvas.width, canvas.height)
       //scoreNumber.innerHTML = current - 5
        scoreNumber.innerHTML = current  -1
       for(let n=0; n<boxes.length;n++){
        let box = boxes[n]
        context.fillStyle = color='#FF012D';
        context.fillRect(box.x,600 - box.y + camerY, box.width, height);
       }
       context.fillStyle = 'yellow'
       context.fillRect(debris.x, 600 - debris.y + camerY, debris.width, height)

 if(mode == 'bounce'){
    boxes[current].x = boxes[current].x + xSpeed;
    if(xSpeed>0 && boxes[current].x + boxes [current].width  > canvas.width)
       xSpeed = -xSpeed 
    if(xSpeed<0 && boxes[current].x<0){
        xSpeed = -xSpeed  
    }
 }

 if( mode == 'fall'){
    boxes[current].y =boxes[current].y - ySpeed;

    if(boxes[current].y == boxes[current-1].y + height){
        mode = 'bounce'

        let difference =boxes[current].x - boxes[current-1].x;

        if(Math.abs(difference) >= boxes[current].width){
            gameOver()
        }
        debris={
            y:boxes[current].y,
            width:difference
        }

        //cut from right
        if(boxes[current].x > boxes[current-1].x){
            boxes[current].width = boxes[current].width  -difference
         debris.x = boxes[current].x +boxes[current].width
        }
        //cut from left 
        else{
            debris.x = boxes[current].x - difference
            boxes[current].width = boxes[current].width  + difference
            boxes[current].x = boxes[current-1].x;


        }
        if(xSpeed>0){
            xSpeed;
        }
        else{
            xSpeed--;
        }
        current++;
        scrollCounter = height
        newBox()
    }
 }

debris.y = debris.y -ySpeed;
if(scrollCounter){
    camerY++;
    scrollCounter--;
}






    }
    window.requestAnimationFrame(animate)

 }
function restart(){
gameOverText.style.display='none'
boxes.splice(1, boxes.length - 1)
mode='bounce'
camerY = 0
scrollCounter = 0
xSpeed = 2
current = 1
newBox()
debris.y = 0
}


canvas.onpointerdown = function(e){
    if(mode == 'gameOver'){
        restart()
    }
    else{
        if(mode == 'bounce'){
            mode = 'fall'
        }
    }
}
restart()
animate()