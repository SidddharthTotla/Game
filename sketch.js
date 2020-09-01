var canvas, backgroundImage;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var player1,player2;


var Form,player,game;

function preload(){
    
}

function setup(){
    canvas = createCanvas(displayWidth,displayHeight);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    if(playerCount===2){
        game.update(1);

    }
    switch(gameState){
        case 1 : game.pl1();
        break;
        case 2 : game.pl2();
        break;
        case 3 : game.end();
        break;
        default: break;
    }
}