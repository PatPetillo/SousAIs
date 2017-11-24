import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const UserFridge = (props) => {
  const { fridge, user } = props;
  return (
    <div className="py-2 page-content">
      <div className="center">
        <h2> {`${user.name}'s Fridge`} </h2>
        <NavLink to="/addItem">Add An Item</NavLink>
      </div>
      <div className="container flex-container">
        {fridge.length && fridge.map(item => (
          <NavLink to={`/singleItem/${item.id}`} key={item.name}>
            <div className="fridge-items">
              <p>{item.name.toUpperCase()}</p>
              <img src={item.image} alt="yuchen's fault" />
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};


const mapState = ({ fridge, user }) => ({ fridge, user });
export default connect(mapState)(UserFridge);

UserFridge.propTypes = {
  fridge: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};
