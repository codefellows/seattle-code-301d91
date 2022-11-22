import React from 'react';
import axios from 'axios';
import './App.css';
import Cats from './Cats';
import { Button, Container, Form } from 'react-bootstrap';

let SERVER = process.env.REACT_APP_SERVER;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: []
    }
  }

  getCats = async () => {
    try {
      let results = await axios.get(`${SERVER}/cats`);
      this.setState({
        cats: results.data
      });
    } catch (error) {
      console.log('we have an error: ', error.response.data);
    }
  }

  postCat = async (aCat) => {
    try {
      // make the request to add a cat to my server
      // axios.post will return the cat that was added to the database with the ID and version number
      // axios.post takes in 2 parameters: the URL endpoint, and the thing we want added:
      let catThatWasAdded = await axios.post(`${SERVER}/cats`, aCat);
      console.log(catThatWasAdded);
      this.setState({
        cats: [...this.state.cats, catThatWasAdded.data]
      });
    } catch (err) {
      console.log('We have an error: ', err.response.data);
    }
  }

  deleteCat = async (id) => {
    // ex URL:
    // http://localhost:3001/cats/637bceabc57c693faee21e8f
    try {
      let url = `${SERVER}/cats/${id}`;
      // do not assume that axios.delete() will return a value
      await axios.delete(url);
      // // this is ok for today's lab
      // this.getCats();
      let updatedCats = this.state.cats.filter(cat => cat._id !== id);
      this.setState({
        cats: updatedCats
      })
    } catch (err) {
      console.log('We have an error: ', err.response.data);
    }
  }

  handleCatSubmit = (e) => {
    e.preventDefault();
    let newCat = {
      name: e.target.name.value,
      color: e.target.color.value,
      spayNeuter: e.target.spayNeuter.checked,
      location: e.target.location.value
    }
    this.postCat(newCat);
  }


  // method that will get called when the components loads (has all it needs)
  // net effect is that cats will display on the page on page load
  componentDidMount() {
    this.getCats();
  }

  render() {


    return (
      <>
        <header>
          <h1>Cool Cats</h1>
        </header>
        <main>
          {
            this.state.cats.length > 0 &&
            <>
              <Cats 
                cats={this.state.cats} 
                deleteCat={this.deleteCat}
              />
            </>
          }
          <Container className="mt-5">
            <Form onSubmit={this.handleCatSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="color">
                <Form.Label>Color</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="spayNeuter">
                <Form.Check type="checkbox" label="spay-neuter" />
              </Form.Group>
              <Button type="submit">Add Cat</Button>
            </Form>
          </Container>
        </main>
      </>
    );
  }
}

export default App;
