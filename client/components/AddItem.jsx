import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AddProductThunk } from '../store';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit(evt) {
    evt.target.food.value = '';
    evt.preventDefault();
    this.props.AddProductThunk(this.state);
  }
  render() {
    const { error } = this.props;
    return (
      <form className="addItemForm page-content" onSubmit={this.handleSubmit}>
        <div>
          {
            error.length ? <div className="red-words">{error}</div> : <div />
          }
          <input type="text" autoFocus name="food" onChange={this.handleChange} placeholder="Enter a food item" />
        </div>

        <button className="btn btn-primary" type="submit">Add Item to Fridge</button>
      </form>
    );
  }
}

const mapState = ({ error }) => ({ error });
const mapDispatch = { AddProductThunk };
export default connect(mapState, mapDispatch)(AddItem);

AddItem.propTypes = {
  AddProductThunk: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};
