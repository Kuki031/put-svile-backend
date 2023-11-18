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
    comment: String
})
reviewSchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
})



const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;