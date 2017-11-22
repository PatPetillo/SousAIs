import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const SingleRecipes = () => {
  const { recipe, user } = this.props;
  return (
    <div className="all-recipes page-content">
      <h1>{`${user.name}'s recipe`}</h1>
      {
      recipe.length && recipe.map((oneRecipe) => {
        if (oneRecipe.id === this.props.match.params.id) {
          return (
            <div key={oneRecipe.id}>
              <h2>{oneRecipe.name}</h2>
              {oneRecipe.steps.split('.').map(sentence => (<div> {sentence}</div>))}
            </div>);
}
})
      }
    </div>
  );
};
const mapState = ({ recipe, user }) => ({ recipe, user });
const mapDispatch = {};
export default connect(mapState, mapDispatch)(SingleRecipes);

