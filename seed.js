const db = require('./server/db/db');
const User = require('./server/db/models/user');
const FridgeItems = require('./server/db/models/FridgeItems');
const Faker = require('faker');

function users() {
  Faker.seed(124);
  const usersProm = [];
  for (let i = 0; i < 2; i++) {
    usersProm.push(User.create({
      email: Faker.internet.email(),
      name: Faker.name.findName(),
      password: '1',
      salt: '1',
      googleId: Faker.internet.userName(),
    }));
  }
  return usersProm;
}

function product() {
  Faker.seed(124);
  const products = [];
  for (let i = 1; i < 16; i++) {
    products.push(FridgeItems.create({
      name: Faker.commerce.productName(),
      image: 'https://media.istockphoto.com/photos/red-apple-with-water-drops-isolated-picture-id495870175?k=6&m=495870175&s=612x612&w=0&h=fc6JeWQHsvckh-KtRqOA9h5UWyELl9Bhyn7pdnfJc9k=',
    }));
  }
  return products;
}


db
  .sync({ force: true })
  .then(() => Promise.all(users()))
  .then(() => Promise.all(product()))
  .then(() => {
  })
  .then(
    () => {
      console.log('Seeding successful');
    },
    (err) => {
      console.error('Error while seeding');
      console.error(err.stack);
    },
  )
  .finally(() => {
    db.close();
    return null;
  });
