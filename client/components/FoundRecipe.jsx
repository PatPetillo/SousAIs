import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactLoading from 'react-loading';

export const FoundRecipe = (props) => {
  const { foundRecipes } = props.recipe;
  return (
    <div className="page-content">
      {
        foundRecipes.length ? foundRecipes.map(oneRecipe => (
          <div key={oneRecipe.id}>
            <h2>{oneRecipe.name}</h2>
            <div>
              <img className="oneRecipeImage" src={oneRecipe.image} alt={oneRecipe.name} />
            </div>
            <NavLink to={`/singleRecipe/${oneRecipe.name.split(' ').join('')}`}>
              <div className="btn btn-primary my-3">Directions</div>
            </NavLink>
          </div>))
        : (
          <div>
            <div className="react-loading" >
              <ReactLoading type="spinningBubbles" color="#7df096" height={100} width={100} />
            </div>
            <div className="center">Searching for foundRecipes...</div>
          </div>
          )
      }
    </div>
  );
};

const mapState = ({ recipe }) => ({ recipe });

export default connect(mapState)(FoundRecipe);

