const ShopService = require('../services/ShopService');

/**
 * Classe responsável por consultar todas as lojas mais
 * proximas de acordo com a distancia informada.
 */
class SearchShopController {
    /**
     * Metodo responsavel pela consulta das informações.
     * @param {*} req 
     * @param {*} res 
     */
    async index(req, res) {
        const { distance } = req.params;

        const response = await ShopService.findShopsDistanceOf(
            distance,
            req.query,
        );
        
        return res.send(response);
    }
}

module.exports = new SearchShopController;
