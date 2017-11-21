import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const savedRecipes = [{ recipe: 'recipe1 from saved recipes' }, { recipe: 'recipe2 from saved recipes' }, { recipe: 'recipe3 from saved recipes' }];

const SavedRecipes = () => (
  <div className="page-content">
    {
      savedRecipes.length && savedRecipes.map(singleRecipe =>
        (<div key={singleRecipe.recipe}>{singleRecipe.recipe}</div>))
    }
  </div>
);


export default SavedRecipes;
