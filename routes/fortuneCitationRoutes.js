'use strict';

const express = require('express');
const fortuneCitationController = require('../controllers/fortuneCitationController');
const fortuneRouter = express.Router();


fortuneRouter.route('/').get(fortuneCitationController.getAllCitations);
fortuneRouter.route('/citation').get(fortuneCitationController.getFortuneCitation);
module.exports = fortuneRouter;