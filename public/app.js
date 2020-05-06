document.getElementById('hamburgerMenu').addEventListener('click', () => {
  let x = document.getElementById('nav')
  if (x.className !== 'responsive') {
    x.className = 'responsive'
    document.querySelector('#hamburgerMenu .hamburgerClose').style.display = 'block'
    document.querySelector('#hamburgerMenu .hamburger-text').style.display = 'none'
  } else {
    document.querySelector('#hamburgerMenu .hamburgerClose').style.display = 'none'
    document.querySelector('#hamburgerMenu .hamburger-text').style.display = 'block'
    x.className = ''
  }
})


document.getElementById('themeSong').addEventListener('click', () => {
  let audio = document.getElementById('audio')
  audio.play()
})