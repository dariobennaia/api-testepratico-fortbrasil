const UserService      = require('../services/UserService');
const regexToSeachShop = require('./utils/RegexToSeachShop');

/**
 * Classe responsável por manter os usuários do sistema
 * cadastrando, editando, excluindo e listando as
 * informações.
 */
class UserController {
    /**
     * Metodo responsavel pelo cadastro das informações.
     * @param {*} req 
     * @param {*} res 
     */
    async store(req, res) {
        try {
            const data = await UserService.createUser(req.body);
            return res.json(data, 201);
        } catch(err) {
            return res.json({
                error: true,
                message: err
            }, 400);
        }
    }

    /**
     * Metodo responsavel pela atualização das informações
     * com base no id do documento informado.
     * @param {*} req 
     * @param {*} res 
     */
    async update(req, res) {
        try {
            const { id } = req.params;
            const body = req.body;

            await UserService.updateUserById(id, body);

            return res.json({ message: 'sucesso' }, 200);
        } catch(err) {
            return res.json({
                error: true,
                message: err
            }, 400);
        }
    }
}

module.exports = new UserController;
