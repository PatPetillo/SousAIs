import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER_ITEMS = 'GET_USER_ITEMS';
const REMOVE_FRIDGE_ITEM = 'REMOVE_FRIDGE_ITEM';
const ADD_ITEM_TO_FRIDGE = 'ADD_ITEM_TO_FRIDGE';

/**
 * ACTION CREATORS
 */
const getItems = items => ({ type: GET_USER_ITEMS, items });
const addItem = item => ({ type: ADD_ITEM_TO_FRIDGE, item });
const remove = itemId => ({ type: REMOVE_FRIDGE_ITEM, itemId });

/**
 * THUNK CREATORS
 */
export const AddProductThunk = item =>
  dispatch =>
    axios.post('/api/fridge', item)
      .then(res =>
        dispatch(addItem(res.data)))
      .then(() => history.push('/myfridge'))
      .catch(err => console.log(err));

export const fetchProducts = () =>
  dispatch =>
    axios.get('/api/fridge')
      .then(res =>
        dispatch(getItems(res.data)))
      .catch(err => console.log(err));

export const removeItem = itemId =>
  dispatch =>
    axios.delete(`/api/fridge/${itemId}`)
      .then(res => res.data)
      .then(dispatch(remove(itemId)))
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
