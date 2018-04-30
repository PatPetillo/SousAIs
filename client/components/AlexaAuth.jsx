import React, { Component } from 'react';
import axios from 'axios';

const queryString = require('query-string');

// /**
//  * COMPONENT
//  */
export default class AlexaAuth extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    Object.keys(parsed).forEach(el => this.state[el] = parsed[el]);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { username, password } = this.state;
    axios.post('/auth/alexa', this.state)
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div className="py-5">
        <div className="container">
          <div className="row auth-form">
            <div className="col-md-12">
              <form onSubmit={this.handleSubmit} name="login">
                <div className="form-group">
                  <label htmlFor="email"><small>Email</small></label>
                  <input className="form-control" name="email" type="text" />
                </div>
                <div className="form-group">
                  <label htmlFor="password"><small>Password</small></label>
                  <input className="form-control" name="password" type="password" />
                </div>
                <div className="form-group">
                  <button type="submit">Log in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


// /**
//  * CONTAINER
//  *   Note that we have two different sets of 'mapStateToProps' functions -
//  *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
//  *   function, and share the same Component. This is a good example of how we
//  *   can stay DRY with interfaces that are very similar to each other!
//  */


// /**
//  * PROP TYPES
//  */
