const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

const rules = [
  check('name')
    .optional()
    .isLength({ min: 5 })
    .withMessage('Campo nome deve ter no minimo 5 caracteres!'),

  check('password')
    .optional()
    .isLength({ min: 6, max: 16 })
    .withMessage('A senha deve ter de 6 a 16 caracteres!'),

  check('email')
    .optional()
    .isEmail()
    .withMessage('Campo email esta no formato inválido!'),
  check('email').custom(async (email, { req }) => {
    const user = await User.find({
      email,
      _id: { $ne: req.params.id }
    });
    return user.length > 0 && Promise.reject(new Error('Email já cadastrado!'));
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
