// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = -2;
var labelScore;
var player;
var pipes = [];
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("PlayerImg", "../assets/flappy-cropped.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock", "../assets/pipe_pink.png")
  game.load.audio("USSR", "../assets/USSR.ogg");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    //set the background colour of the scene

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.setBackgroundColor("#FF0000");
    player = game.add.sprite(50,200, "PlayerImg");
    labelScore = game.add.text(10,10,"0");

    game.physics.arcade.enable(player);
    player.body.gravity.y = 200;

    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);
        game.sound.play("USSR")

        var pipeInterval = 2.5 * Phaser.Timer.SECOND;
game.time.events.loop(
 pipeInterval,
 generatePipe
);

game.input.keyboard
 .addKey(Phaser.Keyboard.SPACEBAR)
 .onDown
 .add(playerJump);



    generatePipe();
  }

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
   game.physics.arcade.overlap(player, pipes, gameOver);

 }

function spacebar() {

}



function generatePipe(){
 var gapStart = game.rnd.integerInRange(1, 5);
 for (var count=0; count<8; count=count+1) {
   if(count != gapStart && count != gapStart + 1) {
     addPipeBlock(800, count * 50);
 }
 }
 changeScore();
}

function addPipeBlock(x, y) {
   var block = game.add.sprite(x, y, "pipeBlock");
   pipes.push(block);
   game.physics.arcade.enable(block)
   block.body.velocity.x = -150;

}

function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());
}

function playerJump() {
     player.body.velocity.y = -100
   }

function gameOver() {
    location.reload();
}
