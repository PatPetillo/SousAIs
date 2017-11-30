import React, { Component } from 'react';
import history from '../history';
import { getSearchRecipe } from '../store';
import { connect } from 'react-redux';

class SearchRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      cuisine: '',
      diet: '',
      exclude: '',
      intolerances: '',
    };
    this.inputChange = this.inputChange.bind(this);
    this.submitButton = this.submitButton.bind(this);
  }

  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  submitButton(e) {
    e.preventDefault();
    this.props.getSearchRecipe(this.state);
  }
  render() {
    return (
      <div className="page-content" onChange={this.inputChange} onSubmit={this.submitButton}>
        <form>
          <label>Tyoe: <input name="type" placeholder="burger,fried chicken,pasta..etc" /> </label>
          <label>Cuisine: <input name="cuisine" placeholder="chinese,thai,italian..etc" /> </label>
          <label>Diet: <input name="diet" placeholder="" /> </label>
          <label>Exclude Ingredients <input name="exclude" /> </label>
          <label>Intolerances: <input name="intolerances" /> </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
const mapState = ({ errors }) => ({ errors });
const mapDispatch = { getSearchRecipe };
export default connect(mapState, mapDispatch)(SearchRecipe);
