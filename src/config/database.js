/**
 * Configurações para conexão com o mogoose
 */
const mongoose = require('mongoose');

const { 
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_PORT
} = process.env;

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: DB_USERNAME,
    pass: DB_PASSWORD,

});

module.exports = mongoose;
