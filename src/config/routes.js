const { Router } = require('express');

const routes = Router();

const IsAuthenticated = require('../middlewares/IsAuthenticated');
const ShopController = require('../controllers/ShopController');
const SearchShopController = require('../controllers/SearchShopController');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');

const createUserValidation = require('../validations/user/UserCreateValidator');
const updateUserValidation = require('../validations/user/UserUpdateValidator');
const createShopValidation = require('../validations/shop/ShopCreateValidator');
const updateShopValidation = require('../validations/shop/ShopCreateValidator');
const loginValidation = require('../validations/auth/LoginValidator');
const changePasswordValidation = require('../validations/auth/ChangePasswordValidator');

routes.post('/login', loginValidation, AuthController.store);
routes.patch(
  '/change-password',
  changePasswordValidation,
  AuthController.update
);
routes.delete('/logout', IsAuthenticated, AuthController.delete);

routes.post('/users', createUserValidation, UserController.store);

routes.post(
  '/users/:id',
  IsAuthenticated,
  updateUserValidation,
  UserController.update
);

routes.get('/shops', IsAuthenticated, ShopController.index);
routes.post(
  '/shops',
  IsAuthenticated,
  createShopValidation,
  ShopController.store
);
routes.patch(
  '/shops/:id',
  IsAuthenticated,
  updateShopValidation,
  ShopController.update
);
routes.delete('/shops/:id', IsAuthenticated, ShopController.delete);

routes.get('/shops/distance-of/:distance', SearchShopController.index);

module.exports = routes;
