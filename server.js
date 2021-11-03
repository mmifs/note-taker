const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const app = express();
const PORT = 3001;
const fs = require('fs');
const ds = require('fs');
const { join } = require('path')
const {v4: uuidv4} = require('uuid');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, '/db/db.json'),
      JSON.stringify({notes: notesArray}, null, 2)
    );
    return note;
};


//get index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
  });


  //get notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  //get notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) =>{
  req.body.id = uuidv4();
  const note = createNewNote(req.body, notes);
  res.json(note);
})

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });