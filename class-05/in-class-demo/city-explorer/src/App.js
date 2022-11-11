import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.city.value);
    // // we can't put things in state and expect to use them right away, so this won't work:
    // this.setState({
    //   city: e.target.city.value
    // });

    //search for data about city
    console.log(this.state.city);
  }

  handleInputChange = (e) => {
    this.setState({
      city: e.target.value
    });
    // search for a city???? — Can't do it here because if I want to search for "Seattle" it may searchh for "S" "Se" and then "Sea" ...
  };

  render() {
    console.log(this.state.city);
    return (
      <>
        {/* Add a separate Header, Main and Footer components */}
        <h1>City Explorer</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Search for a City
          <input type="text" name="city" onChange={this.handleInputChange}/>
          </label>
          <button type="submit">Search for a City</button>
        </form>
      </>
    )
  }
}

export default App;
