/**
 * Função responsavel por retornar os dados
 * para a pesquisa.
 */
module.exports = params => {
  let search = {};
  Object.keys(params).map(key => {
    search = { [key]: { $regex: `.*${params[key]}.*` } };
    return search;
  });
  return search;
};
