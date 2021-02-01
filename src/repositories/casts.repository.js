const { Casts } = require('../models');

module.exports = {
  create: (params) => Casts.create(params),
  get: (params) =>
    Casts.findOne({
      where: params,
    }),
};
