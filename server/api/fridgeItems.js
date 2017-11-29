const router = require('express').Router();
const { User, FridgeItems, Fridge } = require('../db/models/');
const axios = require('axios');
const { nutrix, nutrixApp } = require('../../secrets');
const { socket } = require('../');

module.exports = router;

router.get('/', (req, res, next) => {
  User.findById(1)
    .then(user => user.getFridgeItems())
    .then((items) => {
      socket.emit('get_fridge', items);
      res.json(items);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const foodItem = req.body.food;

  let foodAmount;
  let itemToReturn;
  axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', { query: foodItem }, {
    headers: {
      'x-app-id': process.env.NUTRIX_ID,
      'x-app-key': process.env.NUTRIX_KEY,
    },
  })
    .then((response) => {
      foodAmount = response.data.foods[0].serving_weight_grams;
      return response.data.foods;
    })
    .then(foodData => FridgeItems.findOrCreate({
      where: {
        name: foodData[0].food_name,
        image: foodData[0].photo.highres, // findOrCreate gives an Array
      },
    }))
    .then(([createdItem]) => {
      itemToReturn = createdItem;
      return Fridge.findOrCreate({
        where: {
          fridgeItemId: createdItem.id,
          userId: 1,
        },
      });
    })
    .then(([fridgeInput]) => (
      fridgeInput.update({
        quantity: fridgeInput.quantity + foodAmount,
      })))
    .then(() => {
      socket.emit('post_to_fridge', itemToReturn);
      res.json(itemToReturn);
    })
    .catch(next);
});



router.delete('/:itemId', (req, res, next) => {
  const itemId = Number(req.params.itemId);
  User.findById(req.session.passport.user)
    .then(user => Fridge.destroy({
      where: {
        userId: user.id,
        fridgeItemId: itemId,
      },
    }))
    .then(() => {
      socket.emit('delete_food_item', itemId);
      res.json(`Item with ${itemId} was deleted.`);
    })
    .catch(next);
});

// ALEXA DELETE ROUTE
router.delete('/alexa/:food', (req, res, next) => {
  const { food } = req.params;
  let foodItemId;
  FridgeItems.findOne({
    where: {
      name: food,
    },
  })
    .then((foundFood) => {
      foodItemId = foundFood.id;
      return User.findById(1);
    })
    .then(user => Fridge.destroy({
      where: {
        userId: user.id,
        fridgeItemId: foodItemId,
      },
    }))
    .then(() => {
      socket.emit('delete_food_item', foodItemId);
      res.json(`${food} was deleted.`);
    })
    .catch(next);
});


router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('There was an Express error.');
});

