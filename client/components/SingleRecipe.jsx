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
          <img className="recipe-image" src={recipe.image} alt={recipe.name} />
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
