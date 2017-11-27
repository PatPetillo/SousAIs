const router = require('express').Router();
const {
    User,
    Fridge,
    FridgeItems,
    Recipe
} = require('../db/models');
const axios = require('axios');
const key = require('../../secrets').spoon;

module.exports = router;


router.get('/', (req, res, next) => {
    let user;
    User.findById(1)
        .then((founduser) => {
            user = founduser;
            return user.getFridgeItems();
        })
        .then((foundItems) => {
            const ingredients = foundItems.map(x => x.name);
            console.log(ingredients.join('2%C'));
            return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredients.join('%2C')}&limitLicense=false&number=5&ranking=1`, {
                    headers: {
                        'X-Mashape-Key': key,
                        Accept: 'application/json',
                    },
                })
                .then((apiRes) => {
                    const rcpIds = apiRes.data.map(recipe => recipe.id).join('%2C');
                    return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=${rcpIds}&includeNutrition=false`, {
                        headers: {
                            'X-Mashape-Key': key,
                            Accept: 'application/json',
                        },
                    });
                })
                .then((rcps) => {
                    const arrToUpdate = [];
                    const meals = rcps.data.filter(recipes => !!recipes.instructions);
                    const info = meals.map(meal => ({ name: meal.title, steps: meal.instructions, userId: req.session.passport.user }));
                    info.forEach(el => arrToUpdate.push(Recipe.create(el)));
                    return Promise.all(arrToUpdate)
                        .then((recipes) => {
                            recipes.forEach(toSetR => user.addRecipe(toSetR.id));
                            res.json(recipes);
                        });
                });
        });
});

router.post('/', (req, res, next) => {
    User.findById(1)
        .then((foundUser) => {
            foundUser.crSteps = req.body.steps;
            return foundUser;
        })
        .then((update) => {
            res.json(update.crSteps);
        });
});

router.get('/steps', (req, res, next) => {
    User.findById(1)
        .then((foundUser) => {
            res.json(foundUser.crSteps);
        });
});

router.get('/nextstep', (req, res, next) => {
    User.findById(1)
        .then((foundUser) => {
            foundUser.crSteps = foundUser.crSteps.slice(1);
        })
        .then((update) => {
            if (!update.length) res.json(['The recipe is complete! Enjoy your meal']);
            else res.json(update.crSteps);
        });
});