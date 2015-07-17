import React from 'react';

import api from './api';

import Login from './login';
import App from './app';

class Main extends React.Component {

  // componentDidMount() {
  //   const script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp';
  //   document.body.appendChild(script);
  // }

  render() {
    if (api.INSTAGRAM_ACCESS_TOKEN) {
      return <App />;
    } else {
      return <Login />;
    }
  }
}

React.render(<Main />, document.getElementById('app'));
