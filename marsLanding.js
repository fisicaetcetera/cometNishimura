
let r = 300;
let lat =0, long =0; 

function preload(){
  marsjpg = loadImage('mars.jpg');
  percyjpg = loadImage('percy.jpg');
}
function setup(){
createCanvas(1366/2,768/2,WEBGL);
}
function draw(){
//background(111,75);
rotateZ(frameCount/300);

strokeWeight(3);
stroke('green');
rotateZ(frameCount/500);
console.log('frameCount = ', frameCount);
line(0,0,0, 0, 200,0);
stroke('red');
line(0,0,0,200,0,0);
stroke('blue');
line(0,0,0,0,0,200);
translate(0,0,-1000);
sphere(5);

push();

translate(-400,0,-r);
rotateY(frameCount/400);
degrad = PI/180;
long = -77*degrad;
lat = 18*degrad;
rotateY(long);
//rotateZ(lat);
texture(marsjpg);
noStroke();
//sphere(r,24,24);
//pop();

push();
xloc = r*cos(lat)*cos(long);
yloc = r*cos(lat)*sin(long);
zloc = r*sin(lat);
translate(xloc,yloc,zloc);
rotateY(frameCount/400);
stroke('white');
//sphere(11);
pop();
} //draw
function mousePressed(){
  noLoop();
}
function mouseReleased(){
  loop();
}
