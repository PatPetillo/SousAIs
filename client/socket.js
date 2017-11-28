import io from 'socket.io-client';
import store, { addProductThunk, fetchProducts, removeItem } from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');
});

socket.on('post_to_fridge', (addedItem) => {
  // store.dispatch(addProductThunk(addedItem));
});

socket.on('get_fridge', (fridgeItems) => {
  // store.dispatch(fetchProducts(fridgeItems));
});

socket.on('delete_food_item', (itemId) => {
  // store.dispatch(removeItem(itemId));
});
export default socket;
