const { User, Administrator, Addresses } = require('../models');

module.exports = {
  list: (query) =>
    User.findAndCountAll({
      ...query,
      include: [
        {
          model: Administrator,
          as: 'administrator',
          attributes: ['id', 'admin'],
        },
        {
          model: Addresses,
          as: 'addresses',
          attributes: ['street', 'neighborhood', 'complement', 'city', 'uf', 'zipCode', 'number'],
        },
      ],
    }),
  getById: (id) =>
    User.findByPk(id, {
      include: [
        {
          as: 'administrator',
          model: Administrator,
          attributes: ['id', 'admin'],
        },
        {
          model: Addresses,
          as: 'addresses',
          attributes: ['street', 'neighborhood', 'complement', 'city', 'uf', 'zipCode', 'number'],
        },
      ],
    }),
  get: (params) =>
    User.findOne({
      where: params,
      include: [
        {
          model: Administrator,
          as: 'administrator',
          attributes: ['id', 'admin'],
        },
      ],
    }),
  create: (params) => User.create(params),
  update: (user) => user.save(),
  destroy: (id) => User.destroy({ where: { id } }),
};
