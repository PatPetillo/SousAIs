import axios from 'axios';
import history from '../history';

const GET_USER_ITEMS = 'GET_USER_ITEMS';
const REMOVE_USER_ITEM = 'REMOVE_USER_ITEM';


const getItems = items => ({ type: GET_USER_ITEMS, items });


export const fetchProducts = () =>
  dispatch =>
    axios.get('/api/fridge')
      .then(res =>
        dispatch(getItems(res.data)))
      .catch(err => console.log(err));


export default function (state = [], action) {
  switch (action.type) {
    case GET_USER_ITEMS:
      return action.products;
    case REMOVE_USER_ITEM:
      return state; // filter!=
    default:
      return state;
  }
}
