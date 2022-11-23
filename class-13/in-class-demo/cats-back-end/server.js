'use strict'

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// bring in mongoose
const mongoose = require('mongoose');

// must bring in a schema is we want to interact with that model
const Cat = require('./models/cat.js');

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// connect Mongoose to our MongoDB
mongoose.connect(process.env.DB_URL);


// USE
// implement express
const app = express();

// middleware
app.use(cors());
// MUST have this to recieve json data from a request:
app.use(express.json());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

app.get('/cats', getCats);
app.post('/cats', postCats);
// Path Parameter — a variable that we declare in the path
// ex URL:
// http://localhost:3001/cats/637bceabc57c693faee21e8f
// I can access the value 637bceabc57c693faee21e8f with:
// req.params.id
app.delete('/cats/:id', deleteCats);
app.put('/cats/:id', putCats);

async function getCats(req, res, next) {
  // console.log(req);
  try {
    // get cat data from the database
    let results = await Cat.find();
    res.status(200).send(results);
  } catch(err) {
    next(err);
  }
}

/*
  for a query
  http://localhost:3001/cat?color=orange
  access orange
  req.query.color

*/

async function postCats(req, res, next) {
  try {
    // Json data will come in the 
    // req.body
    // Remember you need to bring in express.json() above to be able to access json data in a request

    // console.log(req.body);
    // we need the cat back from the database with the id and version number (thus createdCat)
    let createdCat = await Cat.create(req.body);
    console.log(createdCat);
    res.send(createdCat);
  } catch(err) {
    next(err);
  }
}

async function deleteCats(req, res, next) {
  try {
    // get the ID of the cat we want to delete:
    //console.log(req.params.id);

    // make a request to the database to delete the cat in question
    // Do not assume that you will response:
    await Cat.findByIdAndDelete(req.params.id);
    res.send('cat deleted');
  } catch(err) {
    next(err);
  }
}

async function putCats(req, res, next) {
  try {
    let id = req.params.id;
    // json data comes in the req.body
    let updatedCatData = req.body;

    // findByIdAndUpdate() takes 3 parameters
    // - 1. the ID of the thing in the database to update
    // - 2. the updated data object
    // - 3. options object (please replace the entire thing in the database with this new thing)
    let updatedCat = await Cat.findByIdAndUpdate(id, updatedCatData, { new: true, overwrites: true });
    res.status(200).send(updatedCat);

  } catch(err) {
    next(err);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  res.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
