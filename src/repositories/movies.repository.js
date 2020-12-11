const { Movies } = require('../models');

module.exports = {
  list: (query) => Movies.findAndCountAll(query),
  get: (params) =>
    Movies.findOne({
      where: params,
    }),
  getById: (id) => Movies.findByPk(id),
  create: (params) => Movies.create(params),
  destroy: (id) => Movies.destroy({ where: { id } }),
};
