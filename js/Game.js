class Game {
    constructor(){}
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      });
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }

    async start(){
        if(gameState === 0){
          player = new Player();
          var playerCountRef = await database.ref('playerCount').once("value");
          if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            player.getCount();
          }
          
          Form = new form();
          Form.display();
          player1 = createSprite(displayWidth/20,displayHeight - 100,10,10);
          player2 = createSprite(displayWidth/2 + 200 , displayHeight -100,10,10);
         
        }
      }
       
    pl1(){
      Form.hide();
      var maze1 = createSprite(displayWidth/2,displayHeight/2 + 70,5,800);
      var maze2 = createSprite(displayWidth - displayWidth ,displayHeight/2,50,800);
      var maze3 = createSprite(displayWidth - 20,displayHeight/2,50,800);
      var maze4 = createSprite(displayWidth/20 - 5,displayHeight/40,500,50);
      var maze5 = createSprite(displayWidth - 45,displayHeight/40,500,50);
      var maze6 = createSprite(displayWidth/2,displayWidth - 20,800,50);
      var maze7 = createSprite(displayWidth/2,displayHeight - 150,200,50);
      var maze8 = createSprite(displayWidth/2 - 90 ,displayHeight/4 - 20,30,600);
      var maze9 = createSprite(displayWidth/2 + 90,displayHeight/4 - 20,30,600);
      var maze10 = createSprite(displayWidth/4 - 60,displayHeight - 200,20,800);
      var maze11 = createSprite(displayWidth - 240,displayHeight - 200,20,800);
      var maze12 = createSprite(displayWidth/8 - 40,displayHeight - 150,40,40);
      var maze13 = createSprite(displayWidth/20,displayHeight/2 + 100,80,60);
      var maze14 = createSprite(displayWidth/6,displayHeight/2 - 30,80,60);
      var maze15 = createSprite(displayWidth/10 ,displayHeight/4,5,100);
      var maze16 = createSprite(displayWidth/40,displayHeight/5 - 10,205,5);
      //var maze17 = createSprite(displayWidth/5 - 60,displayHeight/10 - 20,200,100);
      //var maze18 = createSprite(displayWidth/5 - 60, displayHeight/2 - 30,40,200);
      var maze17 = createSprite(displayWidth/2 - 180,displayHeight/2 + 180,40,40);
      var maze18 = createSprite(displayWidth/2 - 280, 0, 400,85);
      var maze19 = createSprite(displayWidth/2 + 280, 0, 400,85);
      //player2
      var maze20 = createSprite(displayWidth/2 + 180,displayHeight/2 + 180,40,40);
      var maze21 = createSprite(displayWidth/2 + 180,displayHeight/2 - 30,40,200);
      var maze22 = createSprite(displayWidth/2 + 180,displayHeight/10 - 20,200,100);
      var maze23 = createSprite(displayWidth - 20,displayHeight/5 - 10,205,5);
      var maze24 = createSprite(displayWidth - 120,displayHeight/4,5,100);
      var maze25 = createSprite(displayWidth - 190,displayHeight/2 - 30,80,60);
      var maze26 = createSprite(displayWidth - 80,displayHeight/2 + 100,80,60);
      var maze27 = createSprite(displayWidth - 120, displayHeight - 150,40,40);


      var maze28 = createSprite(displayWidth/2 - 180,displayHeight/2 + 180,40,40);
      var maze29 = createSprite(displayWidth/2 - 180,displayHeight/2 - 30,40,200);
      var maze30 = createSprite(displayWidth/2 - 180,displayHeight/10 - 20,200,100);
      var maze31 = createSprite(displayWidth + 20,displayHeight/5 - 10,205,5);
      var maze32 = createSprite(displayWidth + 120,displayHeight/4,5,100);
      var maze33 = createSprite(displayWidth + 160,displayHeight/2 - 30,80,60);
      var maze34 = createSprite(displayWidth + 80,displayHeight/2 + 100,80,60);
      var maze35 = createSprite(displayWidth + 120, displayHeight - 150,40,40);

      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        /*for (var plr in allPlayers){
          console.log(plr);
        }*/
        player1.x = allPlayers.player1.x;
        player1.y = allPlayers.player1.y;
        player2.x = allPlayers.player2.x;
        player2.y = allPlayers.player2.y;
        
      }
      this.movePlayer();
      drawSprites();

  
      /*1)create maze for player 1 and 2 
      2)movement of both the players. 
      3)rotation of the players
      4)spawning obstacles.
      5)shooting
      6)collision of the obstacles
      7)change state and extra points. Also destroy the sprites*/  
    }  


    pl2(){
      /*1)Add a water background, change player image
      2)add obstacles
      3)check collision
      4)player movement
      5)change state*/

      //Creating the player one sprite and setting its animation. 
      player1 = createSprite(100, 350,5,5);
      player1.setAnimation("playerShip3_blue_1");
      //Scaling down player one
      player1.scale=0.7;
      //Setting player one's collider
      player1.setCollider("circle",0,0,40);
 
      //Creating the player two sprite and setting its animation.
      player2 = createSprite(300, 350,5,5);
      player2.setAnimation("playerShip3_green_1");
      //Scaling down player two
      player2.scale=0.7;
      //Setting player two's collider
      player2.setCollider("circle",0,0,40);

      //Creating variable for game state.
     // var START = 2;
      var PLAY = 1;
      //var END = 0;
      //Setting the game state to start.
      gameState=PLAY; 

      //Creating the group for planes.
      var planesGroup = createGroup();

     
      //Setting a background colour.
      background("lightblue");
 
      //Conditions while playing the game.
      if (gameState===PLAY){
        //Making the start button disappear during the game.
        //start.visible= false;
        //Setting the control keys.
        controlKeys(); 
        //Spawning the planes
        this.spawnPlanes();
        //Creating a points system.
        // points();
        //Colliding the jet with the bottom edge.
        this.limits();
        //Bringing the players back to original position after touching the plane.
        this.respawnPlayer();
        
      }

      drawSprites();
    }

 spawnPlanes(){
//Spawning planes after every 50 frames.
if(World.frameCount%50===0){
//Creating the plane sprite
  var plane = createSprite(0,200,10,10);
//Random number to set the plane animation.
  var r = randomNumber(1,4);
//Setting the pane animation
 // plane.setAnimation("plane"+r);
//Randomizing the spawning point of the plane
  plane.y=randomNumber(0,300);
//Setting plane velocity
  plane.velocityX=2;
//Scaling down the plane
  plane.scale=0.3;
//Setting thw lifetime for plane to avoid memory leak
  plane.lifetime=200;
//Adding the plane sprite to the plane's group
 // planesGroup.add(plane);
  }
//Creating a similar condition to spawn planes from both the sides
if(World.frameCount%50===0){
  var Plane = createSprite(400,200,10,10);
  var p = randomNumber(5,8);
 // Plane.setAnimation("plane"+p);
  Plane.y=randomNumber(0,300);
  Plane.lifetime=200;
  Plane.velocityX=-2;
  Plane.scale=0.3;
  //planesGroup.add(Plane);
}

  
 }

 controlKeys(){
   movePlayer();
 
}

 points(){
//Creating conditions to increase score
  if(player1.y<0){
    //score1=score1+1;
    player1.y=350;
  }
  if(player2.y<0){
    //score2=score2+1;
    player2.y=350;
  }
  
  
}

 limits(){
//Not allowing the players to fall off
  createEdgeSprites();
  player1.collide(bottomEdge);
  player2.collide(bottomEdge);
}
    


    //gameOver(){
      /*1)display winning message
        2)
      */
   // }  
   

    movePlayer(){
      console.log("move");
      console.log(player.index);
    if(keyIsDown(UP_ARROW)){
      player.y = player.y - 25;
    }
    if(keyIsDown(DOWN_ARROW)){
      player.y = player.y + 25;
    }
    if(keyIsDown(LEFT_ARROW)){
      player.x = player.x - 25;
    }
    if(keyIsDown(RIGHT_ARROW)){
      player.x = player.x + 25;
    }
    /*if(keyIsDown(LEFT_ARROW)){
      player.rotation(90);
    }
    if(keyIsDown(RIGHT_ARROW)){
      player.rotation(270);
    }*/
    player.update();
  }

}
