const { Router } = require('express');

const routes = Router();

const ShopController = require('../controllers/ShopController');
const SearchShopController = require('../controllers/SearchShopController');

routes.get('/shops', ShopController.index);
routes.post('/shops', ShopController.store);
routes.patch('/shops/:id', ShopController.update);
routes.delete('/shops/:id', ShopController.delete);

routes.get('/shops/distance-of/:distance', SearchShopController.index);

module.exports = routes;