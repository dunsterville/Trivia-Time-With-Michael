document.getElementById('hamburgerMenu').addEventListener('click', () => {
  let x = document.getElementById('nav')
  if (x.className !== 'responsive') {
    x.className = 'responsive'
  } else {
    x.className = ''
  }
})


document.getElementById('themeSong').addEventListener('click', () => {
  let audio = document.getElementById('audio')
  audio.play()
})