class Building {
  constructor(json, sprite, sprite2) {
    this.doors = new Array()
    this.showModal = false
    this.prevRoom = null
    this.grid = json
    this.rows = this.grid.rows
    this.cols = this.grid.cols
    this.edge = width/this.cols
    this.sprite = sprite
    this.sprite2 = sprite2
    this.back = createGraphics((this.cols)*this.edge, (this.rows)*this.edge)
  }

  build() {
    
    for(let i = 0; i < this.rows*this.cols; i++) {
      let block = this.grid.blocks[i]
      if (block.filled === true) {
        let door = new Door(block.x*this.edge, block.y*this.edge, this.edge, this.sprite)
        this.add(door)
      }
    }
   
    this.doors.forEach(door => {
      // fetch().then((response) => {   
        let div = document.createElement('div');
        div.id = door.roomID
        div.classList.add('hidden', 'absolute', 'flex', 'w-screen', 'h-screen', 'items-center', 'justify-center');
        div.innerHTML = `
        <div class="w-1/2 max-h-full overflow-scroll border-4 border-black bg-yellow-300 p-4">
        <p>${div.id}</p>
        <img class="image" src="" />
        </div>`     
        modal.appendChild(div);
        
        door.room = document.getElementById(door.roomID)
      // }) 
    })
    console.log(this)
  }

  draw(camera) {
    push()
    translate(-camera.x, -camera.y)
    image(this.back, 0, 0)
    pop()
    // this.doors.forEach(d => d.draw(camera))
  }

  drawIndoor(camera) {
    
    for(let i = 0; i < (this.rows)*(this.cols); i++) {
      let block = this.grid.blocks[i]
      let x = block.x*this.edge
      let y = block.y*this.edge
      let tile = this.sprite.get((block.tileIndex%8)*16, Math.floor(block.tileIndex/8)*16, 16, 16)
      if(block.type === 'outside') {
        let tx = block.tileIndex % 2
        let ty = Math.floor(block.tileIndex / 2)
        tile = this.sprite2.get(tx*16, ty*16, 16, 16)
      }
      this.back.push()
      this.back.translate(x, y)
      this.back.image(tile, 0, 0, this.edge, this.edge)
      this.back.pop()

      // push()
      // translate(x+res*0.5, y+res*0.5)
      // textSize(res*0.5)
      // text(state, 0, 0)
      // pop()
      
      
    }
  }

  drawOnce(camera) {
    let count = 0
    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
        if (this.grid[j][i] === 1) {
          let door = this.doors[count]
          door.draw(camera)
          count += 1
        }
        else {
          this.back.push()
          this.back.translate(i*this.edge, j*this.edge)

          // this is grass
          let leftCell = (i-1) >= 0 ? this.grid[j][i-1] : undefined, 
              rightCell = (i+1) < this.rows ? this.grid[j][i+1] : undefined, 
              bottomCell = (j+1) < this.cols ? this.grid[j+1][i] : undefined, 
               topCell = (j-1) >= 0 ? this.grid[j-1][i] : undefined
          if([leftCell, rightCell, bottomCell, topCell].every(c => c === 0)) {            
            this.back.image(this.sprite.get(15, 15, 15, 15), 0, 0, this.edge, this.edge)
          }
          else if(leftCell === undefined) {
            this.back.image(this.sprite.get(0, 10, 25, 25), 0, 0, this.edge, this.edge)
            if(topCell === undefined) {
              this.back.image(this.sprite.get(0, 0, 25, 25), 0, 0, this.edge, this.edge)
            }
            else if(bottomCell === undefined) {
              this.back.image(this.sprite.get(0, 21, 25, 25), 0, 0, this.edge, this.edge)
            }
          } 
          else if(rightCell === undefined) {
            this.back.image(this.sprite.get(20, 10, 25, 25), 0, 0, this.edge, this.edge)
            if(topCell === undefined) {
              this.back.image(this.sprite.get(20, 0, 25, 25), 0, 0, this.edge, this.edge)
            }
            else if(bottomCell === undefined) {
              this.back.image(this.sprite.get(20, 21, 25, 25), 0, 0, this.edge, this.edge)
            }
          }
          else if(topCell === undefined) {}

          this.back.pop()
        }
      }
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