import React from 'react';
import Person from './Person.js';
import data from './data.json';
import './Main.css';

class Main extends React.Component {
  render() {
    // console.log(data);

    let peopleArray = [];
    data.forEach((pep, idx) => {
      // console.log(pep);
      // console.log(idx);
      peopleArray.push(
        <Person
          name={pep.name}
          imageURL={pep.imageURL}
          key={idx}
        />
      )
    });
    return (
      <main>
       {peopleArray}
      </main>
    )
  }
}

export default Main;
