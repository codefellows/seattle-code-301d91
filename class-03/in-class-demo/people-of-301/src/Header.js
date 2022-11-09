import React from 'react';

class Header extends React.Component {
  render() {
    console.log(this.props);
    return (
      <header>
        <h1>People of 301 {this.props.hearts}</h1>
      </header>
    )
  }
}

export default Header;
