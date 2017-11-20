import React from 'react';
const singleProduct = 'SingleProduct'
const recipes = ['cook', 'fried', 'grill' ]
const nutritionList = ['vitamin A', 'potassium', 'magnessium' ]

function SingleItem(props){
 
    return (
        <div>
            <div>{singleProduct}</div>
            <div>
            {recipes.length&&recipes.map(recipe => {
                return <div>{recipe}</div>
            })}
            </div>
            <div>
            {nutritionList}
            </div>
        </div>
    )
}

export default SingleItem