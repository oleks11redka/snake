'use strict'

const canvas = document.getElementById('snake')
const ctx = canvas.getContext('2d')

const box = 32
let score = 0

const ground = new Image()
ground.src = 'SnakeAssets/img/ground.png'

const food = new Image()
food.src = 'SnakeAssets/img/food.png'

let eat = new Audio()
eat.src = 'SnakeAssets/audio/eat.mp3'

let dead = new Audio()
dead.src = 'SnakeAssets/audio/dead.mp3'

let down = new Audio()
down.src = 'SnakeAssets/audio/down.mp3'

let left = new Audio()
left.src = 'SnakeAssets/audio/left.mp3'

let right = new Audio()
right.src = 'SnakeAssets/audio/right.mp3'

let up = new Audio()
up.src = 'SnakeAssets/audio/up.mp3'

let snake = []
snake[0] = {
  x: 9 * box,
  y: 10 * box
}

let foodPos = {
  x: Math.floor(Math.random()*17+1) * box,
  y: Math.floor(Math.random()*15+3) * box
}

let direction

document.addEventListener('keydown', ({keyCode: key}) => {
  if(key === 37 && direction !== 'right') {
      direction = 'left'
        right.play()
  }
  if(key === 38 && direction !== 'down') {
      direction = 'up'
      down.play()
  }
  if(key === 39 && direction !== 'left') {
      direction = 'right'
        left.play()
  }
  if(key === 40 && direction !== 'up') {
      direction = 'down'
        up.play()
  }
})

function draw() {
  ctx.drawImage(ground, 0, 0)
  ctx.drawImage(food, foodPos.x, foodPos.y)

  let {x: sx, y: sy} = snake[0]

  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? 'teal' : '#ffffff'
    ctx.fillRect(snake[i].x,snake[i].y,box,box)
    ctx.strokeRect(snake[i].x,snake[i].y,box,box)
  }

  if(direction === 'left') sx -= box
  if(direction === 'right') sx += box
  if(direction === 'down') sy += box
  if(direction === 'up') sy -= box

  if(sx > 17*box) sx = 1*box
  if(sx < 1*box) sx = 17*box
  if(sy < 3*box) sy = 17*box
  if(sy > 17*box) sy = 3*box

  if(sx === foodPos.x && sy === foodPos.y) {
    score++
    foodPos = {
      x: Math.floor(Math.random()*17+1) * box,
      y: Math.floor(Math.random()*15+3) * box
    }
    eat.play()
    console.log(snake)
  } else {
    snake.pop()
  }

  let nextSnake = {
    x: sx,
    y: sy
  }

  for(let r of snake) {
    if(r.x === sx && r.y === sy) {
        dead.play()
        alert('Oopsie daisies')
        // clearInterval(interval)
        snake = [{
            x: 9 * box,
            y: 10 * box
        }]
        direction = ''
        score = 0
        setTimeout(draw, 250 - score * 5)
        return null
    }
  }

  snake.unshift(nextSnake)

  ctx.font = '36px sans-serif'
  ctx.fillStyle = '#ffffff'
  ctx.fillText(score,2*box, 1.5*box)

  setTimeout(draw, 250 - score * 5)

}

setTimeout(draw, 250)