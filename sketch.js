var backGroundImage;
var balloon,balloon_up,position,database;
function preload(){
  backGroundImage = loadImage("1.png");
  balloon_up = loadAnimation("2.png","3.png","4.png")
}

function setup() {
  createCanvas(1000,500);
  database = firebase.database();
  balloon = createSprite(100, 350,150, 50);
  balloon.addAnimation("up",balloon_up)
  balloon.scale=0.5;

  var position = database.ref('balloon/position');
  position.on("value", readPosition);

}

function draw() {
  background(backGroundImage);  
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.scale-=0.005;
    writePosition(0,-1);
    }
  else if(keyDown(DOWN_ARROW)){
    balloon.scale+=0.005;
    writePosition(0,+1);
  }
  drawSprites();
}
function writePosition(x,y){
  database.ref('balloon/position').set({
      x:position.x + x,
      y:position.y + y
  });
}
function readPosition(data){
 position = data.val()
 balloon.x = position.x;
 balloon.y = position.y;
}