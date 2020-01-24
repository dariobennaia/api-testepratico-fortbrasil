/** **************************************************************
 * ***************************************************************
 * **                                                           **
 * **                  Rotas da aplicação.                      **
 * **                                                           **
 * ***************************************************************
 * ************************************************************ */
const { Router } = require('express');

const routes = Router();

const auth = require('../middlewares/IsAuthenticated');
const ShopController = require('../controllers/ShopController');
const SearchShopController = require('../controllers/SearchShopController');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');

const createUserValidation = require('../validations/user/UserCreateValidator');
const updateUserValidation = require('../validations/user/UserUpdateValidator');
const createShopValidation = require('../validations/shop/ShopCreateValidator');
const updateShopValidation = require('../validations/shop/ShopCreateValidator');
const loginValidation = require('../validations/auth/LoginValidator');
const changePassValidaton = require('../validations/auth/ChangePasswordValidator');

/** **************************************************************
 * ***************************************************************
 * **                                                           **
 * **        Rotas para o gerênciamento de autenticação.        **
 * **                                                           **
 * ***************************************************************
 * ************************************************************ */
routes.post('/login', loginValidation, AuthController.store);
routes.patch('/change-password', changePassValidaton, AuthController.update);
routes.delete('/logout', auth, AuthController.delete);
/* ***************************************************************
 * ************************************************************ */

/** **************************************************************
 * ***************************************************************
 * **                                                           **
 * **        Rotas para o gerênciamento de usuários.            **
 * **                                                           **
 * ***************************************************************
 * ************************************************************ */
routes.post('/users', createUserValidation, UserController.store);
routes.post('/users/:id', auth, updateUserValidation, UserController.update);
/* ***************************************************************
 * ************************************************************ */

/** **************************************************************
 * ***************************************************************
 * **                                                           **
 * **       Rotas para o gerênciamento de autenticação.         **
 * **                                                           **
 * ***************************************************************
 * ************************************************************ */
routes.get('/shops', auth, ShopController.index);
routes.post('/shops', auth, createShopValidation, ShopController.store);
routes.patch('/shops/:id', auth, updateShopValidation, ShopController.update);
routes.delete('/shops/:id', auth, ShopController.delete);
routes.get('/shops/distance-of/:distance', SearchShopController.index);
/* ***************************************************************
 * ************************************************************ */

module.exports = routes;
