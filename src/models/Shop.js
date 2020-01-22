const mongoose    = require('mongoose');
const PointSchema = require('./utils/PointSchema');

/**
 * Modelo da entidade do projeto.
 */
const ShopSchema = new mongoose.Schema({
    name: String,
    about: String,
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Shop', ShopSchema);