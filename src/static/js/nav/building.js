class Building {
  constructor(json, sprite) {
    this.doors = new Array()
    this.showModal = false
    this.prevRoom = null
    this.grid = json
    this.rows = this.grid[0].length
    this.cols = Object.keys(this.grid).length
    this.edge = width/this.rows
    this.sprite = sprite
  }

  build() {
    
    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
        if (this.grid[j][i] === 1) {
          let door = new Door(i*this.edge, j*this.edge, this.edge, this.sprite)
          this.add(door)
        }
      }
    }
   
    this.doors.forEach(door => {
      fetch(`https://source.unsplash.com/featured/?pixel`).then((response) => {   
        let div = document.createElement('div');
        div.id = door.roomID
        div.classList.add('hidden', 'absolute', 'flex', 'w-screen', 'h-screen', 'items-center', 'justify-center');
        div.innerHTML = `
        <div class="w-1/2 max-h-full overflow-scroll border-4 border-black bg-yellow-300 p-4">
        <p>${div.id}</p>
        <img class="image" src="${response.url}" />
        </div>`     
        modal.appendChild(div);
        
        door.room = document.getElementById(door.roomID)
      }) 
    })
    console.log(this.doors)
    
  }

  draw() {
    this.doors.forEach(d => d.draw())
  }

  add(door) {
    door.roomID = this.doors.length
    this.doors.push(door)
  }

  isEntering(user) {
    let currDoor = this.doors.filter(d => d.isEntering(user))
    this.showModal = this.doors.some(d => d.isEntering(user))
    // this.room = document.getElementById('room')
    // this.room.classList.toggle('hidden', !this.showModal) 
    if(currDoor.length !== 0) {
      this.room = currDoor[0].room
      this.prevRoom = this.room
      this.room.classList.toggle('hidden', !this.showModal)
    } 
    if(this.prevRoom !== null) {
      this.prevRoom.classList.toggle('hidden', !this.showModal)
    }
    // console.log(this.prevRoom)
  }
}