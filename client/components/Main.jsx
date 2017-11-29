import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../store';
import { Navbar } from './';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Main extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const [nav] = document.getElementsByClassName('navbar');
    if (this.scrollY > 70) nav.classList.add('nav-scrolled');
    else nav.classList.remove('nav-scrolled');
  }

  render() {
    const { children, handleClick, isLoggedIn } = this.props;
    return (
      <div>
        <Navbar isLoggedIn={isLoggedIn} logOut={handleClick} />
        {children}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({ isLoggedIn: !!state.user.id });

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout());
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main));

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
