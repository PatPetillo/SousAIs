const router = require('express').Router();
const {
  User, Fridge, FridgeItems, Recipe, RecipeUser,
} = require('../db/models');
const axios = require('axios');
const key = require('../../secrets').spoon;

module.exports = router;


router.get('/', (req, res, next) => {
  let user;
  User.findById(req.session.passport.user)
    .then((founduser) => {
      user = founduser;
      return user.getFridgeItems();
    })
    .then((foundItems) => {
      const ingredients = foundItems.map(x => x.name);
      return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredients.join('%2C')}&limitLicense=false&number=10&ranking=2`, {
        headers: {
          'X-Mashape-Key': key,
          Accept: 'application/json',
        },
      });
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
      // const arrToUpdate = [];
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
    .then(() => Recipe.findAll())
    .then(allRecipes => res.json(allRecipes));
});

router.put('/savedRecipe/:recipeId', (req, res, next) => {
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
    .then(() => res.json(`Recipe with ${id} was saved to the database.`))
    .catch(next);
});


// Get possible recipes only base on  one item.

router.get('/:itemId', (req, res, next) => {
  FridgeItems.findById(req.params.itemId)
    .then((foundItem) => {
      console.log('founditem', foundItem);
      const ingredients = foundItem.name;
      return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredients}&limitLicense=false&number=5&ranking=1`, {
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
              res.json(recipes);
            });
        });
    })
    .catch(next);
});
