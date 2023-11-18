'use strict';

const express = require('express');
const rateLimit = require('express-rate-limit');
const reviewController = require('../controllers/reviewController');
const reviewRouter = express.Router();

const limiter = rateLimit({
    limit: 1,
    windowMs: 7 * 24 * 60 * 1000,
    message: "Već ste recenzirali ovu stranicu!"
})

reviewRouter.route('/').get(reviewController.getAllReviews);
reviewRouter.route('/rating').get(reviewController.reviewStatistics);

reviewRouter.use(limiter);
reviewRouter.post('/', reviewController.createReview)
module.exports = reviewRouter;
