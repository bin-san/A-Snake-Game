let snake = {
  previousPos: [],
  currentPos: [[0, 0], [0, 1], [0, 2]],
  gardenWidth: null,
  gardenHeight: null,
  validPos: function(pos) {
    if (pos[0] >= 0 && pos[0] < this.gardenWidth && pos[1] >= 0 && pos[1] < this.gardenHeight) {
      return true
    }
    return false
  },
  moveRight: function() {
    // this.previousPos = structuredClone(this.currentPos)
    let headPos = this.currentPos[this.currentPos.length - 1]
    headPos[1] += 1
    if (this.validPos(headPos)) {
      this.currentPos.push(headPos)
      this.currentPos.shift()
    }
    this.update()
  },
  update: function(){
    let snakePixels = document.getElementsByClassName('snake')
    for (let pixel of snakePixels) {
      pixel.classList.remove('snake')
    }
    for (let pos of this.currentPos) {
      document.getElementById(`p${pos[0]}_${pos[1]}`).classList.add('snake')
    }
  }
}

function init() {
  let main = document.getElementById('main')
  let screenWidth = main.clientWidth
  let screenHeight = main.clientHeight
  let minSide = screenHeight > screenWidth? screenWidth: screenHeight;

  let pixelSide = Math.floor(minSide / 20)

  let numOfPixelsInWidth = Math.floor(screenWidth / pixelSide)
  let numOfPixelsInHeight = Math.floor(screenHeight / pixelSide)

  snake.gardenWidth = numOfPixelsInWidth
  snake.gardenHeight = numOfPixelsInHeight

  // let totalPixels = numOfPixelsInHeight * numOfPixelsInWidth

  main.style.display = 'flex'
  main.style.flexWrap = 'wrap'
  
  for (let i = 0; i < numOfPixelsInWidth; i += 1) {
    for (let j = 0; j < numOfPixelsInHeight; j += 1) {
      let pixel = document.createElement('div')
      pixel.setAttribute('id', `p${i}_${j}`)
      pixel.style.width = `${pixelSide}px`
      pixel.style.height = `${pixelSide}px`
      // pixel.style.backgroundColor = `rgb(${Math.floor(255*Math.random())}, ${Math.floor(255*Math.random())}, ${Math.floor(255*Math.random())})`
      main.append(pixel)
    }
  }
}

init()
