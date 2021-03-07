const { Casts } = require('../models');

module.exports = {
  create: (params) => Casts.create(params),
  list: (query) => Casts.findAndCountAll(query),
  get: (params) =>
    Casts.findOne({
      where: params,
    }),
  getById: (id) => Casts.findByPk(id),
};
