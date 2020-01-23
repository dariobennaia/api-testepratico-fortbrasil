const { check, validationResult } = require('express-validator');

const rules = [
  check('email')
    .exists()
    .withMessage('Informe o email!'),
  check('email')
    .isEmail()
    .withMessage('Email inválido!'),

  check('password')
    .exists()
    .withMessage('Informe a senha!'),
  check('password')
    .isLength({ min: 6, max: 16 })
    .withMessage('A senha deve ter de 6 a 16 caracteres!')
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
