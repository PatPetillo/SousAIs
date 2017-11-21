import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

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
class UserFridge extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
   // this.props.grabFridge();
  }
  render() {
    console.log(this.props);
    return (
      <div className="py-5">
        <h2 className="center">Devon's Fridge</h2>
        <div className="container flexContainer">
          {this.props.fridge.length && this.props.fridge.map(item => (
            <div className="fridge-items" key={item.fridgeItem.name}>
              <NavLink to={`/singleItem/${item.id}`} >
                <p>{item.fridgeItem.name}</p>
                <img src={item.fridgeItem.image} alt="yuchen's fault" />
              </NavLink>
            </div>
          ))}
        </div>
        <NavLink to="/addItem">Add An Item</NavLink>
      </div>
    );
  }
}

const mapState = ({ fridge }) => ({ fridge });
// const mapDispatch = { fetchProducts };

const mapDispatchtoProps = dispatch => ({
  grabFridge: () => {
    dispatch(fetchProducts());
  },
});
export default connect(mapState, mapDispatchtoProps)(UserFridge);
