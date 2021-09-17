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

  draw(camera) {
    push()
    translate(-camera.x, -camera.y)
    translate(this.cx, this.cy)
    rectMode(CENTER)
    fill('#B0905D')
    noStroke()
    rect(0, 0, this.w, this.w)
    imageMode(CENTER)
    image(this.sprite, 0, 0, this.w, this.w)
    pop()
  }

  isEntering(user) {
    if (abs(user.x - this.cx) < user.jump && abs(user.y - this.cy) < user.jump) {
      this.shearOff += 0.5
      this.shearOff = this.shearOff % 20
      return true
    } else {
      this.shearOff -= 0.001
      return false
    }
  }
}