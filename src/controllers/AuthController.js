const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');

/**
 * Classe reponsavel pelo gerenciamento das credenciais
 * do usuário.
 */
class AuthController {

    /**
     * Metodo responsável por efetuar o login do usuário.
     * @param {*} req 
     * @param {*} res 
     */
    async store(req, res) {
        try {
            const { email, password } = req.body;
            
            const token = await AuthService.login(email, password);

            res.json(token, 200);
        } catch (err) {
            res.json({ error: true, msg: err }, 400)
        }
    }

    /**
     * Metodo reponsável por atualizar a senha do usuário.
     * @param {*} req 
     * @param {*} res 
     */
    async update(req, res) {
        try {
            const { email, password } = req.body;
            
            await UserService.updateUser({ email }, { password });

            res.json({ error: false, msg: 'sucesso' }, 200);
        } catch(err) {
            res.json({ error: true, msg: err }, 400);
        }
    }

    /**
     * Metodo responsável por revogar o token de 
     * autenticação do usuário.
     * @param {*} req 
     * @param {*} res 
     */
    async delete(req, res) {
        try {            
            const authHeader = req.headers.authorization;

            const token = authHeader.split(' ')[1];

            await AuthService.logout(token);

            res.json({ error: false, msg: 'sucesso' }, 200);
        } catch (err) {
            res.json({ error: true, msg: err }, 400);
        }
    }
}

module.exports = new AuthController;
