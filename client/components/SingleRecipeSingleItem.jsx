import React from 'react';
import { connect } from 'react-redux';

const SingleRecipeSingleItem = (props) => {
  const recipe = props.recipe.singleItemRecipeList.filter(singlerecipe => singlerecipe.name.split(' ').join('') == props.match.params.recipename)[0];
  // console.log('Recipe', recipe, 'props', props);
  return (
    <div className="page-content">
      { recipe ?
        <div>
          <h2> {recipe.name} </h2>
          <h5>Serves: {recipe.servings}</h5>
          <img className="recipe-image" src={recipe.image} alt={recipe.image} />
          <h2>Directions</h2>
          <ol className="single-recipe-directions">
            {
          recipe.steps.split('$$').map(sentence => (
            (sentence.length) ? <li key={sentence}> {sentence}</li> : null))
        }
          </ol>
          <div className="single-recipe-footer">
            <div className="single-recipe-footer-ingredients">
              <h2>Ingredients</h2>
              <div>
                {
                recipe.ingredientAmount.split('$$').map(amount => (
                  (amount.length) ? <div key={amount}> {amount}</div> : null))
                }
              </div>
            </div>
            <div className="single-recipe-footer-nutrition">
              <h2>Nutritional Value</h2>
              <div>(per serving)</div>
              <div>calories: {recipe.calories}</div>
              <div>total fat: {recipe.fat}</div>
              <div>carbohydrates: {recipe.carbohydrates}</div>
              <div>cholesterol: {recipe.cholesterol}</div>
              <div>sugar: {recipe.sugar}</div>
              <div>sodium: {recipe.sodium}</div>
              <div>protein: {recipe.protein}</div>
            </div>
          </div>
        </div>
    :
        <div>go to recipes page to load a single recipe</div>
    }
    </div>
  );
};

const mapState = ({ recipe }) => ({ recipe });
const mapDispatch = {};
export default connect(mapState, mapDispatch)(SingleRecipeSingleItem);
