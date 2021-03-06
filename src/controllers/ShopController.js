const ShopService = require('../services/ShopService');
const regexToSeachShop = require('./utils/RegexToSeachShop');

/**
 * Classe responsável por manter as lojas do sistema
 * cadastrando, editando, excluindo e listando as
 * informações.
 */
class ShopController {
  /**
   * Metodo responsavel pela listagem das informações.
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    const query = regexToSeachShop(req.query);

    const response = await ShopService.findShops(query);

    return res.send(response);
  }

  /**
   * Metodo responsavel pelo cadastro das informações.
   * @param {*} req
   * @param {*} res
   */
  async store(req, res) {
    try {
      const data = await ShopService.createShop(req.body);
      return res.json(data, 201);
    } catch ({ message: msg }) {
      return res.json({ error: true, msg }, 400);
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
      const { body } = req;

      await ShopService.updateShop(id, body);

      return res.json({ error: false, msg: 'sucesso' }, 200);
    } catch ({ message: msg }) {
      return res.json({ error: true, msg }, 400);
    }
  }

  /**
   * Metodo responsavel pela remoção das informações
   * com base no id do documento informado.
   * @param {*} req
   * @param {*} res
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      await ShopService.destroyShop(id);

      return res.json({ error: false, msg: 'sucesso' }, 200);
    } catch ({ message: msg }) {
      return res.json({ error: true, msg }, 400);
    }
  }
}

module.exports = new ShopController();
