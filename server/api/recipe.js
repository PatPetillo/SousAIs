const router = require('express').Router();
const {
  User, FridgeItems, Recipe, RecipeUser,
} = require('../db/models');
const axios = require('axios');
const { socket } = require('../');
const chalk = require('chalk');
module.exports = router;

router.post('/searchRecipe', (req, res, next) => {
  let {
    type, cuisine, diet, exclude, intolerances,
  } = req.body;
  type = `query=${type}`;
  if (cuisine) cuisine = `cuisine=${cuisine}&`;
  if (diet)diet = `diet=${diet}&`;
  if (exclude) exclude = `excludeIngredients=${exclude}&`;
  if (intolerances) intolerances = `intolerances=${intolerances}&`;
  axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?${cuisine}${diet}instructionsRequired=true${intolerances}limitLicense=false&number=10&offset=0&${type}`, {
    headers: {
      'X-Mashape-Key': process.env.SPOONACULAR_ID,
      Accept: 'application/json',
    },
  })
    .then((apiRes) => {
      const rcptIds = apiRes.data.results.map(recipe => recipe.id).join('%2C');
      return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=${rcptIds}&includeNutrition=true`, {
        headers: {
          'X-Mashape-Key': process.env.SPOONACULAR_ID,
          Accept: 'application/json',
        },
      });
    })
    .then((rcps) => {
      const meals = rcps.data.filter(recipes => !!recipes.analyzedInstructions.length);
      const info = meals.map(meal => ({
        name: meal.title,
        ingredientAmount: meal.extendedIngredients.map(el => el.originalString).join('$$'),
        readyInMinutes: meal.readyInMinutes,
        diets: meal.diets.join('$$'),
        servings: meal.servings,
        spoonacularScore: meal.spoonacularScore,
        steps: meal.analyzedInstructions[0].steps.map(el => el.step).join('$$'),
        userId: req.session.passport.user,
        calories: `${meal.nutrition.nutrients[0].amount} ${meal.nutrition.nutrients[0].unit}`,
        fat: `${meal.nutrition.nutrients[1].amount} ${meal.nutrition.nutrients[1].unit}`,
        carbohydrates: `${meal.nutrition.nutrients[3].amount} ${meal.nutrition.nutrients[3].unit}`,
        cholesterol: `${meal.nutrition.nutrients[5].amount} ${meal.nutrition.nutrients[5].unit}`,
        sugar: `${meal.nutrition.nutrients[4].amount} ${meal.nutrition.nutrients[4].unit}`,
        sodium: `${meal.nutrition.nutrients[6].amount} ${meal.nutrition.nutrients[6].unit}`,
        protein: `${meal.nutrition.nutrients[7].amount} ${meal.nutrition.nutrients[7].unit}`,
        image: meal.image,
      }));
      console.log('information', info);
      res.json(info);
    })
    .catch(next);
});


