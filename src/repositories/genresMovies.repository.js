const { GenreMovie } = require('../models');

module.exports = {
  create: (params) => GenreMovie.create(params),
  createAll: (params, transaction) => GenreMovie.bulkCreate(params, { transaction }),
  update: (genreMovie) => genreMovie.save(),
  destroy: (params) => GenreMovie.destroy({ where: params }),
};
