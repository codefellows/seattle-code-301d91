'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Cat = require('./models/cat');
mongoose.connect(process.env.DB_URL);



async function seed() {
  // add some Cats to the database
  // must follow the same formart as our cat schema
  /*
    const catSchema = new Schema({
      name: {type: String, required: true},
      color: {type: String, required: true},
      spayNeuter: {type: Boolean, required: true},
      location: {type: String, required: true},
    });
  */

  await Cat.create({
    name: 'Sushi',
    color: 'tan and black',
    spayNeuter: true,
    location: 'Seattle'
  });
  console.log('Suchi was added to the database')

  await Cat.create({
    name: 'Angel',
    color: 'black',
    spayNeuter: true,
    location: 'Fort Collins'
  });
  console.log('Angel was added to the database');


  // close the connection to the database
  mongoose.disconnect();
}

seed();
