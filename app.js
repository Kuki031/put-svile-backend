'use strict'

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const sanitizer = require('perfect-express-sanitizer');
const compression = require('compression');
const app = express();
const quoteRouter = require('./routes/quoteRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const errorController = require('./controllers/errorController');



if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(helmet());
app.use(express.json({ limit: '10kb' }))
app.use(cors());
app.options('*', cors());
app.enable('trust proxy');
app.use(sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true
}))
app.use(compression());
app.use(express.urlencoded({
    extended: true,
    limit: '10kb'
}))
app.use('/api/v1/quotes', quoteRouter);
app.use('/api/v1/reviews', reviewRouter);

app.use('/', errorController);
module.exports = app;
