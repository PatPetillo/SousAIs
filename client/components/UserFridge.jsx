import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class UserFridge extends Component {
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
const mapDispatch = {};
export default connect(mapState, mapDispatch)(UserFridge);
