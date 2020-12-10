const { Administrator } = require('../models');

module.exports = {
  list: (query) => Administrator.findAndCountAll(query),
  getById: (id) => Administrator.findByPk(id),
  create: (params) => Administrator.create(params),
};
