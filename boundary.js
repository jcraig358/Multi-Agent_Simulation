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
  }

  contains(x,y){
    return(
      x >= this.left && x <= this.right &&
      y <= this.top && y >= this.bottom
    )
  }
}
