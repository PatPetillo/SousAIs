import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-md bg-primary navbar-dark">
    <div className="container">
      <a className="navbar-brand" href="#"><i className="fa d-inline fa-lg fa-cloud" /><b> Sous</b></a>
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar2SupportedContent" aria-controls="navbar2SupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon" /> </button>
      <div className="collapse navbar-collapse text-center justify-content-end" id="navbar2SupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            
            <a className="nav-link" href="#"><i className="fa fa-cutlery" aria-hidden="true" /> My Recipes</a>
          </li>
        </ul>
        <a className="btn navbar-btn ml-2 text-white btn-secondary"><i className="fa fa-sign-in" aria-hidden="true" /> Sign in</a>
      </div>
    </div>
  </nav>
);

export default Navbar;
