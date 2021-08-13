let agents = [];
let qtree;
let num_points = 20;
let curr_millis = 0;

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
  let bounds = new Boundary(width/2, height/2, width, height);
  qtree = new QTree(bounds, 5);

}

function draw() {
  background(0);
  fill(255);
  stroke(255);
  strokeWeight(1);
  for(let a of agents){
    circle(a.position.x, a.position.y, 5);
  }
/*
  if(millis() > curr_millis + 500){
    a = new Agent();
    agents.push(a);
    if(qtree.insert(a)){
      console.log("Agent " + agents.length + " added");
    }
    else{
      console.log("Failed to add agent " + i);
    }
    curr_millis = millis();
  }
*/
  qtree.show();
}

function addNewAgent(){
  for(let i=0; i<num_points; i++){
    a = new Agent();
    agents.push(a);
    if(qtree.insert(a)){
      console.log("Agent " + i + " added");
    }
    else{
      console.log("Failed to add agent " + i);
    }
  }
}
