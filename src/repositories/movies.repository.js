const { Movies, Votes, User, Casts } = require('../models');

module.exports = {
  getById: (id) => Movies.findByPk(id),
  list: (query) =>
    Movies.findAndCountAll({
      ...query,
      include: [
        {
          model: Votes,
          as: 'votes',
          attributes: ['note', 'createdAt'],
          include: [
            {
              model: User,
              attributes: ['name', 'email'],
            },
          ],
        },
      ],
    }),
  get: (params) =>
    Movies.findOne({
      where: params,
    }),
  create: (params) => Movies.create(params),
  update: (args, id) =>
    Movies.update(args, {
      where: {
        id,
      },
    }),
  destroy: (id) =>
    Movies.destroy({
      where: {
        id,
      },
    }),
};
