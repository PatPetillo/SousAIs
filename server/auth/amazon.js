const passport = require('passport');
const router = require('express').Router();
const util = require('util');
const AmazonStrategy = require('passport-amazon').Strategy;
const { User } = require('../db/models');
module.exports = router;

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

const amazonConfig = {
    clientID: 'amzn1.application-oa2-client.6518f0c6c7a94a79aa24c53628764366',
    clientSecret: '4b62b5c7365a6f828c64b2b0b6f282fc4a7633f2ecc268d0f068c7ded31b45b6',
    callbackURL: 'https://127.0.0.1:8083/auth/amazon/callback',
};

const strategy = new AmazonStrategy(amazonConfig, (token, refreshToken, profile, done) => {
    const amazonId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;

    User.find({ where: { amazonId } })
        .then(foundUser => (foundUser ?
            done(null, foundUser) :
            User.create({ name, email, amazonId })
            .then(createdUser => done(null, createdUser))
        ))
        .catch(done);
});

passport.use(strategy);

router.get('/', passport.authenticate('amazon', { scope: ['profile', 'email'] }));

router.get('/callback', passport.authenticate('amazon', {
    successRedirect: '/home',
    failureRedirect: '/login',
}));