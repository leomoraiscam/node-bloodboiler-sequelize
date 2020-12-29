const { User, Administrator } = require('../models');

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
      ],
    }),
  get: (params) =>
    User.findOne({
      where: params,
      include: [
        {
          model: Administrator,
          attributes: ['id', 'admin'],
        },
      ],
    }),
  create: (params) => User.create(params),
  update: (user) => user.save(),
  destroy: (id) => User.destroy({ where: { id } }),
};
