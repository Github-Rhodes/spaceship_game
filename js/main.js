var spaceship;
var laser;
var ufos = [];
var score = 0;

function startGame() {
  myGameArea.start();
  spaceship = new component(60, 80, "./img/spaceship.png", 0, 360, "image");
  laser = new component(
    3,
    48,
    "#008800",
    spaceship.x + spaceship.width / 2,
    spaceship.y - 48,
    ""
  );
  //method calls a function or evaluates an expression at specified intervals
  setInterval(addufos, 1500); //1500 = 15 seconds
}

var myGameArea = {
  canvas: document.createElement("canvas"),//create element
  start: function () {
    this.canvas.width = 480; //480//300
    this.canvas.height = 500; //500//440
    this.context = this.canvas.getContext("2d");
    this.canvas.setAttribute("id", "spaceshooter");
    document.getElementById("canvaswrapper").appendChild(this.canvas);
    this.interval = setInterval(updateGameArea, 20);
    this.canvas.addEventListener("mousemove", function (e) {
      myGameArea.x = e.layerX;
      myGameArea.y = e.layerY;
    });
  },
  clear: function () { 
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }, //clearRect() method clears the specified pixels within a given rectangle = clear rectangle within a given rectangle
};

function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
}

function updatelaserBeam() {
  var speed = 6; //gun speed
  if (laser.width == 0) {
    return;
  }
  if (laser.y < -40) {
    laser.y = spaceship.y - laser.height;
    laser.x = spaceship.x + spaceship.width / 2;
  } else {
    laser.y -= speed;
  }
  laser.update();
}

function addufos() {
  // array continous ufos
  var rndXposition = randomizer(240);
  var rndSize = 30 + 30 + randomizer(20);
  ufos[ufos.length] = new component(
    rndSize,
    30 + rndSize,//random size ufo
    "./img/ufo.png",
    rndXposition,//random position
    -60,
    "image"
  );
  console.log(ufos.length);//console log length for randomizer
}

function updateufos() {
  for (var i = 0; i < ufos.length; i++) {
    ufos[i].y += 2;
    ufos[i].update();
  }
}
function randomizer(maxSize) {
  return parseInt(Math.random() * maxSize);
}

function checkCollisions() {
  for (var i = 0; i < ufos.length; i++) {
    if (intersects(laser, ufos[i])) {
      ufos.splice(i, 1);//removes ufo on laser collision
      i--;
      laser.y = -laser.height;
      score = score + 1;//to keep score on laser hit
      document.getElementById("score").innerHTML = score;//score element
    } else if (intersects(spaceship, ufos[i])) {
      spaceship.width = 0;//removes on spaceship collision
      laser.width = 0;
      location.reload(); //auto-refresh screen reloads current document
    } else if (ufos[i].y + ufos[i].height >= 500) {
      ufos.splice(i, 1);//removes ufo from array
      i--;
    }
  }
}

function intersects(a, b) {
  return ( //point of intersection of two lines in two or three dimensions 
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function updateGameArea() {
  myGameArea.clear();
  if (myGameArea.x && myGameArea.y) {
    spaceship.x = myGameArea.x;
    spaceship.y = myGameArea.y - 70;

    //limiting the bounds
    if (spaceship.x >= myGameArea.canvas.width - spaceship.width) {
      spaceship.x = myGameArea.canvas.width - spaceship.width;
    } else {
      spaceship.x = myGameArea.x;
    }

    if (spaceship.y <= spaceship.height) {
      spaceship.y = spaceship.height;
    } else {
      spaceship.y = myGameArea.y - 70;
    }
  }
  checkCollisions();
  spaceship.update();
  updatelaserBeam();
  updateufos();
}

// Images used:
// Spaceship
// Icons made by <a href="https://www.flaticon.com/authors/photo3idea-studio" title="photo3idea_studio">photo3idea_studio</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

// UFOS
// Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>


// Canvas Tutorial
// https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_fillrect

// https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_drawimage

// http://bencentra.com/2017-07-11-basic-html5-canvas-games.html

// Create Game Area and Components
// https://www.w3schools.com/graphics/tryit.asp?filename=trygame_component_simple

// Divs randomizer
// https://stackoverflow.com/questions/4796743/random-position-of-divs-in-javascript

// https://stackoverflow.com/questions/31138699/random-moving-from-coordinates-in-javascript

// Math random
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

// Math interceptor
// https://mathjs.org/docs/reference/functions/intersect.html

// Start game onload
// https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_ev_onload

// Location Reload
// https://www.w3schools.com/jsref/met_loc_reload.asp