const router = require('express').Router();
const {
  User, Fridge, FridgeItems, Recipe, RecipeUser,
} = require('../db/models');
const axios = require('axios');
const key = require('../../secrets').spoon;
const { socket } = require('../');

module.exports = router;


router.get('/', (req, res, next) => {
  let user;
  User.findById(req.session.passport.user)
    .then((founduser) => {
      user = founduser;
      return user.getFridgeItems();
    })
    .then((foundItems) => {
      if (foundItems) {
        const ingredients = foundItems.map(x => x.name);
        return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredients.join('%2C')}&limitLicense=false&number=10&ranking=2`, {
          headers: {
            'X-Mashape-Key': key,
            Accept: 'application/json',
          },
        });
      }
    })
    .then((apiRes) => {
      const rcpIds = apiRes.data.map(recipe => recipe.id).join('%2C');
      return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=${rcpIds}&includeNutrition=true`, {
        headers: {
          'X-Mashape-Key': key,
          Accept: 'application/json',
        },
      });
    })
    .then((rcps) => {
      const meals = rcps.data.filter(recipes => !!recipes.analyzedInstructions.length);
      const info = meals.map(meal => ({
        name: meal.title,
        steps: meal.analyzedInstructions[0].steps.map(el => el.step).join('$$'),
        userId: req.session.passport.user,
        calories: `${meal.nutrition.nutrients[0].amount} ${meal.nutrition.nutrients[0].unit}`,
        fat: `${meal.nutrition.nutrients[1].amount} ${meal.nutrition.nutrients[1].unit}`,
        carbohydrates: `${meal.nutrition.nutrients[3].amount} ${meal.nutrition.nutrients[3].unit}`,
        sugar: `${meal.nutrition.nutrients[4].amount} ${meal.nutrition.nutrients[4].unit}`,
        sodium: `${meal.nutrition.nutrients[6].amount} ${meal.nutrition.nutrients[6].unit}`,
        image: meal.image,
      }));
      socket.emit('get_recipes', info);
      res.json(info);
      info.forEach(el => Recipe.findOrCreate({
        where: {
          name: el.name,
          steps: el.steps,
          calories: el.calories,
          fat: el.fat,
          carbohydrates: el.carbohydrates,
          sugar: el.sugar,
          sodium: el.sodium,
          image: el.image,
        },
      })
        .then(([recipe, wasCreated]) => {
          if (wasCreated) {
            user.addRecipe(recipe.id);
          }
        }));
    })
    .catch(next);
});

router.get('/savedRecipes', (req, res, next) => {
  User.findById(req.session.passport.user)
    .then(user => user.getRecipes())
    .then(recipes => recipes.filter(recipe => recipe.recipeUser.saved))
    .then(savedRecipes => res.json(savedRecipes))
    .catch(next);
});

router.put('/saveRecipe/:recipeId', (req, res, next) => {
  const id = Number(req.params.recipeId);
  User.findById(req.session.passport.user)
    .then((foundUser) => {
      RecipeUser.update(
        { saved: true },
        {
          where: {
            userId: foundUser.id,
            recipeId: id,
          },
        },
      );
    })
    .then(() => res.json(`Recipe with ${id} was saved.`))
    .catch(next);
});

router.put('/deleteRecipe/:recipeId', (req, res, next) => {
  const id = Number(req.params.recipeId);
  User.findById(req.session.passport.user)
    .then((foundUser) => {
      RecipeUser.update(
        { saved: false },
        {
          where: {
            userId: foundUser.id,
            recipeId: id,
          },
        },
      );
    })
    .then(() => res.json(`Recipe with ${id} was unsaved.`))
    .catch(next);
});


// Get possible recipes only base on  one item.

router.get('/:itemId', (req, res, next) => {
  FridgeItems.findById(req.params.itemId)
    .then((foundItem) => {
      const ingredients = foundItem.name;
      return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredients}&limitLicense=false&number=10&ranking=2`, {
        headers: {
          'X-Mashape-Key': key,
          Accept: 'application/json',
        },
      })
        .then((apiRes) => {
          const rcpIds = apiRes.data.map(recipe => recipe.id).join('%2C');
          return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=${rcpIds}&includeNutrition=true`, {
            headers: {
              'X-Mashape-Key': key,
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
            calories: `${meal.nutrition.nutrients[0].amount  } ${  meal.nutrition.nutrients[0].unit}`,
            fat: `${meal.nutrition.nutrients[1].amount  } ${  meal.nutrition.nutrients[1].unit}`,
            carbohydrates: `${meal.nutrition.nutrients[3].amount  } ${  meal.nutrition.nutrients[3].unit}`,
            sugar: `${meal.nutrition.nutrients[4].amount  } ${  meal.nutrition.nutrients[4].unit}`,
            sodium: `${meal.nutrition.nutrients[6].amount  } ${  meal.nutrition.nutrients[6].unit}`,
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

// SINGLE ITEM RECIPES ROUTE FOR ALEXA
router.get('/alexa/:food', (req, res, next) => {
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
          'X-Mashape-Key': key,
          Accept: 'application/json',
        },
      })
        .then((apiRes) => {
          const rcpIds = apiRes.data.map(recipe => recipe.id).join('%2C');
          return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=${rcpIds}&includeNutrition=true`, {
            headers: {
              'X-Mashape-Key': key,
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
            calories: `${meal.nutrition.nutrients[0].amount  } ${  meal.nutrition.nutrients[0].unit}`,
            fat: `${meal.nutrition.nutrients[1].amount  } ${  meal.nutrition.nutrients[1].unit}`,
            carbohydrates: `${meal.nutrition.nutrients[3].amount  } ${  meal.nutrition.nutrients[3].unit}`,
            sugar: `${meal.nutrition.nutrients[4].amount  } ${  meal.nutrition.nutrients[4].unit}`,
            sodium: `${meal.nutrition.nutrients[6].amount  } ${  meal.nutrition.nutrients[6].unit}`,
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

