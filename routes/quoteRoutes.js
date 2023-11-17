'use strict';

const express = require('express');
const quoteController = require('../controllers/quoteController');
const quoteRouter = express.Router();


quoteRouter.route('/').get(quoteController.getAllFacts).post(quoteController.createNewFact);
quoteRouter.route('/single-quote').get(quoteController.getOneFact);
module.exports = quoteRouter;