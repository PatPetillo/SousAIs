import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const allRecipes = [{ recipe: 'recipe1 from all recipes' }, { recipe: 'recipe2 from all recipes' }, { recipe: 'recipe3 from all recipes' }];

const AllRecipes = () => (
  <div>
    {
        allRecipes.length && allRecipes.map(oneRecipe => <div key={oneRecipe.recipe}>{oneRecipe.recipe}</div>)
    }
  </div>
);


export default AllRecipes;
