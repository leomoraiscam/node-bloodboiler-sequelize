const { Administrator } = require('../models');

module.exports = {
  list: (query) => Administrator.findAndCountAll(query),
  getById: (id) => Administrator.findByPk(id),
  get: (params) =>
    Administrator.findOne({
      where: params,
    }),
  create: (params) => Administrator.create(params),
  update: (user, id) =>
    Administrator.update(user, {
      where: {
        id,
      },
    }),
  destroy: (id) =>
    Administrator.destroy({
      where: { id },
    }),
};
