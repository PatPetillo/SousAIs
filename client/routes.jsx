import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import { Main, Login, WelcomeScreen, UserHome, UserFridge, SingleItem, AddItem, SavedRecipes, AllRecipes, SingleRecipe, SingleRecipeSingleItem } from './components';
import { fetchProducts, fetchRecipe, me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route exact path="/" component={WelcomeScreen} />
            <Route path="/signIn" component={Login} />
            {
              isLoggedIn &&
              <Switch>
                <Route path="/myFridge" component={UserFridge} />
                <Route path="/savedRecipes" component={SavedRecipes} />
                <Route path="/singleRecipe/:id/" component={SingleRecipe} />
                <Route path="/allRecipes" component={AllRecipes} />
                <Route path="/addItem" component={AddItem} />
                <Route path="/userPage" component={UserHome} />
                <Route exact path="/singleItem/:id" component={SingleItem} />
                <Route exact path="/:recipename" component={SingleRecipeSingleItem} />
              </Switch>
            }
            <Route component={Login} />
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
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  loadInitialData() {
    dispatch(me());
    dispatch(fetchProducts());
    dispatch(fetchRecipe());
  },
});

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
