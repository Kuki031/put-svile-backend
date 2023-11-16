'use strict'

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const app = express();
const quoteRouter = require('./routes/quoteRoutes');
const errorController = require('./controllers/errorController');


if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(helmet());
app.use(express.json({ limit: '10kb' }))
app.use(cors({
    allowedHeaders: '*',
    origin: '*'
}));
app.use(mongoSanitize());
app.use(xss());

app.use('/api/v1/quotes', quoteRouter);

app.use('/', errorController);
module.exports = app;
