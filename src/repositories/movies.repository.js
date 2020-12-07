const { Movies } = require('../models');

module.exports = {
  list: () => Movies.findAll(),
  create: (params) => Movies.create(params),
  get: (params) =>
    Movies.findOne({
      where: {
        params,
      },
    }),
};
