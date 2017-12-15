/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Main } from './Main';
export { default as Navbar } from './Navbar';
export { default as WelcomeScreen } from './WelcomeScreen';
export { default as WelcomeScreenCarousel } from './Carousel';
export { default as UserHome } from './userHome';
export { default as UserFridge } from './UserFridge';
export { Login, Signup } from './AuthForm';
export { default as SingleItem } from './SingleItem';
export { default as AddItem } from './AddItem';
export { default as SavedRecipes } from './SavedRecipe';
export { default as AllRecipes } from './AllRecipes';
export { default as SingleRecipe } from './SingleRecipe';
export { default as SingleRecipeSingleItem } from './SingleRecipeSingleItem';
export { default as SearchRecipe } from './SearchRecipe';
export { default as FoundRecipe } from './FoundRecipe';
export { default as AlexaHelp } from './AlexaHelp';
