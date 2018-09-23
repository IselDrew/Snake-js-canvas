function init () {
  let canvas
  let ctx

  const speed = 10
  const directions = {
    38: 'up',
    40: 'down',
    37: 'left',
    39: 'right'
  }
  const initialPosition = {
    x: 150,
    y: 100
  }
  const moving = {
    up: false,
    right: false,
    down: false,
    left: false
  }
  let wormSections = 10
  const wormSize = 10
  const path = [initialPosition]

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    drawWorm()
  }

  function drawWorm() {
    for (let i = 0; i < wormSections; i++) {
      if (path.length < wormSections) {
        return
      }
      const pos = path[path.length - 1 - i]
      ctx.beginPath()
      ctx.fillRect(pos.x, pos.y, wormSize, wormSize)
      ctx.fill()
    }
  }

  function createCanvas() {
    canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    ctx = canvas.getContext("2d")
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  function setDirection(direction, isActive) {
    if (direction) {
      moving[direction] = isActive
    }
  }

  function recalculatePosition() {
    const head = path[path.length - 1]
    const position = { x: head.x, y: head.y }
    if (moving.up) {
      position.y -= speed
    } else if (moving.down) {
      position.y += speed
    }
    if (moving.left) {
      position.x -= speed
    } else if (moving.right) {
      position.x += speed
    }
    path.push(position)
  }

  function onResize() {
    resizeCanvas()
  }

  function onLoadComplete() {
    createCanvas()
    resizeCanvas()
    animate()
  }

  function onKeyEvent(event) {
    setDirection(directions[event.keyCode], event.type === 'keydown')
  }

  function animate() {
    recalculatePosition()
    draw()
    requestAnimationFrame(animate)
  }

  window.addEventListener('keydown', onKeyEvent)
  window.addEventListener('keyup', onKeyEvent)
  window.addEventListener('load', onLoadComplete)
  window.addEventListener('resize', onResize)
}

init()
