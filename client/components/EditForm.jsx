import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default class EditForm extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      site: 'amazon',
      username: 'jerel',
      password: 'skanhunt',
      
    };
  }

  handleChange(event) {
    const { value } = event.target;
    const { name } = event.target;
    this.setState({ [name]: value });
  }
  handleClick(event){
      console.log(event.target)
      event.preventDefault()
      event.target.type='text'
  }

  render() {
      console.log(this.state)
    return (
      <form>
        <label>Site<input onChange={this.handleChange}type="text" name="site" defaultValue={this.state.site} /></label>
        <label>Username<input onChange={this.handleChange} type="text" name="username" defaultValue={this.state.username}  /></label>
        <label>Password<input onChange={this.handleChange} onClick={this.handleClick} type="password" name="password" defaultValue={this.state.password} />
            <button onClick={this.handleClick}>Reveal</button>
        </label>
      </form>
    );
  }
}
