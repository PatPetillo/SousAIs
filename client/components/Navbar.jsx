import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navbar = props => (

  <nav className="navbar navbar-expand-md bg-primary navbar-dark">
    {console.log(props)}
    <div className="container">
      <NavLink className="navbar-brand" to="/"><img className="fa d-inline fa-lg fa-cloud" src="/icons/cart-simple.svg" />Sous</NavLink>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/allRecipes">Recipes</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/savedRecipes"><img className="fa fa-cutlery" alt="devon" aria-hidden="true" />Saved Recipes</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/myFridge" className="nav-link" >My Fridge</NavLink>
        </li>
      </ul>
      { !props.isLoggedIn && <NavLink className="btn navbar-btn ml-2 text-white btn-secondary" to="/signIn">
        <img src="/icons/key-25.svg" /> Sign in</NavLink>}
      { props.isLoggedIn && <NavLink className="btn navbar-btn ml-2 text-white btn-secondary" to="/" onClick={props.logOut}>
        <img src="/icons/key-25.svg" /> Sign Out</NavLink>}
    </div>
  </nav>
);

export default Navbar;
