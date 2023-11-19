'use strict';

const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        validate: {
            validator: function (rating) {
                return rating <= 5 && rating >= 1
            },
            message: "Review rating ranges from 1-5"
        }
    },
    comment: String,
    createdAt: Date
});
reviewSchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
})

reviewSchema.pre('save', function (next) {
    this.createdAt = new Date(Date.now()).toISOString();
    next();
})


const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;