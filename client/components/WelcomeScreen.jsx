import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const WelcomeScreen = () => (
  <div>
    <div className="py-5 h-25">
      <div className="container">
        <div className="row text-center">
          <div className="col-md-12 h-25">
            <h1 className="">FaceSafe</h1>
          </div>
        </div>
      </div>
    </div>
    <div className="">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <form className="form-inline m-0" method="post" action="https://formspree.io/">
              <input type="email" name="email" className="form-control ml-auto" placeholder="Enter email" />
              <button type="submit" className="btn btn-primary mr-auto">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="mx-auto text-center">
              <NavLink to="#" className="btn btn-primary w-25" href="">Sign In</NavLink>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mx-auto text-center">
              <NavLink to="#" className="btn btn-primary w-25" href="">Sign Up</NavLink>
            </div>
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
