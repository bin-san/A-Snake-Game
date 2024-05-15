class SnakeGame {
  snake = []
  snakeLocation = []

  snakeSize = 2
  dimension = window.innerHeight > window.innerWidth ? window.innerWidth: window.innerHeight
  gardenWidth = this.dimension
  gardenHeight = this.dimension

  deltaMovement = 30
  snakePixelSize = 30

  numOfPixelsInWidth = Math.floor(this.gardenWidth / this.snakePixelSize)
  numOfPixelsInHeight = Math.floor(this.gardenHeight / this.snakePixelSize)

  food = document.createElement('div')

  // auto moving
  autoMover = null
  autoMoverId = null

  constructor() {
    main.style.width = `${this.numOfPixelsInWidth * this.snakePixelSize}px`
    main.style.height = `${this.numOfPixelsInHeight * this.snakePixelSize}px`

    for (let i = 0; i < this.snakeSize; i += 1) {
      this.snakeLocation.push([i, 0])
      let snakeElement = document.createElement('div')
      snakeElement.classList.add('snake')
      snakeElement.style.top = '0px'
      snakeElement.style.left = `${i * this.snakePixelSize}px`
      snakeElement.style.width = `${this.snakePixelSize}px`
      snakeElement.style.height = `${this.snakePixelSize}px`
      this.snake.push(snakeElement)
      document.body.appendChild(snakeElement)
    }
    this.snake[this.snake.length - 1].classList.add('snakehead')
    window.onkeydown = (event)=>{
      console.log(event.key)
      switch (event.key) {
        case 'ArrowUp':
          if (this.autoMover == this.moveDown) {
            break;
          }
          clearTimeout(this.autoMoverId)
          this.autoMover = this.moveUp
          this.moveUp()
          break;
        
        case 'ArrowDown':
          if (this.autoMover == this.moveUp) {
            break;
          }
          clearTimeout(this.autoMoverId)
          this.autoMover = this.moveDown
          this.moveDown()
          break
        
        case 'ArrowLeft':
          if (this.autoMover == this.moveRight) {
            break;
          }
          clearTimeout(this.autoMoverId)
          this.autoMover = this.moveLeft
          this.moveLeft()
          break
        
        case 'ArrowRight':
          if (this.autoMover == this.moveLeft) {
            break;
          }
          clearTimeout(this.autoMoverId)
          this.autoMover = this.moveRight
          this.moveRight()
          break
      
        default:
          break;
      }
    }
    // Food
    this.foodLoc = null
    this.food.style.position = 'absolute'
    this.food.style.display = 'none'
    this.food.classList.add('foodContainer')
    let foodChild = document.createElement('div')
    foodChild.classList.add('food')
    this.food.appendChild(foodChild)
    document.body.appendChild(this.food)
    this.createFood()

    // Automover
    this.autoMover = this.moveRight
    // this.autoMoverId = setInterval(()=>{
    //   this.autoMover()
    // }, 350)
    this.moveRight()
  }
  createSnakeMetamer(){
    let snakeElement = document.createElement('div')
    snakeElement.classList.add('snake')
    snakeElement.style.width = `${this.snakePixelSize}px`
    snakeElement.style.height = `${this.snakePixelSize}px`
    document.body.appendChild(snakeElement)
    return snakeElement
  }
  doesSnakeBitesItself(headX, headY) {
    for (let i of this.snakeLocation) {
      if (headX == i[0] && headY == i[1]) {
        return true 
      }
    }
    return false
  }
  update() {
    for (let i = this.snakeLocation.length - 1; i >= 0; i -= 1) {
      let loc = this.snakeLocation[i]
      this.snake[i].style.left = `${loc[0] * this.snakePixelSize}px`
      this.snake[i].style.top = `${loc[1] * this.snakePixelSize}px`
    }
  }
  speed(){
    return 350 - this.snakeSize * 2
  }
  moveSnake(x, y) {
    if (this.foodLoc[0] == x && this.foodLoc[1] == y) {
      // meet the food
      this.food.style.display = 'none'
      this.snakeLocation.push([x, y])
      this.snake.unshift(this.createSnakeMetamer())
      this.snakeSize += 1
      this.update()
      score.innerText = (parseInt(score.innerText) + 1).toString()
      this.createFood()
    }
    else {
      this.snakeLocation.push([x, y])
      this.snakeLocation.shift()
      this.update()
    }
  }
  moveRight(){
    let headLoc = this.snakeLocation[this.snakeLocation.length - 1]
    let x = headLoc[0] + 1
    let y = headLoc[1]

    if (x < this.numOfPixelsInWidth && !this.doesSnakeBitesItself(x, y)) {
      this.moveSnake(x, y)
      if (this.autoMover == this.moveRight) {
        this.autoMoverId = setTimeout(()=>{
          this.moveRight()
        }, this.speed())
      }
    }
    else {
      // Game Over
      this.gameOver()
    }
  }
  moveLeft(){
    let headLoc = this.snakeLocation[this.snakeLocation.length - 1]
    let x = headLoc[0] - 1
    let y = headLoc[1]

    if (x >= 0 && !this.doesSnakeBitesItself(x, y)) {
      this.moveSnake(x, y)
      if (this.autoMover == this.moveLeft) {
        this.autoMoverId = setTimeout(()=>{
          this.moveLeft()
        }, this.speed())
      }
    }
    else {
      // Game Over
      this.gameOver()
    }
  }
  moveUp(){
    let headLoc = this.snakeLocation[this.snakeLocation.length - 1]
    let x = headLoc[0]
    let y = headLoc[1] - 1

    if (y >= 0 && !this.doesSnakeBitesItself(x, y)) {
      this.moveSnake(x, y)
      if (this.autoMover == this.moveUp) {
        this.autoMoverId = setTimeout(()=>{
          this.moveUp()
        }, this.speed())
      }
    }
    else {
      // Game Over
      this.gameOver()
    }
  }
  moveDown(){
    let headLoc = this.snakeLocation[this.snakeLocation.length - 1]
    let x = headLoc[0]
    let y = headLoc[1] + 1

    if (y < this.numOfPixelsInHeight && !this.doesSnakeBitesItself(x, y)) {
      this.moveSnake(x, y)
      if (this.autoMover == this.moveDown) {
        this.autoMoverId = setTimeout(()=>{
          this.moveDown()
        }, this.speed())
      }
    }
    else {
      // Game Over
      this.gameOver()
    }
  }
  // should run this on a worker thread
  createFood(){
    let possibleFoodLocations = []
    for (let i = 0; i < this.numOfPixelsInWidth; i += 1) {
      for (let j = 0; j < this.numOfPixelsInHeight; j += 1) {
        for(let loc of this.snakeLocation) {
          if (i != loc[0] || j != loc[1]) {
            possibleFoodLocations.push([i, j])
          }
        }
      }
    }
    let index = Math.floor(Math.random() * (possibleFoodLocations.length - 1))
    console.log(index)
    this.foodLoc = possibleFoodLocations[index]
    let _foodLoc = this.foodLoc.map((v)=>{return v * this.snakePixelSize})
    this.food.style.top = `${_foodLoc[1]}px`
    this.food.style.left = `${_foodLoc[0]}px`
    this.food.style.display = 'flex'
  }
  gameOver(){
    console.log('Game Over!')
    this.autoMover = null
    score2.innerText = score.innerText
    window.gameOver.style.display = 'flex'
    clearInterval(this.autoMoverId)
  }
}

startGame.onclick = (event)=>{
  home.style.display = 'none'
  let snakeGame = new SnakeGame()
}
document.querySelector('#gameOver button').onclick = (event)=>{
  window.location.href = ''
}
