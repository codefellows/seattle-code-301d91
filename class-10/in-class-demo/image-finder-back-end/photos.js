'use strict';

const axios = require('axios');

// every time the server process a request from the front end. And the back makes the request to the API, we have that search on this object
let cache = {
  //kitten: {
  // data: <the data that I would send to the front end about kittens>
  // timeStamp: <the time we put this in the cache>
  // }

};


async function getPhotos(req, res, next) {
  try {

    let searchedValue = req.query.searchQuery;

    // create a key using the thing that the front end send in the request
    let key = searchedValue + 'Data';

    // how long do we cache the data?
    // we need to find how much time has passed since it was cached.
    let timeRightNow = Date.now();
    let acceptableTimeToCache = 1000 * 60 * 60 * 24 * 7 * 4;
    // Make milliseconds human readable:
    // - 1000 milliseconds in a second
    // - 60 seconds in minute
    // - 60 minutes in an hour
    // - 24 hours in a day 
    // - 30-ish days in a month || 7 days in a week
    // - 12 months in a year ...
    let timeToTestCache = 1000 * 20;

    if (cache[key] && (timeRightNow - cache[key].timeStamp < timeToTestCache)) {
      // if the data is already cached and it is recent enough, send the cached data
      console.log('The data is in already in the cache, here is the cached data');
      res.status(200).send(cache[key].data);


    } else {
      // if the data isn't already cached, we need make new request to the API
      console.log('The data is not in the cache, let\'s cache the data.');
      let params = {
        client_id: process.env.UNSPLASH_API_KEY,
        query: searchedValue,
      };
      let baseURL = 'https://api.unsplash.com/search/photos/';
      let results = await axios.get(baseURL, { params });
  
      let picArray = results.data.results.map(pic => new Photo(pic));

      // using the key we created, add a property to the cache, with the value of the thing we are sending back in the response
      // put the data into the cache for next time
      cache[key] = {
        data: picArray,
        timeStamp: Date.now(),
      }
      // send the data in the response
      res.status(200).send(picArray);
    }
    
    
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}


// CLASSES
class Photo {
  constructor(picObj) {
    this.src = picObj.urls.regular;
    this.alt = picObj.alt_description;
    this.artist = picObj.user.name;
  }
}

module.exports = getPhotos;





async function getPhotosNewWay(req, res, next) {
  try {
    // extract values from the request
    // // `${process.env.REACT_APP_SERVER}/photos?searchQuery=${this.state.searchQuery}`
    // console.log(req.query.searchQuery);
    let searchedValue = req.query.searchQuery;

    // then I'm going to make an additional request to the Unsplash API
    // request URL: https://api.unsplash.com/search/photos/?client_id=xxxxAPIKEYxxx&query=kittens
    // let url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${searchedValue}`;
    // let results = await axios.get(url);

    let params = {
      client_id: process.env.UNSPLASH_API_KEY,
      query: searchedValue,
    };
    let baseURL = 'https://api.unsplash.com/search/photos/';
    let results = await axios.get(baseURL, { params });



    let picArray = results.data.results.map(pic => new Photo(pic));

    // Clean up the data that we get from the API
    // create instances of a class
    // send that groomed data back to the front with the response
    res.send(picArray);
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}


function getPhotosWithPromises(req, res, next) {

  let searchedValue = req.query.searchQuery;

  let params = {
    client_id: process.env.UNSPLASH_API_KEY,
    query: searchedValue,
  };
  let baseURL = 'https://api.unsplash.com/search/photos/';
  // let results = await axios.get(baseURL, { params });

  axios.get(baseURL, { params })
    .then((results) => results.data.results.map(pic => new Photo(pic)))
    .then((picArray) => res.send(picArray))
    .catch((error) => console.log(error));

  // let picArray = results.data.results.map(pic => new Photo(pic));


  // res.send(picArray);

}
