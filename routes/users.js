const express = require('express');
const router = express.Router();
const passport = require('passport');
const asyncCatcher = require('../utilities/asyncCatcher');
const { isAuthenticated } = require('../middleware/middleware');
const user = require('../controllers/users')

router
    .route('/register')
    .get(user.renderRegistration)
    .post(asyncCatcher( user.registerUser )
);

router
    .route('/login')
    .get(user.renderLogin)
    .post(
        passport.authenticate('local', {
            failureFlash: true,
            failureRedirect: '/login',
        }),
        user.loginUser
    );

router.get('/logout', user.logoutUser);

router.get('/:id',
    asyncCatcher(user.userDetails)
);

module.exports = router;