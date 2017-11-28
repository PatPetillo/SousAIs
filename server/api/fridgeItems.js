// import { create } from '../../../../../../Library/Caches/typescript/2.6/node_modules/@types/react-test-renderer';

const router = require('express').Router();
const { User, FridgeItems, Fridge } = require('../db/models/');
const axios = require('axios');

router.get('/', (req, res, next) => {
    User.findById(1)
        .then(user => user.getFridgeItems())
        .then(items => res.json(items))
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
        .then(() => res.json(`Item with ${itemId} was deleted.`))
        .catch(next);
});

router.post('/', (req, res, next) => {
    // console.log('entire request', req);
    console.log('items', typeof req.body);
    const foodItem = req.body.food;
    let foodAmount;
    axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', { query: foodItem }, {
            headers: {
                'x-app-id': 'a6e13eff',
                'x-app-key': '2459b51f4e97d4ad614cf60e1f23e1e0',
            },
        })
        .then((response) => {
            foodAmount = response.data.foods[0].serving_weight_grams;
            return response.data.foods;
            // res.send('next line');
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
                    userId: 1,
                    quantity: foodAmount,
                });
            } else {
                Fridge.update({
                    quantity: foodAmount,
                }, {
                    where: {
                        fridgeItemId: createdItem.id,
                        userId: 1,
                    },
                });
            }
        })
        .then(() => res.send('Updated Sucessfully'))
        .catch(next);
});

module.exports = router;