router.get('/', (req, res, next) => {
  let user;
  const missingIng = {};
  const request = 2; // change on production
  User.findById(req.session.passport.user)
    .then((founduser) => {
      user = founduser;
      return user.getFridgeItems();
    })
    .then((foundItems) => {
      if (foundItems.length) {
        const ingredients = foundItems.map(x => x.name);
        return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredients.join('%2C')}&limitLicense=false&number=${request}&ranking=2`, {
          headers: {
            'X-Mashape-Key': process.env.SPOONACULAR_ID,
            Accept: 'application/json',
          },
        });
      }
      throw new Error('you have an empty fridge');
    })
    .then((apiRes) => {
      apiRes.data.forEach((el) => {
        missingIng[el.id] = el.missedIngredientCount;
      });

      const rcpIds = apiRes.data.map(recipe => recipe.id).join('%2C');
      return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=${rcpIds}&includeNutrition=true`, {
        headers: {
          'X-Mashape-Key': process.env.SPOONACULAR_ID,
          Accept: 'application/json',
        },
      });
    })
    .then((rcps) => {
      const meals = rcps.data.filter(recipes => !!recipes.analyzedInstructions.length);
      const info = meals.map(meal => ({
        name: meal.title,
        ingredientAmount: meal.extendedIngredients.map(el => el.originalString).join('$$'),
        readyInMinutes: meal.readyInMinutes,
        diets: meal.diets.join('$$'),
        servings: meal.servings,
        spoonacularScore: meal.spoonacularScore,
        steps: meal.analyzedInstructions[0].steps.map(el => el.step).join('$$'),
        userId: req.session.passport.user,
        calories: `${meal.nutrition.nutrients[0].amount} ${meal.nutrition.nutrients[0].unit}`,
        fat: `${meal.nutrition.nutrients[1].amount} ${meal.nutrition.nutrients[1].unit}`,
        carbohydrates: `${meal.nutrition.nutrients[3].amount} ${meal.nutrition.nutrients[3].unit}`,
        cholesterol: `${meal.nutrition.nutrients[5].amount} ${meal.nutrition.nutrients[5].unit}`,
        sugar: `${meal.nutrition.nutrients[4].amount} ${meal.nutrition.nutrients[4].unit}`,
        sodium: `${meal.nutrition.nutrients[6].amount} ${meal.nutrition.nutrients[6].unit}`,
        protein: `${meal.nutrition.nutrients[7].amount} ${meal.nutrition.nutrients[7].unit}`,
        image: meal.image,
        missedIngredientCount: missingIng[meal.id],
      }));
      socket.emit('get_recipes', info);
      res.json(info);
      info.forEach(el => Recipe.findOrCreate({
        where: {
          name: el.name,
          ingredientAmount: el.ingredientAmount,
          readyIn: el.readyInMinutes,
          diets: el.diets,
          servings: el.servings,
          spoonacularScore: el.spoonacularScore,
          steps: el.steps,
          calories: el.calories,
          fat: el.fat,
          carbohydrates: el.carbohydrates,
          cholesterol: el.cholesterol,
          sugar: el.sugar,
          sodium: el.sodium,
          protein: el.protein,
          image: el.image,
        },
      })
        .then(([recipe, wasCreated]) => {
          if (wasCreated) {
            user.addRecipe(recipe.id);
          }
        }));
    })
    .catch(() => {
      socket.emit('get_recipes', [{ name: 'You have no items in your fridge!' }]);
      res.json([{ name: 'You have no items in your fridge!' }]);
    });
});

router.get('/savedRecipes', (req, res, next) => {
  User.findById(req.session.passport.user)
    .then(user => user.getRecipes())
    .then(recipes => recipes.filter(recipe => recipe.recipeUser.saved))
    .then(savedRecipes => res.json(savedRecipes))
    .catch(next);
});

router.put('/saveRecipe/:recipeName', (req, res, next) => {
  let name = req.params.recipeName;
  name = name.split('-').join(' ');
  let recipeId;
  Recipe.findOne({
    where: {
      name,
    },
  })
    .then((foundRecipe) => {
      console.log(chalk.blue('RECIPEEEEEEEEEEEEEEEEEEEE' + foundRecipe))
      recipeId = foundRecipe.id;
      return User.findById(req.session.passport.user)
        .then((foundUser) => {
          RecipeUser.update(
            { saved: true },
            {
              where: {
                userId: foundUser.id,
                recipeId,
              },
            },
          )
            .then(() => res.json(`${name} has been saved`));
        });
    })
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
    .then(() => res.json(`Recipe with id: ${id} was unsaved.`))
    .catch(next);
});

// Get possible recipes only base on  one item.

router.get('/:itemId', (req, res, next) => {
  FridgeItems.findById(req.params.itemId)
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
            ingredientAmount: meal.extendedIngredients.map(el => el.originalString).join('$$'),
            readyInMinutes: meal.readyInMinutes,
            diets: meal.diets.join('$$'),
            servings: meal.servings,
            spoonacularScore: meal.spoonacularScore,
            steps: meal.analyzedInstructions[0].steps.map(el => el.step).join('$$'),
            userId: req.session.passport.user,
            calories: `${meal.nutrition.nutrients[0].amount} ${meal.nutrition.nutrients[0].unit}`,
            fat: `${meal.nutrition.nutrients[1].amount} ${meal.nutrition.nutrients[1].unit}`,
            carbohydrates: `${meal.nutrition.nutrients[3].amount} ${meal.nutrition.nutrients[3].unit}`,
            cholesterol: `${meal.nutrition.nutrients[5].amount} ${meal.nutrition.nutrients[5].unit}`,
            sugar: `${meal.nutrition.nutrients[4].amount} ${meal.nutrition.nutrients[4].unit}`,
            sodium: `${meal.nutrition.nutrients[6].amount} ${meal.nutrition.nutrients[6].unit}`,
            protein: `${meal.nutrition.nutrients[7].amount} ${meal.nutrition.nutrients[7].unit}`,
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
      return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredients}&limitLicense=false&number=15&ranking=2`, {
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
