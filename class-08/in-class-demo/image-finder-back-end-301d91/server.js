'use strict';

// REQUIRE
// required from npm
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// instantiate express server by calling express
const app = express();

// USE
app.use(cors());

// define port and proof that env works
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (req, res) => {
  res.status(200).send('Hello there!');
});

// route for photo requests
app.get('/photos', async (req, res) => {
  // extract values from the request
  // // `${process.env.REACT_APP_SERVER}/photos?searchQuery=${this.state.searchQuery}`
  // console.log(req.query.searchQuery);
  let searchedValue = req.query.searchQuery;

  // then I'm going to make an additional request to the Unsplash API
  // request URL: https://api.unsplash.com/search/photos/?client_id=xxxxAPIKEYxxx&query=kittens
  let url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${searchedValue}`;
  let results = await axios.get(url);
  let picArray = results.data.results.map(pic => new Photo(pic));

  // Clean up the data that we get from the API
  // create instances of a class
  // send that groomed data back to the front with the response
  res.send(picArray);
})

app.get('*', (req, res) => {
  res.status(404).send('These are not the droids you are looking for...')
});

// CLASSES
class Photo {
  constructor(picObj) {
    this.src = picObj.urls.regular;
    this.alt = picObj.alt_description;
    this.artist = picObj.user.name;
  }
}


// ERRORS
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

// LISTEN
// need to listen to keep server running
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
