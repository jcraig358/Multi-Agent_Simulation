let qtree;
let num_points = 20;
let curr_millis = 0;
let agents = [];
function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
  let bounds = new Boundary(width/2, height/2, width, height);
  qtree = new QTree(bounds, 5);
  for(let i=0; i<num_points; i++){
    qtree.insert(new Agent());
  }

  agents = qtree.getAllElements(agents);
  console.log("Agent size = " + agents.length);

}

function draw() {
  background(0);
  fill(255);
  stroke(255);
  strokeWeight(1);
  for(let a of agents){
    circle(a.position.x, a.position.y, 5);
  }

  qtree.show();
}
