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
          {fridge.length && fridge.map(item => (
            <div className="fridge-items" key={item.name}>
              <NavLink to={`/singleItem/${item.id}`} >
                <p>{item.name.toUpperCase()}</p>
                <img src={item.image} alt="yuchen's fault" />
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
