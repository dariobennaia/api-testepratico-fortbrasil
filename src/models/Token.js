const mongoose = require('mongoose');

/**
 * Modelo da entidade do projeto.
 */
const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  expired: {
    type: Boolean,
    default: false
  },
  expires_in: {
    type: Number,
    default: process.env.EXPIRES_TOKEN
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Token', TokenSchema);
