
let modal = document.getElementById('modal')
let building, user
let height = window.innerHeight
let width = window.innerWidth
let xMax, yMax
let camera = new Camera(0, 0, width, height)
let userSprite = []
let buildingSprite
let gridData, seatData, siteData
let urlPrefix = '/static/assets/'

function preload() {
  gridData = loadJSON(urlPrefix + 'pcd-town.json')
  seatData = loadJSON(urlPrefix + 'pcd-town-seat.json')
  siteData = loadJSON(urlPrefix + 'site.json')
  let spriteBody = loadImage(urlPrefix + 'characters_free/assets/character_animation.png')
  let spriteHair = loadImage(urlPrefix + 'characters_free/assets/hair_braids_brown.png')
  let spritePants = loadImage(urlPrefix + 'characters_free/assets/pants_black.png')
  let spriteShirt = loadImage(urlPrefix + 'characters_free/assets/shirt_basic_red.png')
  let spriteShoes = loadImage(urlPrefix + 'characters_free/assets/shoes_brown.png')
  userSprite.push(spriteBody, spriteHair, spritePants, spriteShirt, spriteShoes) 
  buildingSprite = loadImage(urlPrefix + 'sprite.png')

}

function setup() {
  building = new Building(gridData, seatData, siteData, buildingSprite)
  xMax = building.cols * building.edge 
  yMax = building.rows * building.edge
  
  createCanvas(width, height)

  let g = createGraphics(32*8, 32*2)
  userSprite.forEach(img => g.image(img, 0, 0))
  user = new User(0, 0, building.edge, g.get())
  building.build()

  building.drawBackground(camera)

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

