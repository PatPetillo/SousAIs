const router = require('express').Router();
const {
  User,
  FridgeItems,
  Recipe,
} = require('../db/models');
const axios = require('axios');
const { socket } = require('../');

module.exports = router;


router.get('/', (req, res, next) => { // test only most merge
  let user;
  User.findById(1)
    .then((founduser) => {
      user = founduser;
      return user.getFridgeItems();
    })
    .then((foundItems) => {
      const ingredients = foundItems.map(x => x.name);
      return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredients.join('%2C')}&limitLicense=false&number=5&ranking=2`, {
        headers: {
          'X-Mashape-Key': process.env.SPOONACULAR_ID,
          Accept: 'application/json',
        },
      })
        .then((apiRes) => {
          const rcpIds = apiRes.data.map(recipe => recipe.id).join('%2C');
          return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=${rcpIds}&includeNutrition=true`, {
            headers: {
              'X-Mashape-Key': process.env.SPOONACULAR_ID,
              Accept: 'application/json',
            },
          });
        })
        .then((rcps) => {
          const arrToUpdate = [];
          const meals = rcps.data.filter(recipes => !!recipes.analyzedInstructions.length);
          const info = meals.map(meal => ({
            name: meal.title,
            steps: meal.analyzedInstructions[0].steps.map(el => el.step).join('$$'),
            userId: 1,
            calories: `${meal.nutrition.nutrients[0].amount} ${meal.nutrition.nutrients[0].unit}`,
            fat: `${meal.nutrition.nutrients[1].amount} ${meal.nutrition.nutrients[1].unit}`,
            carbohydrates: `${meal.nutrition.nutrients[3].amount} ${meal.nutrition.nutrients[3].unit}`,
            sugar: `${meal.nutrition.nutrients[4].amount} ${meal.nutrition.nutrients[4].unit}`,
            sodium: `${meal.nutrition.nutrients[6].amount} ${meal.nutrition.nutrients[6].unit}`,
            image: meal.image,
          }));
          info.forEach(el => arrToUpdate.push(Recipe.create(el)));
          return Promise.all(arrToUpdate)
            .then((recipes) => {
              recipes.forEach(toSetR => user.addRecipe(toSetR.id));
              const chosen = recipes[Math.floor(Math.random() * recipes.length)];
              user.update({
                cr: chosen.id,
                crSteps: chosen.steps,
              });
              socket.emit('alexa_get_one_recipe', chosen);
              res.json(chosen);
            });
        });
    })
    .catch(next);
});

router.get('/nextstep', (req, res, next) => {
  User.findById(1)
    .then((foundUser) => {
      if (foundUser.crs === foundUser.crSteps.split('$$').length - 1) {
        return foundUser.update({
          crs: -1,
        });
      }
      return foundUser.update({
        crs: foundUser.crs + 1,
      });
    })
    .then((update) => {
      res.json({
        steps: update.crSteps,
        num: update.crs,
      });
    })
    .catch(next);
});

router.get('/steps', (req, res, next) => {
  User.findById(1)
    .then(foundUser => foundUser.update({
      crs: 0,
    }))
    .then((update) => {
      res.json({
        steps: update.crSteps,
        num: update.crs,
      });
    })
    .catch(next);
});


router.get('/nextstep', (req, res, next) => {
  User.findById(1)
    .then((foundUser) => {
      if (foundUser.crs === foundUser.crSteps.split('$$').length - 1) {
        return foundUser.update({
          crs: -1,
        });
      }
      return foundUser.update({
        crs: foundUser.crs + 1,
      });
    })
    .then((update) => {
      res.json({
        steps: update.crSteps,
        num: update.crs,
      });
    })
    .catch(next);
});

router.get('/repeatstep', (req, res, next) => {
  User.findById(1)
    .then((foundUser) => {
      res.json({
        steps: foundUser.crSteps,
        num: foundUser.crs,
      });
    })
    .catch(next);
});


router.get('/startover', (req, res, next) => {
  User.findById(1)
    .then(foundUser => foundUser.update({
      crs: 0,
    }))
    .catch(next);
});

// SINGLE ITEM RECIPES ROUTE FOR ALEXA
router.get('/:food', (req, res, next) => {
  const { food } = req.params;
  FridgeItems.findOne({
    where: {
      name: food,
    },
  })
    .then((foundItem) => {
      const ingredients = foundItem.name;
      return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredients}&limitLicense=false&number=10&ranking=2`, {
        headers: {
          'X-Mashape-Key': process.env.SPOONACULAR_ID,
          Accept: 'application/json',
        },
      })
        .then((apiRes) => {
          const rcpIds = apiRes.data.map(recipe => recipe.id).join('%2C');
          return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=${rcpIds}&includeNutrition=true`, {
            headers: {
              'X-Mashape-Key': process.env.SPOONACULAR_ID,
              Accept: 'application/json',
            },
          });
        })
        .then((rcps) => {
          const arrToUpdate = [];
          const meals = rcps.data.filter(recipes => !!recipes.analyzedInstructions.length);
          const info = meals.map(meal => ({
            name: meal.title,
            steps: meal.analyzedInstructions[0].steps.map(el => el.step).join('$$'),
            calories: `${meal.nutrition.nutrients[0].amount} ${meal.nutrition.nutrients[0].unit}`,
            fat: `${meal.nutrition.nutrients[1].amount} ${meal.nutrition.nutrients[1].unit}`,
            carbohydrates: `${meal.nutrition.nutrients[3].amount} ${meal.nutrition.nutrients[3].unit}`,
            sugar: `${meal.nutrition.nutrients[4].amount} ${meal.nutrition.nutrients[4].unit}`,
            sodium: `${meal.nutrition.nutrients[6].amount} ${meal.nutrition.nutrients[6].unit}`,
            image: meal.image,
          }));
          info.forEach(el => arrToUpdate.push(Recipe.build(el)));
          return Promise.all(arrToUpdate)
            .then((recipes) => {
              socket.emit('get_single_item_recipes', recipes);
              res.json(recipes);
            });
        });
    })
    .catch(next);
});
