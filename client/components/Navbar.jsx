import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-md bg-primary navbar-dark">
    <div className="container">
      <NavLink className="navbar-brand" to="#"><img className="fa d-inline fa-lg fa-cloud" src="/icons/cart-simple.svg" />Sous</NavLink>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="#">Recipes</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="#"><img className="fa fa-cutlery" aria-hidden="true" />Saved Recipes</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="#">My Fridge</NavLink>
        </li>
      </ul>
      <NavLink className="btn navbar-btn ml-2 text-white btn-secondary" to="/signIn">
        <img src="/icons/key-25.svg" /> Sign in
      </NavLink>
    </div>
  </nav>
);

export default Navbar;
