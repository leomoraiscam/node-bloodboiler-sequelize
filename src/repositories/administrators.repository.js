const { Administrator, User } = require('../models');

module.exports = {
  getById: (id) =>
    Administrator.findByPk(id, {
      include: [
        {
          as: 'user',
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    }),
  list: (query) =>
    Administrator.findAndCountAll({
      ...query,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    }),
  get: (params) =>
    Administrator.findOne({
      where: params,
    }),
  create: (params) => Administrator.create(params),
  update: (args, id) =>
    Administrator.update(args, {
      where: {
        id,
      },
    }),
  destroy: (id) =>
    Administrator.destroy({
      where: { id },
    }),
};
