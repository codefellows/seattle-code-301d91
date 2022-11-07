import React from 'react';
import Header from './Header.js';
import Person from './Person.js';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <>
        <Header/>
        <main>
          <Person 
            name="Sheyna" 
            favFood="icecream" 
            hometown="Seattle"
          />
          <Person name="Keyan"/>
          <Person name="Jason"/>
          <Person name="Oliver"/>
        </main>
        <footer>© Code Fellows 2022</footer>
      </>
    );
  }
}

export default App;
