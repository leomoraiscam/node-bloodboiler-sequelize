const { Votes } = require('../models');
const sequelize = require('sequelize');

module.exports = {
  list: (query) =>
    Votes.findAndCountAll({
      ...query,
      attributes: {
        include: [[sequelize.fn('AVG', sequelize.col('Votes.note')), 'average']],
      },
      group: ['Votes.id'],
    }),
  get: (params) =>
    Votes.findOne({
      where: params,
    }),
  create: (params) => Votes.create(params),
};
