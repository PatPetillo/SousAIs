import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProductThunk } from '../store';

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
    this.props.addProductThunk(this.state, true);
  }
  render() {
    const { errors } = this.props;
    return (
      <form className="addItemForm page-content" onSubmit={this.handleSubmit}>
        <div>
          {
            errors.length ? <div className="red-words">{errors}</div> : <div />
          }
          <input type="text" autoFocus name="food" onChange={this.handleChange} placeholder="Enter a food item" />
        </div>

        <button className="btn btn-primary" type="submit">Add Item to Fridge</button>
      </form>
    );
  }
}

const mapState = ({ errors }) => ({ errors });
const mapDispatch = { addProductThunk };
export default connect(mapState, mapDispatch)(AddItem);

AddItem.propTypes = {
  addProductThunk: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired,
};
