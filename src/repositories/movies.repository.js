const { Movies } = require('../models');

module.exports = {
  list: (query) => Movies.findAndCountAll(query),
  getById: (id) => Movies.findByPk(id),
  get: (params) =>
    Movies.findOne({
      where: params,
    }),
  create: (params) => Movies.create(params),
  update: (movie, id) =>
    Movies.update(movie, {
      where: {
        id,
      },
    }),
};
