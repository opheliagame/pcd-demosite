class Camera {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.xoff = w/10
    this.yoff = h/10
  }

  move(user, xMax, yMax) {
    this.x = mobileCheck() === true ? Math.floor(user.x / (this.w*0.5)) * this.w*0.5 
                          : Math.floor(user.x / this.w) * this.w
    if(user.y >= (yMax-this.h*0.6)) return
    else {
      this.y = Math.floor(user.y / (this.h*0.4)) * this.h*0.4
    }
    // this.y = Math.floor(user.y / (this.h*0.4)) * user.w*5
  }

}