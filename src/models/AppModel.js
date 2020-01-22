const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('App', AppSchema);