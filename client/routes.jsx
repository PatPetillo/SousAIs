import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import { Main, Login, WelcomeScreen, UserHome, UserFridge, SingleItem, AddItem, SavedRecipes, AllRecipes, SingleRecipe } from './components';
import { fetchProducts } from './store/fridge';
import { fetchRecipe } from './store/recipe';

// import WelcomeScreen from './components/WelcomeScreen';
import { me } from './store';

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
            <Route exact path="/singleItem/:id" component={SingleItem} />
            <Route path="/userPage" component={UserHome} />
            <Route path="/signIn" component={Login} />
            
            <Route path="/addItem" component={AddItem} />
            <Route path="/savedRecipes" component={SavedRecipes} />
            {
              isLoggedIn &&
              <Switch>
                <Route path="/myFridge" component={UserFridge} />
                <Route path="/singleRecipe/:id" component={SingleRecipe}/>
                <Route path="/allRecipes" component={AllRecipes} />
          
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
