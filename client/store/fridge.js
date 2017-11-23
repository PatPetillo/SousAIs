import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER_ITEMS = 'GET_USER_ITEMS';
const REMOVE_USER_ITEM = 'REMOVE_USER_ITEM';
const ADD_ITEM_TO_FRIDGE = 'ADD_ITEM_TO_FRIDGE';

/**
 * ACTION CREATORS
 */
const getItems = items => ({ type: GET_USER_ITEMS, items });
const addItem = item => ({ type: ADD_ITEM_TO_FRIDGE, item });

/**
 * THUNK CREATORS
 */
export const AddProductThunk = item =>
  dispatch =>
    axios.post('/api/fridge', item)
      .then(res =>
        dispatch(addItem(res.data)))
      .catch(err => console.log(err));

export const fetchProducts = () =>
  dispatch =>
    axios.get('/api/fridge')
      .then(res =>
        dispatch(getItems(res.data)))
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
    case REMOVE_USER_ITEM:
      return state; // filter!=
    default:
      return state;
  }
};
