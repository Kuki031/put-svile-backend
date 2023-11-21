'use strict';

const translate = require('node-google-translate-skidz');
const FortuneCitation = require('../models/fortuneCitationModel');
const apiError = require('../utils/apiError');
const apiFeatures = require('../utils/apiFeatures');

exports.getAllCitations = async (req, res, next) => {
    try {
        const features = new apiFeatures(FortuneCitation, req.query)
            .filter()
            .sort("citationKey")
            .paginate();
        const citations = await features.model;
        res.status(200).json({
            status: 'success',
            length: citations.length,
            citations
        })
    }
    catch (err) {
        return next(new apiError('Something went wrong.', 500));
    }
}


exports.getFortuneCitation = async (req, res, next) => {
    try {
        let translations;
        const citation = await FortuneCitation.aggregate([
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
                translate({ text: `${citation[0].citation}`, source: "hr", target: "en" }),
                translate({ text: `${citation[0].citation}`, source: "hr", target: "zh" })
            ]);
        }
        catch (err) {
            return new apiError('Something went wrong.', 500);
        }
        const translated = translations.map(x => x.translation);
        translated.push(citation[0].citation);
        res.status(200).json({
            status: 'success',
            translated
        })
    }
    catch (err) {
        return next(new apiError('Something went wrong.', 500));
    }
}

