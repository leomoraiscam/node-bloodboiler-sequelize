const { Votes } = require('../models');
const sequelize = require('sequelize');

module.exports = {
  list: (query) => Votes.findAndCountAll(query),
  get: (params) =>
    Votes.findOne({
      where: params,
    }),
  create: (params) => Votes.create(params),
};
