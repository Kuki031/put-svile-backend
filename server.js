'use strict';

const dotenv = require('dotenv');
dotenv.config({ path: './cfg.env' });
const mongoose = require('mongoose');
const app = require(`./app.js`);
const DB_CONNECT = process.env.DB_CONNECTION_STRING.replace('<password>', process.env.DB_CONNECTION_PW);
// const PORT = process.env.PORT || 3000;
// const LOCALHOST = process.env.LOCALHOST;

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

app.listen(() => {
    console.log(`App running.`);
})

