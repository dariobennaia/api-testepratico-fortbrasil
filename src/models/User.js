const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

/**
 * Modelo da entidade do projeto.
 */
const UserSchema = new mongoose.Schema({
    name: { 
        type:String,
        required: true
    },
    email: { 
        type:String,
        unique:true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
});

/**
 * Função responsavel por codificar a senha do usuário
 */
UserSchema.pre('save', async function (next) {    
    if (!this.isModified('password')) {
        return next();
    };

    this.password = await bcrypt.hash(this.password, 10);

    return next();
});

/**
 * Função responsavel por codificar a senha do usuário
 * se por acaso for informada.
 */
UserSchema.pre('update', async function (next) {    
    if (!this._update.password) {
        return next();
    };

    this._update.password = await bcrypt.hash(this._update.password, 10);

    return next();
});

module.exports = mongoose.model('User', UserSchema);
