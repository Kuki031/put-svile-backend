'use strict';

const Fact = require('../models/quoteModel');
const apiError = require('../utils/apiError');

exports.getAllFacts = async (req, res, next) => {
    try {
        const objQuery = { ...req.query };
        const filterFields = ["sort", "paginate", "project", "field"];
        filterFields.forEach(field => delete objQuery[field]);
        let queryString = JSON.stringify(objQuery);
        queryString = queryString.replace(/(gt|gte|lt|lte)/g, (el) => `$${el}`);

        let query = JSON.parse(queryString);
        const facts = await Fact.find(query, { _id: 0 });
        res.status(200).json({
            status: 'success',
            facts
        })
    }
    catch (err) {
        console.log(err);
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
