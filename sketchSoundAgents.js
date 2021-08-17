let qtree;
let num_points = 500;
let curr_millis = 0;
let agents = [];

let frate = 0;

let fft;
let cnv;

let music;

function preload(){
  //soundFormats('mp3');
  //music = loadSound("music.mp3");
}

//------------------------------------------------------------------------------
function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  for(let i=0; i<num_points; i++){
    agents.push(new Agent(i));
  }

  frameRate(120);

  //fft = new p5.FFT();
}
//------------------------------------------------------------------------------
function draw() {
  background(0);

  if(music == null){

  }

  //Buid QTree
  qtree = new QTree(new Boundary(width/2, height/2, width, height), 8);
  for(a of agents){
    qtree.insert(a);
  }

  //Run agents
  for(a of agents){
    a.run(qtree);
  }

  //Draw agents


  //Draw QTree boundaries
  //qtree.show();

  //Draw framerate
  if(millis() > curr_millis + 1000){
    curr_millis = millis();
    frate = frameRate();
  }
  text(nf(frate,2,0), 10, 30);
}
//------------------------------------------------------------------------------
function mousePressed(){

}
