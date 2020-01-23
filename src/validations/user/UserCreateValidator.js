const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

const rules = [
  check('name').exists().withMessage('Campo nome é obrigatorio!'),
  check('name').isLength({ min: 5 }).withMessage('Campo nome deve ter no minimo 5 caracteres!'),
  
  check('password').exists().withMessage('Campo password é obrigatorio!'),
  check('password').isLength({ min: 6, max:16 }).withMessage('A senha deve ter de 6 a 16 caracteres!'),

  check('email').exists().withMessage('Campo email é obrigatorio!'),
  check('email').isEmail().withMessage('Campo email esta no formato inválido!'),
  check('email').custom(async email => {
    const user = await User.find({ email });    
    return user.length > 0 && Promise.reject('Email já cadastrado!');;
  })
];

const validate = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
  } catch (err) {
    res.status(422).json(err);
  }
};

module.exports = [rules, validate];
