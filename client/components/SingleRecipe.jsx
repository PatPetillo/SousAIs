import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

const SingleRecipe = (props) => {
  const recipe = props.recipe.recipes.filter(singlerecipe => singlerecipe.name.split(' ').join('') === props.match.params.recipename)[0];
  return (
    <div className="page-content">
      { recipe ?
        <div className="single-recipe-page">
          <h2> {recipe.name} </h2>
          <h5>Serves: {recipe.servings}</h5>
          <div key={recipe.name}>
            <ul className="recipe-header">
              <li className="ready-in">ready in {recipe.readyInMinutes} minutes</li>
              <li className="diet">{recipe.diets.split('$$').join(', ')}</li>
              <li className="spoonacular-rating">spoonacular rating: {recipe.spoonacularScore}</li>
            </ul>
          </div>

          <div className="single-recipe-footer">
            <img className="recipe-image" src={recipe.image} alt={recipe.name} />
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

          <div className="single-recipe-details">
            <div className="single-recipe-footer-ingredients">
              <h2>Ingredients</h2>
              <div>
                {
                  recipe.ingredientAmount.split('$$').map(amount => (
                    (amount.length) ? <div key={amount}> {amount}</div> : null))
                }
              </div>
            </div>
            <div className="single-recipe-directions">
              <h2>Directions</h2>
              <ol className="single-recipe-steps">
                {
              recipe.steps.split('$$').map(sentence => (
                (sentence.length) ? <li key={sentence}> {sentence}</li> : null))
                }
              </ol>
            </div>
          </div>
        </div>
    :
        <div>
          <div className="react-loading" >
            <ReactLoading type="spinningBubbles" color="#7df096" height="100px" width="100px" />
          </div>
          <div>loading...</div>
        </div>
    }
    </div>
  );
};


const mapState = ({ recipe }) => ({ recipe });
export default connect(mapState)(SingleRecipe);

SingleRecipe.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
