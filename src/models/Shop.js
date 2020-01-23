const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

/**
 * Modelo da entidade do projeto.
 */
const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
});

module.exports = mongoose.model('Shop', ShopSchema);
