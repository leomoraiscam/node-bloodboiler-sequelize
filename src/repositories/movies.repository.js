const { Movies, Votes, User, Casts, Genres } = require('../models');

module.exports = {
  list: (query) =>
    Movies.findAndCountAll({
      ...query,
      include: [
        {
          model: Votes,
          as: 'votes',
          attributes: ['id', 'note', 'createdAt'],
          include: [
            {
              model: User,
              attributes: ['name', 'email'],
            },
          ],
        },
        {
          model: Casts,
          as: 'casts',
        },
        {
          model: Genres,
          as: 'genres',
        },
      ],
    }),
  get: (params) =>
    Movies.findOne({
      where: params,
    }),
  getById: (id) => Movies.findByPk(id),
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
