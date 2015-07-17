import React from 'react';

import api from './api';

import User from './user';

const THROTTLE = 300;

export default class UserSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {username: null, users: []};
    this.updateSearch = this.updateSearch.bind(this);
    this.componentWillUpdate = this.componentWillUpdate.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.username !== this.state.username) {
      api.searchUsers(nextState.username).then((response) => {
        this.setState({users: response.data});
      }).catch((err) => {console.log(err);});
    }
  }

  render() {
    const users = this.state.users.map((user) => {
      return (
        <li key={user.id}>
          <User user={user} onSelect={this.props.onSelect.bind(this, user.id)} />
        </li>
      );
    })
    return (
      <div>
        <input type="text" placeholder="Search username" onChange={this.updateSearch}/>
        <ul>{users}</ul>
      </div>
    );
  }

  updateSearch(e) {
    const username = e.currentTarget.value;
    if (this._throttleTimeout) {
      clearTimeout(this._throttleTimeout);
    }
    this._throttleTimeout = setTimeout(() => {
      this.setState({username});
    }, THROTTLE, {username});
  }
}
