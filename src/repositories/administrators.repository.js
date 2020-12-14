const { Administrator } = require('../models');

module.exports = {
  list: (query) => Administrator.findAndCountAll(query),
  get: (params) => Administrator.findOne({ where: params }),
  getById: (id) => Administrator.findByPk(id),
  create: (params) => Administrator.create(params),
  destroy: (id) => Administrator.destroy({ where: { id } }),
};
