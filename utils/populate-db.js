'use strict';

const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './cfg.env' });
const mongoose = require('mongoose');
const Quote = require('../models/quoteModel');
const quoteData = JSON.parse(fs.readFileSync('./dev-data/quotes.json'));

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
        await Quote.create(quoteData);
        console.log('DB populated succesfully.');
    }
    catch (err) {
        console.error(err.message);
    }
    process.exit();
}

const deleteData = async () => {
    try {
        await Quote.deleteMany({});
        console.log('DB entries deleted succesfuly.');
    }
    catch (err) {
        console.error(err.message);
    }
    process.exit();
}
if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();