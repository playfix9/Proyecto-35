var hypnoticBall, database;
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";

//.ref sirve para acceder a la informacion de la base de datos
  var hypnoticBallPosition = database.ref('ball/position');
  //.on nos sirve para avisarnos los cambios que se hicieron en la base de datos
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}
//escribir nuevos valores en la base datos
function writePosition(x,y){
  //.set escribe nueva informacion en la base datos
  database.ref("ball/position").set({"x":position.x+x,"y":position.y+y})
}

function readPosition(data){
  //data.val guarda la informacion que extrajo en la base datos
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}
//mostrar errores
function showError(){
  console.log("Error al escribir en la base de datos");
}
