import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth, fetchProducts } from '../store';

const AuthForm = (props) => {
  const { name, handleSubmit, error } = props;
  const isSignUpPage = name === 'signup';
  return (
    <div className="py-5">
      <div className="container">
        <div className="row auth-form">
          <div className="col-md-12">
            <form onSubmit={handleSubmit} name={name}>
              {isSignUpPage ?
                <div className="form-group">
                  <label htmlFor="username"><small>Name</small></label>
                  <input className="form-control" name="username" type="text" />
                </div> : null
              }
              <div className="form-group">
                <label htmlFor="email"><small>Email</small></label>
                <input className="form-control" name="email" type="text" />
              </div>
              <div className="form-group">
                <label htmlFor="password"><small>Password</small></label>
                <input className="form-control" name="password" type="password" />
              </div>
              <div className="form-group">
                {isSignUpPage ?
                  <button type="submit">Sign up</button> :
                  <button type="submit">Log in</button>
                }
              </div>
              {error && error.response && <div> {error.response.data} </div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => ({
  name: 'login',
  displayName: 'Login',
  error: state.user.error,
});

const mapSignup = state => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.user.error,
});

const mapDispatch = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const name = formName === 'signup' ? evt.target.username.value : null;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(auth(email, password, formName, name));
    dispatch(fetchProducts());
  },
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
};
