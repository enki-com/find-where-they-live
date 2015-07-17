import React from 'react';

import api from './api';

export default class Login extends React.Component {
  render() {
    const link = `https://instagram.com/oauth/authorize/?client_id=${api.INSTAGRAM_CLIENT_ID}&redirect_uri=${api.INSTAGRAM_REDIRECT_URI}&response_type=token`;
    return (
      <a href={link} >Connect with Instagram</a>
    );
  }
}
