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
    .withMessage('Informe a senha!')
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
