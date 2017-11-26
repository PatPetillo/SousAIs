import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_RECIPE = 'GET_RECIPE';
const SAVE_RECIPE = 'SAVE_RECIPE';
const DELETE_SAVED_RECIPE = 'DELETE_SAVED_RECIPE';
/**
 * ACTION CREATORS
 */
const getRecipe = recipes => ({ type: GET_RECIPE, recipes });
const saveRecipe = recipe => ({ type: SAVE_RECIPE, recipe });
const deleteSavedRecipe = recipe => ({ type: DELETE_SAVED_RECIPE, recipe });
/**
 * THUNK CREATORS
 */
export const deleteSavedRecipeFromStore = recipe =>
  dispatch =>
    dispatch(deleteSavedRecipe(recipe));

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
    case DELETE_SAVED_RECIPE:
      return Object.assign({}, state, { savedRecipe: state.savedRecipe.slice(0, state.savedRecipe.indexOf(action.recipe)).concat(state.savedRecipe.slice(state.savedRecipe.indexOf(action.recipe)+1)) });
    case SAVE_RECIPE:
      return Object.assign({}, state, { savedRecipe: [...state.savedRecipe, action.recipe] });
    case GET_RECIPE:
      return Object.assign({}, state, { recipes: action.recipes });
    default:
      return state;
  }
};
