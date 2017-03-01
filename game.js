/* --- -- -- -- --- *//* --- -- -- -- --- */
/* --- Invaders --- *//* --- Invaders --- */
/* --- -- -- -- --- *//* --- -- -- -- --- */
/* --- -- -- -- --- *//* --- -- -- -- --- */
/* --- Invaders --- *//* --- Invaders --- */
/* --- -- -- -- --- *//* --- -- -- -- --- */


// Some Global Materials
var score = 0;


/* --- --- The Player --- --- */
/* --- --- The Player --- --- */
/* --- --- The Player --- --- */

// The Player (Constructor Function)
var player = function() {

  this.player = playerImg;

  this.x = 480;
  this.y = 440;

  this.top = false;
  this.bottom = true;
  this.left = false;
  this.right = false;

}

// Player Render Function. Draws Player Position for Each Frame
player.prototype.render = function() {
  ctx.drawImage(this.player, this.x, this.y);
}

// Player Move Function. Takes In KeyCode and Makes the Correct Move
player.prototype.update = function(move) {

  //Checks Position So Player Won't Go Off Game Board (Canvas Element)
  this.checkPosition();

  if(move == 'up') {
    if(this.top == true) {
      return null;
    }
    this.y -= 40;
  }
  else if(move == 'down') {
    if(this.bottom == true){
      return null;
    }
    this.y += 40;
  }
  else if(move == 'left') {
    if(this.left == true){
      return null;
    }
    this.x -= 40;
  }
  else if(move == 'right') {
    if(this.right == true){
      return null;
    }
    this.x += 40;
  }
  else {
    return null;
  }


}

player.prototype.checkPosition = function() {

  // Finds Player Position On the Game Board (By Pixel Coordinates)
  // And Sets it's [top, bottom, left, right] property accordingly

  if(this.x <= 0){
    this.left = true;
    this.right = false;
  }
  else if(this.x >= 940) {
    this.left = false;
    this.right = true;
  }
  else {
    this.left = false;
    this.right = false;
  }
  // --- //
  if(this.y <= 0) {
    this.top = true;
    this.bottom = false;
  }
  else if(this.y >= 440) {
    this.top = false;
    this.bottom = true;
  }
  else {
    this.top = false;
    this.bottom = false;
  }

}

$(document).keyup(function(e) {

  // Collect The keyCode and Identify The allowedKeys

  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  // Call and Pass the Move to The Player Update Function
  Player.update(allowedKeys[e.keyCode]);

})

// Create New Instance of Player Object
var Player = new player;

/* --- --- The Enemy --- --- */
/* --- --- The Enemy --- --- */
/* --- --- The Enemy --- --- */

var Enemy;

var enemySpeed = 0.20;

// The Enemy (Constructor Function)
var enemy = function() {

  this.gool = enemyImg;

  this.x = 0;
  this.y = 0;
  this.speed = enemySpeed;

  this.top = true;
  this.bottom = false;
  this.left = true;
  this.right = false;

}

enemy.prototype.render = function() {
  ctx.drawImage(this.gool, this.x, this.y);
}

enemy.prototype.update = function(dt) {

  if(this.y > Player.y){
    this.y = this.y - this.speed;// * dt;
  }
  if(this.y < Player.y) {
    this.y = this.y + this.speed;// * dt;
  }

  if(this.x > Player.x){
    this.x = this.x - this.speed;// * dt;
  }
  if(this.x < Player.x) {
    this.x = this.x + this.speed;// * dt;
  }





    var leftMax = this.x - 40;
    var rightMax = this.x + 40;
    var topMax = this.y - 40;
    var bottomMax = this.y + 40;

    if(Player.x > leftMax && Player.x < rightMax && Player.y > topMax && Player.y < bottomMax) {
      $('#game-div').hide();
      $('#gmov-img').show();
      retuen;
    }


}

// Create an Instance of Enemy Object
Enemy = new enemy;

/* --- --- The Jewels --- --- */
/* --- --- The Jewels --- --- */
/* --- --- The Jewels --- --- */

var Jewel;

// The Jewel (Constructor Function)
var jewel = function() {

  var k = jewels[Math.floor(Math.random()*jewels.length)];
  console.log('New Jewel - ' + k.jewel);

  this.name = k.jewel;
  this.jewel = k.image;
  this.value = k.value;

  this.x = Math.floor(Math.random() * 900);
  this.y = Math.floor(Math.random() * 400);

}

jewel.prototype.render = function() {
  ctx.drawImage(this.jewel, this.x, this.y);
}

jewel.prototype.collected = function() {

  var leftMax = this.x - 40;
  var rightMax = this.x + 40;
  var topMax = this.y - 40;
  var bottomMax = this.y + 40;

  if(Player.x > leftMax && Player.x < rightMax && Player.y > topMax && Player.y < bottomMax) {
    //console.log('Jewel Collected. New Jewel Created.');
    score += this.value;
    enemySpeed += 0.02;
    Enemy = new enemy;
    $('#score').text(score);
    Jewel = new jewel;
  }

}

// Create New Jewel Object
Jewel = new jewel;
