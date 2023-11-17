'use strict';

const Fact = require('../models/quoteModel');
const apiError = require('../utils/apiError');

exports.getAllFacts = async (req, res, next) => {
    try {
        const facts = await Fact.find({}, { _id: 0 });
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
            { $project: { _id: 0 } }
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
        const newFact = await Fact.create(req.body);
        res.status(201).json({
            status: 'success',
            newFact
        })

    } catch (err) {
        return next(new apiError('Something went wrong.', 500));
    }
}
