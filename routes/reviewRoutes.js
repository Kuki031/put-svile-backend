'use strict';

const express = require('express');
const reviewController = require('../controllers/reviewController');
const reviewRouter = express.Router();


reviewRouter.route('/').get(reviewController.getAllReviews);
reviewRouter.route('/rating').get(reviewController.reviewStatistics);


reviewRouter.post('/', reviewController.createReview)
module.exports = reviewRouter;
