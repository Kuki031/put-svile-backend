'use strict'

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const sanitizer = require('perfect-express-sanitizer');
const cookies = require('cookie-parser');
const app = express();
const quoteRouter = require('./routes/quoteRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const errorController = require('./controllers/errorController');



if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(helmet());
app.use(express.json({ limit: '10kb' }))
app.use(cors({
    allowedHeaders: '*',
    origin: '*'
}));
app.use(cookies())
app.use(sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true
}))

app.use('/api/v1/quotes', quoteRouter);
app.use('/api/v1/reviews', reviewRouter);

app.use('/', errorController);
module.exports = app;
