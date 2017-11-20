const router = require('express').Router();
const { FridgeItems, Fridge } = require('../db/models/');
const axios = require('axios');
const { nutrix, nutrixApp } = require('../../secrets');


router.get('/', (req, res, next) => {
  console.log(req.session.passport.user, 'resadasdasdasdas');
  Fridge.findAll({
    where: {
      userId: req.session.passport.user,
    },
    include: [{ all: true }],
  })
    .then(items => res.json(items))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const foodItem = req.body.food;
  axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${foodItem}`, {
    headers: {
      'x-app-id': nutrixApp,
      'x-app-key': nutrix,
    },
  })
    .then((response) => {
      console.log(response.data);
      res.json(response.data.common[0]);
    })
    .then((topost) => {
      FridgeItems.findOrCreate({
        where: {
          name: foodItem,
        },
      });
    });
});

module.exports = router;
