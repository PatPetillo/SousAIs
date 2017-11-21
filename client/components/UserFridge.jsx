import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class UserFridge extends Component {
  componentDidMount() {
    // this.props.grabFridge();
  }
  render() {
    const { fridge, user } = this.props;
    return (
      <div className="py-5">
        <h2 className="center"> {`${user.name}'s Fridge`} </h2>
        <div className="container flexContainer">
          {fridge[0].fridgeItemId && fridge.length && fridge.map(item => (
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


const mapState = ({ fridge, user }) => ({ fridge, user });
const mapDispatch = {};
export default connect(mapState, mapDispatch)(UserFridge);
