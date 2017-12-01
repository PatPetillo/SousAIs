import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

const SingleRecipe = (props) => {
  const recipe = props.recipe.recipes.filter(singlerecipe => singlerecipe.name.split(' ').join('') === props.match.params.recipename)[0];
  function greaterThanOne(num) {
    if (num > 1) return '-one';
    return '-more';
  }
  return (
    <div className="page-content">
      { recipe ?
        <div className="single-recipe-page">
          <h2> {recipe.name} </h2>
          <h5 className={`serves${greaterThanOne(recipe.servings)}`}>Serves: {recipe.servings}</h5>
          <div key={recipe.name}>
            <ul className="recipe-header">
              <li className="ready-in">ready in {recipe.readyInMinutes} minutes</li>
              <li className="diet">{recipe.diets.split('$$').join(', ')}</li>
              <li className="spoonacular-rating">spoonacular rating: {recipe.spoonacularScore}</li>
            </ul>
          </div>

          <div className="single-recipe-details">
            <img className="recipe-image" src={recipe.image} alt={recipe.name} />
            <div className="single-recipe-nutrition">
              <h2>Nutritional Value<span className="small-words">(per serving)</span></h2>
              <div>Calories: <span className="green-words">{recipe.calories}</span></div>
              <div>Total Fat: <span className="green-words">{recipe.fat}</span></div>
              <div>Carbohydrates: <span className="green-words">{recipe.carbohydrates}</span></div>
              <div>Cholesterol: <span className="green-words">{recipe.cholesterol}</span></div>
              <div>Sugar: <span className="green-words">{recipe.sugar}</span></div>
              <div>Sodium: <span className="green-words">{recipe.sodium}</span></div>
              <div>Protein: <span className="green-words">{recipe.protein}</span></div>
            </div>
          </div>

          <div className="single-recipe-details">
            <div className="single-recipe-ingredients">
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
              <div className="single-recipe-steps">
                <ul className="single-recipe-steps">
                  {
                  recipe.steps.split('$$').map((sentence, idx) => (
                  (sentence.length) ? <li key={sentence}>{`${idx + 1}. ${sentence}`}</li> : null))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
    :
        <div>
          <div className="react-loading" >
            <ReactLoading type="spinningBubbles" color="#7df096" height="100px" width="100px" />
          </div>
          <div>loading</div>
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
