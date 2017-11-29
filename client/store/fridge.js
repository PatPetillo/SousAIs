import axios from 'axios';
import history from '../history';
import { error, fetchRecipe } from './';

/**
 * ACTION TYPES
 */
const GET_USER_ITEMS = 'GET_USER_ITEMS';
const REMOVE_FRIDGE_ITEM = 'REMOVE_FRIDGE_ITEM';
const ADD_ITEM_TO_FRIDGE = 'ADD_ITEM_TO_FRIDGE';

/**
 * ACTION CREATORS
 */
export const getItems = items => ({ type: GET_USER_ITEMS, items });
export const addItem = item => ({ type: ADD_ITEM_TO_FRIDGE, item });
export const remove = itemId => ({ type: REMOVE_FRIDGE_ITEM, itemId });

/**
 * THUNK CREATORS
 */
export const addProductThunk = (item) => {
  return dispatch => 
    axios.post('/api/fridge', item)
      .catch(() => dispatch(error('Please enter a real food item')));
};

export const fetchProducts = () => () => {
  axios.get('/api/fridge').catch(console.error);
};

export const removeItem = itemId => // deletion from browser
  dispatch =>
    axios.delete(`/api/fridge/${itemId}`)
      .catch(err => console.log(err));


/**
 * Reducer
 */

export default (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM_TO_FRIDGE:
      return [...state, action.item];
    case GET_USER_ITEMS:
      return action.items;
    case REMOVE_FRIDGE_ITEM:
      return state.filter(fridgeItems => (fridgeItems.id !== action.itemId));
    default:
      return state;
  }
};
