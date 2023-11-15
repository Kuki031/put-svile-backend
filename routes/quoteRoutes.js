'use strict';

const express = require('express');
const quoteController = require('../controllers/quoteController');
const quoteRouter = express.Router();


quoteRouter.route('/').get(quoteController.getAllQuotes);
quoteRouter.route('/single-quote').get(quoteController.getOneQuote);

module.exports = quoteRouter;