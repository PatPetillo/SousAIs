import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteSavedRecipeFromStore } from '../store';

const SavedRecipes = (props) => {
  const { savedRecipe } = props.recipe;

  return (
    <div className="page-content">
      {
        savedRecipe.length ? savedRecipe.map(singleRecipe => (
          <div key={singleRecipe.image}>
            <h2>{singleRecipe.name}</h2>
            <div><img className="savedRecipeImage" src={singleRecipe.image} alt={singleRecipe.name} /></div>
            <NavLink to={`/singleRecipe/${singleRecipe.name.split(' ').join('')}`}>
              <div className="btn btn-primary my-3">Directions</div>
            </NavLink>
            <button className="btn btn-primary my-3" onClick={() => props.deleteSavedRecipeFromStore(singleRecipe)}>Remove</button>
          </div>))
          : <h1>You don't have any saved recipe yet!</h1>
      }
    </div>
  );
};
const mapState = ({ recipe }) => ({ recipe });
const mapDispatch = { deleteSavedRecipeFromStore };

export default connect(mapState, mapDispatch)(SavedRecipes);

SavedRecipes.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};
