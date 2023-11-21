'use strict';

const translate = require('node-google-translate-skidz');
const Fact = require('../models/quoteModel');
const apiError = require('../utils/apiError');
const Features = require('../utils/apiFeatures');

exports.getAllFacts = async (req, res, next) => {
    try {
        const features = new Features(Fact, req.query)
            .filter()
            .sort("factKey")
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
        let translations;
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
        try {
            translations = await Promise.all([
                translate({ text: `${singleFact[0].fact}`, source: "hr", target: "en" }),
                translate({ text: `${singleFact[0].fact}`, source: "hr", target: "zh" })
            ]);

        }
        catch (err) {
            return next(new apiError('Something went wrong.', 500));
        }
        const translated = translations.map(x => x.translation);
        translated.push(singleFact[0].fact, { isAbout: singleFact[0].isAbout });
        res.status(200).json({
            status: 'success',
            translated
        })
    }
    catch (err) {
        return next(new apiError('Something went wrong.', 500));
    }
}
exports.getMoreFactsAbout = async (req, res, next) => {
    try {
        let storeResolvedPromises = [];
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
        try {
            for (const [_i, v] of Object.entries(moreFacts)) {
                storeResolvedPromises.push(await Promise.all([
                    translate({ text: `${v.fact}`, source: "hr", target: "en" }),
                    translate({ text: `${v.fact}`, source: "hr", target: "zh" })
                ]))
            }
        }
        catch (err) {
            return next(new apiError('Something went wrong.', 500));
        }
        const [...fact] = storeResolvedPromises;
        const translated = fact
            .map(x => x
                .map(y => y.translation));

        translated.forEach((x, i) => {
            x.push(moreFacts[i].fact)
            x.map(y => y)
        });
        res.status(200).json({
            status: 'success',
            length: translated.length,
            translated
        })
    }
    catch (err) {
        return next(new apiError('Something went wrong.', 500));
    }
}