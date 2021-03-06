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
          attributes: ['id', 'actor', 'character', 'avatar'],
        },
        {
          model: Genres,
          as: 'genres',
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      ],
    }),
  get: (params) =>
    Movies.findOne({
      where: params,
    }),
  getById: (id) =>
    Movies.findByPk(id, {
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
          attributes: ['id', 'actor', 'character', 'avatar'],
        },
        {
          model: Genres,
          as: 'genres',
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      ],
    }),
  create: (params, transaction) => Movies.create(params, { transaction }),
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
