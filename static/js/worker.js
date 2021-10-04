self.addEventListener('message', (e) => {
  let building = e.data.building
  drawBackground(building)
})


function drawBackground(building) {
  // let sprite = new OffscreenCanvas(48, 192)
  // let spritectx = sprite.getContext('2d')
  // spritectx.putImageData(new ImageData(new Uint8ClampedArray(building.sprite), 48, 192), 0, 0)
  fetch('/static/assets/sprite.png')
  .then(response => response.blob())
  .then(blob => createImageBitmap(blob))
  .then(sprite => {
    console.log(sprite)
    
    let ctx = building.back.getContext('2d')
    for(let i = 0; i < (building.rows)*(building.cols); i++) {
      let block = building.grid.blocks[i]
      let x = block.x * building.edge
      let y = block.y * building.edge
      let tx = block.tileIndex % 3
      let ty = Math.floor(block.tileIndex / 3)
      ctx.drawImage(sprite, tx*16, ty*16, 16, 16, x, y, building.edge, building.edge)  
    }
    for(let i = 0; i < (building.rows)*(building.cols); i++) {
      let block = building.seatGrid.blocks[i]
      let x = block.x * building.edge
      let y = block.y * building.edge
      let tx = block.tileIndex % 3
      let ty = Math.floor(block.tileIndex / 3)
      if(block.type === 'seat') {
        ctx.drawImage(sprite, tx*16, ty*16, 16, 16, x, y, building.edge, building.edge)  
      }
    }
  
    console.log('done')
    let backgroundBlob
    let seatBlob
    building.back.convertToBlob({
      type: "image/jpeg",
      quality: 0.95
    })
    .then((blob) => backgroundBlob = blob)
    .then(() => self.postMessage({
      backgroundBlob: backgroundBlob,
    }))
    
  })

  

}

