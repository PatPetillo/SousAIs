import React from 'react';

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
      {nutritionList}
    </div>
  </div>
);

export default SingleItem;
