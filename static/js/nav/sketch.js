
let modal = document.getElementById('modal')
let building, user
let height = window.innerHeight
let width = window.innerWidth
let userSprite = []
let farmSprite, floorImage
let gridData
let urlPrefix = '/pcd-demosite/static/assets/'

function preload() {
  gridData = loadJSON(urlPrefix + 'grid.json')
  let spriteBody = loadImage(urlPrefix + 'characters_free/assets/character_animation.png')
  let spriteHair = loadImage(urlPrefix + 'characters_free/assets/hair_braids_brown.png')
  let spritePants = loadImage(urlPrefix + 'characters_free/assets/pants_black.png')
  let spriteShirt = loadImage(urlPrefix + 'characters_free/assets/shirt_basic_red.png')
  let spriteShoes = loadImage(urlPrefix + 'characters_free/assets/shoes_brown.png')
  userSprite.push(spriteBody, spriteHair, spritePants, spriteShirt, spriteShoes) 
  farmSprite = loadImage(urlPrefix + 'farm_free/free.png')
}

function setup() {
  createCanvas(width, height)
  
  building = new Building(gridData, farmSprite)
  let g = createGraphics(32*8, 32*2)
  userSprite.forEach(img => g.image(img, 0, 0))
  user = new User(0, 0, building.edge, g.get())
  building.build()

  g = createGraphics(width, height)
  for(let i = 0; i < width; i+=building.edge) {
    for(let j = 0; j < height; j+=building.edge) {
      g.image(farmSprite.get(0, 0, 48, 48), i, j, building.edge, building.edge)
    }
  } 
  floorImage = g.get()
}

function draw() {
  // background(255)
  // background('rgba(135,148,77, 0.5)')
  background(255)
  image(floorImage, 0, 0)
  
  building.draw()
  user.io(user.w/10)
  user.draw()  
}
