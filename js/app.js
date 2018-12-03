// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 500){
      this.x = this.x + (this.speed)*dt;
    } else {
      this.speed = Math.floor((Math.random()*100) + 100);
      this.x = -100;
    }
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
 this.sprite = 'images/char-boy.png';
 this.x = 200;
 this.y = 410;
};

//Player health. Player gets 3 lives.
//var health = 3;
//new Text({
//text: () => "Health: " + health,
//  x: -200,
//  y: 410,
//  size: 50
//})

//Code for collision detection between the Player and Enemies
Player.prototype.update = function(dt) {
  for (let enemy of allEnemies) {
    let dx = this.x - enemy.x - 20;
    let dy = this.y - enemy.y - 20;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 56) {
      console.log('hit');
      this.y = 410;
      //health -= 1;
    }
  }
  if (this.y < 10) {
    console.log('You did it!');
    this.y = 410;
  }
};

//Draws the Player on the screen.
Player.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Code for player movement & keeping player from going off screen
Player.prototype.handleInput = function(obj) {
  if (this.x > 0){
		if (obj === 'left'){
			if ( this.allowableSpace(obj)) {
				this.x = this.x -50;
		   }
	  }
  }

	if(this.x <= 400){
		if (obj === 'right'){
			if (this.allowableSpace(obj)) {
			this.x = this.x +50;
			}
		}
	}

	if (this.y >= 0 ){
		if (obj === 'up'){
			if (this.allowableSpace(obj)) {
				this.y = this.y -50;
			}
		}
	}
	if(this.y < 400 ){
		if (obj === 'down'){
			if (this.allowableSpace(obj)) {
				this.y = this.y +50;
			}
		}
	}
};


Player.prototype.allowableSpace = function(direction) {
	var leftFull = false;
	var rightFull = false;
	var upFull = false;
	var downFull = false;
  switch(direction) {
          case ("left"):
              if (leftFull) {
                  return false;
              }
              else {
                  return true;
              }
              break;
          case ("right"):
              if (rightFull) {
                  return false;
              }
              else {
                  return true;
              }
              break;
          case ("up"):
              if (upFull) {
                  return false;
              }
              else {
                  return true;
              }
              break;
          case ("down"):
              if (downFull) {
                  return false;
              }
              else {
                  return true;
              }
              break;
          default:
              return true;

  };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(-200, 65), new Enemy(-150, 145), new Enemy(-100, 230)];

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
