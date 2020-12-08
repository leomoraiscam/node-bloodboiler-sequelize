const { Administrator } = require('../models');

module.exports = {
  index: () => Administrator.findAll(),
  list: (query) => Administrator.findAndCountAll(query),
  create: (params) => Administrator.create(params),
};
