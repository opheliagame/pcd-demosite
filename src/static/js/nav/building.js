class Building {
  constructor(gridJson, seatGridJson, siteJson, sprite) {
    this.doors = new Array()
    this.showModal = false
    this.prevRoom = null
    this.grid = gridJson
    this.seatGrid = seatGridJson
    this.embeds = siteJson
    this.rows = this.grid.rows
    this.cols = this.grid.cols
    this.edge = width/this.cols
    this.sprite = sprite
    this.back = createGraphics((this.cols)*this.edge, (this.rows)*this.edge)
    this.seatCnv = createGraphics((this.cols)*this.edge, (this.rows)*this.edge)
  }

  build() {
    
    for(let i = 0; i < this.rows*this.cols; i++) {
      let block = this.seatGrid.blocks[i]
      if (block.type === 'seat') {
        let door = new Door(block.x*this.edge, block.y*this.edge, this.edge, this.sprite)
        this.add(door)
      }
    }
   
    this.doors.forEach((door, index) => {
      door.room = document.getElementById(door.roomID)     
    })
    console.log(this)
  }

  draw(camera) {
    push()
    translate(-camera.x, -camera.y)
    image(this.back, 0, 0)
    image(this.seatCnv, 0, 0)
    pop()
  }

  drawBackground(camera) {
    
    for(let i = 0; i < (this.rows)*(this.cols); i++) {
      let block = this.grid.blocks[i]
      let x = block.x * this.edge
      let y = block.y * this.edge
      let tx = block.tileIndex % 3
      let ty = Math.floor(block.tileIndex / 3)
      let tile = this.sprite.get(tx*16, ty*16, 16, 16)
      this.back.push()
      this.back.translate(x, y)
      this.back.image(tile, 0, 0, this.edge, this.edge)
      this.back.pop()
      
    }
    for(let i = 0; i < (this.rows)*(this.cols); i++) {
      let block = this.seatGrid.blocks[i]
      let x = block.x * this.edge
      let y = block.y * this.edge
      let tx = block.tileIndex % 3
      let ty = Math.floor(block.tileIndex / 3)
      let tile = this.sprite.get(tx*16, ty*16, 16, 16)
      this.seatCnv.push()
      this.seatCnv.translate(x, y)
      this.seatCnv.image(tile, 0, 0, this.edge, this.edge)
      this.seatCnv.pop()
      
    }
  }

  add(door) {
    door.roomID = `room${this.doors.length}`
    this.doors.push(door)
  }

  isEntering(user) {
    let currDoor = this.doors.filter(d => d.isEntering(user))
    this.showModal = this.doors.some(d => d.isEntering(user))
    // this.room = document.getElementById('room')
    // this.room.classList.toggle('hidden', !this.showModal) 
    if(currDoor.length !== 0) {
      this.room = currDoor[0].room
      console.log(currDoor)
      this.room.classList.toggle('hidden', !this.showModal)
      this.prevRoom = this.room
    } 
    if(this.prevRoom !== null) {
      this.prevRoom.classList.toggle('hidden', !this.showModal)
    }
    
  }
}