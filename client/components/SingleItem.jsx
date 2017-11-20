import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


const singleProduct = 'SingleProduct';
const recipes = ['cook', 'fried', 'grill'];
const nutritionList = ['vitamin A', 'potassium', 'magnessium'];

const SingleItem = () => (
  <div>
    <div>{singleProduct}</div>
    <div>
      {recipes.length && recipes.map(recipe => <div>{recipe}</div>)}
    </div>
    <div>
      {nutritionList.length && nutritionList.map(nutrition => <div>{nutrition}</div>)}
    </div>
  </div>
);

export default SingleItem;
