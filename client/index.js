const API_URL = 'http://localhost:5000/notes'

// document selectors
const form = document.querySelector('form')
const formContainer = document.querySelector('.card-container')

const noteCard = document.getElementById('note-card')
const cardText = document.querySelector('.card-text')
const toggleButton = document.querySelector('#form-toggle')

formContainer.style.display = 'none'

showLatestNote()

toggleButton.addEventListener('click', (e) => {
  e.preventDefault()
  toggleFormDisplay()
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(form)
  const content = formData.get('content')

  const note = {
    content
  }

  fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json())
    .then(createdNote => {
      formContainer.style.display = 'none'
      noteCard.style.display = ''
      toggleButton.style.display = ''
      console.log(createdNote)
      showLatestNote()
    })

})

function showLatestNote() {
  fetch(API_URL)
    .then(res => res.json())
    .then(notes => {
      let latestNote = notes.reverse().shift()
      cardText.textContent = latestNote.content
    })
}

function toggleFormDisplay() {
  formContainer.style.display = ''
  noteCard.style.display = 'none'
  toggleButton.style.display = 'none'
}