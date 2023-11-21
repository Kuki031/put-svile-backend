'use strict';

const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './cfg.env' });
const mongoose = require('mongoose');
const Fact = require('../models/quoteModel');
const Review = require('../models/reviewModel');
const FortuneCitation = require('../models/fortuneCitationModel');
const quoteData = JSON.parse(fs.readFileSync('./dev-data/quotes.json'));
const citationData = JSON.parse(fs.readFileSync('./dev-data/citations.json'));

const DB_CONNECT = process.env.DB_CONNECTION_STRING.replace('<password>', process.env.DB_CONNECTION_PW);
const connectToDB = async () => {
    try {
        await mongoose.connect(DB_CONNECT);
        console.log('Connection succesful.');
    }
    catch (err) {
        console.error(err.message);
    }
}
connectToDB();

const importData = async () => {
    try {
        await Promise.all([FortuneCitation.create(citationData), Fact.create(quoteData)]);
        console.log('DB populated succesfully.');
    }
    catch (err) {
        console.error(err.message);
    }
    process.exit();
}

const deleteData = async () => {
    try {
        await Promise.all([Fact.deleteMany({}), Review.deleteMany({}), FortuneCitation.deleteMany({})]);
        console.log('DB entries deleted succesfuly.');
    }
    catch (err) {
        console.error(err.message);
    }
    process.exit();
}
if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();