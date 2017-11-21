import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SingleItem from './SingleItem';

const food = [{
  name: 'Banana',
  calories: 20,
  image: 'https://3.imimg.com/data3/RF/DJ/MY-3966004/w-320-cashew-250x250.jpg',
},
{
  name: 'Apple',
  calories: 60,
  image: 'https://3.imimg.com/data3/RF/DJ/MY-3966004/w-320-cashew-250x250.jpg',
}, {
  name: 'Beer',
  calories: 100,
  image: 'https://3.imimg.com/data3/RF/DJ/MY-3966004/w-320-cashew-250x250.jpg',
}, {
  name: 'Chicken',
  calories: 150,
  image: 'https://3.imimg.com/data3/RF/DJ/MY-3966004/w-320-cashew-250x250.jpg',
}];
function UserFridge() {
  return (
    <div className="py-5">
      <h2 className="center">Devon's Fridge</h2>
      <div className="container flexContainer">
        {food.length && food.map(item => (
          <div className="fridge-items" key={item.name}>
            <NavLink to={`/singleItem/${item.id}`} >
              <p>{item.name}</p>
              <img src={item.image} alt="yuchen's fault" />
              <p>{item.calories}</p>
              {/* <SingleItem props={item.name} /> */}
            </NavLink>
          </div>
          
        ))}
      </div>
      <NavLink to="/addItem">Add An Item</NavLink>
    </div>
  );
}

export default UserFridge;

