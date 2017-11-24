import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const AllRecipes = (props) => {
  const { recipe, user } = props;
  return (
    <div className="page-content">
      <h1>{`${user.name}'s recipes`}</h1>
      {
        recipe.length && recipe.map(oneRecipe => (
          <div key={oneRecipe.id}>
            <h2>{oneRecipe.name}</h2>
            <NavLink to={`/singleRecipe/${oneRecipe.id}`} recipe={oneRecipe}>
              <h3>Directions </h3>
            </NavLink>
          </div>))
      }
    </div>
  );
};

const mapState = ({ recipe, user }) => ({ recipe, user });
export default connect(mapState)(AllRecipes);

AllRecipes.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};
