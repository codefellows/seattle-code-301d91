import React from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';

let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      howToSort: '',
      filteredData: []
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target.name.value);
    // this.setState({
    //   name: event.target.name.value,
    //   howToSort: event.target.selected.value
    // });
    console.log(this.state.howToSort);

    console.log(event.target.usersName.value);


    let newData;
    if (this.state.howToSort === 'even') {
      newData = data.filter(num => num % 2 === 0)
    } else if (this.state.howToSort === 'odd') {
      newData = data.filter(num => num % 2 !== 0)
    } else {
      newData = data;
    }
    this.setState({
      filteredData: newData
    });
  }

  handleSelect = (e) => {
    // console.log('hi');
    // console.log(e.target.value);
    this.setState({
      howToSort: e.target.value
    });
  }

  render() {
    console.log(this.state.filteredData);
    let numbers = this.state.filteredData.map((dataItem, idx) => {
      return <ListGroup.Item key={idx}>{dataItem}</ListGroup.Item>
    })

    return (
      <>
        <header>
          <h1>Forms in React</h1>
        </header>
        <main>
          <Form onSubmit={this.handleSubmit}>

            <Form.Label>Your Name
              <Form.Control type="text" name="name" />
            </Form.Label>

            <Form.Group controlId="usersName">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text"/>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="filterOption">Select Numbers</Form.Label>
              <Form.Select id="filterOption" name="selected" onChange={this.handleSelect}>
                <option value="all">All</option>
                <option value="even">Even</option>
                <option value="odd">Odd</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit">Submit</Button>
          </Form>

          <ListGroup>
            {numbers}
          </ListGroup>
        </main>
      </>
    )
  }
}

export default App;


/*


<form onSubmit={this.handleSubmit}>
            <Form.Label>Your Name
              <input type="text" name="name"/>
            </Form.Label>
            <fieldset>
              <legend>Select Numbers</legend>
              <select name="selected" onChange={this.handleSelect}>
                <option value="all">All</option>
                <option value="even">Even</option>
                <option value="odd">Odd</option>
              </select>
            </fieldset>
            <button type="submit">Submit</button>
          </form>


*/
