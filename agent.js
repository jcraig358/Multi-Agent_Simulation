class Agent {

  constructor(){
    this.maxForce = 0.1;
    this.maxSpeed = 1.5;
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1,1), random(-1,1));
    this.acceleration = createVector();
    this.group;
    this.range = 5;
  }
//------------------------------------------------------------------------------
  wrap(){
    //Top wall
    if(this.position.y < 0){
      this.position.y = height;
    }

    //Right wall
    else if(this.position.x > width){
      this.position.x = 0;
    }

    //Bottom wall
    else if(this.position.y > height){
      this.position.y = 0;
    }

    //Left wall
    else if(this.position.x < 0){
      this.position.x = width;
    }
  }
//------------------------------------------------------------------------------
  setGroup(group){
    this.group = group;
  }
//------------------------------------------------------------------------------
  alignment(){
    //Create zero-vector and sum all other agent velocities
    let steer_force = createVector(0,0);
    for(let other of this.group.elements){
      steer_force.add(other.velocity);
    }

    //Determine desired vector
    steer_force.setMag(this.maxSpeed);
    steer_force.sub(this.velocity);

    return steer_force;
  }
//------------------------------------------------------------------------------
  separation(){
    //Create zero vector
    let steer_force = createVector(0,0);

    for(let other of this.group.elements){
      let desired = p5.Vector.sub(this.position, other.position);
      let distance = p5.Vector.dist(other.position, this.position);

      //Determine signifcance factor
      let factor = lerp(2,0.001, min(distance, this.range)/this.range);
      desired.div(factor);

      //Sum desired vectors together
      steer_force.add(desired);
    }

    //Set overall desired separation vector
    steer_force.setMag(this.maxSpeed);
    steer_force.sub(this.velocity);

    return steer_force;
  }
//------------------------------------------------------------------------------
  cohesion(){
    let steer_force = createVector(0,0);

    for(let other of this.group.elements){
      let desired = p5.Vector.sub(this.position, other.position);
      let distance = p5.Vector.dist(other.position, this.position);

      //Determine signifcance factor
      let factor = lerp(0,2, min(distance, this.range)/this.range);
      desired.mult(factor);

      //Sum desired vectors together
      steer_force.add(desired);
    }

    //Set overall desired separation vector
    steer_force.setMag(this.maxSpeed);
    steer_force.sub(this.velocity);

    return steer_force;
  }
//------------------------------------------------------------------------------
  calcAcceleration(){
    let ali = this.alignment();
    let sep = this.separation();
    let coh = this.cohesion();

    ali.mult(1.0);
    sep.mult(1.0);
    coh.mult(1.0);

    let total_force = createVector();
    total_force.add(ali);
    total_force.add(sep);
    total_force.add(coh);

    total_force.limit(this.maxForce);

    this.acceleration = total_force;
  }
//------------------------------------------------------------------------------
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.wrap();

    this.acceleration.mult(0);
  }
//------------------------------------------------------------------------------
  run(){
    this.calcAcceleration();
    this.update();
  }
//------------------------------------------------------------------------------
}
