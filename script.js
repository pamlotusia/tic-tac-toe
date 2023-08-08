const currentPlayer = document.querySelector('.currentPlayer')

let selected
let player = 'X'
let playerIcon = document.getElementById('icon-player')
let messageContainer = document.querySelector('#message')
let messageText = document.querySelector('#message p')
let messageIcon = document.querySelector('#message-icon')



let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

function init() {
  selected = []

  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`

  document.querySelectorAll('.board button').forEach(item => {
    item.innerHTML = ''
    item.classList.remove('winner')
    item.addEventListener('click', newMove)
  })
}

init()

function newMove(e) {
  const index = e.target.getAttribute('data-i')
  //insere o player no botão do board
  e.target.innerHTML = player
  //remove click, não deixando selecionar o mesmo botão mais de uma vez por partida
  e.target.removeEventListener('click', newMove)
  //preenche variavel com o valor da posição que foi selecionada
  selected[index] = player

  //verifica se já alguma coordenada de vitoria já aconteceu
  setTimeout(() => {
    check()
  }, [100])

  //player = player === 'X' ? 'O' : 'X'
  if (player == 'X') {
    playerIcon.src = './images/my-melody-icon.png'
    player = 'O'
  } else {
    playerIcon.src = './images/hello-kitty-icon.png'
    player = 'X'
  }

  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`
}

function check() {
  let playerLastMove = player === 'X' ? 'O' : 'X'

  //pega o array selected e verifica seus valores para encontrar uma coordenada vencedora
  const items = selected
    .map((item, i) => [item, i])
    .filter(item => item[0] === playerLastMove)
    .map(item => item[1])

  for (pos of positions) {
    if (pos.every(item => items.includes(item))) {
      pos.forEach(item => {
        document.querySelector(`[data-i="${item}"]`).classList.add('winner')
      })

      setTimeout(() => {
        declareWinner(playerLastMove)
        init()
      }, 500)
      return
    }
  }

  if (selected.filter(item => item).length === 9) {
    declareWinner('')
    init()
    return
  }
}

function declareWinner(winner) {
  let scoreboardX = document.querySelector('#scoreboard-1')
  let scoreboardO = document.querySelector('#scoreboard-2')
  let msg = ''

  if (winner == 'X') {
    scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1
    msg = 'Hello Kitty venceu'
    messageIcon.src = './images/hello-kitty-winner.png'
  } else if (winner == 'O'){
    scoreboardO.textContent = parseInt(scoreboardO.textContent) + 1
    msg = 'My Melody venceu'
    messageIcon.src = './images/my-melody-winner.png'
  } else {
    messageIcon.src = './images/kuromi.gif'
    msg = 'Deu velha !'
  }
  //exibe mensagem
  messageText.innerHTML = msg
  messageContainer.classList.remove('hide')

  //esconde msg
  setTimeout(function () {
    messageContainer.classList.add('hide')
  }, 2000)
}
