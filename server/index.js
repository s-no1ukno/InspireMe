const express = require('express')
const cors = require('cors')
const monk = require('monk')
require('dotenv').config

const app = express()

const db = monk(process.env.MONGO_URI || 'localhost/notesdb')
const notes = db.get('notes')

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.json({
    message: 'It is working!'
  })
})

app.get('/notes', (req, res) => {
  notes
    .find()
    .then(notes => {
      res.json(notes)
    })
})

function isValidNote(note) {
  return note.content && note.content.toString().trim() !== ''
}

app.post('/notes', (req, res) => {
  if (isValidNote(req.body)) {
    const note = {
      content: req.body.content.toString(),
      created: new Date()
    }

    notes
      .insert(note)
      .then(createdNote => {
        res.json(createdNote)
      })
  } else {
    res.status(422)
    res.json({
      message: 'Hey! This is kinda required before submission, doink!'
    })
  }
})

app.listen(5000, () => {
  console.log('Listening on http://localhost:5000')
})