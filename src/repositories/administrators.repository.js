const { Administrator } = require('../models');

module.exports = {
  index: () => Administrator.findAll(),
  get: (params) =>
    Administrator.findOne({
      where: {
        id_user: params,
      },
    }),
  list: (query) => Administrator.findAndCountAll(query),
  create: (params) => Administrator.create(params),
};
