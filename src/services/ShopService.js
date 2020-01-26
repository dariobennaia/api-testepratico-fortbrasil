const Shop = require('../models/Shop');
const regexToSeachShop = require('../controllers/utils/RegexToSeachShop');

/**
 * Classe de serviço responsavel por manipular a entidade
 * modelo.
 */
class ShopService {
  /**
   * Metodo responsavel por retornar todos os requistros
   * de acordo com as especificações informadas.
   * @param {*} params
   */
  findShops(params) {
    return Shop.find(params);
  }

  /**
   * Metodo responsavel por retornar todos os registros
   * de acordo com a localização atual e o raio informado.
   * @param {*} distance
   * @param {*} param1
   */
  findShopsDistanceOf(distance, { latitude, longitude, ...query }) {
    let params = regexToSeachShop(query);

    params = {
      ...params,
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: distance
        }
      }
    };

    return Shop.find(params);
  }

  /**
   * Função responsavel por criar os resgistros
   * de acordo com as especificações informadas.
   * @param {*} data
   */
  async createShop(data) {
    const { latitude, longitude, ...info } = data;

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    };

    return Shop.create({ ...info, location });
  }

  /**
   * Função responsavel por atualizar um registro
   * de acordo com o id informado.
   * @param {*} _id
   * @param {*} data
   */
  async updateShop(_id, data) {
    const { latitude, longitude, ...info } = data;
    const exists = await Shop.findOne({ _id });

    if (!exists) {
      throw new Error('Loja inexistente');
    }

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    };

    return Shop.update({ _id }, { ...info, location });
  }

  /**
   * Função responsavel por remover um registro
   * de acordo o id informado.
   * @param {*} _id
   */
  async destroyShop(_id) {
    await Shop.deleteOne({ _id });
  }
}

module.exports = new ShopService();
