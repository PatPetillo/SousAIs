const router = require('express').Router();

module.exports = router;

router.use('/users', require('./users'));
router.use('/fridge', require('./fridgeItems'));
router.use('/recipe', require('./recipe'));
router.use('/alexa', require('./alexa'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
