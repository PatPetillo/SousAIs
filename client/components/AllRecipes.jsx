import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { saveRecipeToStore } from '../store';

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
        recipes.length
        ? recipes.sort((a, b) => a.missedIngredientCount > b.missedIngredientCount)
          .map(oneRecipe => (
            <div key={oneRecipe.name}>
              <h2>{oneRecipe.name}</h2>
              {(oneRecipe.name === 'You have no items in your fridge!') ? null :
              <div>
                <p>Missing IngredientCount: {oneRecipe.missedIngredientCount}</p>
                <div>
                  <img className="oneRecipeImage" src={oneRecipe.image} alt={oneRecipe.name} />
                </div>
                <NavLink to={`/singleRecipe/${oneRecipe.name.split(' ').join('')}`}>
                  <div className="btn btn-primary my-3">Directions</div>
                </NavLink>
                <NavLink to="#">
                  {savedRecipe.includes(oneRecipe) ?
                    <button className="btn disabled-btn" disabled>
                      Saved
                    </button> :
                    <button className="btn btn-primary my-3" onClick={(e) => { disableButton(e); saveRecipeToStore(oneRecipe); }}>
                        Save This Recipe
                    </button>
                  }
                </NavLink>
              </div>
              }
            </div>))
        : (
          <div>
            <div className="react-loading" >
              <ReactLoading type="spinningBubbles" color="#7df096" height="100px" width="100px" />
            </div>
            <div className="center">Searching for recipes...</div>
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
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  saveRecipeToStore: PropTypes.func.isRequired,
};
