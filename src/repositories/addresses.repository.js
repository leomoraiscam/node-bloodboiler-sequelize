const { Addresses } = require('../models');

module.exports = {
  getById: (id) => Addresses.findByPk(id),
  get: (params) =>
    Addresses.findOne({
      where: params,
    }),
  create: (params) => Addresses.create(params),
  update: (args, id) =>
    Addresses.update(args, {
      where: {
        id,
      },
    }),
  destroy: (id) =>
    Addresses.destroy({
      where: { id },
    }),
};
