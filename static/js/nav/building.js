class Building {
  constructor(p, gridJson, seatGridJson, siteJson, sprite) {
    this.p = p
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
    this.backCnv = document.createElement('canvas')
    this.backCnv.width = this.cols*this.edge
    this.backCnv.height = this.rows*this.edge
    this.backCnv.id = 'building-background'
    this.back = this.p.createGraphics((this.cols)*this.edge, (this.rows)*this.edge)
  }

  build() {
    
    for(let i = 0; i < this.rows*this.cols; i++) {
      let block = this.seatGrid.blocks[i]
      if (block.type === 'seat') {
        let door = new Door(block.x*this.edge, block.y*this.edge, this.edge, this.sprite)
        this.add(door)
      }
    }
   
    this.doors.forEach(door => {
      let modal = document.getElementById(door.roomID)     
      if(modal === null) door.room = document.getElementById('room0')
      else door.room = modal
    })
    console.log(this)
  }

  draw(camera) {
    this.p.push()
    this.p.translate(-camera.x, -camera.y)
    this.p.image(this.back, 0, 0)
    // this.p.image(this.seatCnv, 0, 0)
    this.p.pop()
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
      // console.log(currDoor, this.showModal)
      if (this.room.classList.contains('hidden') === true) {
        this.room.classList.remove('hidden')
      }
      this.prevRoom = this.room
    } else {
      this.room = null
    }
    if(this.prevRoom !== null && this.room === null) {
      if(this.prevRoom.classList.contains('hidden') === false) {
        this.prevRoom.classList.add('hidden')
      }
      // this.prevRoom.classList.add('hidden')
    }
    
  }
}