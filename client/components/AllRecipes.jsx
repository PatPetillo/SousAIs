import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class AllRecipes extends Component {
  render() {
    const { recipe, user } = this.props;
    return (
      <div className="all-recipes page-content">
        <h1>{`${user.name}'s recipes`}</h1>
        {
        recipe.length && recipe.map(oneRecipe => (
          <div key={oneRecipe.id}>
            <h2>{oneRecipe.name}</h2>
           <NavLink to={`/singleRecipe/${oneRecipe.id}`}>Directions </NavLink>
          </div>))
       }
      </div>
    );
  }
}

const mapState = ({ recipe, user }) => ({ recipe, user });
const mapDispatch = {};
export default connect(mapState, mapDispatch)(AllRecipes);
