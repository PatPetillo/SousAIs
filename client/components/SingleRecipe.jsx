import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SingleRecipe = (props) => {
  const { match } = props;
  const { recipes } = props.recipe;
  return (
    <div className="page-content">
      {
        recipes.length && recipes.map(singleRecipe => (
          (singleRecipe.id === +match.params.id)
          ?
            <div key={singleRecipe.id}>
              <h2> {singleRecipe.name} </h2>
              <img className="singleRecipeImage" src={singleRecipe.image} />
              <ol>
                {
                singleRecipe.steps.split('$$').map(sentence => (
                    (sentence.length) ? <li key={sentence}> {sentence}</li> : null))
                }
              </ol>
            </div>
          : null))
      }
    </div>
  );
};


const mapState = ({ recipe }) => ({ recipe });
export default connect(mapState)(SingleRecipe);

SingleRecipe.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
