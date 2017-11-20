const router = require('express').Router();
const { FridgeItems, Fridge } = require('../db/models/');


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

module.exports = router;
