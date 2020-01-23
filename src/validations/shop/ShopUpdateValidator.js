const { check, validationResult } = require('express-validator');
const Shop = require('../../models/Shop');

const rules = [
  check('name').optional().isLength({ min: 5 }).withMessage('Campo nome deve ter no minimo 5 caracteres!'),
  check('name').custom(async (name, { req }) => {
    const shop = await User.find({ 
        name,
        _id: { $ne: req.params.id }
    });
    return shop.length > 0 && Promise.reject('Loja já cadastrada!');;
  }),

  check('about').optional().isLength({ min: 1, max: 50 }).withMessage('A senha deve ter até 50 caracteres!'),

  check('latitude').optional().isNumeric().withMessage('Latitude invalida!'),

  check('longitude').optional().isNumeric().withMessage('Longitude invalida!'),
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
