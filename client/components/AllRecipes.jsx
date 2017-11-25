import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const disableButton = (e) => {
  const originalSize = e.target.offsetWidth;
  e.target.setAttribute('disabled', true);
  e.target.innerHTML = 'Saved';
  e.target.style.width = `${originalSize}px`;
  e.target.classList.add('disabled-btn');
  e.target.classList.remove('btn-primary');
};

const AllRecipes = (props) => {
  const { recipe, user } = props;
  return (
    <div className="page-content">
      <h1>{`${user.name}'s Recipes`}</h1>
      {
        recipe.length ? recipe.map(oneRecipe => (
          <div key={oneRecipe.id}>
            <h2>{oneRecipe.name}</h2>
            <NavLink to={`/singleRecipe/${oneRecipe.id}`}>
              <div className="btn btn-primary my-3">Directions</div>
            </NavLink>
            <NavLink to="#">
              {/* should dispatch a thunk to add to savedRecipes */}
              <button className="btn btn-primary my-3" onClick={disableButton}>Save Recipe</button>
            </NavLink>
          </div>))
        : <div className="btn btn-primary my-3">Search for recipes</div>
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
