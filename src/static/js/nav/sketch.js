
let modal = document.getElementById('modal')
let building, user
let height = window.innerHeight
let width = window.innerWidth
let xMax, yMax
let camera = new Camera(0, 0, width, height)
let userSprite = []
let farmSprite, floorImage, tileset2, outTileset
let gridData
let urlPrefix = '/pcd-demosite/static/assets/'

function preload() {
  gridData = loadJSON(urlPrefix + 'pcd-town.json')
  let spriteBody = loadImage(urlPrefix + 'characters_free/assets/character_animation.png')
  let spriteHair = loadImage(urlPrefix + 'characters_free/assets/hair_braids_brown.png')
  let spritePants = loadImage(urlPrefix + 'characters_free/assets/pants_black.png')
  let spriteShirt = loadImage(urlPrefix + 'characters_free/assets/shirt_basic_red.png')
  let spriteShoes = loadImage(urlPrefix + 'characters_free/assets/shoes_brown.png')
  userSprite.push(spriteBody, spriteHair, spritePants, spriteShirt, spriteShoes) 
  farmSprite = loadImage(urlPrefix + 'tilation-indoor.png')

  tileset2 = loadImage(urlPrefix + 'modern-city-assets/tiles.png')
}

function setup() {
  outTileset = createGraphics(16*2, 16*2)
  for(let i = 0; i < 32; i+=16) {
    for(let j = 0; j < 32; j+=16) {
      outTileset.image(tileset2.get(8*16, 9*16, 16, 16), i, j, 16, 16)
    }
  }
  outTileset.image(tileset2.get(9*16, 9*16, 16, 32), 0, 0, 16, 32)
  outTileset.image(tileset2.get(10*16, 9*16, 16, 16), 16, 0, 16, 16)

  building = new Building(gridData, farmSprite, outTileset)
  xMax = building.cols * building.edge 
  yMax = building.rows * building.edge
  
  createCanvas(width, height)

  let g = createGraphics(32*8, 32*2)
  userSprite.forEach(img => g.image(img, 0, 0))
  user = new User(0, 0, building.edge, g.get())
  building.build()

  g = createGraphics(width, height)
  for(let i = 0; i < g.width; i+=building.edge) {
    for(let j = 0; j < g.height; j+=building.edge) {
      g.image(farmSprite.get(0, 0, 48, 48), i, j, building.edge, building.edge)
    }
  } 
  floorImage = g.get()
  building.drawIndoor(camera)

  // frameRate(10)
  console.log(building.grid.blocks)
}

function draw() {
  background(255)
  
  building.draw(camera)
  camera.move(user)
  user.io(building, xMax, yMax)
  user.draw(camera)  
}

// function keyPressed() {
//   user.io(keyCode, building, xMax, yMax)
// }

