import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SingleRecipe = (props) => {
  const recipe = props.recipe.recipes.filter(singlerecipe => singlerecipe.name.split(' ').join('') === props.match.params.recipename)[0];
  return (
    <div className="page-content">
      { recipe ?
        <div>
          <h2> {recipe.name} </h2>
          <div>serves: {recipe.servings}</div>
          <div>ready in {recipe.readyIn} minutes | {recipe.diets.split('$$').join(', ')} | spoonacular rating: {recipe.spoonacularScore}</div>
          <img className="recipe-image" src={recipe.image} alt={recipe.name} />
          <div className="single-recipe-details">
            <div className="single-recipe-item">
              <h2>Ingredients</h2>
              <div>
                {
                  recipe.ingredientAmount.split('$$').map(amount => (
                    (amount.length) ? <div key={amount}> {amount}</div> : null))
                }
              </div>
            </div>
            <div className="single-recipe-item">
              <h2>Nutritional Value</h2>
              <div className="lead p-0">(per serving)</div>
              <div>calories: {recipe.calories}</div>
              <div>total fat: {recipe.fat}</div>
              <div>carbohydrates: {recipe.carbohydrates}</div>
              <div>cholesterol: {recipe.cholesterol}</div>
              <div>sugar: {recipe.sugar}</div>
              <div>sodium: {recipe.sodium}</div>
              <div>protein: {recipe.protein}</div>
            </div>
          </div>
          <h2>Directions</h2>
          <ol>
            {
          recipe.steps.split('$$').map(sentence => (
            (sentence.length) ? <li key={sentence}> {sentence}</li> : null))
            }
          </ol>
        </div>
    :
        <div>recipe doest not exist yet</div>
    }
    </div>
  );
};


const mapState = ({ recipe }) => ({ recipe });
export default connect(mapState)(SingleRecipe);

SingleRecipe.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};
