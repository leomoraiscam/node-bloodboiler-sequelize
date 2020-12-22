const { Addresses } = require('../models');

module.exports = {
  create: (params) => Addresses.create(params),
};
