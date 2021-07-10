
const express = require('express');
const router = express.Router({mergeParams: true});
const { reviewValidation, isLoggedIn, isReviewAuthor } = require('../middleware')

const Campground = require('../models/campgrounds');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

// post review
router.post('/', isLoggedIn, reviewValidation, catchAsync(reviews.createReview));
// delete a particular review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;