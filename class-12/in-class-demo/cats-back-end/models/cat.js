'use strict';

/*
// each cat in our database should look something like this:
let aCat = {
  name: 'Mr. Mistoffelees',
  color: 'black and white',
  spayNeuter: false,
  location: 'London'
}
*/

const mongoose = require('mongoose');

const { Schema } = mongoose;

const catSchema = new Schema({
  name: {type: String, required: true},
  color: {type: String, required: true},
  spayNeuter: {type: Boolean, required: true},
  location: {type: String, required: true},
});

// define our model
// this gives mongoose functionality and a predefined schema to shape our data
// it takes in a string and a schema:
const CatModel = mongoose.model('Cat', catSchema);

module.exports = CatModel;
