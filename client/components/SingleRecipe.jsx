import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SingleRecipe = (props) => {
  const { recipe, match } = props;
  return (
    <div className="page-content">
      {
        recipe.map(singleRecipe => (
          (singleRecipe.id === +match.params.id)
          ?
            <div key={singleRecipe.id}>
              <h2> {singleRecipe.name} </h2>
              <ol>
                {
                  singleRecipe.steps.split('.').map(sentence => (
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
