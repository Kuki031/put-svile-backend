'use strict';

const dotenv = require('dotenv');
dotenv.config({ path: './cfg.env' });
const mongoose = require('mongoose');
const app = require(`./app.js`);
const DB_CONNECT = process.env.DB_CONNECTION_STRING.replace('<password>', process.env.DB_CONNECTION_PW);
const PORT = process.env.PORT || 3000;
const LOCALHOST = process.env.LOCALHOST;

process.on('uncaughtException', err => {
    console.error(err.message);
    process.exit(1);
})

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


const server = app.listen(PORT, LOCALHOST, () => {
    console.log(`App running on ${LOCALHOST}:${PORT}`);
})
process.on('unhandledRejection', err => {
    server.close(() => {
        console.error(err.message);
        process.exit(1);
    })
})

