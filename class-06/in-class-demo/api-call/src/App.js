import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      starWarsData: [],
      city: '',
      cityData: {},
      isError: false,
      errorMessage: ''
    }
  }

  handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // get the data from the API
      /*
        1. async
        2. await
        3. .data
      */
      let swData = await axios.get('https://swapi.dev/api/people/?page=1');
      // proof of life
      //console.log(swData.data.results);
      // save that data somewhere??? — save it in State
      this.setState({
        starWarsData: swData.data.results,
        isError: false
      });
    } catch (error) {
      console.log('error: ', error);
      console.log('error.message: ', error.message);
      this.setState({
        errorMessage: error.message,
        isError: true
      });
    }
  }

  handleCityInput = (event) => {
    // console.log(event.target.value);
    this.setState({
      city: event.target.value
    });
  };

  handleCitySubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.city);
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
    console.log(url);
    // Make a request to the API using the URL
    let locationInfo = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
    // proof of life
    console.log(locationInfo.data[0]);
    // put the data from the API into State
    this.setState({
      cityData: locationInfo.data[0]
    });
  }


  render() {
    // console.log(this.state.starWarsData);
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=47.6038321,-122.330062&zoom=8`

    let swCharacters = this.state.starWarsData.map((char, idx) => {
      return <li key={idx}>{char.name}</li>;
    });

    return (
      <>
        <h1>Data from an API</h1>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Display Star Wars data</button>
        </form>
        {
          this.state.isError
            ? <p>{this.state.errorMessage}</p>
            : <ul>
              {swCharacters}
            </ul>
        }

        <form onSubmit={this.handleCitySubmit}>
          <label>Pick a City
            <input name="city" type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit">Get City Data</button>
        </form>
      </>
    );
  }
}

export default App;
