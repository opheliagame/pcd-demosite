const MSG1 = 'loading '
const MSG2 = 'just a minute '
let amp1, amp2, t, cols, size

function LoadingSketch(p) {
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textAlign(CENTER, CENTER)
    size = p.width/50
    p.textSize(size)
    amp1 = p.textWidth(MSG1)
    amp2 = p.textWidth(MSG2)
    cols = Math.floor(p.width/amp1)
  }

  p.draw = function() {
    p.background(255);
    t = p.millis()/1000.0
  
    for(let j = 0; j < p.height; j+=size){
      let xoff = p.sin(p.radians(j+t))*size*5
     
      let i = xoff
      while(i < p.width+amp1) {
        let xdiff = (i <= p.width/2) ? amp2 : amp1
        let msg = xdiff === amp1 ? MSG1 : MSG2 
        p.text(msg, i, j)
        
        i += xdiff
      }
    }
  }
}