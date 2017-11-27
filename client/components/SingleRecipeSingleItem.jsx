import React from 'react';
import { connect } from 'react-redux';

const SingleRecipeSingleItem = (props) => {
  // const { recipes } = props.recipe.singleItemRecipes
  // const recipe = recipes.filter(singleRecipe=> singleRecipe.name ===props.match.params.name )[0]

  const recipe = props.recipe.singleItemRecipes.filter(singlerecipe => singlerecipe.name.split(' ').join('') == props.match.params.recipename)[0];
  console.log('Recipe', recipe);
  return (
    <div className="page-content">
      <h2> {recipe.name} </h2>
      <img className="recipeImage" src={recipe.image} />
      <ol>
        {
          recipe.steps.split('$$').map(sentence => (
            (sentence.length) ? <li key={sentence}> {sentence}</li> : null))
        }
      </ol>
      <h2>Nutritional Value</h2>
      <div>calories: {recipe.calories}</div>
      <div>fat: {recipe.fat}</div>
      <div>carbohydrates: {recipe.carbohydrates}</div>
      <div>sugar: {recipe.sugar}</div>
      <div>sodium: {recipe.sodium}</div>

    </div>
  );
};

const mapState = ({ recipe }) => ({ recipe });
const mapDispatch = {};
export default connect(mapState, mapDispatch)(SingleRecipeSingleItem);
