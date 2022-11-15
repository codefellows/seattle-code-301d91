import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petData: {},
      species: '',
      showPet: false
    }
  }

  handlePet = async (e) => {
    e.preventDefault();
    // when I work locally REACT_APP_SERVER will equal localhost
    // when I deploy on Netlify I want it to equal the deployed server on Render
    let url = `${process.env.REACT_APP_SERVER}/pet?species=${this.state.species}`;
    let petData = await axios.get(url);
    console.log(petData.data);
  }

  handleInput = (e) => {
    this.setState({
      species: e.target.value
    });
  }

  render() {
    return (
      <>
        <h1>Find Your Pet</h1>
        <form onSubmit={this.handlePet}>
          <label>Search
            <input type="text" onInput={this.handleInput} />
          </label>
          <button>Display Pet</button>
        </form>
      </>
    );
  }
}

export default App;
