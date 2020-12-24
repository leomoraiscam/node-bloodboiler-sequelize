const { Addresses } = require('../models');

module.exports = {
  create: (params) => Addresses.create(params),
  get: (params) =>
    Addresses.findOne({
      where: params,
    }),
};
