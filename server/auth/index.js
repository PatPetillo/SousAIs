const router = require('express').Router();
const { User, Fridge } = require('../db/models');

module.exports = router;

router.post('/login', (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        res.status(401).send('User not found');
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password');
      } else {
        req.login(user, (err) => {
          if (err) next(err);
          else {
            res.json({
              name: user.name,
              id: user.id,
            });
            Fridge.findCreateFind({ where: { userId: user.id } });
          }
        });
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  let createdUser;
  User.create(req.body)
    .then((user) => {
      createdUser = user;
      req.login(user, err => (
        err ?
          next(err) :
          res.json(createdUser)));
    })
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists');
      } else {
        next(err);
      }
    });
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json({
    name: req.user.name,
    id: req.user.id,
  });
});

router.use('/google', require('./google'));
