console.log('hello from matter')
// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events;

const bodies = {}
// create two boxes and a ground
const div = document.querySelectorAll('.matter')
const boxes = Array.from(div).map(d => {
  let body = {
    'x': d.offsetLeft,
    'y': d.offsetTop,
    'width': d.offsetWidth,
    'height': d.offsetHeight
  }
  const static = Math.random() < 0.5 ? true : false
  const angle = Math.floor(Math.random()*Math.PI*2 - Math.PI)
  bodies[d.id] = body
  
  return Bodies.rectangle(body.x, body.y, body.width, body.height, {id: d.id, angle: angle})
})
var ground = Bodies.rectangle(window.innerWidth/2, window.innerHeight-40,  window.innerWidth*2, 10, { isStatic: true });

const turnOnGravity = (state) => {
  if(state) {
    var engine = Engine.create();
    // var render = Render.create({
    //   element: document.body,
    //   engine: engine
    // });
  
    Composite.add(engine.world, boxes);
    Composite.add(engine.world, ground);
  
    var runner = Runner.create();
    Runner.run(runner, engine);
  
    Events.on(runner, "afterUpdate", () => {
      boxes.forEach(box => {
        if(!box.isStatic) {
          const div = document.getElementById(box.id)
          const prevPos = box.positionPrev
          const pos = box.position
          const rot = box.angle
          const translate = {x: pos.x - prevPos.x, y: prevPos.y - pos.y}
          // div.style.transform = `translate(${pos.x}px, ${pos.y}px)`
          div.style.position = 'absolute'
          div.style.left = `${pos.x}px`
          div.style.top = `${pos.y}px`
          div.style.transform = `rotate(${rot}deg)`
          div.style.width = `${bodies[box.id].width}px`
          div.style.height = `${bodies[box.id].height}px`
        } 
      })
    })
  }
  else {
    location.reload()
  }
  
} 

