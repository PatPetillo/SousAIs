import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      quantity: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    // axio post here
    console.log(this.state);
  }
  render() {
    return (
      <form className="addItemForm">
        <div>
          <label >Food</label>
          <input type="text" name="name" onChange={this.handleChange} />
        </div>
        <div>
          <label >Quantity</label>
          <input type="text" name="quantity" onChange={this.handleChange} />
        </div>
        <button type="submit" onClick={this.handleSubmit} >Add Item To Fridge</button>
      </form>
    );
  }
}

export default AddItem;
