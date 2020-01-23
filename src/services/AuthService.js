const User   = require('../models/User');
const Token  = require('../models/Token');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

/**
 * Classe reponsavel pela autenticação do usuário
 */
class AuthService {   
    /**
     * Metodo responsável por efetuar o login do usuário
     * e retornar o token do usuário autenticado.
     * @param {*} email 
     * @param {*} password
     */ 
    async login(email, password) {
        let user = await User.findOne({ email }).select('+password');

        if (!user || !await bcrypt.compare(password, user.password)) {
            throw 'Usuário ou senha inválidos.';
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
            expiresIn: Number(process.env.EXPIRES_TOKEN)
        });

        await Token.updateMany({ user: user._id }, { expired: true });
        await Token.create({ token, user: user._id, expires_in: process.env.EXPIRES_TOKEN });

        user.password = undefined;

        return { user, token };
    }

    /**
     * Metodo responsável por revogar o token de 
     * autenticação do usuário.
     * @param {*} token 
     */
    async logout(token) {
        await Token.updateOne({ token }, { expired: true });
    }
}

module.exports = new AuthService;