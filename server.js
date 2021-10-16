const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const app = express();
const PORT = 3001;
const fs = require('fs');
const ds = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

function postNewNote(body, notes) {
    const note = body;
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './notes.html'));
  });

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) =>{
    const newNote = req.body;
    

    console.log(newNote);

    notes.push(newNote);

    res.json(newNote);
})

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });

  //console.log(notes);