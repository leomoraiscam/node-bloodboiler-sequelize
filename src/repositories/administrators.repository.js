const { Administrator } = require('../models');

module.exports = {
  getById: (id) => Administrator.findByPk(id),
  list: (query) => Administrator.findAndCountAll(query),
  get: (params) =>
    Administrator.findOne({
      where: params,
    }),
  create: (params) => Administrator.create(params),
  update: (args, id) =>
    Administrator.update(args, {
      where: {
        id,
      },
    }),
  destroy: (id) =>
    Administrator.destroy({
      where: { id },
    }),
};
