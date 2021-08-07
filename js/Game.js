class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

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
      form = new Form()
      form.display();
    }
    car1 = createSprite(100, 200)
    car1.addImage(acar1)
    car2 = createSprite(300, 200)
    car2.addImage(acar2)
    car3 = createSprite(500, 200)
    car3.addImage(acar3)
    car4 = createSprite(700, 200)
    car4.addImage(acar4)

    cars = [car1, car2, car3, car4]
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getCarsAtEnd()

    if(allPlayers !== undefined){

      background(rgb(68,68,68))
      image(track, 0, -displayHeight*4, displayWidth, displayHeight*5)
      var index=0
      var x=200
      var y
      for(var plr in allPlayers){
        index = index+1
        x= 200+ (index*200)+ allPlayers[plr].xPos
        y = displayHeight-allPlayers[plr].distance
        cars[index-1].x  = x
        cars[index-1].y = y
        if (index === player.index){
          stroke(10)
          fill("blue")
          ellipse(x,y,100,100);

          camera.position.x = displayWidth/2
          camera.position.y = cars[index-1].y
        }
      }
    }

    //if(keyIsDown(UP_ARROW) && player.index !== null){
     // player.distance +=50
      //player.update();
    //}
    if(player.distance<3500){

    
    if(keyIsDown(38)&&player.index!==null){
      yVel+=0.9
      if(keyIsDown(37)){
        xVel-= 0.2
      }
      if(keyIsDown(39)){
        xVel += 0.2
      }
    }
    else if(keyIsDown(38)&&yVel>0&&player.index!==null){
      xVel*=0.9
      yVel-=0.1
    }

    else{
      yVel*=0.985
      xVel*=0.985
    }

    }

    player.distance+=yVel
    yVel*=0.98
    player.xPos+=xVel
    xVel*=0.98
    player.update();

    player.xPos+=xVel
    xVel*=0.985

    if(player.distance>4300){
      gameState=2;
      player.rank+= 1
      Player.updateCarsAtEnd(player.rank) 
    }
    drawSprites();
  }

  displayRank(){
    camera.position.x = 0
    camera.position.y = 0
    imageMode(CENTER)

    image(bronze, displayWidth/-4, -100+ displayHeight/9, 200, 240);
    image(silver, displayWidth/4, -100+ displayHeight/10, 225, 270);
    image(gold, 0 , -100, 250, 300);

    textAlign(CENTER);
    textSize(50)
    for(var plr in allPlayers){
      if(allPlayers[plr].rank===1){
        text("Ist " + allPlayers[plr].name, 0, 85)
      }
      else if(allPlayers[plr].rank===2){
        text("IInd " + allPlayers[plr].name, displayWidth/4, displayHeight/9+73)
      }

      else if(allPlayers[plr].rank===3){
        text("IIIrd " + allPlayers[plr].name, displayWidth/-4, displayheight/10+76)
      }

      else if (allPlayers[plr].rank===4){
        text("IVth " + allPlayers[plr].name, 0, 255)
      }


    }
      

      
  }

  end(){
    console.log(game.end);
    console.log(player.rank)
  }
}
