const { Administrator, User } = require('../models');

module.exports = {
  list: (query) =>
    Administrator.findAndCountAll({
      ...query,
      attributes: ['id', 'admin', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    }),
  get: (params) =>
    Administrator.findOne({
      where: params,
    }),
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
