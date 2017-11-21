import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AddProductThunk } from '../store/fridge';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.AddProductThunk(this.state);
  }
  render() {
    return (
      <form className="addItemForm">
        <div>
          <label >Food</label>
          <input type="text" name="food" onChange={this.handleChange} />
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

// const mapDispatch = dispatch => ({
//   add: dispatch(AddProductThunk()),
// });
const mapState = {};
const mapDispatch = { AddProductThunk };

export default connect(null, mapDispatch)(AddItem);
