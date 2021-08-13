class Boundary {
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.top = y - (h/2);
    this.bottom = y + (h/2);
    this.right = x + (w/2);
    this.left = x - (w/2);
    console.log("New Boundary created with x=" + this.x + " y=" + this.y + " w=" + this.w +
                " top" + this.top + " bottom=" + this.bottom + " right=" + this.right + " left=" + this.left);
  }
//------------------------------------------------------------------------------
  contains(x,y){
    console.log("Compare x=" + x + " y=" + y + "\n" + "With left=" + this.left + " right=" + this.right);

    return( (x >= this.left) && (x <= this.right) &&
            (y >= this.top) && (y <= this.bottom)    )
  }
}
