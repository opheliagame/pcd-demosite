class User {
  constructor(x, y, w=48, sprite) {
    this.w = w
    this.x = x+w/2
    this.y = y+w
    this.sprite = sprite
    this.spritePos = 0
    this.dir = 'x'
  }

  draw() {
    let yStart = this.spritePos < 4 ? 0 : 32
    let xStart = yStart === 0 ? 
                (this.spritePos%4) * 32 :
                ((7-this.spritePos)%4) * 32 
    let currSprite = this.sprite.get(xStart, yStart, 32, 32)
  
    push()
    translate(this.x, this.y)
    // fill(255)
    // rect(0, 0, this.w*2, this.w*2)
    imageMode(CENTER)
    image(currSprite, 0, 0, this.w, this.w)
    pop()
  }

  move(x, y) {
    this.x += x
    this.y += y
    building.isEntering(this)
  }

  io(jump) {
    let moving = this.keyIO(jump)
    if(moving) {
      if(this.dir !== 'y') {
        if(this.dir === 'left') {
          this.spritePos = (((this.spritePos + 1) % 4) + 4) % 8
        }
        else {
          this.spritePos = (this.spritePos+1) % 4
        }
      } 
      // console.log(this.spritePos)
    }
   
  }

  keyIO(jump) {
    if(keyIsDown(LEFT_ARROW)) {
      user.move(-jump, 0)
      if(user.x < 0) user.move(jump, 0)
      this.dir = 'left'
      return true
    } else if(keyIsDown(RIGHT_ARROW)) {
      user.move(jump, 0)
      if(user.x > window.innerWidth) user.move(-jump, 0)
      this.dir = 'right'
      return true
    } else if(keyIsDown(DOWN_ARROW)) {
      user.move(0, jump)
      if(user.y > window.innerHeight) user.move(0, -jump)
      this.dir = 'y'
      return true
    } else if(keyIsDown(UP_ARROW)) {
      user.move(0, -jump)
      if(user.y < 0) user.move(0, jump)
      this.dir = 'y'
      return true
    }
    return false
  }
}