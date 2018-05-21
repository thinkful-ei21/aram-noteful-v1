'use strict';

const express = require('express');

const data = require('./db/notes');

const app = express();

// ADD STATIC SERVER HERE

//Pull files from public and push to DOM
app.use(express.static('public'));

//Endpoint to return a list of notes
app.get('/api/notes', (req, res) => {

  const searchTerm = req.query.searchTerm;
  if (searchTerm) {
    let filteredList = data.filter(function (item) {
      return item.title.includes(searchTerm);
    });
    res.json(filteredList);
  } else {
    res.json(data);
  }

});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;


  let note = data.find(function (item) {
    return item.id === Number(id);
  });
  res.json(note);

});

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
