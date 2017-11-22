const router = require('express').Router();
const { User, FridgeItems, Fridge } = require('../db/models/');
const axios = require('axios');
const { nutrix, nutrixApp } = require('../../secrets');

router.get('/', (req, res, next) => {
  User.findById(req.session.passport.user)
    .then(user => user.getFridgeItems())
    .then(items => res.json(items))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const foodItem = req.body.food;
  let foodAmount;
  axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', { query: foodItem }, {
    headers: {
      'x-app-id': nutrixApp,
      'x-app-key': nutrix,
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
    .then(([createdItem, wasCreated]) => {
      if (wasCreated) {
        Fridge.create({
          fridgeItemId: createdItem.id,
          userId: req.session.passport.user,
          quantity: foodAmount,
        });
      } else {
        Fridge.update({
          quantity: foodAmount,
        }, {
          where: {
            fridgeItemId: createdItem.id,
            userId: req.session.passport.user,
          },
        });
      }
    })
    .then(() => res.send('Updated Sucessfully'))
    .catch(next);
});

module.exports = router;
