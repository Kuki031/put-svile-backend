'use strict';

const mongoose = require('mongoose');
const quoteSchema = new mongoose.Schema({
    quoteKey: {
        type: Number,
        unique: true
    },
    quote: {
        type: String,
        unique: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

quoteSchema.virtual('origin').get(function () {
    return this.quote.includes('Marco Polo') ? `Marco Polo` : `Kublai Khan`;
})
quoteSchema.pre(/^find/, function (next) {
    this.select("-__v -quoteKey");
    next();
})


const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;