import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { saveRecipeToStore } from '../store/recipe';
import ReactLoading from 'react-loading';

const disableButton = (e) => {
  const originalSize = e.target.offsetWidth;
  e.target.setAttribute('disabled', true);
  e.target.innerHTML = 'Saved';
  e.target.style.width = `${originalSize}px`;
  e.target.classList.add('disabled-btn');
  e.target.classList.remove('btn-primary');
};

const AllRecipes = (props) => {
  const { user, saveRecipeToStore } = props;
  const { recipes, savedRecipe } = props.recipe;
  return (
    <div className="page-content">
      <h1>{`${user.name}'s Recipes`}</h1>
      {
        recipes.length ? recipes.map(oneRecipe => (
          <div key={oneRecipe.id}>
            <h2>{oneRecipe.name}</h2>
            <div>
              <img className="oneRecipeImage" src={oneRecipe.image} />
            </div>
            <NavLink to={`/singleRecipe/${oneRecipe.id}`}>
              <div className="btn btn-primary my-3">Directions</div>
            </NavLink>
            <NavLink to="#">
              {/* should dispatch a thunk to add to savedRecipes */}
              <button
                className="btn btn-primary my-3"
                onClick={(e) => {
                  disableButton(e);
                  saveRecipeToStore(oneRecipe);
                }}
              >{savedRecipe.includes(oneRecipe) ? 'Saved' : 'Save This Recipe'}
              </button>
            </NavLink>
          </div>))
        : (
          <div>
            <div className="btn btn-primary my-3">Searching for recipes...</div>
            <div className="react-loading" ><ReactLoading type="spinningBubbles" color="#7df096" height="50px" width="50px" /></div>
          </div>
          )
      }
    </div>
  );
};

const mapState = ({ recipe, user }) => ({ recipe, user });
const mapDispatch = { saveRecipeToStore };
export default connect(mapState, mapDispatch)(AllRecipes);


AllRecipes.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};
