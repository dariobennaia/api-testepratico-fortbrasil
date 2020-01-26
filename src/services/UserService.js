const User = require('../models/User');

/**
 * Classe de serviço responsavel por manipular a entidade
 * modelo.
 */
class UserService {
  /**
   * Função responsavel por criar os resgistros
   * de acordo com as especificações informadas.
   * @param {*} data
   */
  async createUser(data) {
    const user = await User.findOne({ email: data.email });

    if (user) {
      throw new Error('Já existe um usuário com esse email cadastrado.');
    }

    return User.create(data);
  }

  /**
   * Função responsavel por atualizar um registro
   * de acordo com o id informado.
   * @param {*} _id
   * @param {*} data
   */
  async updateUserById(_id, data) {
    const user = await User.findByIdAndUpdate({ _id }, data);

    if (!user) {
      throw new Error('Usuário inexistente');
    }

    return user;
  }

  /**
   * Função responsavel por atualizar um registro
   * de acordo com os parametros informados.
   * @param {*} params
   * @param {*} data
   */
  async updateUser(params, data) {
    const exists = await User.findOne(params);

    if (!exists) {
      throw new Error('Usuário inexistente');
    }

    return User.update(params, data);
  }
}

module.exports = new UserService();
