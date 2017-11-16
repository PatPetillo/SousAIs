import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class EditForm extends Component() {
  constructor(props) {
    super(props);

    this.state = {
      site: '',
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <form>
        <label>Site<input type="text" /></label>
        <label>Username<input type="text" /></label>
        <label>Password<input type="text" /></label>
      </form>
    );
  }
}
