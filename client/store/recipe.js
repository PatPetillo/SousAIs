import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_RECIPE = 'GET_RECIPE';

/**
 * ACTION CREATORS
 */
const getRecipe = recipes => ({ type: GET_RECIPE, recipes });

/**
 * THUNK CREATORS
 */
export const fetchRecipe = () =>
  dispatch =>
    axios.get('/api/recipe')
      .then(res =>
        dispatch(getRecipe(res.data)))
      .catch(err => console.log(err));
/**
 * Reducer
 */

export default (state = [], action) => {
  switch (action.type) {
    case GET_RECIPE:
      return action.recipes;
    default:
      return state;
  }
};
