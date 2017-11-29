import io from 'socket.io-client';
import history from './history';
import store, { getItems, addItem, getRecipe, remove, fetchRecipe, getSingleItemRecipe, error } from './store';
const socket = io(window.location.origin);

socket.on('connect', () => {
    console.log('Connected!');
});

socket.on('get_fridge', (items) => {
    store.dispatch(getItems(items));
});

socket.on('post_to_fridge', (addedItem) => {
    store.dispatch(addItem(addedItem));
    store.dispatch(fetchRecipe());
    store.dispatch(error(''));
    history.push('/myfridge');
});

socket.on('delete_food_item', (itemId) => {
    store.dispatch(remove(itemId));
    store.dispatch(fetchRecipe());
});

socket.on('get_recipes', (recipes) => {
    store.dispatch(getRecipe(recipes));
});

socket.on('get_single_item_recipes', (recipes) => {
    store.dispatch(getSingleItemRecipe(recipes));
});

socket.on('alexa_get_one_recipe', (recipe) => {
  console.log('ALEXA', recipe);
  const name = recipe.name.replace(/\s/g, '');
  history.push(`/singleRecipe/${name}`);
});

export default socket;
