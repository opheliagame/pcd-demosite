class User {
  constructor(x, y, w, sprite) {
    this.w = w
    this.x = x+w/2
    this.y = y+w/2
    this.sprite = sprite
    this.spritePos = 0
    this.dir = 'right'
    this.jump = w
    this.frameCount = 0
  }

  draw(camera) {
    // switch(this.dir) {
    //   case 'left':
    //     this.spritePos = ((Math.floor(this.spritePos+0.1) % 4) + 4) % 8
    //     break
    //   case 'right':
    //     this.spritePos = Math.floor(this.spritePos+0.1) % 4
    //     break
    //   case 'up':
    //     this.spritePos = ((Math.floor(this.spritePos+0.1) % 4) + 4) % 8
    //     break
    //   case 'down':
    //     this.spritePos = Math.floor(this.spritePos+0.1) % 4
    //     break
    // }


    let yStart = this.spritePos < 4 ? 0 : 32
    let xStart = yStart === 0 ? 
                (this.spritePos%4) * 32 :
                ((7-this.spritePos)%4) * 32 
    let currSprite = this.sprite.get(xStart, yStart, 32, 32)
  
    push()
    translate(-camera.x, -camera.y)
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

  io(building, xMax, yMax) {
    this.frameCount += 1
    let keyCode
    if(keyIsDown(LEFT_ARROW)) {
      keyCode = LEFT_ARROW
    } else if(keyIsDown(RIGHT_ARROW)) {
      keyCode = RIGHT_ARROW
    } else if(keyIsDown(DOWN_ARROW)) {
      keyCode = DOWN_ARROW
    } else if(keyIsDown(UP_ARROW)) {
      keyCode = UP_ARROW
    }
    else {
      return
    }
    // this.avoidWalls(building, keyCode)
    let moving = this.keyIO(this.jump, xMax, yMax)
    // let moving = this.keyPressed(keyCode, this.jump, xMax, yMax)
    if(moving && this.frameCount > 6) {
      this.frameCount = 0
      switch(this.dir) {
        case 'left':
          this.spritePos = (((this.spritePos+1) % 4) + 4) % 8
          break
        case 'right':
          this.spritePos = (this.spritePos+1) % 4
          break
        case 'up':
          this.spritePos = (((this.spritePos+1) % 4) + 4) % 8
          break
        case 'down':
          this.spritePos = (this.spritePos+1) % 4
          break
      }
    }
   
  }

  avoidWalls(building, keyCode) {
    let currX = Math.floor(this.x/this.w)
    let currY = Math.floor(this.y/this.w)
    let nextX, nextY
    switch(keyCode) {
      case LEFT_ARROW:
        nextX = (this.x - this.jump*2) >= 0 ? this.x - this.jump*2 : 0 
        nextY = this.y
        break
      case RIGHT_ARROW:
        nextX = (this.x + this.jump*2) < building.cols ? this.x + this.jump*2 : this.x
        nextY = this.y
        break
      case UP_ARROW:
        nextX = this.x
        nextY = (this.y - this.jump*3) >= 0 ? this.y - this.jump*3 : 0 
        break
      case DOWN_ARROW:
        nextX = this.x
        nextY = (this.y + this.jump*3) < building.rows ? this.y + this.jump*3 : this.y 
        break
    }
    nextX = Math.floor(nextX/this.w)
    nextY = Math.floor(nextY/this.w)
    let index = nextY * building.cols + nextX
    let block = building.grid.blocks[index]
    let tileIndex = parseInt(block.tileIndex)
    if(block.filled === true && tileIndex >= (8*18) && tileIndex < (8*21)) {
      switch(keyCode) {
        case LEFT_ARROW:
          this.move(this.jump, 0)
          break
        case RIGHT_ARROW:
          this.move(-this.jump, 0)
          break
        case UP_ARROW:
          this.move(0, this.jump)
          break
        case DOWN_ARROW:
          this.move(0, -this.jump)
          break
      }
    }
    // console.log(currX, currY)
    // console.log(nextX, nextY)
    // console.log(block)
  }

  keyIO(jump, xMax, yMax) {
    if(keyIsDown(LEFT_ARROW)) {
      this.move(-jump, 0)
      if(this.x < 0) this.move(jump, 0)
      this.dir = 'left'
      return true
    } else if(keyIsDown(RIGHT_ARROW)) {
      this.move(jump, 0)
      if(this.x > xMax) this.move(-jump, 0)
      this.dir = 'right'
      return true
    } else if(keyIsDown(DOWN_ARROW)) {
      this.move(0, jump)
      if(this.y > yMax) this.move(0, -jump)
      this.dir = 'down'
      return true
    } else if(keyIsDown(UP_ARROW)) {
      this.move(0, -jump)
      if(this.y < 0) this.move(0, jump)
      this.dir = 'up'
      return true
    }
    return false
  }

  keyPressed(keyCode, jump, xMax, yMax) {
    if(keyCode === (LEFT_ARROW)) {
      this.move(-jump, 0)
      if(this.x < 0) this.move(jump, 0)
      this.dir = 'left'
      return true
    } else if(keyCode === (RIGHT_ARROW)) {
      this.move(jump, 0)
      if(this.x > xMax) this.move(-jump, 0)
      this.dir = 'right'
      return true
    } else if(keyCode === (DOWN_ARROW)) {
      this.move(0, jump)
      if(this.y > yMax) this.move(0, -jump)
      this.dir = 'down'
      return true
    } else if(keyCode === (UP_ARROW)) {
      this.move(0, -jump)
      if(this.y < 0) this.move(0, jump)
      this.dir = 'up'
      return true
    }
    return false
  }

}