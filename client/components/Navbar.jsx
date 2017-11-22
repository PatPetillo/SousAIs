import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navbar = props => (
  <nav className="navbar navbar-expand-md navbar-dark">
    <div className="container">
      <NavLink to="/"><img className="logo" src="/icons/logo.svg" /></NavLink>
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
      </ul>
      { !props.isLoggedIn && <NavLink className="btn navbar-btn ml-2 text-white btn-secondary" to="/signIn">
        <img className="key" src="/icons/key-25.svg" /> Sign In</NavLink>}
      { props.isLoggedIn && <NavLink className="btn navbar-btn ml-2 text-white btn-secondary" to="/" onClick={props.logOut}>
        <img className="key" src="/icons/key-25.svg" /> Sign Out</NavLink>}
    </div>
  </nav>
);

export default Navbar;
