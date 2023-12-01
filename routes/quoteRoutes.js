'use strict';

const express = require('express');
const quoteController = require('../controllers/quoteController');
const quoteRouter = express.Router();


quoteRouter.route('/').get(quoteController.getAllFacts);
quoteRouter.route('/single-quote/:about').get(quoteController.getOneFact);
quoteRouter.route('/:about').get(quoteController.getMoreFactsAbout);
module.exports = quoteRouter;