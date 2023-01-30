/* --- -- -- -- --- *//* --- -- -- -- --- */
/* --- Invaders --- *//* --- Invaders --- */
/* --- -- -- -- --- *//* --- -- -- -- --- */
/* --- -- -- -- --- *//* --- -- -- -- --- */
/* --- Invaders --- *//* --- Invaders --- */
/* --- -- -- -- --- *//* --- -- -- -- --- */


// Some Global Materials
var score = 0;
var isArrowKeyPressed = false;
var currentPressedArrowKey = false;

var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};



const collectedJewels = {

};


/* --- --- The Player --- --- */
/* --- --- The Player --- --- */
/* --- --- The Player --- --- */

// The Player (Constructor Function)
var Player = function() {
  this.player = playerImg;

  this.x = 480;
  this.y = 440;
  this.step = 40;

  this.top = false;
  this.bottom = true;
  this.left = false;
  this.right = false;
}

// Player Render Function. Draws Player Position for Each Frame
Player.prototype.render = function() {
  ctx.drawImage(this.player, this.x, this.y);
}

// Player Move Function. Takes In KeyCode and Makes the Correct Move
Player.prototype.update = function(move) {
  if (!move) {
    return;
  }
  // Checks Position So Player Won't Go Off Game Board (Canvas Element)
  this.checkPosition();

  if(move == 'up') {
    if(this.top == true) {
      return null;
    }
    this.y -= this.step;
  }
  else if(move == 'down') {
    if(this.bottom == true){
      return null;
    }
    this.y += this.step;
  }
  else if(move == 'left') {
    if(this.left == true){
      return null;
    }
    this.x -= this.step;
  }
  else if(move == 'right') {
    if(this.right == true){
      return null;
    }
    this.x += this.step;
  }
  else {
    return null;
  }
}

Player.prototype.checkPosition = function() {
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


$(document).keydown(function(e) {
  // Collect The keyCode and Identify The allowedKeys
  const arrowKey = allowedKeys[e.keyCode];
  isArrowKeyPressed = !!arrowKey;
  if (isArrowKeyPressed) {
    // Call and Pass the Move to The Player Update Function
    currentPressedArrowKey = arrowKey;
    player.update(currentPressedArrowKey);
  }
});

$(document).keyup(function(e) {
  isArrowKeyPressed = false;
  currentPressedArrowKey = null;
});

// Create New Instance of Player Object
const player = new Player();

/* --- --- The Enemy --- --- */
/* --- --- The Enemy --- --- */
/* --- --- The Enemy --- --- */

var enemy;
var enemySpeed = 0.20;

// The Enemy (Constructor Function)
var Enemy = function() {
  this.ghoul = enemyImg;

  this.x = 0;
  this.y = 0;
  this.speed = enemySpeed;

  this.top = true;
  this.bottom = false;
  this.left = true;
  this.right = false;
}

Enemy.prototype.render = function() {
  ctx.drawImage(this.ghoul, this.x, this.y);
}

Enemy.prototype.update = function(dt) {

  if(this.y > player.y){
    this.y = this.y - this.speed;// * dt;
  }
  else if(this.y < player.y) {
    this.y = this.y + this.speed;// * dt;
  }

  if(this.x > player.x){
    this.x = this.x - this.speed;// * dt;
  }
  else if(this.x < player.x) {
    this.x = this.x + this.speed;// * dt;
  }



  var leftMax = this.x - 40;
  var rightMax = this.x + 40;
  var topMax = this.y - 40;
  var bottomMax = this.y + 40;

  if(player.x > leftMax && player.x < rightMax && player.y > topMax && player.y < bottomMax) {
    $('#game-div').hide();
    $('#gmov-img').show();
    return;
  }
}

// Create an Instance of Enemy Object
enemy = new Enemy();

/* --- --- The Jewels --- --- */
/* --- --- The Jewels --- --- */
/* --- --- The Jewels --- --- */

var jewel;

// The Jewel (Constructor Function)
var Jewel = function() {

  var k = jewels[Math.floor(Math.random() * jewels.length)];
  console.log('New Jewel - ' + k.jewel);

  this.name = k.jewel;
  this.jewel = k.image;
  this.value = k.value;
  this.id = k.id;

  this.x = Math.floor(Math.random() * 900);
  this.y = Math.floor(Math.random() * 400);

}

Jewel.prototype.render = function() {
  ctx.drawImage(this.jewel, this.x, this.y);
}

Jewel.prototype.collected = function() {

  var leftMax = this.x - 40;
  var rightMax = this.x + 40;
  var topMax = this.y - 40;
  var bottomMax = this.y + 40;

  if(player.x > leftMax && player.x < rightMax && player.y > topMax && player.y < bottomMax) {
    //console.log('Jewel Collected. New Jewel Created.');
    score += this.value;
    if (!collectedJewels[this.id]) {
      collectedJewels[this.id] = 1;
    }
    else {
      collectedJewels[this.id] = collectedJewels[this.id] + 1;
    }
    enemy.speed = enemy.speed + 0.1;
    // Enemy = new enemy;
    $('#score').text(score);
    jewel = new Jewel();
  }

}

// Create New Jewel Object
jewel = new Jewel();




const jewelsContainer = $(`#jewels-container`);



function updateCollectedJewels() {
  jewelsContainer.empty();
  for (const jewel of jewelsImages) {
    const num = collectedJewels[jewel.id] || 0;
    const newElm = `<div class="margin--bottom-5 text-white">
      <img src="${jewel.image}" /> <span >(${jewel.value})</span> <span class="text-white">Collected ${num} = ${num * jewel.value}</span>
    </div>`;
    const elm = $(newElm);
    jewelsContainer.append(elm);
  }
}