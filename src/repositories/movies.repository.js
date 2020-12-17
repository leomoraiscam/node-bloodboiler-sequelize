const { Movies } = require('../models');

module.exports = {
  getById: (id) => Movies.findByPk(id),
  list: (query) => Movies.findAndCountAll(query),
  get: (params) =>
    Movies.findOne({
      where: params,
    }),
  create: (params) => Movies.create(params),
  update: (args, id) =>
    Movies.update(args, {
      where: {
        id,
      },
    }),
  destroy: (id) =>
    Movies.destroy({
      where: {
        id,
      },
    }),
};
