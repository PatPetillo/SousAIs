import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactLoading from 'react-loading';

const FoundRecipe = (props) => {
  const { singleItemRecipeList } = props.recipe;
  return (
    <div className="page-content">
      {
        singleItemRecipeList.length ? singleItemRecipeList.map(oneRecipe => (
          <div key={oneRecipe.id}>
            <h2>{oneRecipe.name}</h2>
            <div>
              <img className="oneRecipeImage" src={oneRecipe.image} alt={oneRecipe.name} />
            </div>
            <NavLink to={`/${oneRecipe.name.split(' ').join('')}`}>
              <div className="btn btn-primary my-3">Directions</div>
            </NavLink>
          </div>))
        : (
          <div>
            <div className="react-loading" >
              <ReactLoading type="spinningBubbles" color="#7df096" height="100px" width="100px" />
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

