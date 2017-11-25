import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const singleProduct = 'SingleProduct';
const recipes = ['cook', 'fried', 'grill'];
const nutritionList = ['vitamin A', 'potassium', 'magnessium'];

function SingleItem(props) {
  const singleItem = props.fridge.filter(item => item.id === +props.match.params.id);
  return (
    <div className="singleItem">
      <p>{singleItem.length && singleItem[0].name.toUpperCase()}</p>
      <img src={singleItem.length && singleItem[0].image} alt="Yuchen's fault" />
      <div>
        {recipes.length && recipes.map(recipe => <div key={recipe}>{recipe}</div>)}
      </div>
      <div>
        {nutritionList.length && nutritionList.map(nutrition => <div key={nutrition}>{nutrition}</div>)}
      </div>
    </div>
  );
}


const mapState = ({ fridge }) => ({ fridge });
const mapDispatch = {};
export default connect(mapState, mapDispatch)(SingleItem);

// export default SingleItem;
