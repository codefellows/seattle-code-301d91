import { withAuth0 } from '@auth0/auth0-react';
import React from 'react';
import axios from 'axios';

class Content extends React.Component {

  getBooks = async () => {
    if (this.props.auth0.isAuthenticated) {

      // get the token from Auth0
      const res = await this.props.auth0.getIdTokenClaims();

      // extract the token from the response
      // MUST use double underscore
      const jwt = res.__raw;
      console.log(jwt); // this is as for as you need to go for today's lab. Get the token to log in the console.

      // this is from the axios docs, we can send a config object to make our axios calls. We need it to send our token to the server:
      let config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/books',
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      }
      console.log(config);
      let bookResults = await axios(config);

      // // Old way we are used to making axios requests:
      // let url = `${process.env.REACT_APP_SERVER_URL}/books`;
      // let bookResults = await axios.get(url);
      console.log(bookResults.data);
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    console.log(this.props.auth0.user);

    return (
      <h2>Content Page</h2>
    )
  }
}

export default withAuth0(Content);
