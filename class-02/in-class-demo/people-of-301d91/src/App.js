import React from 'react';
import Header from './Header.js';
import Person from './Person.js';
import Main from './Main.js';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <>
        <Header/>
        <Main/>
        <footer>© Code Fellows 2022</footer>
      </>
    );
  }
}

export default App;
