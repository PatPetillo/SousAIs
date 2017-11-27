import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_RECIPE = 'GET_RECIPE';
const SAVE_RECIPE = 'SAVE_RECIPE';
const DELETE_SAVED_RECIPE = 'DELETE_SAVED_RECIPE';
const GET_SINGLE_ITEM_RECIPE = 'GET_SINGLE_ITEM_RECIPE';
// set and get single recipe from single item without writing down to my database
// const SET_RECIPE_SINGLE_ITEM = 'SET_RECIPE_SINGLE_ITEM';
// const GET_RECIPE_SINGLE_ITEM = 'GET_RECIPE_SINGLE_ITEM';
/**
 * ACTION CREATORS
 */
// const getRecipeSingleItem = recipes => ({ type: GET_RECIPE_SINGLE_ITEM, recipes });
// const setRecipeSingleItem = recipes => ({ type: SET_RECIPE_SINGLE_ITEM, recipes });
const getRecipe = recipes => ({ type: GET_RECIPE, recipes });
const saveRecipe = recipe => ({ type: SAVE_RECIPE, recipe });
const deleteSavedRecipe = recipe => ({ type: DELETE_SAVED_RECIPE, recipe });
const getSingleItemRecipe = recipes => ({ type: GET_SINGLE_ITEM_RECIPE, recipes });
/**
 * THUNK CREATORS
 */

export const getSingleItemRecipeToStore = itemId =>
  dispatch =>
    axios.get(`/api/recipe/${itemId}`)
      .then(res =>
        dispatch(getSingleItemRecipe(res.data)))
      .catch(err => console.log(err));


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
  singleItemRecipes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_ITEM_RECIPE:
      return Object.assign({}, state, { singleItemRecipes: action.recipes });
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
