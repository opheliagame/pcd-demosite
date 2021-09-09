class Door {
  constructor(x, y, w, sprite) {
    this.x = x
    this.y = y
    this.w = w
    this.cx = x+w/2 
    this.cy = y+w/2
    this.shear = (Math.random()*2.0-1.0) * 30
    this.shearOff = 0
    this.visited = false
    this.sprite = sprite.get(0, 50, 60, 70)
    // this.room = document.getElementById('room')
  }

  draw() {
    push()
    translate(this.cx, this.cy)
    imageMode(CENTER)
    image(this.sprite, 0, 0, this.w, this.w)
    pop()

    // push()
    // translate(this.x + this.w/6, this.y + this.w/6)
    // shearY(radians(this.shear))
    // rect(0, 0, this.w - this.w/3, this.w - this.w/3)
    // shearY(radians(this.shear+this.shearOff))
    // fill(255, 255, 0)
    // rect(0, 0, this.w - this.w/2, this.w - this.w/3)
    // pop()
  }

  isEntering(user) {
    if (abs(user.x - this.cx) < this.w/3 && abs(user.y - this.cy) < this.w/3) {
      this.shearOff += 0.5
      this.shearOff = this.shearOff % 20
      return true
    } else {
      this.shearOff -= 0.001
      return false
    }
  }
}