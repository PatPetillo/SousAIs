import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-md bg-primary navbar-dark">
    <div className="container">
      <NavLink to="/" className="navbar-brand" ><i className="fa d-inline fa-lg fa-cloud" />Sous</NavLink>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/allRecipes">Recipes</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/savedRecipes" className="nav-link" ><i className="fa fa-cutlery" aria-hidden="true" />Saved Recipes</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/myFridge" className="nav-link" >My Fridge</NavLink>
        </li>
      </ul>
      <NavLink className="btn navbar-btn ml-2 text-white btn-secondary" to="/signIn">
        <i className="fa fa-sign-in" aria-hidden="true" /> Sign in
      </NavLink>
    </div>
  </nav>
);

export default Navbar;
