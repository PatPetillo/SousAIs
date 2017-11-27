const router = require('express').Router();
const {
  User, Fridge, FridgeItems, Recipe, RecipeUser,
} = require('../db/models');
const axios = require('axios');
const key = require('../../secrets').spoon;

module.exports = router;


router.get('/', (req, res, next) => {
                          res.json([
                            {
                              "id": 37,
                              "name": "Slow Cooker Asian Beef with Vegetables",
                              "steps": "In a large bowl, toss steak strips with cornstarch to coat. (Don't use a small bowl or you will live to regret it when your kitchen is sprinkled with cornstarch. Don't ask me how I know.)$$Place meat in slow cooker turned to low. Rinse out the cornstarch bowl, and add olive oil, soy sauce, water, brown sugar, ginger, and garlic.$$Whisk together and pour over meat in slow cooker. Cook on low 4-6 hours (or up to 8 if necessary).At least a half hour before dinnertime, stir in carrots, bell pepper, green onions, and zucchini. Continue cooking on low while you prepare the rice.To serve, place a portion of rice in bowl and top with beef and veggies. Chopsticks are optional but encouraged.",
                              "calories": "562.34 cal",
                              "fat": "15.35 g",
                              "carbohydrates": "59.54 g",
                              "sugar": "25.02 g",
                              "sodium": "1424.81 mg",
                              "image": "https://spoonacular.com/recipeImages/514153-556x370.jpg",
                              "updatedAt": "2017-11-27T22:08:09.290Z",
                              "createdAt": "2017-11-27T22:08:09.290Z"
                            },
                            {
                              "id": 38,
                              "name": "Steak Stir-Fry",
                              "steps": "Dissolve bouillon in water.$$Combine the cornstarch and soy sauce until smooth; add to bouillon. Set aside. Toss beef with garlic, ginger and pepper. In a large skillet or wok over medium-high heat, stir-fry beef in 1 tablespoon oil until meat is no longer pink; remove and keep warm.$$Heat remaining oil; stir-fry vegetables until crisp-tender. Stir soy sauce mixture and add to the skillet; bring to a boil. Cook and stir for 2 minutes. Return meat to pan and heat through.$$Serve with rice.",
                              "calories": "363.26 cal",
                              "fat": "11.46 g",
                              "carbohydrates": "33.3 g",
                              "sugar": "3.05 g",
                              "sodium": "1293.4 mg",
                              "image": "https://spoonacular.com/recipeImages/368092-556x370.jpg",
                              "updatedAt": "2017-11-27T22:08:09.293Z",
                              "createdAt": "2017-11-27T22:08:09.293Z"
                            },
                            {
                              "id": 39,
                              "name": "Barbecue Beef Kabobs",
                              "steps": "In a small bowl, combine the ketchup, salad dressing, soy sauce and Worcestershire sauce.$$Transfer 1/3 cup to another bowl for basting; cover and refrigerate.$$Pour remaining marinade into a large resealable plastic bag; add steak. Seal bag and turn to coat; refrigerate for at least 1 hour.$$Place carrots and water in a microwave-safe dish. Cover and microwave on high for 4 minutes; drain.$$Drain and discard marinade. On 10 metal or soaked wooden skewers, alternately thread beef, and vegetables.$$Grill, covered, over medium-hot heat for 18-20 minutes or until meat reaches desired doneness, basting frequently with reserved marinade and turning once.$$Serve with rice if desired.",
                              "calories": "359.01 cal",
                              "fat": "7.23 g",
                              "carbohydrates": "46.05 g",
                              "sugar": "16.83 g",
                              "sodium": "1268.41 mg",
                              "image": "https://spoonacular.com/recipeImages/436510-556x370.jpg",
                              "updatedAt": "2017-11-27T22:08:09.295Z",
                              "createdAt": "2017-11-27T22:08:09.295Z"
                            }
                          ])
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
})