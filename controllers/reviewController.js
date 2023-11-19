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
        const features = new apiFeatures(Review, req.query)
            .filter()
            .sort()
            .paginate();
        const reviews = await features.model;
        res.status(200).json({
            status: 'success',
            length: reviews.length,
            reviews
        })
    }
    catch (err) {
        return next(new apiError('Something went wrong.', 500));
    }
}

exports.reviewStatistics = async (req, res, next) => {
    try {
        const reviewStats = await Review.aggregate([

            {
                $group: {
                    _id: "$rating",
                    numOfReviews: { $count: {} },
                    comments: { $push: "$comment" }
                }
            },
            {
                $sort: { _id: -1 }
            }
        ]);
        const getAllRecords = await Review.find({});
        const sumReviews = getAllRecords.map(x => parseInt(x.rating)).reduce((x, y) => x + y);
        const totalAverage = (sumReviews / getAllRecords.length).toFixed(2);
        res.status(200).json({
            status: 'success',
            reviewStats,
            totalAverage
        })
    }
    catch (err) {
        return next(new apiError('Something went wrong.', 500));
    }
}

