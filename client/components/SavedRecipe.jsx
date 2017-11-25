import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const savedRecipes = [ {recipe:"recipe"}]
const SavedRecipes = (props) => {
  // const { savedRecipes } = props.recipe;
  console.log("console.log in saved",props.recipe.savedRecipe)
  return (
    <div className="page-content">
      {
        props.recipe.savedRecipe.length && props.recipe.savedRecipe.map(singleRecipe =>
          (<div key={singleRecipe.id}>{singleRecipe.name + " " + singleRecipe.steps}</div>))
      }
    </div>
  );
};

const mapState = ({ recipe }) => ({ recipe });

export default connect(mapState)(SavedRecipes);
