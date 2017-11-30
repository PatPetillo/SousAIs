import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Navbar = props => (
  <nav className="navbar navbar-expand-md navbar-dark">
    <div className="container">
      <NavLink to="/"><img className="logo" src="/icons/logo.svg" alt="logo" /></NavLink>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/allRecipes">Recipes</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/savedRecipes">Saved Recipes</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/myFridge" className="nav-link" >My Fridge</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/alexaHelp" className="nav-link" >Using Alexa</NavLink>
        </li>
      </ul>
      { !props.isLoggedIn &&
        <NavLink className="btn navbar-btn ml-2 text-white btn-secondary" to="/signIn">
          <img className="key" src="/icons/key-25.svg" alt="sign-in" /> Sign In
        </NavLink> }
      { props.isLoggedIn &&
        <NavLink className="btn navbar-btn ml-2 text-white btn-secondary" to="/" onClick={props.logOut}>
          <img className="key" src="/icons/key-25.svg" alt="sign-out" /> Sign Out
        </NavLink> }
    </div>
  </nav>
);

export default Navbar;

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};
