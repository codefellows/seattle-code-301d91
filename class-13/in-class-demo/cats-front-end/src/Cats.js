import React from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import UpdateCatForm from './UpdateCatForm';

class Cats extends React.Component {
  render () {
    let cats = this.props.cats.map((cat) => (
      <Cat 
        cat={cat} 
        key={cat._id}
        deleteCat={this.props.deleteCat}
        updatedCat={this.props.updatedCat}
      />
    ));
    return (
      <Container>
        <ListGroup>
          {cats}
        </ListGroup>
      </Container>
    );

  }
}


class Cat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false
    }
  }

  // handleDelete = () => {
  //   this.props.deleteCat(this.props.cat.id);
  // }

  render () {
    return (
      <>
      <ListGroup.Item>
        {this.props.cat.name} is {this.props.cat.color}
        <div>
        <Button 
          variant="dark"
          onClick={() => this.props.deleteCat(this.props.cat._id)}
        >
          Delete Cat
        </Button>
        <Button
          onClick={() => this.setState({ showUpdateForm: true})}
        >
          Update Cat
        </Button>
        </div>
      </ListGroup.Item>
      {
        this.state.showUpdateForm && 
        <UpdateCatForm 
          cat={this.props.cat}
          updatedCat={this.props.updatedCat}
        />
      }
      </>
    );
  }
}

export default Cats;
