var car, car_running, edges;
var trackImage;
var track;
var invisibletrack;
var invisibletrack2;
var obstacle;
var obstacleimage;
var obstaclegroup;
var gamestate = "play"
var score=0
function preload()
{
    car_running = loadImage("car2.png");
    trackImage = loadImage("track.jpg")
    obstacleimage = loadImage("obstacle1.png")
}

function setup()
{
    createCanvas(600,400);
    
    // creating car
    car = createSprite(50,160,20,50);
    car.addAnimation("running", car_running);
    //adding scale and position to car
    car.scale = 0.1;
    car.x = 50;
    
    track = createSprite(300, 180, 1200, 5);
    track.addImage(trackImage);
    track.velocityX = -5;
    track.scale = 0.2
    car.depth= track.depth+1
    //invisibe track creation
    invisibletrack = createSprite(300, 285, 1200, 5);
    invisibletrack.visible = false;
    invisibletrack2 = createSprite(300, 85, 1200, 5);
    invisibletrack2.visible = false;
    obstaclegroup= new Group()
}


function draw()
{
    //set backtrack color 
    background("white");
    if (gamestate=="play"){
    score += Math.round(getFrameRate()/60)
    drawSprites();
    fill("purple")
    textSize(30)
    text("Score = "+score, 400, 100)
        //logging the y position of the car
    if(keyDown("up")){
        car.y -= 5
      }
      if(keyDown("down")){
          car.y += 5
        }
      //stop car from falling down
      car.collide(invisibletrack);
      car.collide(invisibletrack2);
      spawobstacles()
    if (track.x<0)
    {
        track.x = 300;
  }
  if (obstaclegroup.isTouching(car)){
      gamestate = "end"
  }
    }
    else if (gamestate == "end"){
     track.velocityX = 0
     obstaclegroup.destroyEach()
      
    drawSprites();
    fill("purple")
    textSize(30)
    text("Score = "+score, 400, 100)
     textSize(50)
     fill("blue")
    text("Game over!", 200, 200)
    }
   
     
}
function spawobstacles(){
    if(frameCount%80===0){
        obstacle=createSprite(600,random(85, 285))
        obstacle.addImage(obstacleimage)
        obstacle.scale = 0.05
        obstacle.velocityX= -5
        obstaclegroup.add(obstacle)
    }
}