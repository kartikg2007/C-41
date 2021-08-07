var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var car1, car2, car3, car4, cars;
var acar1, acar2, acar3, acar4, track, wlc
var xVel, yVel;
var gold, silver, bronze;


function preload(){
  acar1 = loadImage("images/car1.png")
  acar2 = loadImage("images/car2.png")
  acar3 = loadImage("images/car3.png")
  acar4 = loadImage("images/car4.png")
  track = loadImage("images/track.jpg")
  wlc = loadImage("images/race.jpg")
  gold = loadImage("images/gold.png")
  silver = loadImage("images/silver.png")
  bronze = loadImage("images/bronze.png")
  //f1 = loadImage("images/f1.png")

}

function setup(){
  canvas = createCanvas(displayWidth-20 ,displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  xVel = 0;
  yVel = 0;
}


function draw(){
  background(wlc)
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState === 2){
    game.displayRank();
  }
}
