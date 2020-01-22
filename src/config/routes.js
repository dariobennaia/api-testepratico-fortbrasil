const { Router } = require('express');

const routes = Router();

const AppController = require('../controllers/AppController');

routes.get('/', AppController.index);

module.exports = routes;