const { Genres } = require('../models');

module.exports = {
  list: (query) => Genres.findAndCountAll(query),
  get: (params) =>
    Genres.findOne({
      where: params,
    }),
  getById: (id) => Genres.findByPk(id),
  create: (params) => Genres.create(params),
  createAll: (params) => Genres.bulkCreate(params),
};
