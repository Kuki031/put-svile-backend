'use strict';

const mongoose = require('mongoose');
const factSchema = new mongoose.Schema({
    factKey: {
        type: Number,
        unique: true,
        required: true
    },
    fact: String,
    isAbout: {
        type: String,
        enum: ["marco-polo", "kublai-khan"]
    }
});
factSchema.index({ fact: 1 });

factSchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
})



const Fact = mongoose.model('Fact', factSchema);
module.exports = Fact;