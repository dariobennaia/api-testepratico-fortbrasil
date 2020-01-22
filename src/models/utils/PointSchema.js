const mongoose = require('mongoose');

/**
 * Função responsavel por auxiliar na inserção
 * ou atualização da localização do registro na
 *  base de dados.
 */
const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

module.exports = PointSchema;