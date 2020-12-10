const { Administrator } = require('../models');

module.exports = {
  list: (query) => Administrator.findAndCountAll(query),
  getById: (id) => Administrator.findByPk(id),
  get: (params) => Administrator.findOne({ where: params }),
  create: (params) => Administrator.create(params),
};
