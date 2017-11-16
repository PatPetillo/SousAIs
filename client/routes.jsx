import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import { Main, Login, Signup, WelcomeScreen, UserHome, EditForm } from './components';
// import WelcomeScreen from './components/WelcomeScreen';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
   
  }

  render() {
    // const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route exact path="/" component={WelcomeScreen} />
            <Route path="/userPage" component={UserHome} />
            <Route path="/editForm" component={EditForm} />

            <Route exact component={Login} />

          </Switch>
        </Main>
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
  // Otherwise, state.user will be an empty object, and state.user.id will be falsey
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  loadInitialData() {
    dispatch(me());
  },
});

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// };
