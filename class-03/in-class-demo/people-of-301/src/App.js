import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Modal from 'react-bootstrap/Modal'
import data from './data.json';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hearts: '',
      isModalShown: false,
      name: ''
    }
  }


  addHearts = () => {
    this.setState({
      hearts: this.state.hearts + '❤️'
    });
  };

  handleCloseModal = () => {
    this.setState({
      isModalShown: false
    });
  };

  handleOpenModal = (name) => {
    console.log(name);
    this.setState({
      isModalShown: true,
      name: name
    });
  };


  render() {
    return (
      <>
        <Header
          hearts={this.state.hearts}
        />
        <Main
          addHearts={this.addHearts}
          handleOpenModal={this.handleOpenModal}
          data={data}
        />
        <footer>© Code Fellows 2022</footer>
        <Modal 
          show={this.state.isModalShown}
          onHide={this.handleCloseModal}  
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.name}</Modal.Title>
          </Modal.Header>
        </Modal>
      </>
    );
  }
}

export default App;
