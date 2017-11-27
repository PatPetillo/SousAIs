import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeItem } from '../store/fridge';

class UserFridge extends Component {
  componentDidMount() {
    document.querySelector('body').classList.add('fridge');
  }
  componentWillUnmount() {
    document.querySelector('body').classList.remove('fridge');
  }
  render() {
    const { fridge, user } = this.props;
    const { handleClick } = this.props;
    return (
      <div className="page-content">
        <div className="center">
          <h2> {`${user.name}'s Fridge`} </h2>
          <NavLink to="/addItem" className="btn btn-primary">Add An Item</NavLink>
        </div>
        <div className="container flex-container">
          {fridge.length && fridge.map(item => (
            <div key={item.id}>
              <NavLink to={`/singleItem/${item.id}`} key={item.name}>
                <div className="fridge-items">
                  <p>{item.name.toUpperCase()}</p>
                  <img src={item.image} alt="yuchen's fault" />
                </div>
              </NavLink>
              <button onClick={() => handleClick(item.id)}>Remove Item</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = ({ fridge, user }) => ({ fridge, user });

const mapDispatch = dispatch => ({
  handleClick: (itemId) => {
    dispatch(removeItem(itemId));
  },
});

export default connect(mapState, mapDispatch)(UserFridge);

UserFridge.propTypes = {
  fridge: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};
