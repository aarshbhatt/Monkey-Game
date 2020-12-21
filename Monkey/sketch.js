var PLAY = 1
var END = 2
var gameState = PLAY


var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obsGroup
var score
var jungle, jungleImg
var inv_ground
var GameOver, GameOverImg


function preload(){
  
  jungleImg = loadImage("Jungle2.png.png");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("imgbin_snake-png.png");
  
  GameOverImg = loadImage("output-onlinepngtools.png");
 
}



function setup() {
  createCanvas(600,300)

  jungle = createSprite(800,200,100,100);
  jungle.addImage(jungleImg);
  jungle.x = jungle.x / 2;
  jungle.scale = 1;
  jungle.velocityX = -2;
  
  inv_ground = createSprite(300,260,600,5);
  
  
  monkey = createSprite(50,230,10,10);
  monkey.addAnimation("monkeyRunning",monkey_running);
  monkey.scale = 0.1;
  
  obsGroup = createGroup();
  FoodGroup = createGroup();
  
  GameOver = createSprite(300,150,10,10);
  GameOver.addImage(GameOverImg)
  GameOver.scale = 0.18
  
  score = 0;
}


function draw() {
 //jungle.visible = false
  
    background("white")
  
  //debugging monkey
  // monkey.debug = true;
  
  
  
 //gameState = PLAY
  if(gameState === PLAY){
    
    GameOver.visible = false;
    
  // monkey collides with ground
  monkey.collide(inv_ground);
  
  //reset ground x
  if (jungle.x < 200){
      jungle.x = jungle.width / 2
      }
  
   //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -12;       
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
    //Scoring
    if(monkey.isTouching(FoodGroup)){
       score = score +1;
       monkey.scale = monkey.scale + 0.01
            
       FoodGroup.destroyEach();
       }
    
    SpawnObs();
    SpawnFood();
    
    
    if(monkey.isTouching(obsGroup)){
      monkey.scale = monkey.scale / 2;
      obsGroup.destroyEach();
    }
    
  if(monkey.scale < 0.03){
    gameState = END;
    
  }
    
  } else if (gameState === END){
    
    GameOver.visible = true;
    
    obsGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    jungle.velocityX = 0;
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    
    obsGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    
   
  
  
  if(keyDown("r")){
    
    FoodGroup.destroyEach();
    obsGroup.destroyEach();
    
    gameState = PLAY
    reset();
  }
  }
  
  drawSprites();
  
  //score 
  stroke(2);
  text("Score:" + score, 550,50);
}

function SpawnObs(){
  
   if (frameCount % 80 === 0){
  var obs = createSprite(600,240,10,10)
  obs.addImage(obstacleImage);
  obs.scale = 0.03
  obs.lifetime = 150; 
  obs.velocityX = -5
     
 // obs.debug = true;
  obs.setCollider("rectangle",0,0,500,1500)
  
  obsGroup.add(obs);
}
}

function SpawnFood(){
  
  if (frameCount % 130 === 0){
  var Fr = createSprite(600,Math.round(random(150,245)),10,10)
  Fr.addImage(bananaImage);
  Fr.scale = 0.03
  Fr.lifetime = 150; 
  Fr.velocityX = -5
  Fr.scale = 0.1;
    
  //Fr.debug = true
  Fr.setCollider("rectangle",0,0, Fr.width, 350)
    
  Fr.depth = GameOver.depth;
  GameOver.depth = GameOver.depth + 1;
    
  FoodGroup.add(Fr);
    
}
}




function reset(){
  gameState = PLAY;
  jungle.velocityX = -2;
  monkey.x = 50;
  monkey.scale = 0.1;
  
  score = 0;
  
  
}

