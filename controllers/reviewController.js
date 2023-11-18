'use strict';

const Review = require('../models/reviewModel');
const apiError = require('../utils/apiError');
const apiFeatures = require('../utils/apiFeatures');

exports.createReview = async (req, res, next) => {
    try {
        const newReview = await Review.create({
            rating: req.body.rating,
            comment: req.body.comment
        });
        res.status(201).json({
            status: 'success',
            newReview
        })
    }
    catch (err) {
        return next(new apiError('Something went wrong.', 500));
    }
}

exports.getAllReviews = async (req, res, next) => {
    try {
        const features = new apiFeatures(Review, req.query).filter().sort();
        const reviews = await features.model;
        res.status(200).json({
            status: 'success',
            reviews
        })
    }
    catch (err) {
        return next(new apiError('Something went wrong.', 500));
    }
}
