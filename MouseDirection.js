class MouseDirection {
  lastPos = []
  direction = ''
  mod(x){
    if (x < 0) {
      return x * -1
    }
    return x
  }
  interpret(event){
    if (this.lastPos.length === 0) {
      this.lastPos = [event.clientX, event.clientY]
    }
    else {
      let pos = [event.clientX, event.clientY]
      let dx = pos[0] - this.lastPos[0]
      let dy = pos[1] - this.lastPos[1]
      let modDx = this.mod(dx)
      let modDy = this.mod(dy)
      if (modDx > modDy) {
        if (modDx > 10) {
          this.lastPos[0] = pos[0]
          this.lastPos[1] = pos[1]
          if (dx > 0) {
            this.direction = 'right'
          }
          else {
            this.direction = 'left'
          }
        }
      }
      else {
        if (modDy > 10) {
          this.lastPos[0] = pos[0]
          this.lastPos[1] = pos[1]
          if (dy > 0) {
            this.direction = 'down'
          }
          else {
            this.direction = 'up'
          }
        }
      }
    }
  }
}

export {
  MouseDirection
}
