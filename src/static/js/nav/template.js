let bEdge = 300
let sEdge = bEdge/10
let gridJson = {}

function setup() {
  createCanvas(bEdge*2, bEdge*4)

  // drawing base image
  let word = 'PCDINDIA'
  let index = 0
  for(let j = 0; j < height; j+=bEdge) {
    for(let i = 0; i < width; i+=bEdge) {
      textSize(256)
      textStyle('bold')
      textAlign(CENTER, CENTER)
      text(word[index], i+bEdge/2, j+bEdge/2)
      index += 1
    }
  }

  // drawing grid
  stroke(255, 255, 0)
  for(let i = 0; i < width; i+=sEdge) {
    line(i, 0, i, height)
  }
  for(let i = 0; i < height; i+=sEdge) {
    line(0, i, width, i)
  }

  // constructing grid 
  let rows = width/sEdge
  let cols = height/sEdge
  let grid = Array.from(Array(cols), () => new Array(rows).fill(0))
  let curr = get()
  let maxSum = sEdge*sEdge*4*255
  for(let i = 0; i < width; i+=sEdge) {
    for(let j = 0; j < height; j+=sEdge) {
      let cell = curr.get(i, j, sEdge, sEdge)
      cell.loadPixels()
      let sum = cell.pixels.reduce((a, b) => a + b, 0)  
      if ( sum > maxSum/6 ) {
        fill(255, 255, 0)
        rect(i, j, sEdge, sEdge)
        grid[j/sEdge][i/sEdge] = 1
      }    
    }
  }

  for(let i = 0; i < grid.length; i++) {
    gridJson[i] = grid[i]
  }
  saveJSON(gridJson, 'grid.json')
}

// function draw() {
//   background(0)

  
// }