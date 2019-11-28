var s;
var scl = 20;
var guest;
var statement = "i've questioned you";
var ask = false;


//buttons
var downBtn = document.querySelector(".down");
downBtn.addEventListener("click", e => {
    e.preventDefault();
    s.move(0, 1);
})
var upBtn = document.querySelector(".up");
upBtn.addEventListener("click", e => {
    e.preventDefault();
    s.move(0, -1);
})
var leftBtn = document.querySelector(".left");
leftBtn.addEventListener("click", e => {
    e.preventDefault();
    s.move(-1, 0);
})
var rightBtn = document.querySelector(".right");
rightBtn.addEventListener("click", e => {
    e.preventDefault();
    s.move(1, 0);
})
var questBtn = document.querySelector(".question");
questBtn.addEventListener("click", e => {
    e.preventDefault();
    ask = true;
    setTimeout(function(){
      ask = false;
    },99);
})





function setup() { 
  var cnv = createCanvas(windowWidth/2, windowHeight/2);
  cnv.style("display", "block");
  cnv.parent("canvas");
  s = new Snake();
  frameRate(10);
  pickLocation();
} 

function windowResized(){
    resizeCanvas(windowWidth/2, windowHeight/2);
}

function pickLocation(){
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    guest = createVector(floor(random(cols)), floor(random(rows)));
    guest.mult(scl);
}

function draw() { 
  background(51);
  s.update();
  s.show();
  if (s.question(guest)=== true && ask === true){
        console.log(statement);
  }
  fill(255, 0, 100);
  rect(guest.x, guest.y, scl, scl);
//   walls();
// ask();
// stopAsking();
  
  
  
}

// function keyPressed(){
//     if (keyCode === 81){
//         console.log("asking");
//     }
// }

// function keyReleased(){
//     if (keyCode === 81){
//         console.log("stoppedasking")
//     }
// }

function keyPressed(){
  if (keyCode === UP_ARROW){
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW){
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW){
    s.dir(1, 0)
  } else if (keyCode === LEFT_ARROW){
    s.dir(-1, 0);
  } else if (keyCode === 81){
      ask = true;
  }
}



function keyReleased(){
    if (keyCode === UP_ARROW){
        s.dir(0, 0);
      } else if (keyCode === DOWN_ARROW){
        s.dir(0, 0);
      } else if (keyCode === RIGHT_ARROW){
        s.dir(0, 0)
      } else if (keyCode === LEFT_ARROW){
        s.dir(0, 0);
      } else if (keyCode === 81){
          //consider 9ms timeout
          ask = false;
      }
}

//constructor function for the snake
function Snake(){
  this.x = 20;
  this.y = 20;
  this.xspeed = 0;
  this.yspeed = 0;

  
  this.dir = function(x, y){
    this.xspeed = x;
    this.yspeed = y;
  }

  this.move = function (x, y){
      this.x += x * scl;
      this.y += y * scl;
  }
  
  //updates current x and y location based on speed
  this.update = function (){
    this.x += this.xspeed*scl;
    this.y += this.yspeed*scl;


    this.x = constrain(this.x, scl, width-(scl*2));
    this.y = constrain(this.y, scl, height-(scl*2));
  }
  
  //creates the look of the snake
  this.show = function(){
    fill(255);
    rect(this.x, this.y, scl, scl);
  }
  
  this.question = function(pos){
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d<30){
          return true;
      } else {
          return false;
      }
  }

}

function walls(){
    //top boundary
  fill (255, 0, 0);
  rect(0, 0, width, scl);
  //right boundary
  fill (255, 0, 0);
  rect(width-scl, 0, scl, height);
  //bottom boundary
  fill (255, 0, 0);
  rect(0, height-scl, width, scl);
  //left boundary
  fill (255, 0, 0);
  rect(0, scl, scl, height);
}