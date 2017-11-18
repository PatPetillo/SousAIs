import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import { WelcomeScreenCarousel } from './';

const WelcomeScreen = () => (
  <div>
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
    <WelcomeScreenCarousel />
  </div>
);

export default WelcomeScreen;
// const mapState = (state) => {}

// export default connect(mapState)(WelcomeScreen)

// WelcomeScreen.propTypes = {
//   email: PropTypes.string
// }
