let qtree;
let num_points = 100;
let curr_millis = 0;
let agents = [];

let frate = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  for(let i=0; i<num_points; i++){
    agents.push(new Agent());
  }
}

function draw() {
  background(0);

  //Buid QTree
  qtree = new QTree(new Boundary(width/2, height/2, width, height), 5);
  for(a of agents){
    qtree.insert(a);
  }

  //Run agents
  for(a of agents){
    a.run();
  }

  //Draw agents
  noFill();
  stroke(255);
  strokeWeight(1);
  for(let a of agents){
    circle(a.position.x, a.position.y, 2);
  }

  //Draw QTree boundaries
  //qtree.show();

  //Draw framerate
  if(millis() > curr_millis + 1000){
    curr_millis = millis();
    frate = frameRate();
  }
  text(nf(frate,2,0), 10, 30);
}
