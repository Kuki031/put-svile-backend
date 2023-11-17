'use strict';

const mongoose = require('mongoose');
const factSchema = new mongoose.Schema({
    factKey: {
        type: Number,
        unique: true,
        required: true
    },
    lang: [String]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


factSchema.pre(/^find/, function (next) {
    this.select("-__v");
    this.sort("factKey");
    next();
})


const Fact = mongoose.model('Fact', factSchema);
module.exports = Fact;