const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')
const $resultHeader = document.querySelector('#result-header')
const $timeHeader = document.querySelector('#time-header')
const $result = document.querySelector('#result')
const $gameTime = document.querySelector('#game-time')

let score = 0
let isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')
}

function startGame() {
  score = 0
  setGameTime()
  $gameTime.setAttribute('disabled', 'true')
  show($timeHeader)
  hide($resultHeader)
  isGameStarted = true
  $game.style.backgroundColor = '#fff'
  hide($start)

  const interval = setInterval(function () {
    let time = parseFloat($time.textContent)

    if (time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - .1).toFixed(1)
    }
  }, 100)

  renderBox()
}

function setGameTime() {
  let time = $gameTime.value
  $time.textContent = time
  show($timeHeader)
  hide($resultHeader)
}

function endGame() {
  isGameStarted = false
  $game.style.backgroundColor = '#ccc'
  show($start)
  $game.innerHTML = ''
  hide($timeHeader)
  show($resultHeader)
  $result.innerHTML = score
  $gameTime.removeAttribute('disabled')
}

function handleBoxClick(event) {

  if (!isGameStarted) {
    return
  }

  if (event.target.dataset.box) {
    score++
    renderBox()
  }
}

function renderBox() {
  $game.innerHTML = ''
  const box = document.createElement('div')
  let boxSize = getRandom(30, 100)
  let gameSize = $game.getBoundingClientRect()
  let maxTop = gameSize.height - boxSize
  let maxLeft = gameSize.width - boxSize

  box.style.width = box.style.height = boxSize + 'px'
  box.style.backgroundColor = getRandomColor()
  box.style.position = 'absolute'
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')

  $game.insertAdjacentElement('afterbegin', box)
}


function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}