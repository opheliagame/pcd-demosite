class Building {
  constructor(gridJson, siteJson, sprite) {
    this.doors = new Array()
    this.showModal = false
    this.prevRoom = null
    this.grid = gridJson
    this.embeds = siteJson
    this.rows = this.grid.rows
    this.cols = this.grid.cols
    this.edge = width/this.cols
    this.sprite = sprite
    this.back = createGraphics((this.cols)*this.edge, (this.rows)*this.edge)
  }

  build() {
    
    for(let i = 0; i < this.rows*this.cols; i++) {
      let block = this.grid.blocks[i]
      if (block.type === 'seat') {
        let door = new Door(block.x*this.edge, block.y*this.edge, this.edge, this.sprite)
        this.add(door)
      }
    }
   
    this.doors.forEach((door, index) => {
      let len = Object.keys(this.embeds).length
      let embed = this.embeds[index % len]
      let embedSrc = embed.src
      let embedName = embed.name
      let div = document.createElement('div');
      div.id = door.roomID
      div.classList.add('hidden', 'absolute', 'flex', 'w-screen', 'h-screen', 'items-center', 'justify-center');
      div.innerHTML = 
      `
      <div class="w-1/2 h-full overflow-scroll border-4 border-black bg-white p-4">
      <p class="bg-yellow-300 uppercase px-2">${embedName}</p>
      <embed class="h-full w-full" src=${embedSrc} />
      </div>
      `     
      modal.appendChild(div);
      
      door.room = document.getElementById(door.roomID)
     
    })
    console.log(this)
  }

  draw(camera) {
    push()
    translate(-camera.x, -camera.y)
    image(this.back, 0, 0)
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