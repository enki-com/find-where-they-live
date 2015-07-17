import React from 'react';

export default class User extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <div onClick={this.props.onSelect}>
        <h1>{user.username}</h1>
        <img src={user.profile_picture} />
      </div>
    );
  }
}
