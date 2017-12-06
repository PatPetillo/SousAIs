import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getSingleItemRecipeToStore, clearSingleItemRecipeFromStore } from '../store';


export class SingleItem extends Component {
  componentDidMount() {
    this.props.getSingleItemRecipeToStore(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearSingleItemRecipeFromStore();
  }
  render() {
    const singleItem = this.props.fridge.filter(item => item.id === +this.props.match.params.id);
    const recipes = this.props.recipe.singleItemRecipes;
    return (
      <div className="singleItem page-content">
        <p className="item-title">{singleItem.length && singleItem[0].name.toUpperCase()}</p>
        <img src={singleItem.length && singleItem[0].image} alt="Yuchen's fault" />
        <p>Recipes for {singleItem.length && singleItem[0].name}</p>
        <div>
          {recipes.length ? recipes.map(recipe => <div key={recipe.image}><NavLink to={`/${recipe.name.split(' ').join('')}`}>{recipe.name}</NavLink></div>)
          :
          (
            <div>
              <div className="react-loading" >
                <ReactLoading type="spinningBubbles" color="#7df096" height="100px" width="100px" />
              </div>
              <div className="center">Searching for recipes...</div>
            </div>
        )
          }
        </div>
      </div>
    );
  }
}

const mapState = ({ fridge, recipe }) => ({ fridge, recipe });
const mapDispatch = { getSingleItemRecipeToStore, clearSingleItemRecipeFromStore };
export default connect(mapState, mapDispatch)(SingleItem);

SingleItem.propTypes = {
  fridge: PropTypes.arrayOf(PropTypes.object).isRequired,
  recipe: PropTypes.objectOf(PropTypes.array).isRequired,
  getSingleItemRecipeToStore: PropTypes.func.isRequired,
  clearSingleItemRecipeFromStore: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
