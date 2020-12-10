const { Movies } = require('../models');

module.exports = {
  list: (query) => Movies.findAndCountAll(query),
  create: (params) => Movies.create(params),
  get: (params) =>
    Movies.findOne({
      where: params,
    }),
};
