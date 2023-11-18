'use strict';

const Review = require('../models/reviewModel');
const apiError = require('../utils/apiError');
const apiFeatures = require('../utils/apiFeatures');
const cookieOptions = {
    expires: parseInt(new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000)),
    httpOnly: true
}
exports.createReview = async (req, res, next) => {
    try {
        const newReview = await Review.create({
            rating: req.body.rating,
            comment: req.body.comment
        });
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
        res.status(201).cookie('reviewSubmitted', Date.now(), cookieOptions).json({
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
