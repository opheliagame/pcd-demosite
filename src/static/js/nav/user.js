class User {
  constructor(p, x, y, w, sprite) {
    this.p = p
    this.w = w
    this.x = x+w/2
    this.y = y+w/2
    this.sprite = sprite
    this.spritePos = 0
    this.dir = 'right'
    this.jump = w/10
    this.frameCount = 0
  }

  draw(camera) {
    let yStart = this.spritePos < 4 ? 0 : 32
    let xStart = yStart === 0 ? 
                (this.spritePos%4) * 32 :
                ((7-this.spritePos)%4) * 32 
    yStart = Math.floor(this.spritePos/3) * 32
    xStart = (this.spritePos % 3) * 32
    let currSprite = this.sprite.get(xStart, yStart, 32, 32)
  
    this.p.push()
    this.p.translate(-camera.x, -camera.y)
    this.p.translate(this.x, this.y)
    // fill(255)
    // rect(0, 0, this.w*2, this.w*2)
    this.p.imageMode(this.p.CENTER)
    this.p.image(currSprite, 0, 0, this.w*1.2, this.w*1.2)
    this.p.pop()
  }

  move(x, y) {
    this.x += x
    this.y += y
    building.isEntering(this)
  }

  io(keyCode, building, xMax, yMax) {
    
    if(!keyCode) return

    this.avoidWalls(building, keyCode)
    let moving = this.keyIO(keyCode, this.jump, xMax, yMax)
    // let moving = this.keyPressed(keyCode, this.jump, xMax, yMax)
    this.frameCount += 1
    if(moving && this.frameCount > 6) {
      this.frameCount = 0
      switch(this.dir) {
        case 'right':
          this.spritePos = (((this.spritePos+1) % 3) + 6) 
          break
        case 'left':
          this.spritePos = (((this.spritePos+1) % 3) + 3)
          break
        case 'down':
          this.spritePos = (((this.spritePos+1) % 3) + 0)
          break
        case 'up':
          this.spritePos = (((this.spritePos+1) % 3) + 9)
          break
      }
    }
   
  }

  avoidWalls(building, keyCode) {
    let currX = Math.floor(this.x/this.w)
    let currY = Math.floor(this.y/this.w)
    let nextX, nextY
    switch(keyCode) {
      case this.p.LEFT_ARROW:
        nextX = (this.x - this.jump) >= 0 ? this.x - this.jump : 0 
        nextY = this.y
        break
      case this.p.RIGHT_ARROW:
        nextX = (this.x + this.jump) < building.cols*this.w ? this.x + this.jump : this.x
        nextY = this.y
        break
      case this.p.UP_ARROW:
        nextX = this.x
        nextY = (this.y - this.jump) >= 0 ? this.y - this.jump : 0 
        break
      case this.p.DOWN_ARROW:
        nextX = this.x
        nextY = (this.y + this.jump) < building.rows*this.w ? this.y + this.jump : this.y 
        break
    }
    nextX = Math.floor(nextX/this.w)
    nextY = Math.floor(nextY/this.w)
    let index = nextY * building.cols + nextX
    let block = building.grid.blocks[index]
    let tileIndex = parseInt(block.tileIndex)
    if(block.filled === true && (block.type === 'wall' || block.type === 'tree')) {
      switch(keyCode) {
        case this.p.LEFT_ARROW:
          this.move(this.jump, 0)
          break
        case this.p.RIGHT_ARROW:
          this.move(-this.jump, 0)
          break
        case this.p.UP_ARROW:
          this.move(0, this.jump)
          break
        case this.p.DOWN_ARROW:
          this.move(0, -this.jump)
          break
      }
    }
    // console.log(currX, currY)
    // console.log(nextX, nextY)
    // console.log(block)
  }

  keyIO(keyCode, jump, xMax, yMax) {
    switch(keyCode) {
      case this.p.LEFT_ARROW:
        this.move(-jump, 0)
        if(this.x < 0) this.move(jump, 0)
        this.dir = 'left'
        return true
      case this.p.RIGHT_ARROW:
        this.move(jump, 0)
        if(this.x > xMax) this.move(-jump, 0)
        this.dir = 'right'
        return true
      case this.p.DOWN_ARROW:
        this.move(0, jump)
        if(this.y > yMax) this.move(0, -jump)
        this.dir = 'down'
        return true
      case this.p.UP_ARROW:
        this.move(0, -jump)
        if(this.y < 0) this.move(0, jump)
        this.dir = 'up'
        return true
      default:
        return false
    }
  }

  keyPressed(keyCode, jump, xMax, yMax) {
    if(keyCode === (this.p.LEFT_ARROW)) {
      this.move(-jump, 0)
      if(this.x < 0) this.move(jump, 0)
      this.dir = 'left'
      return true
    } else if(keyCode === (this.p.RIGHT_ARROW)) {
      this.move(jump, 0)
      if(this.x > xMax) this.move(-jump, 0)
      this.dir = 'right'
      return true
    } else if(keyCode === (this.p.DOWN_ARROW)) {
      this.move(0, jump)
      if(this.y > yMax) this.move(0, -jump)
      this.dir = 'down'
      return true
    } else if(keyCode === (this.p.UP_ARROW)) {
      this.move(0, -jump)
      if(this.y < 0) this.move(0, jump)
      this.dir = 'up'
      return true
    }
    return false
  }

}