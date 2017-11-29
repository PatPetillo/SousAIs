const router = require('express').Router();
const {
    User,
    FridgeItems,
    Recipe,
    RecipeUser,
} = require('../db/models');
const axios = require('axios');
const key = require('../../secrets').spoon;
const { socket } = require('../');

module.exports = router;


router.get('/', (req, res, next) => {
    let user;
    User.findById(1)
        .then((founduser) => {
            user = founduser;
            return user.getFridgeItems();
        })
        .then((foundItems) => {
            if (foundItems) {
                const ingredients = foundItems.map(x => x.name);
                return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredients.join('%2C')}&limitLicense=false&number=10&ranking=2`, {
                    headers: {
                        'X-Mashape-Key': process.env.SPOONACULAR_ID,
                        Accept: 'application/json',
                    },
                });
            }
        })
        .then((apiRes) => {
            // console.log(apiRes, 'apiRes');
            const rcpIds = apiRes.data.map(recipe => recipe.id).join('%2C');
            return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=${rcpIds}&includeNutrition=true`, {
                headers: {
                    'X-Mashape-Key': process.env.SPOONACULAR_ID,
                    Accept: 'application/json',
                },
            });
        })
        .then((rcps) => {
            // const arrToUpdate = [];
            // console.log(rcps.data[0].nutrition.nutrients);
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
        .then(() => Recipe.findAll())
        .then(allRecipes => res.json(allRecipes))
        .catch(next);
});

router.get('/savedRecipes', (req, res, next) => {
    User.findById(req.session.passport.user)
        .then(user => user.getRecipes())
        .then(recipes => recipes.filter(recipe => recipe.recipeUser.saved))
        .then(savedRecipes => res.json(savedRecipes))
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
        });
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
        });
});

router.put('/deleteRecipe/:recipeId', (req, res, next) => {
    const id = Number(req.params.recipeId);
    User.findById(req.session.passport.user)
        .then((foundUser) => {
            RecipeUser.update({ saved: false }, {
                where: {
                    userId: foundUser.id,
                    recipeId: id,
                },
            }, );
        })
        .then(() => res.json(`Recipe with ${id} was unsaved.`))
        .catch(next);
});

router.get('/repeatstep', (req, res, next) => {
    User.findById(1)
        .then((foundUser) => {
            res.json({
                steps: foundUser.crSteps,
                num: foundUser.crs,
            });
        });
});


router.get('/startover', (req, res, next) => {
    User.findById(1)
        .then(foundUser => foundUser.update({
            crs: 0,
        }))
});
// Get possible recipes only base on  one item.
router.get('/alexa', (req, res, next) => { // test only most merge
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
                            res.json(chosen);
                        });
                });
        });
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
            RecipeUser.update({ saved: true }, {
                where: {
                    userId: foundUser.id,
                    recipeId: id,
                },
            });
        })
        .then(() => res.json(`Recipe with ${id} was saved.`))
        .catch(next);
});

router.put('/deleteRecipe/:recipeId', (req, res, next) => {
    const id = Number(req.params.recipeId);
    User.findById(req.session.passport.user)
        .then((foundUser) => {
            RecipeUser.update({ saved: false }, {
                where: {
                    userId: foundUser.id,
                    recipeId: id,
                },
            });
        })
        .then(() => res.json(`Recipe with ${id} was unsaved.`))
        .catch(next);
});


// Get possible recipes only base on  one item.

router.get('/:name', (req, res, next) => {
    FridgeItems.findById(1)
        .then((foundItem) => {
            const ingredients = foundItem.name;
            return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${req.params.name}&limitLicense=false&number=10&ranking=2`, {
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