import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteSavedRecipeFromStore } from '../store/recipe';

const SavedRecipes = (props) => {
  const { savedRecipe } = props.recipe;
  const { deleteSavedRecipeFromStore } = props;

  return (
    <div className="page-content">
      {
        savedRecipe.length ? savedRecipe.map(singleRecipe =>
          (<div key={singleRecipe.id}>
            <h2>{singleRecipe.name}</h2>
            <NavLink to={`/singleRecipe/${singleRecipe.id}`}>
              <div className="btn btn-primary my-3">Directions</div>
            </NavLink>
            <button className="btn btn-primary my-3" onClick={() => deleteSavedRecipeFromStore(singleRecipe)}>Remove</button>
          </div>))
          : <h1>You don't have any saved recipe yet!</h1>
      }
    </div>
  );
};
const mapState = ({ recipe }) => ({ recipe });
const mapDispatch = { deleteSavedRecipeFromStore };

export default connect(mapState, mapDispatch)(SavedRecipes);
