let bEdge = 300
let res = bEdge/15
let grid, field, sprite, radio
let rows, cols

function preload() {
  sprite = loadImage('./assets/tilation-indoor.png')
}

function setup() {
  createCanvas(bEdge*2, bEdge*4)

  // drawing base image
  let word = 'PCDINDIA'
  let index = 0
  for(let j = 0; j < height; j+=bEdge) {
    for(let i = 0; i < width; i+=bEdge) {
      textSize(256)
      textStyle(BOLD)
      textAlign(CENTER, CENTER)
      text(word[index], i+bEdge/2, j+bEdge/2)
      index += 1
    }
  }

  // drawing grid
  stroke(255, 255, 0)
  for(let i = 0; i < width; i+=res) {
    line(i, 0, i, height)
  }
  for(let i = 0; i < height; i+=res) {
    line(0, i, width, i)
  }

  // constructing grid 
  rows = height/res
  cols = width/res
  field = new Array(rows*cols).fill(0)
  let curr = get()
  // clear()
  let maxSum = res*res*4*255
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      let cell = curr.get(i*res, j*res, res, res)
      cell.loadPixels()
      let sum = cell.pixels.reduce((a, b) => a + b, 0)  
      if ( sum > maxSum/6 ) {
        let index = j*cols + i
        field[index] = 1
        fill(255, 255, 0)
        rect(i*res, j*res, res, res)
      }    
    }
  }
  console.log(field.length)


  grid = Array.from({length: rows*cols}, (_, i) => ({
    x: i%cols, 
    y: Math.floor(i/cols), 
    filled: false, 
    type: 'none',
    tileIndex: 8*18}))
  console.log(rows, cols)
  console.log(grid)
  let button = createButton('save json')
  button.position(width+10, 0)
  button.mousePressed(() => {
    let gridJson = {
      rows: rows,
      cols: cols,
      blocks: []
    }
    for(let i = 0; i < grid.length; i++) {
      gridJson.blocks[i] = grid[i]
    }
    saveJSON(gridJson, 'grid.json')
  })

  radio = createRadio()
  radio.position(width+10, 20)
  radio.option('tiling')
  radio.option('template')


}

function draw() {
  background(255)

  if(radio.value() === 'tiling') drawTiles() 
  else drawMarchinSquares()

}

function drawMarchinSquares() {
  for(let i = 0; i < cols-1; i++) {
    for(let j = 0; j < rows-1; j++) {
      let x = i * res;
      let y = j * res;
      let index = j*cols + i
      let a = createVector(x + res * 0.5, y            );
      let b = createVector(x + res      , y + res * 0.5);
      let c = createVector(x + res * 0.5, y + res      );
      let d = createVector(x            , y + res * 0.5);
      let state = getState(field[index], field[index+1], field[index+1+cols], field[index+cols])
      stroke(255, 0, 0)
      grid[index].filled = true
      switch (state) {
        case 1:  
          drawLine(c, d);
          grid[index].tileIndex = 8*18 + 2
          break;
        case 2:  
          drawLine(b, c);
          grid[index].tileIndex = 8*18 + 0
          break;
        case 3:  
          drawLine(b, d);
          grid[index].tileIndex = 8*18 + 1
          break;
        case 4:  
          drawLine(a, b);
          grid[index].tileIndex = 8*18 + 16
          break;
        case 5:  
          drawLine(a, d);
          drawLine(b, c);
          grid[index].tileIndex = 8*18 + 9
          break;
        case 6:  
          drawLine(a, c);
          grid[index].tileIndex = 8*18 + 8
          break;
        case 7:  
          drawLine(a, d);
          grid[index].tileIndex = 8*18 + 18
          break;
        case 8:  
          drawLine(a, d);
          grid[index].tileIndex = 8*18 + 18
          break;
        case 9:  
          drawLine(a, c);
          grid[index].tileIndex = 8*18 + 10
          break;
        case 10: 
          drawLine(a, b);
          drawLine(c, d);
          grid[index].tileIndex = 8*18 + 9
          break;
        case 11: 
          drawLine(a, b);
          grid[index].tileIndex = 8*18 + 16
          break;
        case 12: 
          drawLine(b, d);
          grid[index].tileIndex = 8*18 + 17
          break;
        case 13: 
          drawLine(b, c);
          grid[index].tileIndex = 8*18 + 0
          break;
        case 14: 
          drawLine(c, d);
          grid[index].tileIndex = 8*18 + 2
          break;
        default:
          grid[index].tileIndex = -1
          grid[index].filled = false
        }


        textSize(12)
        fill(0)
        stroke(0)
        textStyle(NORMAL)
        textAlign(CENTER, CENTER)
        text(grid[index].tileIndex, x+res*0.5, y+res*0.5)
    }
  }
}

function drawTiles() {
  clear()
  for(let i = 0; i < cols-1; i++) {
    for(let j = 0; j < rows-1; j++) {
      let x = i*res;
      let y = j*res
      let index = j*cols + i
      let state = grid[index].tileIndex
      let tile = sprite.get((state%8)*16, Math.floor(state/8)*16, 16, 16)
      push()
      translate(x, y)
      image(tile, 0, 0, res, res)
      pop()

      // push()
      // translate(x+res*0.5, y+res*0.5)
      // textSize(res*0.5)
      // text(state, 0, 0)
      // pop()
      
    }
  }
}


function getState(tl, tr, br, bl) {
  return tl * 8 + tr * 4  + br * 2 + bl * 1;
}

function drawLine(v1, v2) {
  line(v1.x, v1.y, v2.x, v2.y);
}

function drawTemplate() {
  for(let i = 1; i < rows-1; i++) {
    for(let j = 1; j < cols-1; j++) {
      let x = i * res;
      let y = j * res;

      let t = field[j-1][i]
      let b = field[j+1][i]
      let r = field[j][i+1]
      let l = field[j][i-1]

      let state = getState(t, r, b, l)
      switch(state) {
        case 1:
          grid[j][i] = 6
          break
        case 2: 
          // grid[j][i] = 
      }
      
      textSize(12)
      fill(0)
      stroke(0)
      textStyle(NORMAL)
      textAlign(CENTER, CENTER)
      text(grid[j][i], x+res*0.5, y+res*0.5)
    }
  }
}
