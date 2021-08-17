const talks = document.querySelectorAll('.talk')
const nodes = Array.from(talks).map(talk => new Map([
  ['vx', 0], 
  ['vy',  0],
  ['x', Number(talk.offsetLeft)],
  ['y', Number(talk.offsetTop)]
]))
console.log(nodes)

// random translation rotation
// Array.from(talks).forEach(talk => {
//   let x = Math.floor(Math.random()*500)
//   let y = Math.floor(Math.random()*500)
//   let rot = Math.floor(Math.random()*180)
//   talk.style.webkitTransform = `translate(${x}px, ${y}px) rotate(${rot}deg)`
// })

const ticked = () => {
  d3.selectAll('.talk')
  .data(nodes)
  // .attr('transform', (d) => {
  //   console.log(d.x, d.y)
  //   return `translate(${d.x}, ${d.y})`
  // })
  // .attr('transform', d => `translate(${d.x}, ${d.y})`)
  .style('transform', d => `translate(${d.x+1000}px, ${d.y+1000}px)`)
}

const simulation = d3.forceSimulation(nodes)
  .force('charge', d3.forceManyBody())
  .force('center', d3.forceCenter(window.innerWidth/2, window.innerHeight/2))
  // .nodes('tick', ticked)
