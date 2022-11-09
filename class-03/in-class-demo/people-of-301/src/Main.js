import React from 'react';
import Person from './Person.js';
import './Main.css';

class Main extends React.Component {

  // there's no addhearts method on Main

  render() {
    // console.log(data);
    // console.log(this.props.addHearts);
    // console.log(this.props);
    let peopleArray = this.props.data.map((pep, idx) => {
      return <Person
        name={pep.name}
        imageURL={pep.imageURL}
        key={idx}
        addHearts={this.props.addHearts}
        handleOpenModal={this.props.handleOpenModal}
      />
    });
    return (
      <main>
        {peopleArray}
      </main>
    )
  }
}

export default Main;
