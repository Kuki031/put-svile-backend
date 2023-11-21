'use strict';

const mongoose = require('mongoose');

const fortuneCitationSchema = new mongoose.Schema({
    citationKey: {
        type: Number,
        required: true,
        unique: true
    },
    citation: String
})

fortuneCitationSchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
})
fortuneCitationSchema.index({ citation: 1 });
const FortuneCitation = mongoose.model('FortuneCitation', fortuneCitationSchema);
module.exports = FortuneCitation;
