const { Movies } = require('../models');

module.exports = {
  list: () => Movies.findAll(),
  create: (params) => Movies.create(params),
  getByName: (name) =>
    Movies.findOne({
      where: {
        name,
      },
    }),
};
