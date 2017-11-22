const db = require('./server/db/db');
const User = require('./server/db/models/user');
const FridgeItems = require('./server/db/models/fridgeItems');
const Fridge = require('./server/db/models/fridge');

User.belongsToMany(FridgeItems, { through: Fridge });
FridgeItems.belongsToMany(User, { through: Fridge });
// User.belongsToMany(Recipe, { through: RecipeUser });
// Recipe.belongsToMany(User, { through: RecipeUser });

const users = [
  {
    email: 'PatPetillo@gmail.com',
    name: 'Pat',
    password: 'javascriptisfun',
    salt: '1',
    googleId: 'PatP',
  },
  {
    email: '1',
    name: 'Pat',
    password: '1',
    salt: '1',
    googleId: 'PatP',
  },
  {
    email: 'Bderiel@gmail.com',
    name: 'Brian',
    password: 'nodeisfun',
    salt: '2',
    googleId: 'BrianD',
  },
  {
    email: 'DevonJohnBaptiste@gmail.com',
    name: 'Devon',
    password: 'expressisfun',
    salt: '3',
    googleId: 'DevonJ',
  },
  {
    email: 'WaleJegede@gmail.com',
    name: 'Wale',
    password: 'reactisfun',
    salt: '4',
    googleId: 'WaleJ',
  },
  {
    email: '1@gmail.com',
    name: 'Yuchen',
    password: '1',
    salt: '5',
    googleId: 'YuchenC',
  },
];

const fridgeItems = [
  {
    name: 'potato',
    image: 'https://cdn.shopify.com/s/files/1/1017/2183/t/2/assets/live-preview-potato.png?17662155388061927543',
  },
  {
    name: 'rice',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Rice_p1160004.jpg/200px-Rice_p1160004.jpg',
  },
  {
    name: 'beef',
    image: 'https://www.maangchi.com/wp-content/uploads/2013/09/beef.png',
  },
  {
    name: 'bell pepper',
    image: 'https://i5.walmartimages.com/asr/08463912-1cb6-446c-99b0-b245be980d48_1.a54c343d736202d4f5f3208d3d6ade6b.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
  },
  {
    name: 'onion',
    image: 'http://cdn.shopify.com/s/files/1/1537/5553/products/00613_15abd93a-e239-45df-acdb-8485b40d546a_grande.jpg?v=1486440965',
  },
  {
    name: 'carrots',
    image: 'http://media.mercola.com/assets/images/foodfacts/carrot-nutrition-facts.jpg',
  },
  {
    name: 'soy sauce',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Soy_sauce_2.jpg',
  },
];

const fridges = [
  {
    quantity: 1.0,
    userId: 1,
    fridgeItemId: 1,
  },
  {
    quantity: 2.0,
    userId: 1,
    fridgeItemId: 2,
  },
  {
    quantity: 3.0,
    userId: 1,
    fridgeItemId: 3,
  },
  {
    quantity: 3.0,
    userId: 1,
    fridgeItemId: 4,
  },
  {
    quantity: 3.0,
    userId: 1,
    fridgeItemId: 5,
  },
  {
    quantity: 2.0,
    userId: 1,
    fridgeItemId: 6,
  },
  {
    quantity: 2.0,
    userId: 1,
    fridgeItemId: 7,
  },
  {
    quantity: 2.0,
    userId: 2,
    fridgeItemId: 1,
  },
  {
    quantity: 2.0,
    userId: 2,
    fridgeItemId: 2,
  },
  {
    quantity: 2.0,
    userId: 2,
    fridgeItemId: 3,
  },
  {
    quantity: 1.0,
    userId: 2,
    fridgeItemId: 4,
  },
  {
    quantity: 1.0,
    userId: 2,
    fridgeItemId: 5,
  },
  {
    quantity: 1.0,
    userId: 2,
    fridgeItemId: 6,
  },
  {
    quantity: 1.0,
    userId: 2,
    fridgeItemId: 7,
  },
];
const seed = () =>
  Promise.all(users.map(user =>
    User.create(user)))
    .then(() =>
      Promise.all(fridgeItems.map(fridgeItem =>
        FridgeItems.create(fridgeItem))))
    .then(() =>
      Promise.all(fridges.map(fridge =>
        Fridge.create(fridge))));
const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch((err) => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
