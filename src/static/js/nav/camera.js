class Camera {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.xoff = w/10
    this.yoff = h/10
  }

  move(user) {
    this.x = Math.floor(user.x / this.w) * this.w
    this.y = Math.floor(user.y / (this.h*0.4)) * this.h*0.4
    // this.y = Math.floor(user.y / (this.h*0.4)) * user.w*5
  }

}