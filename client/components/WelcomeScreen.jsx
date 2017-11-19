import React from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import { WelcomeScreenCarousel } from './';

const WelcomeScreen = () => (
  <div className="welcome-page">
    <div className="py-5 text-center banner">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12 text-white">
            <h1 className="display-3 mb-4">Sous with <span className="red-words">Alexa</span></h1>
            <p className="lead mb-5" />
          </div>
        </div>
      </div>
    </div>

    <div className="carousel-info">
      <div> <WelcomeScreenCarousel /> </div>
      <div className="how-it-works bg-primary"><h1> TRY NOW </h1> </div>
    </div>
  </div>
);

export default WelcomeScreen;
// const mapState = (state) => {}

// export default connect(mapState)(WelcomeScreen)
