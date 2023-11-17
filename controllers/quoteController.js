'use strict';

const Fact = require('../models/quoteModel');
const apiError = require('../utils/apiError');
const Features = require('../utils/apiFeatures');

exports.getAllFacts = async (req, res, next) => {
    try {
        const features = new Features(Fact, req.query).filter().sort();
        const facts = await features.model;
        res.status(200).json({
            status: 'success',
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
            { $sample: { size: 1 } },
            { $project: { _id: 0, __v: 0 } }
        ])
        res.status(200).json({
            status: 'success',
            singleFact
        })
    }
    catch (err) {
        return next(new apiError('Something went wrong.', 500));
    }
}

exports.createNewFact = async (req, res, next) => {
    try {
        const newFact = await Fact.create({
            factKey: req.body.factKey,
            lang: req.body.lang
        });
        res.status(201).json({
            status: 'success',
            newFact
        })

    } catch (err) {
        return next(new apiError('Something went wrong.', 500));
    }
}
