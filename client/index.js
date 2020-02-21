const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/notes' : 'https://server-tan.now.sh/notes'

// document selectors
const form = document.querySelector('form')
const formContainer = document.querySelector('.card-container')

const noteCard = document.getElementById('note-card')
const cardText = document.querySelector('.card-text')
const created = document.querySelector('#card-date')
const toggleButton = document.querySelector('#form-toggle')
const alert = document.querySelector('.alert')

formContainer.style.display = 'none'
alert.style.display = 'none'

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

  // FIX!!: Need to get an alert running for if the content is empty!
  // It will throw a 422 error in console, but need to handle it on
  // client as well

  fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json())
    .then(createdNote => {
      if (createdNote) {
        form.reset()
        formContainer.style.display = 'none'
        noteCard.style.display = ''
        toggleButton.style.display = ''
        showLatestNote()
      } else {
        alert.style.display = ''
      }
    })

})

function showLatestNote() {
  fetch(API_URL)
    .then(res => res.json())
    .then(notes => {
      let latestNote = notes.reverse().shift()
      cardText.textContent = latestNote.content
      let date = latestNote.created
      date.toLocaleString()
      created.textContent = date
    })
}

function toggleFormDisplay() {
  formContainer.style.display = ''
  noteCard.style.display = 'none'
  toggleButton.style.display = 'none'
}