const { check, validationResult } = require('express-validator');

const rules = [
  check('name')
    .exists()
    .withMessage('Campo nome é obrigatorio!'),
  check('name')
    .isLength({ min: 5 })
    .withMessage('Campo nome deve ter no minimo 5 caracteres!'),

  check('about')
    .exists()
    .withMessage('Campo sobre é obrigatorio!'),
  check('about')
    .isLength({ min: 1, max: 50 })
    .withMessage('O campo sobre deve ter até 50 caracteres!'),

  check('latitude')
    .exists()
    .withMessage('Campo latitude é obrigatorio!'),
  check('latitude')
    .isNumeric()
    .withMessage('Latitude invalida!'),

  check('longitude')
    .exists()
    .withMessage('Campo longitude é obrigatorio!'),
  check('longitude')
    .isNumeric()
    .withMessage('Longitude invalida!')
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
