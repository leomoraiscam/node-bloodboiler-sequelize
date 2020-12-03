const { Administrator } = require('../models');

module.exports = {
  index: () => Administrator.findAll(),
  create: (params) => Administrator.create(params),
};
