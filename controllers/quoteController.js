'use strict';

const Quote = require('../models/quoteModel');

exports.getAllQuotes = async (req, res, next) => {
    try {
        const quotes = await Quote.find({});
        res.status(200).json({
            status: 'success',
            quotes
        })
    }
    catch (err) {
        console.error(err.message);
    }
}


exports.getOneQuote = async (req, res, next) => {
    try {
        const countDocs = await Quote.countDocuments();
        const rng = Math.floor(Math.random() * countDocs);
        if (rng > countDocs) {
            const singleQuote = await Quote.findOne({ quoteKey: 1 });
            res.status(200).json({
                status: 'success',
                singleQuote
            })
        }
        else {
            const singleQuote = await Quote.findOne({ quoteKey: rng });
            res.status(200).json({
                status: 'success',
                singleQuote
            })
        }

    }
    catch (err) {
        console.error(err.message);
    }
}
