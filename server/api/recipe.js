const router = require('express').Router();
const {
  RecipeUser, User, Fridge, FridgeItems, Recipe,
} = require('../db/models');
const axios = require('axios');
const key = require('../../secrets').spoon;

module.exports = router;

// router.get('/', (req, res, next) => {
//   Recipe.findAll({
//     // explicitly select only the id and email fields - even though
//     // users' passwords are encrypted, it won't help if we just
//     // send everything to anyone who asks!
//     attributes: ['id', 'email'],
//   })
//     .then(users => res.json(users))
//     .catch(next);
// });

router.get('/', (req, res, next) => {
  let user;
  User.findById(req.session.passport.user)
    .then((founduser) => {
      user = founduser;
    })
    .then(() => Fridge.findAll({
      where: {
        userId: req.session.passport.user,
      },
      include: [{
        model: FridgeItems,
        include: [{ all: true }],
      }],
    }))
    .then((foundItems) => {
      const ingredients = foundItems.map(x => x.fridgeItem.name);
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
              recipes.forEach(r => user.addRecipe(r.id));
              res.json(recipes);
            });
        });
    });
});


// router.get('/', (req, res, next) => {
//   User.findById(req.session.passport.user)
//     .then((user) => {
//       return Recipe.findAll()
//         .then((found) => {
//           found.forEach((el) => {
//             user.addRecipe(el.id);
//           });
//           res.json(found);
//         });
//     });
// });
