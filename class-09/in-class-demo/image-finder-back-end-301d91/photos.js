const axios = require('axios');

function getPhotos(req, res, next) {

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
