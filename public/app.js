document.getElementById('hamburgerMenu').addEventListener('click', () => {
  let x = document.getElementById('nav')
  if (x.className !== 'responsive') {
    x.className = 'responsive'
    document.querySelector('#hamburgerMenu img').src = './images/x.svg'
  } else {
    document.querySelector('#hamburgerMenu img').src = './images/hamburger.svg'
    x.className = ''
  }
})


document.getElementById('themeSong').addEventListener('click', () => {
  let audio = document.getElementById('audio')
  audio.play()
})