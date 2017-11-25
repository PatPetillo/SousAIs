const passport = require('passport')
const router = require('express').Router()
const util = require('util')
const AmazonStrategy = require('passport-amazon').Strategy;
const { User } = require('../db/models')
module.exports = router

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

if (!process.env.AMAZON_CLIENT_ID || !process.env.AMAZON_CLIENT_SECRET) {

    console.log('Amazon client ID / secret not found. Skipping Amazon OAuth.')

} else {

    const amazonConfig = {
        clientID: process.env.AMAZON_CLIENT_ID,
        clientSecret: process.env.AMAZON_CLIENT_SECRET,
        callbackURL: process.env.AMAZON_CALLBACK
    }

    const strategy = new AmazonStrategy(amazonConfig, (token, refreshToken, profile, done) => {
        const amazonId = profile.id
        const name = profile.displayName
        const email = profile.emails[0].value

        User.find({ where: { amazonId } })
            .then(foundUser => (foundUser ?
                done(null, foundUser) :
                User.create({ name, email, amazonId })
                .then(createdUser => done(null, createdUser))
            ))
            .catch(done)
    })

    passport.use(strategy)

    router.get('/', passport.authenticate('amazon', { scope: 'email' }))

    router.get('/callback', passport.authenticate('amazon', {
        successRedirect: '/home',
        failureRedirect: '/login'
    }))

}