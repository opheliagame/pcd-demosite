
let modal = document.getElementById('modal')
let building, user
let height = window.innerHeight
let width = window.innerWidth
let xMax, yMax
let camera = new Camera(0, 0, width, height)
let userSprite = []
let farmSprite, floorImage
let gridData
let urlPrefix = '/static/assets/'

function preload() {
  gridData = loadJSON(urlPrefix + 'pcd-town.json')
  let spriteBody = loadImage(urlPrefix + 'characters_free/assets/character_animation.png')
  let spriteHair = loadImage(urlPrefix + 'characters_free/assets/hair_braids_brown.png')
  let spritePants = loadImage(urlPrefix + 'characters_free/assets/pants_black.png')
  let spriteShirt = loadImage(urlPrefix + 'characters_free/assets/shirt_basic_red.png')
  let spriteShoes = loadImage(urlPrefix + 'characters_free/assets/shoes_brown.png')
  userSprite.push(spriteBody, spriteHair, spritePants, spriteShirt, spriteShoes) 
  farmSprite = loadImage(urlPrefix + 'tilation-indoor.png')
}

function setup() {
  building = new Building(gridData, farmSprite)
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

