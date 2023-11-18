'use strict';

const express = require('express');
const reviewController = require('../controllers/reviewController');
const reviewRouter = express.Router();

reviewRouter.route('/').post(reviewController.createReview).get(reviewController.getAllReviews);
module.exports = reviewRouter;
