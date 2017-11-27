import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_RECIPE = 'GET_RECIPE';
const GET_SAVED_RECIPE = 'GET_SAVED_RECIPE';
const SAVE_RECIPE = 'SAVE_RECIPE';
const DELETE_SAVED_RECIPE = 'DELETE_SAVED_RECIPE';
const GET_SINGLE_ITEM_RECIPE = 'GET_SINGLE_ITEM_RECIPE';
const CLEAR_SINGLE_ITEM_RECIPE ='CLEAR_SINGLE_ITEM_RECIPE';

/**
 * ACTION CREATORS
 */

const getRecipe = recipes => ({ type: GET_RECIPE, recipes });
const getSavedRecipe = recipes => ({ type: GET_SAVED_RECIPE, recipes });
const saveRecipe = recipe => ({ type: SAVE_RECIPE, recipe });
const deleteSavedRecipe = recipe => ({ type: DELETE_SAVED_RECIPE, recipe });
const getSingleItemRecipe = recipes => ({ type: GET_SINGLE_ITEM_RECIPE, recipes });
const clearSingleItemRecipe = recipes => ({ type: CLEAR_SINGLE_ITEM_RECIPE, recipes });
/**
 * THUNK CREATORS
 */
export const clearSingleItemRecipeFromStore = () =>
  dispatch =>
    dispatch(clearSingleItemRecipe([]));

export const getSingleItemRecipeToStore = itemId =>
  dispatch =>
    axios.get(`/api/recipe/${itemId}`)
      .then(res =>
        dispatch(getSingleItemRecipe(res.data)))
      .catch(err => console.log(err));


export const deleteSavedRecipeFromStore = recipe =>
  dispatch =>
    axios.put(`/api/recipe/deleteRecipe/${recipe.id}`)
      .then(dispatch(deleteSavedRecipe(recipe)))
      .catch(err => console.log(err));

export const saveRecipeToStore = recipe =>
  dispatch =>
    axios.put(`/api/recipe/saveRecipe/${recipe.id}`)
      .then(dispatch(saveRecipe(recipe)))
      .catch(err => console.log(err));

export const fetchSavedRecipe = recipes =>
  dispatch =>
    axios.get('/api/recipe/savedRecipes')
      .then(res => 
        dispatch(getSavedRecipe(res.data)))
      .catch(err => console.log(err));

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
    case CLEAR_SINGLE_ITEM_RECIPE:
      return Object.assign({}, state, { singleItemRecipes: action.recipes });
    case GET_SINGLE_ITEM_RECIPE:
      return Object.assign({}, state, { singleItemRecipes: action.recipes });
    case DELETE_SAVED_RECIPE:
      return Object.assign({}, state, { savedRecipe: state.savedRecipe.slice(0, state.savedRecipe.indexOf(action.recipe)).concat(state.savedRecipe.slice(state.savedRecipe.indexOf(action.recipe)+1)) });
    case SAVE_RECIPE:
      return Object.assign({}, state, { savedRecipe: [...state.savedRecipe, action.recipe] });
    case GET_RECIPE:
      return Object.assign({}, state, { recipes: action.recipes });
    case GET_SAVED_RECIPE:
      return Object.assign({}, state, { savedRecipe: action.recipes });
    default:
      return state;
  }
};
