import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_RECIPE = 'GET_RECIPE';
const SAVE_RECIPE = 'SAVE_RECIPE';
/**
 * ACTION CREATORS
 */
const getRecipe = recipes => ({ type: GET_RECIPE, recipes });
const saveRecipe = recipe => ({ type: SAVE_RECIPE, recipe });
/**
 * THUNK CREATORS
 */
export const saveRecipeToStore = recipe =>
  dispatch =>
    dispatch(saveRecipe(recipe));

export const fetchRecipe = () =>
  dispatch =>
    axios.get('/api/recipe')
      .then(res =>
        dispatch(getRecipe(res.data)))
      .catch(err => console.log(err));
/**
 * Reducer
 */
const initialState = {
  recipes: [],
  savedRecipe: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_RECIPE:
      return Object.assign({}, state, { savedRecipe: [...state.savedRecipe, action.recipe] });
    case GET_RECIPE:
      return Object.assign({}, state, { recipes: action.recipes });
    default:
      return state;
  }
};
