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
      calories: +Faker.commerce.price(),
      image: Faker.image.food(),
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
