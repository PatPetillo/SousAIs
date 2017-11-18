import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const WelcomeScreen = () => (
  <div>
    <nav className="navbar navbar-expand-md bg-primary navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="#"><i className="fa d-inline fa-lg fa-cloud" /><b>Sous</b></a>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar2SupportedContent" aria-controls="navbar2SupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon" /> </button>
        <div className="collapse navbar-collapse text-center justify-content-end" id="navbar2SupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#"><i className="fa d-inline fa-lg fa-bookmark-o" />Recipes</a>
            </li>

          </ul>
          <a className="btn navbar-btn ml-2 text-white btn-secondary"><i className="fa d-inline fa-lg fa-user-circle-o" /> Sign in</a>
        </div>
      </div>
    </nav>
    <div className="py-5 text-center opaque-overlay">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12 text-white">
            <h1 className="display-3 mb-4">Sous with Alexa</h1>
            <p className="lead mb-5" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WelcomeScreen;
// const mapState = (state) => {}

// export default connect(mapState)(WelcomeScreen)

// WelcomeScreen.propTypes = {
//   email: PropTypes.string
// }
