const express = require('express');
const router = express.Router({mergeParams: true});
const asyncCatcher = require('../utilities/asyncCatcher');
const AppError = require('../utilities/AppError');
const { isAuthenticated, validateReview, isReviewCreator } = require('../middleware/middleware')
const review = require('../controllers/reviews')

// ------------- Routes ------------------

router.post(
    '/',
    isAuthenticated,
    validateReview,
    asyncCatcher( review.postReview )
);

router.delete(
    '/:reviewId',
    isAuthenticated,
    isReviewCreator,
    asyncCatcher( review.deleteReview )
)

module.exports = router;