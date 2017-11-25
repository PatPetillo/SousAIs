import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const SavedRecipes = (props) => {
  const { savedRecipe } = props.recipe;
  return (
    <div className="page-content">
      {
        savedRecipe.length? savedRecipe.map(singleRecipe =>
          (<div key={singleRecipe.id}>
            <div key={singleRecipe.id}>
              <h2> {singleRecipe.name} </h2>
              <ol>
                {
                singleRecipe.steps.split('.').map(sentence => (
                    (sentence.length) ? <li key={sentence}> {sentence}</li> : null))
                }
              </ol>
            </div>
          </div>))
          : <h1>You don't have any saved recipe yet!</h1>
      }
    </div>
  );
};
const mapState = ({ recipe }) => ({ recipe });

export default connect(mapState)(SavedRecipes);
