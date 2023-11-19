'use strict';

const Fact = require('../models/quoteModel');
const apiError = require('../utils/apiError');
const Features = require('../utils/apiFeatures');

exports.getAllFacts = async (req, res, next) => {
    try {
        const features = new Features(Fact, req.query)
            .filter()
            .sort()
            .paginate();
        const facts = await features.model;
        res.status(200).json({
            status: 'success',
            length: facts.length,
            facts
        })
    }
    catch (err) {
        return next(new apiError('Something went wrong.', 500));
    }
}


exports.getOneFact = async (req, res, next) => {
    try {
        const singleFact = await Fact.aggregate([
            {
                $sample: { size: 1 }
            },
            {
                $project: {
                    _id: 0,
                    __v: 0
                }
            }
        ]);
        res.status(200).json({
            status: 'success',
            singleFact
        })
    }
    catch (err) {
        return next(new apiError('Something went wrong.', 500));
    }
}

exports.getMoreFactsAbout = async (req, res, next) => {
    try {
        const moreFacts = await Fact.aggregate([
            {
                $match: { isAbout: req.params.about }
            },
            {
                $sample: { size: 10 }
            },
            {
                $project: {
                    _id: 0,
                    __v: 0
                }
            }
        ]);
        res.status(200).json({
            status: 'success',
            length: moreFacts.length,
            moreFacts
        })
    }
    catch (err) {
        return next(new apiError('Something went wrong.', 500));
    }
}