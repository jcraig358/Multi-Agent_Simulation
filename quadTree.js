/*  QuadTree -
    Stores elements that contain a position variable with (x,y) coordinates.
*/
class QTree {

  constructor(boundary, n){
    this.boundary = boundary;
    this.capacity = n;
    this.elements = [];
    this.isParent = false;
  }
//------------------------------------------------------------------------------
/* Subdivide this quad-tree into 4 child quadtrees and pass points to them.
*/
  subdivide(){
    console.log("Subdividing");
    //Create child quadtrees
    this.northeast = new QTree(new Boundary(
                               this.boundary.x + (this.boundary.w/4),  //origin x
                               this.boundary.y - (this.boundary.h/4),  //origin y
                               this.boundary.w/2, this.boundary.h/2),   //width, height
                               this.capacity);       //capacity
    this.northwest = new QTree(new Boundary(
                               this.boundary.x - (this.boundary.w/4),
                               this.boundary.y - (this.boundary.h/4),
                               this.boundary.w/2, this.boundary.h/2),
                               this.capacity);
    this.southeast = new QTree(new Boundary(
                               this.boundary.x + (this.boundary.w/4),
                               this.boundary.y + (this.boundary.h/4),
                               this.boundary.w/2, this.boundary.h/2),
                               this.capacity);
    this.southwest = new QTree(new Boundary(
                               this.boundary.x - (this.boundary.w/4),
                               this.boundary.y + (this.boundary.h/4),
                               this.boundary.w/2, this.boundary.h/2),
                               this.capacity);
    this.isParent = true;

    //Pass elements to children and clear parent elements
    for(let e of this.elements){
      if(this.northeast.insert(e)){ continue; }
      else if(this.northwest.insert(e)){ continue; }
      else if(this.southeast.insert(e)){ continue; }
      else if(this.southwest.insert(e)){ continue; }
    }
    this.elements = null;

    console.log("Subdivided");
  }
//------------------------------------------------------------------------------
/* Add a new element to this quad tree section.
   Subdivide if capacity is reached.
   Pass element to children if this is a parent quad tree.
*/
  insert(element){
    console.log("entered insert");
    //Does this QTree boundary contain this element
    if(!this.boundary.contains(element.position.x, element.position.y)){
      return false;
    }

    console.log("Inserting");
    //Add element if max capacity hasn't been reached.
    if((this.elements != null) && (this.elements.length < this.capacity)){
      this.elements.push(element);
      return true;
    }

    //If get to here, then max capacity has been reached
    //Subdivide if not divided already.
    if(!this.isParent){
      this.subdivide();
    }

    //Pass this element to child QuadTree
         if(this.northeast.insert(element)){ return true; }
    else if(this.northwest.insert(element)){ return true; }
    else if(this.southeast.insert(element)){ return true; }
    else if(this.southwest.insert(element)){ return true; }
  }
//------------------------------------------------------------------------------
/* Show boundaries of this quadtree section and pass to children*/
  show(){
    noFill();
    rect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h);
    if(this.isParent){
      this.northeast.show();
      this.northwest.show();
      this.southeast.show();
      this.southwest.show();
    }
  }
}
