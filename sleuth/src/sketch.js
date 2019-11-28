import React from "react";

function Sketch (p) {
    var s;
    var scl = 10;
    var guest;
    var statement = "i've questioned you";
    var ask = false;




    p.setup = function () {
        var cnv = p.createCanvas(p.windowWidth/2, p.windowHeight/2);
        cnv.style("display", "block");
        cnv.parent("canvas");
        s = new p.Sleuth();
//     frameRate(10);
        p.pickLocation();
    };

    p.windowResized = function (){
        p.resizeCanvas(p.windowWidth/2, p.windowHeight/2);
    }
    

    
      p.draw = function () {
        p.background(51);
        p.fill(255, 0, 100);
        p.rect(30, 30, scl, scl);
        s.update();
        s.show();
      };


        p.pickLocation = function (){
        var cols = Math.floor(p.width/scl);
        var rows = Math.floor(p.height/scl);
        guest = p.createVector(Math.floor(p.random(cols)), Math.floor(p.random(rows)));
        guest.mult(scl);
    }


    //sleuth constructor
    p.Sleuth = function(){
        const scl = 20;
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
      
      
          this.x = p.constrain(this.x, scl, p.width-(scl*2));
          this.y = p.constrain(this.y, scl, p.height-(scl*2));
        }
        
        //creates the look of the sleuth
        this.show = function(){
          p.fill(255);
          p.rect(this.x, this.y, scl, scl);
        }
        
        this.question = function(pos){
            var d = p.dist(this.x, this.y, pos.x, pos.y);
            if (d<30){
                return true;
            } else {
                return false;
            }
        }
      
      }






}
export default Sketch;